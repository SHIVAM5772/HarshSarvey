"use client";

import React from "react";
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
  TrendingUp,
  Quote,
  Sparkles,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/data/surveyData";

export default function SolarXSpotlight({
  onOpenSolarQuote,
}: {
  onOpenSolarQuote: () => void;
}) {
  const solarPillars = [
    {
      title: "Solar Land Surveying",
      desc: "High-density 5x5m spot level gridding, slope gradient analysis, shadow obstruction study, and boundary demarcation using Hemisphere DGPS.",
      icon: <Compass className="w-5 h-5 text-amber-400" />,
    },
    {
      title: "Soil Testing (SBC Reports)",
      desc: "Certified geotechnical soil investigation, borehole testing, pull-out test for pile foundations, and Safe Bearing Capacity validation.",
      icon: <TestTubes className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: "Design & Engineering",
      desc: "Tailored PV Syst array layout, optimum tilt and azimuth angle, cable trench routing, and inverter room structural planning.",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
    },
    {
      title: "Turnkey Installation & EPC",
      desc: "Module mounting structure (MMS) erection, panel installation, inverter grid synchronization, and commissioning for ground-mount & rooftop.",
      icon: <Sun className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <section id="solarx" className="py-20 bg-slate-950 border-b border-slate-900 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                <Sun className="w-3.5 h-3.5" />
                <span>CLEAN ENERGY & GEOTECHNICAL DIVISION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                SolarX Energy Solutions
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-2xl sm:text-3xl md:text-4xl mt-1 font-bold">
                  “We Handle The Ground Work — You Enjoy The Power”
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Led by <strong className="text-white">Bhupendra Singh</strong>, SolarX Energy seamlessly integrates with Harsh Survey Consultancy to deliver high-yield solar power solutions. From raw land topography and SBC soil testing to full solar plant installation across India.
              </p>

              {/* Direct Solar Contacts */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={`tel:${COMPANY_PROFILE.contacts.solarHead.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Bhupendra Singh: {COMPANY_PROFILE.contacts.solarHead.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_PROFILE.contacts.solarHead.whatsapp}?text=Hello%20SolarX%20Energy,%20I%20am%20interested%20in%20Solar%20Survey%20/%20Soil%20Testing%20services.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-semibold text-xs border border-emerald-500/30 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Solar Desk</span>
                </a>

                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {COMPANY_PROFILE.contacts.solarHead.email}
                </span>
              </div>
            </div>

            {/* Testimonial Quote Box (From Document 2 Page 7) */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md relative space-y-3">
                <Quote className="w-8 h-8 text-emerald-400/40" />
                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                  “SolarX Energy completely transformed our approach to energy — from installation to support, everything was seamless and efficient.”
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">— Ravi Jaiswal</span>
                  <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
                    Verified Client Review
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {solarPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3 group"
            >
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 w-fit group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Visual Showcase: Soil Testing & Solar Farm Combined */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              SBC Geotechnical & Pile Investigation
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Soil Testing is Essential for Solar Plants
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Solar structures face extreme wind uplift loads and seasonal moisture shifts. Our dedicated geotechnical lab and field teams conduct:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Safe Bearing Capacity (SBC) certified lab reports for foundation depth.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct pull-out & lateral load testing on driven/cast-in-situ piles.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Electrical resistivity testing (ERT) for solar earthing grid safety.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Corrosion potential test (pH, sulfates, chlorides) for MMS longevity.</span>
              </li>
            </ul>

            <button
              onClick={onOpenSolarQuote}
              className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>Book Solar Land Survey & Soil Test</span>
              <Sun className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80"
                alt="Solar Farm Array"
                className="rounded-xl h-44 w-full object-cover border border-slate-700 shadow-md"
              />
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="font-bold text-emerald-400 block">37+ MW Executed</span>
                <span className="text-slate-400 text-[11px]">Phalodi, Agar & Susner Solar Parks</span>
              </div>
            </div>
            <div className="space-y-4 pt-6">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="font-bold text-amber-400 block">BIS Standard Lab</span>
                <span className="text-slate-400 text-[11px]">SBC & Pile Pull-out Certified</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
                alt="Geotechnical Soil Testing Lab"
                className="rounded-xl h-44 w-full object-cover border border-slate-700 shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

