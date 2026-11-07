import "server-only";
import { JWT } from "google-auth-library";
import { randomUUID } from "node:crypto";
import { type Inquiry, type InquiryInput, type InquiryStatus, isInquiryStatus } from "./inquiry-validation";

export const SHEET_HEADERS = ["ID", "Created At", "Name", "Phone", "Email", "Organization", "Service", "Location", "Message", "Status", "Source"];
export class SheetsSetupError extends Error {}

export function isSheetsConfigured() {
  return Boolean(process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);
}

let client: JWT | undefined;
function connection() {
  if (!isSheetsConfigured()) throw new SheetsSetupError("Google Sheets connection is not configured.");
  client ??= new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheet = process.env.GOOGLE_SHEET_TAB || "Inquiries";
  return { client, base: `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(process.env.GOOGLE_SHEET_ID!)}/values/`, tab: `'${sheet.replace(/'/g, "''")}'` };
}

async function readRows(): Promise<string[][]> {
  const { client, base, tab } = connection();
  const result = await client.request<{ values?: string[][] }>({ url: `${base}${encodeURIComponent(`${tab}!A:K`)}`, method: "GET", timeout: 15000 });
  const rows = result.data.values || [];
  if (rows.length && !SHEET_HEADERS.every((header, i) => rows[0][i] === header)) throw new SheetsSetupError("The Inquiries sheet headers do not match the setup guide.");
  return rows;
}

export async function listInquiries(): Promise<Inquiry[]> {
  const rows = await readRows();
  return rows.slice(1).filter(row => row[0]).map<Inquiry>(row => ({
    id: row[0], createdAt: row[1] || "", name: row[2] || "", phone: row[3] || "", email: row[4] || "",
    organization: row[5] || "", service: row[6] || "", location: row[7] || "", message: row[8] || "",
    status: isInquiryStatus(row[9]) ? row[9] : "New", source: row[10] === "contact" ? "contact" : "quote",
  })).reverse();
}

export async function saveInquiry(input: InquiryInput): Promise<string> {
  // A fixed schema prevents accidental writes into a different business sheet.
  const rows = await readRows();
  if (!rows.length) throw new SheetsSetupError("Add the header row from the setup guide before accepting enquiries.");
  const { client, base, tab } = connection();
  const id = randomUUID();
  await client.request({
    url: `${base}${encodeURIComponent(`${tab}!A:K`)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    method: "POST", timeout: 15000,
    // RAW stores customer input as text, never as spreadsheet formulas.
    data: { values: [[id, new Date().toISOString(), input.name, input.phone, input.email, input.organization, input.service, input.location, input.message, "New", input.source]] },
    retry: false,
  });
  return id;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  const rows = await readRows();
  const row = rows.findIndex((item, index) => index > 0 && item[0] === id);
  if (row < 1) return false;
  const { client, base, tab } = connection();
  await client.request({ url: `${base}${encodeURIComponent(`${tab}!J${row + 1}`)}?valueInputOption=RAW`, method: "PUT", timeout: 15000, data: { values: [[status]] }, retry: false });
  return true;
}
