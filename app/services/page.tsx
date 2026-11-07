"use client";

import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import QuoteModal from "@/components/QuoteModal";
import { SERVICES, ServiceItem } from "@/data/surveyData";
import {
  Mountain,
  Route,
  Sun,
  TestTubes,
  Workflow,
  Train,
  Zap,
  Building2,
  CheckCircle2,
  ArrowRight,
  Compass,
  FileCheck,
  Cpu,
} from "lucide-react";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const categories = [
    { id: "all", label: "All 8+ Spectrum Services" },
    { id: "survey", label: "Topography & DGPS" },
    { id: "infrastructure", label: "Highways, Rail & Pipelines" },
    { id: "solar", label: "Solar & Clean Energy" },
    { id: "geotech", label: "Soil Testing (SBC)" },
    { id: "utilities", label: "Urban Drainage & GIS" },
  ];

  const filteredServices = SERVICES.filter((s) => {
    if (activeTab === "all") return true;
    return s.category === activeTab;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Mountain":
        return <Mountain className="w-6 h-6 text-amber-400" />;
      case "Route":
        return <Route className="w-6 h-6 text-amber-400" />;
      case "Sun":
        return <Sun className="w-6 h-6 text-emerald-400" />;
      case "TestTubes":
        return <TestTubes className="w-6 h-6 text-emerald-400" />;
      case "Workflow":
        return <Workflow className="w-6 h-6 text-amber-400" />;
      case "Train":
        return <Train className="w-6 h-6 text-amber-400" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-amber-400" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-amber-400" />;
      default:
        return <Compass className="w-6 h-6 text-amber-400" />;
    }
  };

  const handleInquire = (title: string) => {
    setSelectedService(title);
    setQuoteOpen(true);
  };

  return (
    <div>
      <PageHeader
        badge="END-TO-END ENGINEERING SERVICES"
        title="Comprehensive Surveying, Planning & Solar Engineering"
        subtitle="Explore our full spectrum of consulting services covering dual-frequency DGPS topography, highway DPRs, cross-country pipelines, certified geotechnical SBC soil investigations, and turnkey solar installations."
        breadcrumbs={[{ label: "Services Spectrum" }]}
      />

      <div className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-6 border-b border-slate-900">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-all ${
                  activeTab === cat.id
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold scale-102"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Detailed Service Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
              >
                {/* Header Banner */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <div className="absolute top-4 left-4 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10">
                    {getServiceIcon(service.iconName)}
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-900/90 text-amber-400 border border-amber-500/30 uppercase tracking-wider backdrop-blur-md">
                      {service.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                        Deliverables & Scope
                      </span>
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer with equipment & CTA */}
                  <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                        Equipment Deployed
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.equipmentUsed.map((eq, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                          >
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleInquire(service.title)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 shrink-0 transition-all"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}

