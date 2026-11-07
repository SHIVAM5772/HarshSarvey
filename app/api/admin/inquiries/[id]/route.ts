import { getAdminSession } from "@/lib/auth";
import { isInquiryStatus } from "@/lib/inquiry-validation";
import { isSameOrigin } from "@/lib/request-security";
import { updateInquiryStatus } from "@/lib/sheets";

export const runtime = "nodejs";
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const headers = { "Cache-Control": "private, no-store" };
  if (!await getAdminSession()) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403, headers });
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return Response.json({ error: "Invalid enquiry ID." }, { status: 400, headers });
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400, headers }); }
  if (!isInquiryStatus(body?.status)) return Response.json({ error: "Invalid status." }, { status: 400, headers });
  try {
    if (!await updateInquiryStatus(id, body.status)) return Response.json({ error: "Enquiry no longer exists." }, { status: 404, headers });
    return Response.json({ ok: true }, { headers });
  } catch {
    return Response.json({ error: "Status could not be saved. Please refresh and try again." }, { status: 503, headers });
  }
}
