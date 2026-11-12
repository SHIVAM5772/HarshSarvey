import { MongoServerError, ObjectId } from "mongodb";
import { getAdminSession } from "@/lib/auth";
import { getDatabase, getUsers } from "@/lib/mongodb";
import { consumeEmailOtp, OtpError } from "@/lib/otp";
import { normalizeEmail } from "@/lib/profile-validation";
import { verifyPassword } from "@/lib/password";
import { allowSubmission, isSameOrigin } from "@/lib/request-security";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session?.user) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403, headers });
  if (!allowSubmission(`email-change:${session.user.id}`)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429, headers });
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid form data." }, { status: 400, headers }); }
  const email = normalizeEmail(body?.email);
  if (!email || typeof body?.currentPassword !== "string" || body.currentPassword.length > 256) return Response.json({ error: "Enter a valid email and your current password." }, { status: 400, headers });
  try {
    const users = await getUsers();
    const user = await users.findOne({ _id: new ObjectId(session.user.id), role: "admin", isActive: true });
    if (!user || !await verifyPassword(body.currentPassword, user.passwordHash)) return Response.json({ error: "Current password is incorrect." }, { status: 400, headers });
    if (await users.findOne({ email })) return Response.json({ error: "This email is already registered." }, { status: 409, headers });
    await users.createIndex({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } });
    await consumeEmailOtp(await getDatabase(), session.user.id, email, "change-email", body.challengeId, body.otp, process.env.NEXTAUTH_SECRET!);
    const now = new Date();
    const updated = await users.updateOne({ _id: user._id, passwordHash: user.passwordHash, email: user.email ?? { $exists: false }, role: "admin", isActive: true }, { $set: { email, emailVerifiedAt: now, updatedAt: now }, $inc: { sessionVersion: 1 } });
    if (!updated.modifiedCount) return Response.json({ error: "Account changed elsewhere. Please sign in again." }, { status: 409, headers });
    return Response.json({ message: "Email verified and updated. Please sign in again." }, { headers });
  } catch (error) {
    if (error instanceof OtpError) return Response.json({ error: error.message }, { status: error.status, headers });
    if (error instanceof MongoServerError && error.code === 11000) return Response.json({ error: "This email is already registered." }, { status: 409, headers });
    return Response.json({ error: "Could not change your email. Please try again." }, { status: 503, headers });
  }
}
