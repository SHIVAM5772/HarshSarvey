import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { listBusinessDocuments } from "@/lib/document-store";
import type { BusinessDocument } from "@/lib/business-documents";
import DocumentWorkspace from "./DocumentWorkspace";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Bills & Quotations | Harsh Survey", robots: { index: false, follow: false } };
export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  if (!await getAdminSession()) redirect("/admin");
  const { kind } = await searchParams;
  let documents: BusinessDocument[] = [], error = "";
  try { documents = await listBusinessDocuments(); } catch { error = "Could not load saved documents. Please refresh to try again."; }
  return <DocumentWorkspace initialKind={kind === "quotation" ? "quotation" : "bill"} initialDocuments={documents} initialError={error} />;
}
