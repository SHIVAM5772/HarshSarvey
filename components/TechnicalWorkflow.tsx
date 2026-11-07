"use client";

import React from "react";
import {
  Satellite,
  Compass,
  Ruler,
  TestTubes,
  FileSpreadsheet,
  CheckCircle2,
  Workflow,
  Sparkles,
} from "lucide-react";

export default function TechnicalWorkflow() {
  const steps = [
    {
      num: "01",
      title: "Primary DGPS Geodetic Control",
      desc: "Establishment of master control points anchored to the National Datum using multi-frequency satellite GNSS observation.",
      icon: <Satellite className="w-5 h-5 text-amber-400" />,
      detail: "Hemisphere DGPS satellite observation with geodesic curvature correction.",
    },
    {
      num: "02",
      title: "Horizontal Traversing & Staking",
      desc: "Loop closure traversing using 6 Electronic Total Stations, tying secondary control into primary geodetic coordinates.",
      icon: <Compass className="w-5 h-5 text-amber-400" />,
      detail: "Topcon & Govin Total Stations with high-precision optical prisms.",
    },
    {
      num: "03",
      title: "Vertical Control & Flying Leveling",
      desc: "Fixing permanent Benchmarks (BM) and Temporary Benchmarks (TBM) along corridors with auto-level damping.",
      icon: <Ruler className="w-5 h-5 text-amber-400" />,
      detail: "Sokkia Auto Levels with dual invar/aluminum leveling staffs.",
    },
    {
      num: "04",
      title: "Geotechnical Investigation & SBC",
      desc: "Soil core sampling, Standard Penetration Tests (SPT), and Safe Bearing Capacity testing for foundation design.",
      icon: <TestTubes className="w-5 h-5 text-emerald-400" />,
      detail: "Certified laboratory SBC reports and on-site pile pull-out verification.",
    },
    {
      num: "05",
      title: "Digital Terrain Model (DTM) & CAD Delivery",
      desc: "Automated data downloading, contour vectorization, L-Section, X-Section profiling, strip plan and BOQ preparation.",
      icon: <FileSpreadsheet className="w-5 h-5 text-amber-400" />,
      detail: "Civil 3D, Global Mapper, and final submission ready for EPC execution.",
    },
  ];

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>RIGOROUS FIELD METHODOLOGY & STANDARDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How We Guarantee Millimeter Accuracy
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Every surveying project follows a strict geodesic control hierarchy to eliminate atmospheric, gravitational, and curvature distortions.
          </p>
        </div>

        {/* Step-by-step Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-extrabold text-amber-500/40 group-hover:text-amber-400 transition-colors font-mono">
                    {step.num}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/60">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                {step.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

