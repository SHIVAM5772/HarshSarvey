import { getAdminSession } from "@/lib/auth";
import { listInquiries } from "@/lib/sheets";

export const runtime = "nodejs";
export async function GET() {
  const headers = { "Cache-Control": "private, no-store" };
  if (!await getAdminSession()) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  try {
    return Response.json({ inquiries: await listInquiries() }, { headers });
  } catch {
    return Response.json({ error: "Could not load enquiries. Check the Google Sheets connection and header row." }, { status: 503, headers });
  }
}
