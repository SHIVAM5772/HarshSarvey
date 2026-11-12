import { getAdminSession } from "@/lib/auth";
import { createBusinessDocument, listBusinessDocuments } from "@/lib/document-store";
import { validateDocument } from "@/lib/business-documents";
import { allowSubmission, isSameOrigin } from "@/lib/request-security";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
export async function GET() {
  if (!await getAdminSession()) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  try { return Response.json({ documents: await listBusinessDocuments() }, { headers }); }
  catch { return Response.json({ error: "Could not load saved documents." }, { status: 503, headers }); }
}
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session?.user) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403, headers });
  if (!allowSubmission(`document:${session.user.id}`)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429, headers });
  let input, requestId;
  try {
    const raw = await request.text();
    if (raw.length > 100000) throw new Error("Document data is too large.");
    const body = JSON.parse(raw);
    if (typeof body?.requestId !== "string" || !/^[a-f0-9-]{36}$/.test(body.requestId)) throw new Error("Invalid save request. Please reload and try again.");
    requestId = body.requestId;
    input = validateDocument(body);
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Enter valid document details." }, { status: 400, headers }); }
  try { return Response.json({ document: await createBusinessDocument(input, session.user.id, requestId) }, { status: 201, headers }); }
  catch { return Response.json({ error: "Could not save the document. Please try again." }, { status: 503, headers }); }
}
