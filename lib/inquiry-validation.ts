export const INQUIRY_STATUSES = ["New", "Contacted", "Completed"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
export type InquiryInput = {
  name: string;
  phone: string;
  email: string;
  organization: string;
  service: string;
  location: string;
  message: string;
  source: "quote" | "contact";
};
export type Inquiry = InquiryInput & { id: string; createdAt: string; status: InquiryStatus };

export function isInquiryStatus(value: unknown): value is InquiryStatus {
  return INQUIRY_STATUSES.some(status => status === value);
}

export function validateInquiry(value: unknown): InquiryInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Please enter your enquiry details.");
  const input = value as Record<string, unknown>;
  const field = (key: string, limit: number, required = false) => {
    const raw = input[key];
    if (raw != null && typeof raw !== "string") throw new Error(`Invalid ${key}.`);
    const text = (typeof raw === "string" ? raw : "").trim();
    if ((required && !text) || text.length > limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)) throw new Error(`Please enter a valid ${key} (up to ${limit} characters).`);
    return text;
  };
  const name = field("name", 120, true);
  const phone = field("phone", 30, true);
  if (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 10 || phone.replace(/\D/g, "").length > 15) throw new Error("Please enter a valid phone number with 10–15 digits.");
  const email = field("email", 254);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please enter a valid email address.");
  if (input.source !== "quote" && input.source !== "contact") throw new Error("Invalid enquiry source.");
  return { name, phone, email, organization: field("organization", 180), service: field("service", 180, true), location: field("location", 240), message: field("message", 4000), source: input.source };
}
