export const DOCUMENT_TYPES = ["bill", "quotation"] as const;
export type DocumentKind = typeof DOCUMENT_TYPES[number];
export const ISSUER = {
  name: "Harsh Survey Consultancy",
  address: "Harsh House, Plot No: 169, VPO: Deori, Agra, Uttar Pradesh - 282009",
  phone: "+91 9411692001 / +91 7351982876",
  email: "harshsurveyconsultancy@gmail.com",
};
export type DocumentItem = { description: string; unit: string; hsn: string; quantityMilli: number; ratePaise: number; amountPaise: number };
export type DocumentInput = {
  kind: DocumentKind; issueDate: string; expiryDate: string; clientName: string; clientPhone: string; clientEmail: string;
  clientAddress: string; clientGstin: string; issuerGstin: string; project: string; items: DocumentItem[];
  discountPaise: number; taxRateBps: number; paidPaise: number; notes: string; terms: string; bankDetails: string;
};
export type DocumentTotals = { subtotalPaise: number; taxablePaise: number; taxPaise: number; totalPaise: number; balancePaise: number };
export type BusinessDocument = DocumentInput & { id: string; number: string; createdAt: string; totals: DocumentTotals; issuer: typeof ISSUER };

export function money(paise: number) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(paise / 100); }
export function decimal(raw: unknown, places: number, max: number, label: string): number {
  const text = typeof raw === "number" || typeof raw === "string" ? String(raw).trim() : "";
  if (!new RegExp(`^\\d+(?:\\.\\d{1,${places}})?$`).test(text)) throw new Error(`Enter a valid ${label} (up to ${places} decimal places).`);
  const [whole, fraction = ""] = text.split(".");
  const value = Number(whole) * 10 ** places + Number(fraction.padEnd(places, "0"));
  if (!Number.isSafeInteger(value) || value < 0 || value > max) throw new Error(`${label} is outside the allowed range.`);
  return value;
}
export function calculateTotals(doc: Pick<DocumentInput, "items" | "discountPaise" | "taxRateBps" | "paidPaise">): DocumentTotals {
  const subtotalPaise = doc.items.reduce((sum, item) => sum + item.amountPaise, 0);
  if (subtotalPaise > 100_000_000_000) throw new Error("Document total is too large.");
  if (doc.discountPaise > subtotalPaise) throw new Error("Discount cannot exceed the subtotal.");
  const taxablePaise = subtotalPaise - doc.discountPaise;
  const taxPaise = Math.round(taxablePaise * doc.taxRateBps / 10000);
  const totalPaise = taxablePaise + taxPaise;
  if (doc.paidPaise > totalPaise) throw new Error("Amount received cannot exceed the total.");
  return { subtotalPaise, taxablePaise, taxPaise, totalPaise, balancePaise: totalPaise - doc.paidPaise };
}
export function validateDocument(raw: unknown): DocumentInput {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Enter valid document details.");
  const value = raw as Record<string, unknown>;
  const text = (input: unknown, label: string, max: number, required = false): string => {
    if (input === undefined || input === "") { if (required) throw new Error(`${label} is required.`); return ""; }
    if (typeof input !== "string" || input.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(input)) throw new Error(`Enter a valid ${label}.`);
    const result = input.trim();
    if (required && !result) throw new Error(`${label} is required.`);
    return result;
  };
  const date = (input: unknown, label: string, required = false) => {
    const result = text(input, label, 10, required);
    if (result && (!/^\d{4}-\d{2}-\d{2}$/.test(result) || !Number.isFinite(Date.parse(result)) || new Date(result).toISOString().slice(0, 10) !== result || result < "2000-01-01" || result > "2199-12-31")) throw new Error(`Enter a valid ${label}.`);
    return result;
  };
  if (!DOCUMENT_TYPES.includes(value.kind as DocumentKind)) throw new Error("Choose Bill or Quotation.");
  const kind = value.kind as DocumentKind;
  const issueDate = date(value.issueDate, "document date", true);
  const expiryDate = date(value.expiryDate, kind === "bill" ? "due date" : "valid until date");
  if (expiryDate && expiryDate < issueDate) throw new Error("Due date / valid until cannot be earlier than the document date.");
  const clientEmail = text(value.clientEmail, "client email", 254);
  if (clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) throw new Error("Enter a valid client email.");
  const clientPhone = text(value.clientPhone, "phone number", 25);
  if (clientPhone && (!/^[+\d\s()-]+$/.test(clientPhone) || !/^\d{7,15}$/.test(clientPhone.replace(/\D/g, "")))) throw new Error("Enter a valid client phone number.");
  const gstin = (input: unknown, label: string) => { const result = text(input, label, 15).toUpperCase(); if (result && !/^[A-Z0-9]{15}$/.test(result)) throw new Error(`${label} must have 15 letters/numbers.`); return result; };
  if (!Array.isArray(value.items) || value.items.length < 1 || value.items.length > 50) throw new Error("Add between 1 and 50 items.");
  const items: DocumentItem[] = value.items.map((rawItem, index) => {
    if (!rawItem || typeof rawItem !== "object" || Array.isArray(rawItem)) throw new Error("Enter valid line items.");
    const item = rawItem as Record<string, unknown>;
    const quantityMilli = decimal(item.quantity, 3, 1_000_000_000, `quantity for item ${index + 1}`);
    if (!quantityMilli) throw new Error(`Quantity for item ${index + 1} must be greater than zero.`);
    const ratePaise = decimal(item.rate, 2, 1_000_000_000, `rate for item ${index + 1}`);
    const amountPaise = Math.round(quantityMilli * ratePaise / 1000);
    if (!Number.isSafeInteger(amountPaise) || amountPaise > 100_000_000_000) throw new Error("Line item amount is too large.");
    const description = text(item.description, "item description", 500, true);
    if (description.split(/\r?\n/).length > 15) throw new Error("Each item description can contain up to 15 lines.");
    return { description, unit: text(item.unit, "unit", 20), hsn: text(item.hsn, "HSN/SAC", 12), quantityMilli, ratePaise, amountPaise };
  });
  const doc: DocumentInput = {
    kind, issueDate, expiryDate, clientName: text(value.clientName, "client name", 150, true), clientPhone, clientEmail,
    clientAddress: text(value.clientAddress, "client address", 600), clientGstin: gstin(value.clientGstin, "Client GSTIN"), issuerGstin: gstin(value.issuerGstin, "Company GSTIN"),
    project: text(value.project, "project / subject", 200), items,
    discountPaise: decimal(value.discount ?? "0", 2, 100_000_000_000, "discount"), taxRateBps: decimal(value.taxRate ?? "0", 2, 10000, "tax percentage"),
    paidPaise: kind === "bill" ? decimal(value.paid ?? "0", 2, 100_000_000_000, "amount received") : 0,
    notes: text(value.notes, "notes", 2000), terms: text(value.terms, "terms", 3000), bankDetails: text(value.bankDetails, "payment details", 1000),
  };
  calculateTotals(doc);
  return doc;
}
