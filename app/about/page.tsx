"use client";

import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import CompanyBrochureModal from "@/components/CompanyBrochureModal";
import QuoteModal from "@/components/QuoteModal";
import {
  Compass,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sun,
  MapPin,
  Building,
  Target,
  Eye,
  FileText,
  Phone,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/data/surveyData";
import Link from "next/link";

export default function AboutPage() {
  const [dossierOpen, setDossierOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const milestones = [
    { year: "2009", title: "Foundation in Agra", desc: "Established by Ram Kumar (Civil Engineer) with a vision for millimeter-precision surveying in North India." },
    { year: "2010", title: "Telecom & Urban Infrastructure", desc: "Awarded massive 6,500 Hectares survey across Punjab by HFCL Infotech & Greater Mohali for GAMADA." },
    { year: "2012-13", title: "Solar & Oil Pipelines", desc: "Executed landmark 22MW Phalodi Solar project for L&T Power and 70 KM GAIL gas pipeline route survey." },
    { year: "2015-18", title: "National Highways & Railways", desc: "Expanded into PMGSY DPRs, Patiala-Yamunanagar 100km SH-06, and Manesar-Patli / Kandla Port Rail corridors." },
    { year: "Present", title: "Solar & Clean Energy Vertical", desc: "Strategic expansion into certified Geotechnical Soil Testing (SBC) and turnkey Solar EPC installation by Harsh Survey Consultancy." },
  ];

  return (
    <div>
      <PageHeader
        badge="ABOUT OUR CONSULTANCY"
        title="15+ Years of Precision Surveying & Solar Engineering"
        subtitle="Harsh Survey Consultancy has been a trusted partner to Central Ministries, State Authorities, and Fortune-500 developers across India since 2009."
        breadcrumbs={[{ label: "About Us" }]}
      />

      <div className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Main Story & Leadership Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                <Building className="w-3.5 h-3.5" />
                <span>ESTABLISHED 2009 • AGRA, UTTAR PRADESH</span>
              </div>

              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Engineering Integrity Built on Uncompromising Accuracy
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Founded by <strong className="text-white">Ram Kumar (Managing Director)</strong>, Harsh Survey Consultancy was established to bridge the gap between theoretical civil engineering design and high-precision ground reality.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Over the past 15 years, our technical teams have traversed more than <strong className="text-amber-400">1,500 KM of highway corridors</strong>, conducted cadastral mapping across <strong className="text-amber-400">7,500+ Hectares</strong> of urban and telecom infrastructure, and established permanent geodetic control networks anchored to the National Datum.
              </p>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 text-slate-300 text-sm space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Sun className="w-4 h-4" />
                  <span>Solar Engineering at Harsh Survey Consultancy</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Alongside our surveying services, <strong>Harsh Survey Consultancy</strong> provides turnkey solar capabilities: starting from high-density 5x5m spot level topography and geotechnical Soil Testing (certified SBC reports) to structural pile pull-out tests and complete solar farm commissioning.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setDossierOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Official PDF Dossier</span>
                </button>

                <button
                  onClick={() => setQuoteOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Request Corporate Consultation</span>
                </button>
              </div>
            </div>

            {/* Right Card: Fact Sheet */}
            <div className="lg:col-span-5 bg-slate-900/70 p-7 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Corporate Identity</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  Est. 2009
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Legal Entity</span>
                  <span className="text-white font-semibold">Harsh Survey Consultancy</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Managing Director</span>
                  <span className="text-amber-400 font-semibold">Ram Kumar (Civil Engg)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Solar Services</span>
                  <span className="text-emerald-400 font-semibold">Harsh Survey Consultancy</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Head Office</span>
                  <span className="text-white font-semibold text-right">Agra, Uttar Pradesh</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Operational Reach</span>
                  <span className="text-white font-semibold text-right">Pan-India (UP, RJ, MP, UK, PB, HR, MH)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Precision Standards</span>
                  <span className="text-amber-400 font-semibold">DGPS & Geodetic Network</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Registered Location</span>
                </div>
                <p className="text-slate-300">
                  {COMPANY_PROFILE.headquarters.address}, {COMPANY_PROFILE.headquarters.city},{" "}
                  {COMPANY_PROFILE.headquarters.state} - {COMPANY_PROFILE.headquarters.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 w-fit">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Engineering Mission</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To deliver flawless spatial intelligence, geodesic accuracy, and certified geotechnical reports that empower civil infrastructure and renewable energy developers to execute projects without time or cost overruns.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Long-Term Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To stand as India’s foremost integrated surveying and solar land engineering consultancy, uniting cutting-edge satellite GNSS technology with sustainable clean energy infrastructure for a self-reliant India.
              </p>
            </div>
          </div>

          {/* Chronological Milestones */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Milestones & Evolution
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Our Journey of Nation-Building
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {m.year}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] text-amber-500/70 font-semibold uppercase tracking-wider">
                    Phase {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links to Explore */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-white">Explore More About Harsh Survey Consultancy</h4>
              <p className="text-xs text-slate-400 mt-1">Review our equipment fleet or inspect our 50+ major project track record.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/services"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
              >
                Services Spectrum
              </Link>
              <Link
                href="/projects"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20"
              >
                View 50+ Projects
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CompanyBrochureModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
      />

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />
    </div>
  );
}

