"use client";

import React, { useState } from "react";
import {
  SERVICES,
  ServiceItem,
} from "@/data/surveyData";
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
  Sparkles,
  Layers,
} from "lucide-react";

export default function ServicesSection({
  onSelectServiceForQuote,
}: {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: "all", label: "All Spectrum Services" },
    { id: "survey", label: "Topography & DGPS" },
    { id: "infrastructure", label: "Highways, Rail & Pipelines" },
    { id: "solar", label: "Solar & Clean Energy" },
    { id: "geotech", label: "Soil Testing (SBC)" },
    { id: "utilities", label: "Urban & Drainage" },
  ];

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Mountain":
        return <Mountain className="w-6 h-6" />;
      case "Route":
        return <Route className="w-6 h-6" />;
      case "Sun":
        return <Sun className="w-6 h-6" />;
      case "TestTubes":
        return <TestTubes className="w-6 h-6" />;
      case "Workflow":
        return <Workflow className="w-6 h-6" />;
      case "Train":
        return <Train className="w-6 h-6" />;
      case "Zap":
        return <Zap className="w-6 h-6" />;
      case "Building2":
        return <Building2 className="w-6 h-6" />;
      default:
        return <Layers className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-900/60 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>END-TO-END SURVEY & ENGINEERING SOLUTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Spectrum of Engineering Services
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
              From microscopic soil core load testing to hundreds of kilometers of cross-country highway and pipeline alignments.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col overflow-hidden group shadow-lg shadow-black/30"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-amber-400">
                  {getServiceIcon(service.iconName)}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-700/50 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-3">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment tag footer & CTA */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {service.equipmentUsed.map((eq, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-all shrink-0 ml-2"
                    title={`Inquire about ${service.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

