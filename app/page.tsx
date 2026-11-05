"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutCompany from "@/components/AboutCompany";
import ServicesSection from "@/components/ServicesSection";
import SolarXSpotlight from "@/components/SolarXSpotlight";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import EquipmentFleet from "@/components/EquipmentFleet";
import TechnicalWorkflow from "@/components/TechnicalWorkflow";
import TeamSection from "@/components/TeamSection";
import ClientsSection from "@/components/ClientsSection";
import QuoteCalculator from "@/components/QuoteCalculator";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CompanyBrochureModal from "@/components/CompanyBrochureModal";
import QuoteModal from "@/components/QuoteModal";

export default function Home() {
  const [dossierOpen, setDossierOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>();

  const handleOpenQuoteWithService = (serviceTitle: string) => {
    setSelectedServiceForQuote(serviceTitle);
    setQuoteModalOpen(true);
  };

  const handleOpenQuoteGeneral = () => {
    setSelectedServiceForQuote(undefined);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        onOpenDossier={() => setDossierOpen(true)}
        onOpenQuote={handleOpenQuoteGeneral}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenDossier={() => setDossierOpen(true)}
          onOpenQuote={handleOpenQuoteGeneral}
        />

        {/* About Company & Leadership */}
        <AboutCompany
          onOpenDossier={() => setDossierOpen(true)}
        />

        {/* Spectrum of Engineering Services */}
        <ServicesSection
          onSelectServiceForQuote={handleOpenQuoteWithService}
        />

        {/* Clean Energy & Geotechnical Soil Testing Vertical (SolarX) */}
        <SolarXSpotlight
          onOpenSolarQuote={() => handleOpenQuoteWithService("Solar Power Plant Survey & Installation")}
        />

        {/* Major Verified Projects Track Record */}
        <ProjectsShowcase />

        {/* Precision Instrumentation & CAD Suite Fleet */}
        <EquipmentFleet />

        {/* Geodesic Hierarchy & 5-Step Field Workflow */}
        <TechnicalWorkflow />

        {/* Key Technical Personnel & Survey Leaders */}
        <TeamSection />

        {/* Prestigious Clients & Partners */}
        <ClientsSection />

        {/* Interactive Survey Scope & Turnaround Estimator */}
        <QuoteCalculator
          prefilledService={selectedServiceForQuote}
        />

        {/* Contact Information & Direct Inquiry */}
        <ContactSection />
      </main>

      {/* Corporate Footer */}
      <Footer
        onOpenDossier={() => setDossierOpen(true)}
        onOpenQuote={handleOpenQuoteGeneral}
      />

      {/* Executive Printable Dossier Modal */}
      <CompanyBrochureModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
      />

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedServiceForQuote}
      />
    </div>
  );
}
