import { MongoServerError, ObjectId } from "mongodb";
import { getAdminSession } from "@/lib/auth";
import { getDatabase, getUsers } from "@/lib/mongodb";
import { consumeEmailOtp, OtpError } from "@/lib/otp";
import { normalizeEmail, validatePersonalDetails } from "@/lib/profile-validation";
import { hashPassword, normalizeUsername } from "@/lib/password";
import { allowSubmission, isSameOrigin } from "@/lib/request-security";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session?.user) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403, headers });
  if (!allowSubmission(`create-admin:${session.user.id}`)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429, headers });
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid form data." }, { status: 400, headers }); }
  const normalized = normalizeUsername(body?.username);
  const email = body?.email === undefined || body.email === "" ? "" : normalizeEmail(body?.email);
  if (!normalized || email === null || typeof body?.password !== "string" || body.password.length < 12 || body.password.length > 256) return Response.json({ error: "Enter a valid username, email and a password of 12–256 characters." }, { status: 400, headers });
  let details;
  try { details = validatePersonalDetails(body); } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Invalid personal details." }, { status: 400, headers }); }
  try {
    const users = await getUsers();
    await users.createIndex({ usernameNormalized: 1 }, { unique: true, partialFilterExpression: { usernameNormalized: { $type: "string" } } });
    await users.createIndex({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } });
    if (await users.findOne({ $or: [{ usernameNormalized: normalized }, ...(email ? [{ email }] : [])] })) return Response.json({ error: "This username or email is already registered." }, { status: 409, headers });
    if (email) await consumeEmailOtp(await getDatabase(), session.user.id, email, "create-admin", body.challengeId, body.otp, process.env.NEXTAUTH_SECRET!);
    const now = new Date();
    await users.insertOne({
      _id: new ObjectId(),
      ...details, name: details.name || body.username.trim(),
      username: body.username.trim(), usernameNormalized: normalized,
      passwordHash: await hashPassword(body.password), ...(email ? { email, emailVerifiedAt: now } : {}),
      role: "admin", isActive: true, sessionVersion: 0, createdAt: now, updatedAt: now,
    });
    return Response.json({ message: "New admin created. They can now sign in." }, { status: 201, headers });
  } catch (error) {
    if (error instanceof OtpError) return Response.json({ error: error.message }, { status: error.status, headers });
    if (error instanceof MongoServerError && error.code === 11000) return Response.json({ error: "This username or email is already registered." }, { status: 409, headers });
    return Response.json({ error: "Could not create the admin. Please try again." }, { status: 503, headers });
  }
}
