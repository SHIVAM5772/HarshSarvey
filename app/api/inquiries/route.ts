import { saveInquiry, SheetsSetupError } from "@/lib/sheets";
import { validateInquiry } from "@/lib/inquiry-validation";
import { allowSubmission, isSameOrigin } from "@/lib/request-security";

export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Expected JSON." }, { status: 415 });
  const key = process.env.TRUST_PROXY_HEADERS === "true" ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown" : "local";
  if (!allowSubmission(key)) return Response.json({ error: "Too many enquiries. Please try again in a minute." }, { status: 429, headers: { "Retry-After": "60" } });
  if (Number(request.headers.get("content-length")) > 16000) return Response.json({ error: "Enquiry is too long." }, { status: 413 });
  let input;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text) > 16000) return Response.json({ error: "Enquiry is too long." }, { status: 413 });
    input = validateInquiry(JSON.parse(text));
  } catch (error) {
    return Response.json({ error: error instanceof SyntaxError ? "Invalid enquiry data." : error instanceof Error ? error.message : "Invalid enquiry." }, { status: 400 });
  }
  try {
    const id = await saveInquiry(input);
    return Response.json({ id }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    // Never log Google errors: they can contain keys, headers and customer data.
    return Response.json({ error: error instanceof SheetsSetupError ? "Online enquiry saving is being configured. Please contact us by phone or WhatsApp for now." : "Your enquiry could not be saved. Please try again or contact us on WhatsApp." }, { status: 503 });
  }
}
