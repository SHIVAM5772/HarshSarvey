import type { InquiryInput } from "./inquiry-validation";

export async function submitInquiry(input: InquiryInput): Promise<string> {
  const response = await fetch("/api/inquiries", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Could not save your enquiry. Please try again.");
  return result.id;
}
