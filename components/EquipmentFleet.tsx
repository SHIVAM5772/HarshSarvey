"use client";

import React from "react";
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
} from "lucide-react";

export default function EquipmentFleet() {
  const getEquipmentIcon = (iconName: string) => {
    switch (iconName) {
      case "Satellite":
        return <Satellite className="w-5 h-5 text-amber-400" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-amber-400" />;
      case "Ruler":
        return <Ruler className="w-5 h-5 text-amber-400" />;
      case "MapPin":
        return <MapPin className="w-5 h-5 text-amber-400" />;
      case "TestTubes":
        return <TestTubes className="w-5 h-5 text-emerald-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-amber-400" />;
      case "Crosshair":
        return <Crosshair className="w-5 h-5 text-amber-400" />;
      case "Laptop":
        return <Laptop className="w-5 h-5 text-amber-400" />;
      default:
        return <Cpu className="w-5 h-5 text-amber-400" />;
    }
  };

  const softwareStack = [
    { name: "AutoCAD Civil & Map 3D", count: "4 Licenses", purpose: "Drawings, L-Section, X-Section & Alignment" },
    { name: "Global Mapper GIS Suite", count: "Licensed", purpose: "DTM Creation, Contouring & Elevation analysis" },
    { name: "Topcon TCom & Sanding Downloader", count: "4 Suites", purpose: "Electronic Total Station RAW & Coordinate extraction" },
    { name: "Leica Survey & Sokkia Link", count: "4 Suites", purpose: "Leveling data reduction & closure verification" },
    { name: "Magellan GS20 GNSS Sync", count: "2 Suites", purpose: "Handheld GPS inventory & shapefile export" },
    { name: "High-Performance HP Workstations", count: "5 Units", purpose: "Real-time CAD processing & large scale map plotting" },
  ];

  return (
    <section id="equipment" className="py-20 bg-slate-900/60 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>PRECISION HARDWARE & LICENSED SOFTWARE ASSETS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Advanced Surveying Instrumentation Fleet
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Every millimeter matters in highway corridors and solar array installations. We own and operate certified, regularly calibrated field equipment.
          </p>
        </div>

        {/* Instruments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {EQUIPMENT.map((eq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    {getEquipmentIcon(eq.icon)}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                    Qty: {eq.quantity}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {eq.name}
                  </h3>
                  <div className="text-xs text-amber-300/80 font-mono mt-0.5">
                    {eq.make} • {eq.model}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {eq.purpose}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Calibrated & Field Ready</span>
              </div>
            </div>
          ))}
        </div>

        {/* Software & Computing Infrastructure Box */}
        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Digital Data Collection & CADD Lab
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Automated Field-to-CAD Processing Pipeline
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full Licensed Softwares for Zero Discrepancy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {softwareStack.map((soft, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{soft.name}</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    {soft.count}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{soft.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

