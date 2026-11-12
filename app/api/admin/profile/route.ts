import { ObjectId } from "mongodb";
import { getAdminSession } from "@/lib/auth";
import { getUsers } from "@/lib/mongodb";
import { serializeProfile } from "@/lib/profile";
import { validatePersonalDetails } from "@/lib/profile-validation";
import { allowSubmission, isSameOrigin } from "@/lib/request-security";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
export async function GET() {
  const session = await getAdminSession();
  if (!session?.user) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  try {
    const user = await (await getUsers()).findOne({ _id: new ObjectId(session.user.id), role: "admin", isActive: true });
    if (!user) return Response.json({ error: "Profile not found." }, { status: 404, headers });
    return Response.json({ profile: serializeProfile(user) }, { headers });
  } catch { return Response.json({ error: "Could not load your profile." }, { status: 503, headers }); }
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session?.user) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403, headers });
  if (!allowSubmission(`profile:${session.user.id}`)) return Response.json({ error: "Too many updates. Try again later." }, { status: 429, headers });
  let details;
  try {
    const body = await request.json();
    if (body && Object.hasOwn(body, "email")) throw new Error("Use email verification to change your account email.");
    details = validatePersonalDetails(body);
    if (!details.name) throw new Error("Enter your full name.");
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Invalid profile details." }, { status: 400, headers }); }
  try {
    const user = await (await getUsers()).findOneAndUpdate({ _id: new ObjectId(session.user.id), role: "admin", isActive: true }, { $set: { ...details, updatedAt: new Date() } }, { returnDocument: "after" });
    if (!user) return Response.json({ error: "Profile not found." }, { status: 404, headers });
    return Response.json({ message: "Personal details updated.", profile: serializeProfile(user) }, { headers });
  } catch { return Response.json({ error: "Could not update your profile." }, { status: 503, headers }); }
}
