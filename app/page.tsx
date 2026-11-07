"use client";

import React, { useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import AboutCompany from "@/components/AboutCompany";
import SolarSpotlight from "@/components/SolarSpotlight";
import TechnicalWorkflow from "@/components/TechnicalWorkflow";
import QuoteCalculator from "@/components/QuoteCalculator";
import ClientsSection from "@/components/ClientsSection";
import CompanyBrochureModal from "@/components/CompanyBrochureModal";
import QuoteModal from "@/components/QuoteModal";
import { SERVICES, PROJECTS } from "@/data/surveyData";
import {
  ArrowRight,
  Compass,
  Sun,
  TestTubes,
  Route,
  Mountain,
  Train,
  Zap,
  Building2,
  Workflow,
  Sparkles,
  MapPin,
} from "lucide-react";

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

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Mountain":
        return <Mountain className="w-5 h-5 text-amber-400" />;
      case "Route":
        return <Route className="w-5 h-5 text-amber-400" />;
      case "Sun":
        return <Sun className="w-5 h-5 text-emerald-400" />;
      case "TestTubes":
        return <TestTubes className="w-5 h-5 text-emerald-400" />;
      case "Workflow":
        return <Workflow className="w-5 h-5 text-amber-400" />;
      case "Train":
        return <Train className="w-5 h-5 text-amber-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-amber-400" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-amber-400" />;
      default:
        return <Compass className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        onOpenDossier={() => setDossierOpen(true)}
        onOpenQuote={handleOpenQuoteGeneral}
      />

      {/* About Company Summary */}
      <AboutCompany
        onOpenDossier={() => setDossierOpen(true)}
      />

      {/* Services Spectrum Showcase */}
      <section className="py-20 bg-slate-900/60 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CONSULTING CAPABILITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Spectrum of Engineering Services
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
                Precision surveying solutions tailored for infrastructure contractors, national highway developers, and renewable energy EPCs.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 py-2 transition-colors shrink-0"
            >
              <span>View Full Details & Deliverables</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className="rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all p-6 flex flex-col justify-between space-y-4 group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 w-fit group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                    {service.category}
                  </span>
                  <button
                    onClick={() => handleOpenQuoteWithService(service.title)}
                    className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/services"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <span>Explore All 8+ Spectrum Services</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Solar & Clean Energy Spotlight */}
      <SolarSpotlight
        onOpenSolarQuote={() => handleOpenQuoteWithService("Solar Power Plant Survey & Installation")}
      />

      {/* Featured Projects Highlight */}
      <section className="py-20 bg-slate-950 border-b border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
                <Workflow className="w-3.5 h-3.5" />
                <span>PROVEN TRACK RECORD</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Landmark Projects
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
                Delivering high-accuracy surveys to L&T Power, GAIL, PMGSY, and Power Grid Corporation of India Ltd.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 py-2 transition-colors shrink-0"
            >
              <span>Browse All 50+ Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.slice(0, 6).map((proj) => (
              <div
                key={proj.id}
                className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/90 text-amber-400 border border-amber-500/30 uppercase tracking-wider backdrop-blur-md">
                      {proj.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      {proj.metric}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-xs text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="line-clamp-1">{proj.location}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      {proj.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {proj.scope}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300 truncate max-w-[180px]">
                      {proj.client}
                    </span>
                    <span>{proj.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>View Complete 50+ Project Database</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5-Step Geodesic Workflow */}
      <TechnicalWorkflow />

      {/* Clients & PSUs Banner */}
      <ClientsSection />

      {/* Interactive Scope & Turnaround Estimator */}
      <QuoteCalculator
        prefilledService={selectedServiceForQuote}
      />

      {/* Modals */}
      <CompanyBrochureModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
      />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedServiceForQuote}
      />
    </>
  );
}
