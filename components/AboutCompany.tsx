"use client";

import React from "react";
import {
  Compass,
  CheckCircle,
  ShieldCheck,
  Award,
  Layers,
  MapPin,
  Building,
  Cpu,
  Sun,
  Flame,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/data/surveyData";

export default function AboutCompany({
  onOpenDossier,
}: {
  onOpenDossier: () => void;
}) {
  const coreValues = [
    {
      title: "Geodesic Accuracy & Trust",
      desc: "Earth curvature factoring, dual-frequency DGPS control, and closed traversing with zero margin for error.",
    },
    {
      title: "Certified Geotechnical Safety",
      desc: "Full-scale borehole sampling, SBC report validation, and pile load pull-out testing for long-term structural integrity.",
    },
    {
      title: "Clean Energy Acceleration",
      desc: "End-to-end solar farm layout optimization, shadow modeling, and rapid commissioning through Harsh Survey Consultancy.",
    },
    {
      title: "Rigorous Govt. Standards",
      desc: "Strict compliance with IRC, PMGSY, MoRTH, UP Jal Nigam, and Central CEA standards.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-950 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>ESTABLISHED 2009 • AGRA, UTTAR PRADESH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Harsh Survey Consultancy
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            A premier engineering consultancy delivering high-accuracy spatial intelligence,
            highway engineering DPRs, cross-country pipeline surveys, and sustainable clean energy solutions across India.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Synergy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Founded by <strong className="text-white">Ram Kumar (Managing Director)</strong> in 2009,{" "}
                <span className="text-amber-400 font-semibold">HARSH SURVEY CONSULTANCY</span> has spent over a decade and a half delivering mission-critical surveying and planning services for Central Government bodies, State Public Works, Railways, and Fortune-500 private infrastructure developers.
              </p>
              <p>
                Our staff and associates comprise certified specialists across Civil Engineering, Telecom, High-Voltage Transmission Lines, Gas Pipeline Authorities, and Municipal Bodies. We deploy state-of-the-art dual-frequency{" "}
                <strong className="text-white font-medium">Hemisphere DGPS</strong>, a fleet of 6{" "}
                <strong className="text-white font-medium">Topcon & Govin Electronic Total Stations</strong>, and Sokkia Auto Levels to establish permanent Benchmarks (BM) and millimeter-accurate Digital Terrain Models (DTM).
              </p>
              <p className="p-4 rounded-xl bg-slate-900/80 border-l-4 border-emerald-500 text-slate-200">
                <strong className="text-emerald-400 font-bold block mb-1">
                  Solar Engineering — Complete Ground to Grid Delivery:
                </strong>
                Recognizing the rapid expansion of renewable energy across India,{" "}
                <span className="text-white font-semibold">Harsh Survey Consultancy</span> provides end-to-end solar site development — from 5x5m topographical contouring and geotechnical Safe Bearing Capacity (SBC) soil testing to solar plant installation and commissioning.
              </p>
            </div>

            {/* Core Values 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all space-y-1"
                >
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{val.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal pl-6">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenDossier}
                className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-amber-500/20"
              >
                <Award className="w-4 h-4" />
                <span>Read Full Company Profile</span>
              </button>
              <a
                href="#services"
                className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>View All 8+ Spectrum Services</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Infographic Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">Consultancy Footprint</h3>
                  <p className="text-xs text-slate-400">Headquartered in Agra • Operating Pan-India</p>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Compass className="w-6 h-6" />
                </div>
              </div>

              {/* Quick Spec List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Incorporation</span>
                  <span className="text-white font-semibold">2009 (15+ Years Active)</span>
                </div>
                <div className="flex items-start justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Promoter & MD</span>
                  <span className="text-amber-400 font-semibold">Ram Kumar (Civil Engg)</span>
                </div>
                <div className="flex items-start justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Solar Services</span>
                  <span className="text-emerald-400 font-semibold">Harsh Survey Consultancy</span>
                </div>
                <div className="flex items-start justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Survey Instruments</span>
                  <span className="text-white font-semibold">18+ Precision Field Units</span>
                </div>
                <div className="flex items-start justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Key Govt. Sectors</span>
                  <span className="text-white font-semibold text-right">
                    Highways, PMGSY, Railways, Jal Nigam, PGCIL
                  </span>
                </div>
                <div className="flex items-start justify-between py-1.5">
                  <span className="text-slate-400">Private Sector EPC</span>
                  <span className="text-white font-semibold text-right">
                    L&T Power, Sterling & Wilson, GAIL, HFCL
                  </span>
                </div>
              </div>

              {/* Head Office Address Box */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Head Office Registered Location</span>
                </div>
                <p className="text-slate-300">
                  {COMPANY_PROFILE.headquarters.address}, {COMPANY_PROFILE.headquarters.city},{" "}
                  {COMPANY_PROFILE.headquarters.state} - {COMPANY_PROFILE.headquarters.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

