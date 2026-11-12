import type { Metadata } from "next";
import { getAdminSession, isAuthConfigured, isGoogleConfigured } from "@/lib/auth";
import { isSheetsConfigured, listInquiries } from "@/lib/sheets";
import type { Inquiry } from "@/lib/inquiry-validation";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin | Harsh Survey Consultancy", robots: { index: false, follow: false } };

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string; passwordChanged?: string; emailChanged?: string }> }) {
  const session = await getAdminSession();
  const params = await searchParams;
  let inquiries: Inquiry[] = [];
  let loadError = "";
  if (session && isSheetsConfigured()) {
    try { inquiries = await listInquiries(); }
    catch { loadError = "Could not read the enquiry sheet. Check its sharing permissions, tab name and header row, then refresh."; }
  }
  return <AdminDashboard
    key={session?.user?.name || "login"}
    username={session?.user?.name || null}
    email={session?.user?.email || null}
    googleReady={isGoogleConfigured()}
    passwordChanged={params.passwordChanged === "1"}
    emailChanged={params.emailChanged === "1"}
    authReady={isAuthConfigured()}
    sheetsReady={isSheetsConfigured()}
    initialInquiries={inquiries}
    initialError={loadError}
    loginError={Boolean(params.error)}
    sheetUrl={session && process.env.GOOGLE_SHEET_ID ? `https://docs.google.com/spreadsheets/d/${encodeURIComponent(process.env.GOOGLE_SHEET_ID)}/edit` : null}
  />;
}
