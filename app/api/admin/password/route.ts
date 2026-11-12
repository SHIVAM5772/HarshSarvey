import { ObjectId } from "mongodb";
import { getAdminSession } from "@/lib/auth";
import { getUsers } from "@/lib/mongodb";
import { hashPassword, verifyPassword } from "@/lib/password";
import { allowSubmission, isSameOrigin } from "@/lib/request-security";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session?.user) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403, headers });
  if (!allowSubmission(`password:${session.user.id}`)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429, headers });
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid form data." }, { status: 400, headers }); }
  if (typeof body?.currentPassword !== "string" || body.currentPassword.length > 256 || typeof body?.newPassword !== "string" || body.newPassword.length < 12 || body.newPassword.length > 256 || body.newPassword !== body.confirmPassword) return Response.json({ error: "Enter your current password and matching new passwords of 12–256 characters." }, { status: 400, headers });
  if (body.currentPassword === body.newPassword) return Response.json({ error: "Choose a different new password." }, { status: 400, headers });
  try {
    const users = await getUsers();
    const user = await users.findOne({ _id: new ObjectId(session.user.id), role: "admin", isActive: true });
    if (!user || !await verifyPassword(body.currentPassword, user.passwordHash)) return Response.json({ error: "Current password is incorrect." }, { status: 400, headers });
    const result = await users.updateOne({ _id: user._id, passwordHash: user.passwordHash }, { $set: { passwordHash: await hashPassword(body.newPassword), updatedAt: new Date() }, $inc: { sessionVersion: 1 } });
    if (!result.modifiedCount) return Response.json({ error: "Password changed elsewhere. Please sign in again." }, { status: 409, headers });
    return Response.json({ message: "Password changed. Please sign in again on all devices." }, { headers });
  } catch { return Response.json({ error: "Could not change your password. Please try again." }, { status: 503, headers }); }
}
