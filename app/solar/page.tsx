"use client";

import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import QuoteModal from "@/components/QuoteModal";
import {
  Sun,
  TestTubes,
  Compass,
  Zap,
  CheckCircle,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Quote,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/data/surveyData";

export default function SolarPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  const solarPillars = [
    {
      title: "Solar Land Surveying & DTM",
      desc: "Dual-frequency Hemisphere DGPS & Total Station spot leveling on high-density 5x5m grids. Complete slope gradient analysis, natural water channel mapping, and cut/fill earthwork balancing.",
      icon: <Compass className="w-6 h-6 text-amber-400" />,
      specs: ["5x5m & 10x10m Spot Levels", "DTM Contour Modeling", "Shadow Obstruction Mapping"],
    },
    {
      title: "Certified Geotechnical Soil Testing (SBC)",
      desc: "Comprehensive geotechnical investigation to establish Safe Bearing Capacity (SBC). Core borehole drilling, Standard Penetration Tests (SPT), and certified laboratory analysis.",
      icon: <TestTubes className="w-6 h-6 text-emerald-400" />,
      specs: ["BIS Certified SBC Reports", "Core Drilling to Refusal", "Triaxial & Direct Shear Tests"],
    },
    {
      title: "MMS Pile Pull-Out & Load Testing",
      desc: "On-site vertical pull-out, lateral deflection, and compression testing on driven/cast-in-situ piles to guarantee module mounting structure (MMS) stability under extreme storm winds.",
      icon: <ShieldCheck className="w-6 h-6 text-yellow-400" />,
      specs: ["Hydraulic Tensile Pull-Out", "Lateral Deflection Verification", "Wind Uplift Safety Factor"],
    },
    {
      title: "Turnkey EPC & Installation",
      desc: "Complete civil and electrical execution: MMS table erection, PV module installation, inverter station construction, cabling, transformer synchronization, and net metering.",
      icon: <Sun className="w-6 h-6 text-amber-400" />,
      specs: ["Ground Mount & Rooftop", "Inverter & Grid Sync", "Turnkey Commissioning"],
    },
  ];

  const solarProjects = [
    { name: "22MW PV Solar Power Project", client: "L&T Power", location: "Phalodi, Rajasthan", scope: "Topography & 5x5m Spot Level Contouring" },
    { name: "10MW PV Solar Power Project", client: "Sterling & Wilson", location: "Susner (Agar), MP", scope: "DGPS Control & Inverter Pad Positioning" },
    { name: "5MW PV Solar Power Project", client: "Sterling & Wilson", location: "Agar, Madhya Pradesh", scope: "Topographical Survey & MMS Boundary Layout" },
  ];

  return (
    <div>
      <PageHeader
        badge="CLEAN ENERGY & GEOTECHNICAL DIVISION"
        title="Harsh Survey Consultancy — Solar Services"
        subtitle="Bridging raw land acquisition with turnkey solar generation. We deliver high-precision 5x5m land topography, certified SBC geotechnical soil reports, pile pull-out testing, and complete EPC execution."
        breadcrumbs={[{ label: "Solar Services" }]}
      />

      <div className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Executive Solar Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                  <Sun className="w-3.5 h-3.5" />
                  <span>HARSH SURVEY CONSULTANCY · SOLAR SERVICES</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  “We Handle The Ground Work — You Enjoy The Power”
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Solar farm investments demand absolute certainty in terrain drainage and foundation stability. Harsh Survey Consultancy — Solar Services integrates certified civil surveyors and geotechnical soil engineers to deliver turnkey solar feasibility across India.
                </p>

                {/* Direct Contact Pills */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`tel:${COMPANY_PROFILE.contacts.managingDirector.phones[0]}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Harsh Survey: {COMPANY_PROFILE.contacts.managingDirector.phones[0]}</span>
                  </a>

                  <a
                    href={`https://wa.me/${COMPANY_PROFILE.contacts.managingDirector.whatsapp}?text=Hello%20Harsh%20Survey%20Consultancy,%20I%20need%20a%20Solar%20Survey%20/%20Soil%20Testing%20quote.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-semibold text-xs border border-emerald-500/30 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Solar Desk</span>
                  </a>

                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {COMPANY_PROFILE.contacts.managingDirector.emails[0]}
                  </span>
                </div>
              </div>

              {/* Testimonial Quote Box */}
              <div className="lg:col-span-4">
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md relative space-y-3">
                  <Quote className="w-8 h-8 text-emerald-400/40" />
                  <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                    Surveying, soil testing, solar installation and commissioning—all coordinated by Harsh Survey Consultancy.
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Survey to commissioning</span>
                    <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
                      Verified Client
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solarPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700/60 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-bold text-emerald-400 font-mono">0{idx + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>

                <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2">
                  {pillar.specs.map((sp, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Geotechnical Soil Testing Deep-Dive */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Soil Laboratory & Field Testing Specifications
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Safe Bearing Capacity (SBC) & Pile Investigation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Solar plant structures endure intense wind uplift pressures. A failure in pile foundations can jeopardize millions in capital investment. Our geotechnical soil test reports include:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Standard Penetration Test (SPT) N-Values at 1.5m intervals</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct shear & unconfined compressive strength tests</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Vertical tension (pull-out) and lateral load tests</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Soil chemical corrosivity (pH, sulphates, chlorides)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <TestTubes className="w-4 h-4" />
                  <span>Book Geotechnical Soil Investigation</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                alt="Geotechnical Lab Soil Testing"
                className="rounded-2xl h-60 w-full object-cover border border-slate-700 shadow-xl"
              />
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="font-bold text-emerald-400 block">BIS Standard Approved Lab</span>
                <span className="text-slate-400">Certified reports recognized by SECI, NTPC, and leading EPC developers.</span>
              </div>
            </div>
          </div>

          {/* Solar Track Record Table */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Proven Solar Track Record</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {solarProjects.map((p, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-emerald-400">{p.client}</span>
                    <span className="text-slate-400">{p.location}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  <p className="text-xs text-slate-400">{p.scope}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        initialService="Solar Power Plant Survey & Installation"
      />
    </div>
  );
}

