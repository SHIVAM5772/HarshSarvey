import "server-only";
import { ObjectId } from "mongodb";
import { getDatabase } from "./mongodb";
import { ISSUER, calculateTotals, type BusinessDocument, type DocumentInput } from "./business-documents";

type StoredDocument = Omit<BusinessDocument, "id" | "createdAt"> & { _id: ObjectId; createdAt: Date; createdBy: string; requestId: string };
const serialize = (doc: StoredDocument): BusinessDocument => ({
  id: doc._id.toHexString(), number: doc.number, createdAt: doc.createdAt.toISOString(), kind: doc.kind,
  issueDate: doc.issueDate, expiryDate: doc.expiryDate, clientName: doc.clientName, clientPhone: doc.clientPhone, clientEmail: doc.clientEmail,
  clientAddress: doc.clientAddress, clientGstin: doc.clientGstin, issuerGstin: doc.issuerGstin, project: doc.project, items: doc.items,
  discountPaise: doc.discountPaise, taxRateBps: doc.taxRateBps, paidPaise: doc.paidPaise, notes: doc.notes, terms: doc.terms,
  bankDetails: doc.bankDetails, totals: doc.totals, issuer: doc.issuer,
});
export async function listBusinessDocuments() {
  const docs = await (await getDatabase()).collection<StoredDocument>("billingDocuments").find({}).sort({ createdAt: -1 }).limit(50).toArray();
  return docs.map(serialize);
}
export async function findBusinessDocument(id: string) {
  if (!/^[a-f0-9]{24}$/.test(id)) return null;
  const doc = await (await getDatabase()).collection<StoredDocument>("billingDocuments").findOne({ _id: new ObjectId(id) });
  return doc ? serialize(doc) : null;
}
export async function createBusinessDocument(input: DocumentInput, createdBy: string, requestId: string) {
  const db = await getDatabase();
  const docs = db.collection<StoredDocument>("billingDocuments");
  await docs.createIndex({ number: 1 }, { unique: true });
  await docs.createIndex({ createdBy: 1, requestId: 1 }, { unique: true });
  await docs.createIndex({ createdAt: -1 });
  const existing = await docs.findOne({ createdBy, requestId });
  if (existing) return serialize(existing);
  const prefix = input.kind === "bill" ? "BILL" : "QUO";
  const year = input.issueDate.slice(0, 4);
  const counter = await db.collection<{ _id: string; sequence: number }>("documentCounters").findOneAndUpdate({ _id: `${prefix}-${year}` }, { $inc: { sequence: 1 } }, { upsert: true, returnDocument: "after" });
  if (!counter) throw new Error("Could not assign a document number.");
  const doc: StoredDocument = { ...input, _id: new ObjectId(), number: `${prefix}-${year}-${String(counter.sequence).padStart(5, "0")}`, issuer: { ...ISSUER }, totals: calculateTotals(input), createdBy, requestId, createdAt: new Date() };
  try { await docs.insertOne(doc); }
  catch (error) { const raced = await docs.findOne({ createdBy, requestId }); if (raced) return serialize(raced); throw error; }
  return serialize(doc);
}
