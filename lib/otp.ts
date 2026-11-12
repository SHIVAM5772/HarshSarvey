import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { ObjectId, type Db } from "mongodb";

export type OtpPurpose = "create-admin" | "change-email";
type Challenge = { _id: ObjectId; actorId: string; email: string; purpose: OtpPurpose; codeHash: string; attempts: number; createdAt: Date; expiresAt: Date; ready: boolean };
export class OtpError extends Error {
  status: number;
  constructor(message: string, status = 400) { super(message); this.status = status; }
}
function digest(secret: string, id: string, code: string) { return createHmac("sha256", secret).update(`${id}:${code}`).digest("hex"); }

export async function issueEmailOtp(db: Db, actorId: string, email: string, purpose: OtpPurpose, secret: string, deliver: (email: string, code: string, purpose: OtpPurpose) => Promise<void>) {
  const challenges = db.collection<Challenge>("adminEmailOtps");
  const limits = db.collection<{ _id: string; count: number; expiresAt: Date }>("adminOtpLimits");
  await challenges.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await challenges.createIndex({ actorId: 1, email: 1, purpose: 1, createdAt: -1 });
  await limits.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  const now = Date.now();
  const recent = await challenges.findOne({ actorId, email, purpose, createdAt: { $gt: new Date(now - 60_000) } });
  if (recent) throw new OtpError("Please wait 60 seconds before requesting another code.", 429);
  const window = Math.floor(now / 3600000);
  for (const [key, max] of [[`actor:${actorId}`, 10], [`email:${createHmac("sha256", secret).update(email).digest("hex")}`, 5]] as const) {
    const limit = await limits.findOneAndUpdate({ _id: `${key}:${window}` }, { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((window + 1) * 3600000) } }, { upsert: true, returnDocument: "after" });
    if (!limit || limit.count > max) throw new OtpError("Too many verification requests. Please try again later.", 429);
  }
  const id = new ObjectId();
  const code = randomInt(0, 1000000).toString().padStart(6, "0");
  await challenges.insertOne({ _id: id, actorId, email, purpose, codeHash: digest(secret, id.toHexString(), code), attempts: 0, createdAt: new Date(now), expiresAt: new Date(now + 600000), ready: false });
  try {
    await deliver(email, code, purpose);
    await challenges.updateOne({ _id: id }, { $set: { ready: true } });
    // A resend invalidates older codes for this actor, address and purpose.
    await challenges.deleteMany({ actorId, email, purpose, _id: { $ne: id }, createdAt: { $lte: new Date(now) } });
    return id.toHexString();
  } catch {
    await challenges.deleteOne({ _id: id });
    throw new OtpError("Could not send the verification email. Please try again later.", 503);
  }
}

export async function consumeEmailOtp(db: Db, actorId: string, email: string, purpose: OtpPurpose, id: unknown, code: unknown, secret: string) {
  if (typeof id !== "string" || !/^[a-f0-9]{24}$/.test(id) || typeof code !== "string" || !/^\d{6}$/.test(code)) throw new OtpError("Enter the six-digit verification code sent to this email.");
  const challenges = db.collection<Challenge>("adminEmailOtps");
  const filter = { _id: new ObjectId(id), actorId, email, purpose, ready: true, expiresAt: { $gt: new Date() }, attempts: { $lt: 5 } };
  const challenge = await challenges.findOneAndUpdate(filter, { $inc: { attempts: 1 } }, { returnDocument: "after" });
  if (!challenge) throw new OtpError("Verification code expired or is no longer valid. Request a new code.");
  if (!timingSafeEqual(Buffer.from(challenge.codeHash, "hex"), Buffer.from(digest(secret, id, code), "hex"))) throw new OtpError("Incorrect verification code. Please try again.");
  // Delete atomically so concurrent requests cannot reuse a valid code.
  const consumed = await challenges.deleteOne({ _id: challenge._id, actorId, email, purpose, ready: true, expiresAt: { $gt: new Date() } });
  if (!consumed.deletedCount) throw new OtpError("This verification code has already been used.");
}
