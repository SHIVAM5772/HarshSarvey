import test from "node:test";
import assert from "node:assert/strict";
import { validateDocument, calculateTotals, decimal } from "../lib/business-documents.ts";

const valid = { kind: "bill", issueDate: "2026-11-12", clientName: "Test customer", items: [{ description: "Site survey", quantity: "1.25", rate: "1000.50", unit: "Acre" }], discount: "50.25", taxRate: "18", paid: "100" };
test("bill amounts use paise and consistent line, discount and tax rounding", () => {
  const doc = validateDocument(valid);
  assert.equal(doc.items[0].amountPaise, 125063);
  assert.deepEqual(calculateTotals(doc), { subtotalPaise: 125063, taxablePaise: 120038, taxPaise: 21607, totalPaise: 141645, balancePaise: 131645 });
  assert.equal(decimal("0.10", 2, 10000, "amount"), 10);
  assert.equal(validateDocument({ ...valid, kind: "quotation", paid: "999999999" }).paidPaise, 0);
});
test("document validation rejects malformed, excessive and financially invalid input", () => {
  for (const value of [null, [], { ...valid, kind: "admin" }, { ...valid, clientName: { $ne: null } }, { ...valid, issueDate: "2026-02-30" }, { ...valid, expiryDate: "2026-01-01" }, { ...valid, items: [] }, { ...valid, items: Array(51).fill(valid.items[0]) }, { ...valid, discount: "999999" }, { ...valid, paid: "999999" }, { ...valid, taxRate: "101" }, { ...valid, issuerGstin: "invalid" }, { ...valid, items: [{ ...valid.items[0], quantity: "0" }] }, { ...valid, items: [{ ...valid.items[0], rate: "1e3" }] }, { ...valid, items: [{ ...valid.items[0], rate: "1.001" }] }, { ...valid, notes: "bad\u0000text" }]) assert.throws(() => validateDocument(value));
});
test("client-supplied amounts and totals are ignored", () => {
  const doc = validateDocument({ ...valid, totals: { totalPaise: 1 }, items: [{ ...valid.items[0], amountPaise: 1 }] });
  assert.equal(doc.items[0].amountPaise, 125063);
  assert.equal(calculateTotals(doc).totalPaise, 141645);
});
