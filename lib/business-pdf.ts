import "regenerator-runtime/runtime.js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, rgb, type PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { BusinessDocument } from "./business-documents";

const navy = rgb(.06, .11, .19), muted = rgb(.38, .44, .53), amber = rgb(.72, .39, .03), line = rgb(.86, .89, .93), white = rgb(1, 1, 1);
const cash = (value: number) => `₹ ${new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100)}`;
const date = (value: string) => value ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value)) : "";

export async function generateBusinessPdf(doc: BusinessDocument) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  pdf.setTitle(`${doc.kind === "bill" ? "Bill" : "Quotation"} ${doc.number}`);
  pdf.setAuthor(doc.issuer.name);
  pdf.setCreator("Harsh Survey Admin Workspace");
  const [regularBytes, boldBytes, hindiBytes, logoBytes] = await Promise.all([
    readFile(path.join(process.cwd(), "public/fonts/NotoSans-Regular.ttf")), readFile(path.join(process.cwd(), "public/fonts/NotoSans-Bold.ttf")),
    readFile(path.join(process.cwd(), "public/fonts/NotoSansDevanagari-Regular.ttf")), readFile(path.join(process.cwd(), "public/images/logo.png")),
  ]);
  const [regular, bold, hindi, logo] = await Promise.all([pdf.embedFont(regularBytes, { subset: true }), pdf.embedFont(boldBytes, { subset: true }), pdf.embedFont(hindiBytes, { subset: true }), logoBytes[0] === 0x89 ? pdf.embedPng(logoBytes) : pdf.embedJpg(logoBytes)]);
  const width = 595.28, height = 841.89, margin = 42, right = width - margin;
  let page = pdf.addPage([width, height]);
  let y = height - margin;
  const runs = (text: string, font: PDFFont) => (text.match(/[\u0900-\u097f\u200c\u200d]+|[^\u0900-\u097f\u200c\u200d]+/g) || []).map(value => ({ value, font: /[\u0900-\u097f]/.test(value) ? hindi : font }));
  function measure(text: string, size: number, font = regular) { return runs(text, font).reduce((sum, run) => sum + run.font.widthOfTextAtSize(run.value, size), 0); }
  function draw(text: string, x: number, baseline: number, size = 9, font = regular, color = navy) {
    for (const run of runs(text, font)) { page.drawText(run.value, { x, y: baseline, size, font: run.font, color }); x += run.font.widthOfTextAtSize(run.value, size); }
  }
  function wrap(text: string, maxWidth: number, size = 9, font = regular) {
    const result: string[] = [];
    for (const paragraph of text.split(/\r?\n/)) {
      let current = "";
      for (const word of paragraph.split(/\s+/)) {
        if (!word) continue;
        if (measure(current ? `${current} ${word}` : word, size, font) <= maxWidth) { current = current ? `${current} ${word}` : word; continue; }
        if (current) { result.push(current); current = ""; }
        if (measure(word, size, font) <= maxWidth) current = word;
        else for (const part of new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(word)) {
          if (current && measure(current + part.segment, size, font) > maxWidth) { result.push(current); current = ""; }
          current += part.segment;
        }
      }
      result.push(current);
    }
    return result;
  }
  function newPage() {
    page = pdf.addPage([width, height]); y = height - margin;
    draw(doc.issuer.name.toUpperCase(), margin, y, 10, bold);
    const label = `${doc.number} · Continued`;
    draw(label, right - measure(label, 9), y, 9, regular, muted);
    y -= 18; page.drawLine({ start: { x: margin, y }, end: { x: right, y }, thickness: .6, color: line }); y -= 24;
  }
  function ensure(space: number) { if (y - space < 64) newPage(); }
  function paragraph(label: string, value: string, keepAfter = 0) {
    if (!value) return;
    const texts = wrap(value, right - margin, 9);
    const blockHeight = 32 + texts.length * 14 + keepAfter;
    ensure(blockHeight <= 680 ? blockHeight : 44); draw(label.toUpperCase(), margin, y, 9, bold, amber); y -= 18;
    for (const text of texts) { ensure(14); draw(text, margin, y); y -= 14; }
    y -= 14;
  }

  page.drawRectangle({ x: 0, y: height - 137, width, height: 137, color: navy });
  page.drawImage(logo, { x: margin, y: height - 89, width: 48, height: 48 });
  draw(doc.issuer.name.toUpperCase(), 104, height - 53, 17, bold, white);
  let headY = height - 72;
  for (const text of wrap(doc.issuer.address, right - 104, 8.5)) { draw(text, 104, headY, 8.5, regular, rgb(.82, .87, .93)); headY -= 12; }
  draw(doc.issuer.phone, 104, headY - 2, 8.5, regular, white);
  draw(doc.issuer.email, 104, headY - 15, 8.5, regular, white);
  y = height - 166;
  draw(doc.kind === "bill" ? "BILL" : "QUOTATION", margin, y, 23, bold);
  draw(doc.number, right - measure(doc.number, 11, bold), y + 3, 11, bold, amber);
  y -= 26;
  draw(`Date: ${date(doc.issueDate)}`, margin, y, 9, regular, muted);
  if (doc.expiryDate) { const text = `${doc.kind === "bill" ? "Due date" : "Valid until"}: ${date(doc.expiryDate)}`; draw(text, right - measure(text, 9), y, 9, regular, muted); }
  y -= 26;
  page.drawLine({ start: { x: margin, y }, end: { x: right, y }, thickness: .7, color: line }); y -= 22;
  draw(doc.kind === "bill" ? "BILL TO" : "PREPARED FOR", margin, y, 8, bold, amber); y -= 18;
  for (const text of wrap(doc.clientName, right - margin, 12, bold)) { draw(text, margin, y, 12, bold); y -= 17; }
  const clientLines = [doc.clientAddress, [doc.clientPhone, doc.clientEmail].filter(Boolean).join(" | "), doc.clientGstin ? `Client GSTIN: ${doc.clientGstin}` : "", doc.issuerGstin ? `Company GSTIN: ${doc.issuerGstin}` : ""];
  for (const value of clientLines.filter(Boolean)) for (const text of wrap(value, right - margin, 9)) { ensure(14); draw(text, margin, y, 9, regular, muted); y -= 14; }
  y -= 12;
  if (doc.project) paragraph("Project / subject", doc.project);

  const columns = [margin, 68, 299, 351, 386, 465, right];
  function tableHeader() {
    ensure(36); page.drawRectangle({ x: margin, y: y - 25, width: right - margin, height: 25, color: rgb(.95, .96, .98) });
    ["#", "Description", "Qty", "Unit", "Rate (₹)", "Amount (₹)"].forEach((text, i) => draw(text, columns[i] + 6, y - 16, 8, bold));
    y -= 25;
  }
  tableHeader();
  doc.items.forEach((item, index) => {
    const descriptions = wrap(item.description, 218, 9);
    if (item.hsn) descriptions.push(`HSN/SAC: ${item.hsn}`);
    const units = wrap(item.unit || "—", 29, 8);
    const rowHeight = Math.max(32, Math.max(descriptions.length, units.length) * 13 + 12);
    if (y - rowHeight < 64) { newPage(); tableHeader(); }
    const baseline = y - 16;
    draw(String(index + 1), columns[0] + 6, baseline, 8, regular, muted);
    descriptions.forEach((text, row) => draw(text, columns[1] + 6, baseline - row * 13, 9));
    const quantity = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 3 }).format(item.quantityMilli / 1000);
    draw(quantity, columns[3] - 7 - measure(quantity, 8), baseline, 8);
    units.forEach((text, row) => draw(text, columns[3] + 5, baseline - row * 13, 8));
    const rate = cash(item.ratePaise).replace("₹ ", ""); const amount = cash(item.amountPaise).replace("₹ ", "");
    const rateSize = Math.min(8.5, 69 / Math.max(measure(rate, 1), 1));
    const amountSize = Math.min(8.5, 76 / Math.max(measure(amount, 1), 1));
    draw(rate, columns[5] - 7 - measure(rate, rateSize), baseline, rateSize);
    draw(amount, right - 7 - measure(amount, amountSize), baseline, amountSize, bold);
    y -= rowHeight; page.drawLine({ start: { x: margin, y }, end: { x: right, y }, thickness: .5, color: line });
  });
  y -= 25;
  const totals: [string, number, boolean?][] = [["Subtotal", doc.totals.subtotalPaise], ["Discount", -doc.discountPaise], [`Tax (${doc.taxRateBps / 100}%)`, doc.totals.taxPaise], ["Total", doc.totals.totalPaise, true]];
  if (doc.kind === "bill") totals.push(["Amount received", doc.paidPaise], ["Balance due", doc.totals.balancePaise, true]);
  const extras = [["Notes", doc.notes], [doc.kind === "bill" ? "Payment details" : "Payment information", doc.bankDetails], ["Terms & conditions", doc.terms]].filter(([, value]) => value);
  ensure(totals.length * 26 + 20 + (extras.length ? 0 : 70));
  for (const [label, value, emphasis] of totals) {
    if (emphasis) page.drawRectangle({ x: 305, y: y - 7, width: right - 305, height: 25, color: rgb(1, .97, .88) });
    draw(label, 315, y, 9, emphasis ? bold : regular, emphasis ? navy : muted);
    const text = cash(value); draw(text, right - 9 - measure(text, 10, emphasis ? bold : regular), y, 10, emphasis ? bold : regular);
    y -= 26;
  }
  y -= 15;
  extras.forEach(([label, value], index) => paragraph(label, value, index === extras.length - 1 ? 70 : 0));
  ensure(70); y -= 15;
  draw(`For ${doc.issuer.name}`, right - measure(`For ${doc.issuer.name}`, 9), y, 9, bold); y -= 32;
  draw("Authorized signatory", right - measure("Authorized signatory", 8), y, 8, regular, muted);

  const pages = pdf.getPages();
  pages.forEach((current, index) => {
    current.drawLine({ start: { x: margin, y: 43 }, end: { x: right, y: 43 }, thickness: .5, color: line });
    current.drawText(doc.number, { x: margin, y: 28, size: 8, font: regular, color: muted });
    const count = `Page ${index + 1} of ${pages.length}`;
    current.drawText(count, { x: right - regular.widthOfTextAtSize(count, 8), y: 28, size: 8, font: regular, color: muted });
  });
  return pdf.save();
}
