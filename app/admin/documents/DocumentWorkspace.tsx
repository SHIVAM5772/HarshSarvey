"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Download, FilePlus2, FileText, Plus, Receipt, Save, Trash2 } from "lucide-react";
import { ISSUER, calculateTotals, decimal, money, validateDocument, type BusinessDocument, type DocumentKind } from "@/lib/business-documents";
import styles from "../admin.module.css";

type Item = { key: number; description: string; quantity: string; rate: string; unit: string; hsn: string };
const emptyItem = (key: number): Item => ({ key, description: "", quantity: "1", rate: "0", unit: "Service", hsn: "" });
function itemAmount(item: Item) {
  try { return money(Math.round(decimal(item.quantity, 3, 1_000_000_000, "quantity") * decimal(item.rate, 2, 1_000_000_000, "rate") / 1000)); }
  catch { return "—"; }
}
function today() { return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
export default function DocumentWorkspace({ initialKind, initialDocuments, initialError }: { initialKind: DocumentKind; initialDocuments: BusinessDocument[]; initialError: string }) {
  const [kind, setKind] = useState(initialKind);
  const [items, setItems] = useState<Item[]>([emptyItem(0)]);
  const [discount, setDiscount] = useState("0");
  const [taxRate, setTaxRate] = useState("0");
  const [paid, setPaid] = useState("0");
  const [documents, setDocuments] = useState(initialDocuments);
  const [saved, setSaved] = useState<BusinessDocument | null>(null);
  const [busy, setBusy] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState(initialError);
  const [notice, setNotice] = useState("");
  const [requestId, setRequestId] = useState("");
  const [formVersion, setFormVersion] = useState(0);
  const [historyKind, setHistoryKind] = useState("all");
  const label = kind === "bill" ? "Bill" : "Quotation";
  let preview = null;
  try {
    const input = validateDocument({ kind, issueDate: today(), clientName: "Preview", items: items.map(item => ({ ...item, description: item.description || "Service" })), discount, taxRate, paid });
    preview = calculateTotals(input);
  } catch { /* Incomplete entries are validated when saving. */ }
  function update(key: number, field: keyof Omit<Item, "key">, value: string) { setItems(rows => rows.map(row => row.key === key ? { ...row, [field]: value } : row)); }
  function start(nextKind: DocumentKind) {
    setKind(nextKind); setItems([emptyItem(0)]); setDiscount("0"); setTaxRate("0"); setPaid("0"); setSaved(null); setError(""); setNotice(""); setRequestId(""); setFormVersion(value => value + 1);
  }
  async function download(doc: BusinessDocument) {
    setDownloading(doc.id); setError("");
    try {
      const response = await fetch(`/api/admin/documents/${doc.id}/pdf`, { cache: "no-store" });
      if (!response.ok) { const result = await response.json(); throw new Error(result.error || "Could not download PDF."); }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${doc.number}.pdf`; document.body.appendChild(anchor); anchor.click(); anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not download PDF."); }
    finally { setDownloading(null); }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    const data = { ...Object.fromEntries(new FormData(event.currentTarget)), kind, items: items.map(item => ({ description: item.description, quantity: item.quantity, rate: item.rate, unit: item.unit, hsn: item.hsn })), discount, taxRate, paid };
    try { validateDocument(data); } catch (reason) { setError(reason instanceof Error ? reason.message : "Check the document details."); return; }
    const saveId = requestId || crypto.randomUUID(); setRequestId(saveId); setBusy(true);
    const downloadAfterSave = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "download";
    try {
      const response = await fetch("/api/admin/documents", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, requestId: saveId }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save the document.");
      setSaved(result.document); setDocuments(rows => [result.document, ...rows.filter(row => row.id !== result.document.id)].slice(0, 50));
      setNotice(`${result.document.number} saved. You can download it again from saved documents.`);
      if (downloadAfterSave) await download(result.document);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Please try again."); }
    finally { setBusy(false); }
  }
  return <section className={styles.page}><div className={styles.container}>
    <div className={styles.heading}><div><span className={styles.eyebrow}>ADMIN WORKSPACE</span><h1>Bills & quotations</h1><p>Create client documents, save them securely and download a clean PDF.</p></div><Link className={styles.secondaryButton} href="/admin"><ArrowLeft size={15} />Admin workspace</Link></div>
    <div className={styles.documentTabs} role="group" aria-label="Document type"><button type="button" aria-pressed={kind === "bill"} className={kind === "bill" ? styles.activeDocTab : ""} disabled={busy} onClick={() => { if (kind !== "bill") { if (saved) start("bill"); else setKind("bill"); } }}><Receipt size={18} />Create bill</button><button type="button" aria-pressed={kind === "quotation"} className={kind === "quotation" ? styles.activeDocTab : ""} disabled={busy} onClick={() => { if (kind !== "quotation") { if (saved) start("quotation"); else setKind("quotation"); } }}><FileText size={18} />Create quotation</button></div>
    {error && <p role="alert" className={`${styles.error} ${styles.documentMessage}`}>{error}</p>}
    {notice && <p role="status" className={styles.profileSuccess}>{notice}</p>}
    {saved ? <div className={`${styles.profileCard} ${styles.savedDocument}`}><span className={styles.securityIcon}><FileText size={27} /></span><div><h2>{saved.number}</h2><p>{saved.clientName} · {money(saved.totals.totalPaise)}</p><small>{saved.kind === "bill" ? `Balance due: ${money(saved.totals.balancePaise)}` : "Quotation saved"}</small></div><button className={styles.primaryButton} type="button" disabled={Boolean(downloading)} onClick={() => download(saved)}><Download size={16} />{downloading === saved.id ? "Preparing…" : "Download PDF"}</button><button className={styles.secondaryButton} type="button" onClick={() => start(kind)}><FilePlus2 size={16} />Create another</button></div> : <form key={formVersion} className={`${styles.loginForm} ${styles.documentForm}`} onSubmit={submit}><fieldset className={styles.profileFields} disabled={busy}>
      <div className={styles.documentFormGrid}><div className={styles.profileCard}>
        <div className={styles.cardHeading}><div><h2>{label} details</h2><p>A document number is assigned automatically when saved.</p></div></div>
        <div className={styles.personalFields}><label htmlFor="document-date">Document date<input id="document-date" name="issueDate" type="date" defaultValue={today()} required /></label><label htmlFor="document-expiry">{kind === "bill" ? "Due date (optional)" : "Valid until (optional)"}<input id="document-expiry" name="expiryDate" type="date" /></label><label className={styles.fullWidth} htmlFor="document-project">Project / subject<input id="document-project" name="project" maxLength={200} placeholder="e.g. Topographical survey at Agra site" /></label></div>
      </div><div className={styles.profileCard}><h2>From</h2><p className={styles.documentIssuer}><strong>{ISSUER.name}</strong><br />{ISSUER.address}<br />{ISSUER.phone}<br />{ISSUER.email}</p><label htmlFor="issuer-gstin">Company GSTIN (optional)<input id="issuer-gstin" name="issuerGstin" maxLength={15} /></label></div></div>
      <div className={styles.profileCard}><div className={styles.cardHeading}><div><h2>Client details</h2><p>Enter the customer or organization receiving this {kind}.</p></div></div><div className={styles.personalFields}>
        <label htmlFor="client-name">Client / company name<input id="client-name" name="clientName" autoComplete="organization" required maxLength={150} /></label><label htmlFor="client-phone">Phone number<input id="client-phone" name="clientPhone" type="tel" maxLength={25} /></label>
        <label htmlFor="client-email">Email address<input id="client-email" name="clientEmail" type="email" maxLength={254} /></label><label htmlFor="client-gstin">Client GSTIN (optional)<input id="client-gstin" name="clientGstin" maxLength={15} /></label><label className={styles.fullWidth} htmlFor="client-address">Client address<textarea id="client-address" name="clientAddress" rows={2} maxLength={600} /></label>
      </div></div>
      <div className={styles.profileCard}><div className={styles.cardHeading}><div><h2>Services & items</h2><p>Amounts are in INR. Add up to 50 items.</p></div><button className={styles.secondaryButton} type="button" disabled={items.length >= 50} onClick={() => setItems(rows => [...rows, emptyItem(Math.max(...rows.map(row => row.key)) + 1)])}><Plus size={15} />Add item</button></div>
        <div className={styles.billingItems}>{items.map((item, index) => <div className={styles.billingItem} key={item.key}><div className={styles.lineItemTitle}><strong>Item {index + 1}</strong><button type="button" className={styles.iconButton} disabled={items.length === 1} onClick={() => setItems(rows => rows.filter(row => row.key !== item.key))} aria-label={`Remove item ${index + 1}`}><Trash2 size={15} /></button></div><div className={styles.itemFields}>
          <label className={styles.itemDescription} htmlFor={`description-${item.key}`}>Description<textarea id={`description-${item.key}`} value={item.description} onChange={event => update(item.key, "description", event.target.value)} required maxLength={500} rows={2} placeholder="Service description / scope of work" /></label>
          <label htmlFor={`quantity-${item.key}`}>Quantity<input id={`quantity-${item.key}`} type="number" min="0.001" max="1000000" step="0.001" required value={item.quantity} onChange={event => update(item.key, "quantity", event.target.value)} /></label>
          <label htmlFor={`unit-${item.key}`}>Unit<input id={`unit-${item.key}`} value={item.unit} maxLength={20} onChange={event => update(item.key, "unit", event.target.value)} placeholder="Day / Acre / Service" /></label>
          <label htmlFor={`rate-${item.key}`}>Rate (₹)<input id={`rate-${item.key}`} type="number" min="0" max="10000000" step="0.01" required value={item.rate} onChange={event => update(item.key, "rate", event.target.value)} /></label>
          <label htmlFor={`hsn-${item.key}`}>HSN/SAC (optional)<input id={`hsn-${item.key}`} value={item.hsn} maxLength={12} onChange={event => update(item.key, "hsn", event.target.value)} /></label>
          <div className={styles.itemAmount}><small>Amount</small><strong>{itemAmount(item)}</strong></div>
        </div></div>)}</div>
      </div>
      <div className={styles.documentFormGrid}><div className={`${styles.profileCard} ${styles.documentExtra}`}><h2>Additional information</h2><label htmlFor="document-notes">Notes<textarea id="document-notes" name="notes" rows={3} maxLength={2000} placeholder="Project notes, references or scope clarification" /></label><label htmlFor="document-terms">Terms & conditions<textarea id="document-terms" name="terms" rows={3} maxLength={3000} placeholder="Payment schedule, delivery timeline, exclusions…" /></label><label htmlFor="document-bank">Payment / bank details (optional)<textarea id="document-bank" name="bankDetails" rows={3} maxLength={1000} placeholder="Account name, bank, account number, IFSC or UPI" /></label></div>
      <div className={`${styles.profileCard} ${styles.documentExtra}`}><h2>Amount summary</h2><label htmlFor="document-discount">Discount (₹)<input id="document-discount" type="number" min="0" step="0.01" required value={discount} onChange={event => setDiscount(event.target.value)} /></label><label htmlFor="document-tax">Tax (%)<input id="document-tax" type="number" min="0" max="100" step="0.01" required value={taxRate} onChange={event => setTaxRate(event.target.value)} /></label>{kind === "bill" && <label htmlFor="document-paid">Amount received (₹)<input id="document-paid" type="number" min="0" step="0.01" required value={paid} onChange={event => setPaid(event.target.value)} /></label>}
        <dl className={styles.amountSummary}><div><dt>Subtotal</dt><dd>{preview ? money(preview.subtotalPaise) : "—"}</dd></div><div><dt>Discount</dt><dd>{preview ? money(Math.round(Number(discount) * 100)) : "—"}</dd></div><div><dt>Tax</dt><dd>{preview ? money(preview.taxPaise) : "—"}</dd></div><div className={styles.grandTotal}><dt>Total</dt><dd>{preview ? money(preview.totalPaise) : "—"}</dd></div>{kind === "bill" && <div><dt>Balance due</dt><dd>{preview ? money(preview.balancePaise) : "—"}</dd></div>}</dl>
        {!preview && <p className={styles.fieldHint}>Enter valid quantities and rates. Discount and amount received cannot exceed the total.</p>}
        <button type="submit" value="download" className={styles.primaryButton}><Download size={16} />{busy ? "Saving…" : "Save & download PDF"}</button><button type="submit" value="save" className={styles.secondaryButton}><Save size={16} />Save {kind}</button>
      </div></div>
    </fieldset></form>}
    <div className={`${styles.panel} ${styles.documentHistory}`}><div className={styles.toolbar}><div><h2>Saved documents</h2><p>Most recent 50 bills and quotations. Open any PDF to download it again.</p></div><select className={styles.historySelect} value={historyKind} onChange={event => setHistoryKind(event.target.value)} aria-label="Filter saved documents"><option value="all">All documents</option><option value="bill">Bills</option><option value="quotation">Quotations</option></select></div>
      {!documents.filter(doc => historyKind === "all" || doc.kind === historyKind).length ? <div className={styles.empty}><FileText size={30} /><h3>No saved documents yet</h3><p>Create a bill or quotation using the form above.</p></div> : <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Document</th><th>Client</th><th>Date</th><th>Total</th><th>PDF</th></tr></thead><tbody>{documents.filter(doc => historyKind === "all" || doc.kind === historyKind).map(doc => <tr key={doc.id}><td><strong>{doc.number}</strong><span>{doc.kind === "bill" ? "Bill" : "Quotation"}</span></td><td><strong>{doc.clientName}</strong><span>{doc.project}</span></td><td>{doc.issueDate}</td><td><strong>{money(doc.totals.totalPaise)}</strong>{doc.kind === "bill" && <span>Due: {money(doc.totals.balancePaise)}</span>}</td><td><button className={styles.secondaryButton} type="button" disabled={Boolean(downloading)} onClick={() => download(doc)}><Download size={14} />{downloading === doc.id ? "Preparing…" : "Download PDF"}</button></td></tr>)}</tbody></table></div>}
    </div>
  </div></section>;
}
