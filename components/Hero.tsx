"use client";

import React from "react";
import {
  Compass,
  Sun,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin,
  FileSpreadsheet,
  Award,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/data/surveyData";

export default function Hero({
  onOpenDossier,
  onOpenQuote,
}: {
  onOpenDossier: () => void;
  onOpenQuote: () => void;
}) {
  return (
    <section className="hero-section relative overflow-hidden bg-grid-pattern border-b border-slate-900">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="hero-grid grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="hero-copy lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-inner">
              <img src="/images/logo.png" alt="Logo" className="w-5 h-5 object-contain rounded-full" />
              <span>PRECISION ON GROUND. VISION FOR TOMORROW.</span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-title">
              Every great project<br />starts with <span>solid ground.</span>
            </h1>
            <p className="hero-description">
              Precision land surveying. Smarter infrastructure.<br className="hidden sm:block" />
              Turnkey solar solutions. One experienced partner.
            </p>
            <p className="hero-detail">
              From DGPS mapping and highway DPRs to geotechnical testing and solar EPC, we help you plan with confidence and build with clarity—across India, since 2009.
            </p>

            {/* Key Quality Assurances */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 text-left">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hemisphere DGPS & Total Stations</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certified SBC Soil Testing</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>L&T, GAIL & PMGSY Trusted</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <span>Discuss your project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDossier}
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 hover:border-amber-500/40 flex items-center gap-2 transition-all shadow-md"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                <span>Company profile</span>
              </button>

              <a
                href="/projects"
                className="px-4 py-3.5 text-slate-300 hover:text-white font-medium text-sm flex items-center gap-1.5 transition-colors"
              >
                <span>View 50+ Projects</span>
                <TrendingUp className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Direct Verification Indicator */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                15+ Yrs Industry Track Record
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                HQ: Agra, UP • Serving All India
              </span>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Dynamic Interactive Card */}
          <div className="hero-showcase lg:col-span-5 space-y-4">
            {/* Main Visual Image Card */}
            <div className="hero-image-card relative rounded-2xl overflow-hidden border border-slate-800 group">
              <img
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80"
                alt="Engineering drawings and infrastructure planning on a workstation"
                className="hero-image w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Floating Badge in Image */}
              <div className="image-label absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <img src="/images/logo.png" alt="Logo" className="w-5 h-5 object-contain rounded" />
                <span className="text-xs font-semibold text-slate-100">
                  FROM FIELD DATA TO REAL-WORLD IMPACT
                </span>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/60 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Featured Milestone
                    </span>
                    <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      L&T Power 22MW
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium">
                    Topographical & 5x5m Spot Level Contour Survey for Solar PV at Phalodi, Rajasthan.
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Client: L&T Power</span>
                    <span className="text-amber-400">Solar infrastructure survey</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dual Highlight Banners */}
            <div className="grid grid-cols-2 gap-3">
              {/* Solar Services Highlight */}
              <div className="hero-highlight p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-400">
                    <Sun className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-emerald-300">Harsh Survey Consultancy</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Turnkey Solar EPC, Geotechnical Soil Investigation & SBC load-bearing certificates.
                </p>
              </div>

              {/* Civil Surveying Highlight */}
              <div className="hero-highlight p-3.5 rounded-xl bg-gradient-to-br from-amber-950/30 to-slate-900 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-amber-300">Harsh Civil Tech</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Highways, GAIL Gas Pipelines, PMGSY DPRs & 6,500+ Ha Telecom Mapping.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Key Stats Strip */}
        <div className="hero-stats mt-14 pt-10 border-t border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {COMPANY_PROFILE.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-all text-center group"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-sm font-semibold text-amber-400 ml-1">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

