"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompanyBrochureModal from "@/components/CompanyBrochureModal";
import QuoteModal from "@/components/QuoteModal";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [dossierOpen, setDossierOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Navbar
        onOpenDossier={() => setDossierOpen(true)}
        onOpenQuote={() => setQuoteOpen(true)}
      />

      <main className="flex-1">{children}</main>

      <Footer
        onOpenDossier={() => setDossierOpen(true)}
        onOpenQuote={() => setQuoteOpen(true)}
      />

      <CompanyBrochureModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
      />

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />
    </div>
  );
}

