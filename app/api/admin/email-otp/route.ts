import { getAdminSession } from "@/lib/auth";
import { getDatabase, getUsers } from "@/lib/mongodb";
import { isMailConfigured, sendVerificationEmail } from "@/lib/mail";
import { issueEmailOtp, OtpError } from "@/lib/otp";
import { normalizeEmail } from "@/lib/profile-validation";
import { isSameOrigin } from "@/lib/request-security";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session?.user) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403, headers });
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid form data." }, { status: 400, headers }); }
  const email = normalizeEmail(body?.email);
  if (!email || !["create-admin", "change-email"].includes(body?.purpose)) return Response.json({ error: "Enter a valid email and verification purpose." }, { status: 400, headers });
  if (!isMailConfigured()) return Response.json({ error: "Email verification is not available yet. Contact the website administrator." }, { status: 503, headers });
  try {
    if (await (await getUsers()).findOne({ email })) return Response.json({ error: "This email is already registered." }, { status: 409, headers });
    const challengeId = await issueEmailOtp(await getDatabase(), session.user.id, email, body.purpose, process.env.NEXTAUTH_SECRET!, sendVerificationEmail);
    return Response.json({ challengeId, message: "Verification code sent. Check your inbox and spam folder. It expires in 10 minutes." }, { headers });
  } catch (error) {
    return Response.json({ error: error instanceof OtpError ? error.message : "Could not send verification code. Please try again." }, { status: error instanceof OtpError ? error.status : 503, headers });
  }
}
