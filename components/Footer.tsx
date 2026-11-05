"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Sun,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ArrowUp,
  MessageSquare,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/data/surveyData";

export default function Footer({
  onOpenDossier,
  onOpenQuote,
}: {
  onOpenDossier: () => void;
  onOpenQuote: () => void;
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      {/* Top CTA Strip */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border-b border-slate-800/80 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Ready to Mobilize Survey Crews?
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Partner with India’s Most Trusted Survey & Solar Consultancy
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Guaranteed millimeter precision, rapid site mobilization, and dispute-free engineering documentation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuote}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get Immediate Quote</span>
            </button>

            <button
              onClick={onOpenDossier}
              className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors"
            >
              <span>Download Profile Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Compass className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-extrabold text-base text-white tracking-tight block">
                  HARSH SURVEY CONSULTANCY
                </span>
                <span className="text-[10px] text-amber-400 font-bold tracking-wider">
                  & SOLARX ENERGY SOLUTIONS
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Specialists in high-precision Topographical, DGPS, Highway DPRs, Cross-Country Pipelines, High-Voltage Transmission, and Turnkey Solar Farm Development with Geotechnical Soil SBC Testing.
            </p>

            <div className="flex items-center gap-3 text-slate-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Est. 2009 (15+ Yrs)
              </span>
              <span>•</span>
              <span className="text-amber-400">Govt. & Private Empanelled</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Firm</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">Services Spectrum</a>
              </li>
              <li>
                <a href="#solarx" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <Sun className="w-3 h-3 text-emerald-400" /> SolarX Division
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">50+ Project Record</a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-amber-400 transition-colors">Hardware Fleet</a>
              </li>
              <li>
                <a href="#team" className="hover:text-amber-400 transition-colors">Engineering Team</a>
              </li>
              <li>
                <a href="#quote-calculator" className="hover:text-amber-400 transition-colors">Cost Estimator</a>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Core Capabilities
            </h4>
            <ul className="space-y-2">
              <li className="hover:text-slate-200">DGPS & Dual-Frequency GNSS</li>
              <li className="hover:text-slate-200">Highway & PMGSY DPR Preparation</li>
              <li className="hover:text-slate-200">Solar Plant 5x5m Contouring & Layout</li>
              <li className="hover:text-slate-200">Geotechnical Soil SBC Reports</li>
              <li className="hover:text-slate-200">Gas & Fluid Pipeline Crossings (GAIL)</li>
              <li className="hover:text-slate-200">Railway Alignments & Freight Yards</li>
              <li className="hover:text-slate-200">220/400 KV Substation Topography</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Registered Head Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {COMPANY_PROFILE.headquarters.address}, {COMPANY_PROFILE.headquarters.city},{" "}
                  {COMPANY_PROFILE.headquarters.state} - {COMPANY_PROFILE.headquarters.pincode}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${COMPANY_PROFILE.contacts.managingDirector.phones[0]}`} className="hover:text-amber-400">
                  {COMPANY_PROFILE.contacts.managingDirector.phones[0]} (Ram Kumar)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${COMPANY_PROFILE.contacts.solarHead.phone}`} className="hover:text-emerald-400">
                  {COMPANY_PROFILE.contacts.solarHead.phone} (Bhupendra Singh)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a href={`mailto:${COMPANY_PROFILE.contacts.managingDirector.emails[0]}`} className="hover:text-amber-400 truncate">
                  {COMPANY_PROFILE.contacts.managingDirector.emails[0]}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Harsh Survey Consultancy & SolarX Energy Solutions. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenDossier}
              className="text-amber-400 hover:underline"
            >
              Executive Qualification Dossier
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

