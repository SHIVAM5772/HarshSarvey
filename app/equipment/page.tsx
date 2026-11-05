"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import TechnicalWorkflow from "@/components/TechnicalWorkflow";
import { EQUIPMENT } from "@/data/surveyData";
import {
  Satellite,
  Compass,
  Ruler,
  MapPin,
  TestTubes,
  Layers,
  Crosshair,
  Laptop,
  Cpu,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function EquipmentPage() {
  const getEquipmentIcon = (iconName: string) => {
    switch (iconName) {
      case "Satellite":
        return <Satellite className="w-6 h-6 text-amber-400" />;
      case "Compass":
        return <Compass className="w-6 h-6 text-amber-400" />;
      case "Ruler":
        return <Ruler className="w-6 h-6 text-amber-400" />;
      case "MapPin":
        return <MapPin className="w-6 h-6 text-amber-400" />;
      case "TestTubes":
        return <TestTubes className="w-6 h-6 text-emerald-400" />;
      case "Layers":
        return <Layers className="w-6 h-6 text-amber-400" />;
      case "Crosshair":
        return <Crosshair className="w-6 h-6 text-amber-400" />;
      case "Laptop":
        return <Laptop className="w-6 h-6 text-amber-400" />;
      default:
        return <Cpu className="w-6 h-6 text-amber-400" />;
    }
  };

  const softwareStack = [
    { name: "AutoCAD Civil 3D & Map 3D", count: "4 Workstations", desc: "Detailed highway alignments, profile grading, cross-sections, and PMGSY strip plans." },
    { name: "Global Mapper GIS Suite", count: "Licensed Seat", desc: "Digital Terrain Models (DTM), satellite imagery georeferencing, and 3D elevation contour analysis." },
    { name: "Topcon TCom & Sanding Tool", count: "4 Dedicated Suites", desc: "Direct coordinate downloading, raw angle data extraction, and traversing loop closure." },
    { name: "Leica Survey & Sokkia Link", count: "4 Dedicated Suites", desc: "Digital level staff reduction, BM/TBM vertical control verification, and flying leveling adjustments." },
    { name: "Magellan GS20 GNSS Sync", count: "2 Field Laptops", desc: "Handheld GPS inventory data capture, geotagging, and GIS shapefile integration." },
    { name: "HP Workstations & Laser Plotters", count: "5 Full Units", desc: "High-throughput CAD computation, large-format strip plan printing, and report compilation." },
  ];

  return (
    <div>
      <PageHeader
        badge="OWNED FIELD HARDWARE & SOFTWARE"
        title="Precision Survey Instruments & Technology Fleet"
        subtitle="We maintain an extensive, company-owned inventory of calibrated dual-frequency DGPS, electronic Total Stations, and licensed CAD processing suites to ensure zero reliance on third-party rentals."
        breadcrumbs={[{ label: "Equipment Fleet" }]}
      />

      <div className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Main Hardware Grid */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Physical Field Assets
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Precision Survey Instrumentation
                </h2>
              </div>
              <span className="text-xs text-slate-400 hidden sm:block">
                All units regularly tested & calibrated for field readiness
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {EQUIPMENT.map((eq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-110 transition-transform">
                        {getEquipmentIcon(eq.icon)}
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        Qty: {eq.quantity}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                        {eq.name}
                      </h3>
                      <div className="text-xs text-amber-300/90 font-mono mt-1">
                        {eq.make} • {eq.model}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {eq.purpose}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Calibrated & Active Fleet</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Software Lab & CADD Suite */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Computational Processing Hub
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  Licensed CAD, GIS & Data Reduction Software
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Discrepancy Field-to-Model Pipeline</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {softwareStack.map((soft, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{soft.name}</h4>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                      {soft.count}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{soft.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Geodesic Methodology Workflow */}
          <TechnicalWorkflow />
        </div>
      </div>
    </div>
  );
}

