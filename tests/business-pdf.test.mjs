import test from "node:test";
import assert from "node:assert/strict";
import { PDFDocument } from "pdf-lib";
import { generateBusinessPdf } from "../lib/business-pdf.ts";
import { ISSUER, validateDocument, calculateTotals } from "../lib/business-documents.ts";

export function sampleDocument(kind = "bill", count = 3) {
  const input = validateDocument({ kind, issueDate: "2026-11-12", expiryDate: "2026-12-12", clientName: "राम कुमार / RK Infrastructure Pvt. Ltd.", clientPhone: "9876543210", clientAddress: "Agra, Uttar Pradesh\nProject office, Deori", project: "Topographical and solar site survey", items: Array.from({ length: count }, (_, index) => ({ description: index % 2 ? "Site supervision, survey drawings and digital deliverables with site measurements" : "टोपोग्राफिकल सर्वे / Topographical survey and contour mapping", quantity: "1.250", rate: "12500.50", unit: "Acre", hsn: "9983" })), discount: "500", taxRate: "18", paid: kind === "bill" ? "5000" : "0", notes: "Survey and engineering services for the agreed site area.", terms: "Mobilization after work order confirmation.\nScope changes will be quoted separately.", bankDetails: "Payment details supplied by the company on confirmation." });
  return { ...input, id: "000000000000000000000001", number: `${kind === "bill" ? "BILL" : "QUO"}-2026-SAMPLE`, issuer: ISSUER, totals: calculateTotals(input), createdAt: "2026-11-12T06:00:00.000Z" };
}
test("bill and quotation PDF generation supports rupees, Hindi and multiple pages", async () => {
  for (const [kind, count] of [["bill", 3], ["quotation", 25]]) {
    const bytes = await generateBusinessPdf(sampleDocument(kind, count));
    assert.equal(Buffer.from(bytes).subarray(0, 5).toString(), "%PDF-");
    const pdf = await PDFDocument.load(bytes);
    assert.equal(pdf.getTitle(), `${kind === "bill" ? "Bill" : "Quotation"} ${kind === "bill" ? "BILL" : "QUO"}-2026-SAMPLE`);
    assert.ok(pdf.getPageCount() >= (count > 10 ? 2 : 1));
    assert.equal(Math.round(pdf.getPage(0).getWidth()), 595);
  }
});
