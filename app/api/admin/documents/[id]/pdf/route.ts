import { getAdminSession } from "@/lib/auth";
import { findBusinessDocument } from "@/lib/document-store";
import { generateBusinessPdf } from "@/lib/business-pdf";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAdminSession()) return Response.json({ error: "Admin login required." }, { status: 401, headers });
  try {
    const doc = await findBusinessDocument((await params).id);
    if (!doc) return Response.json({ error: "Document not found." }, { status: 404, headers });
    const bytes = await generateBusinessPdf(doc);
    return new Response(new Uint8Array(bytes), { headers: { ...headers, "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${doc.number}.pdf"`, "X-Content-Type-Options": "nosniff" } });
  } catch { return Response.json({ error: "Could not generate the PDF. Please try again." }, { status: 503, headers }); }
}
