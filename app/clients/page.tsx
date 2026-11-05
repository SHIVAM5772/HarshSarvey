"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import { CLIENTS } from "@/data/surveyData";
import {
  Handshake,
  Award,
  ShieldCheck,
  CheckCircle2,
  Building,
  Zap,
  Route,
  Flame,
  Train,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function ClientsPage() {
  const sectors = [
    {
      title: "Renewable Energy & Power",
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      clients: ["L&T Power", "Sterling & Wilson Power", "Power Grid Corp of India Ltd. (PGCIL)"],
      desc: "Topography, 5x5m gridding, soil SBC testing, substation grids & 220KV transmission lines.",
    },
    {
      title: "Highways, Roads & Rural Connectivity",
      icon: <Route className="w-5 h-5 text-amber-400" />,
      clients: ["PMGSY Uttarakhand", "AICON Engineering Bhopal", "SGE Consultancy", "NPEC Consultancy", "Designilla"],
      desc: "Detailed Project Reports (DPR), OGL, L-Section, Cross-Section, and centerline staking.",
    },
    {
      title: "Oil, Gas & Public Sector Undertakings",
      icon: <Flame className="w-5 h-5 text-yellow-400" />,
      clients: ["GAIL - AJPL", "UP Jal Nigam (Moradabad, Sambhal, Rampur)"],
      desc: "70 KM high-pressure gas pipeline crossings and 450+ KM urban drainage/sewerage planning.",
    },
    {
      title: "Railways & Multimodal Logistics",
      icon: <Train className="w-5 h-5 text-amber-400" />,
      clients: ["Sarvada Engineering Project Management", "Hind Terminal Pvt. Ltd."],
      desc: "Manesar to Patli Rail Line, Kandla Port Rail Siding, and Bhimana Container Yard topography.",
    },
    {
      title: "Telecom, Industrial & Urban Authorities",
      icon: <Building className="w-5 h-5 text-blue-400" />,
      clients: ["HFCL Infotech Mohali", "GAMADA Mohali", "RMSI Noida", "Honda (Delhi)", "Design Plus Ajmer"],
      desc: "Over 6,500 Hectares telecom corridor mapping, master colony planning, and factory layouts.",
    },
  ];

  return (
    <div>
      <PageHeader
        badge="REPUTATION & INTEGRITY"
        title="Esteemed Clients & Government Partners"
        subtitle="Our client relationships are founded on unwavering technical rigor, dispute-free geodetic data, and adherence to national infrastructure standards."
        breadcrumbs={[{ label: "Clients & Credentials" }]}
      />

      <div className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Main Client Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Trusted by Industry Giants
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Empanelled with Central and State Government bodies, public sector enterprises, and leading EPC conglomerates.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {CLIENTS.map((client, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-center items-center text-center group hover:bg-slate-900 shadow-sm"
                >
                  <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                    {client.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Breakdown */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Industry Sectors Served</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/60">
                      {sec.icon}
                    </div>
                    <h4 className="text-base font-bold text-white">{sec.title}</h4>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{sec.desc}</p>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      Key Client Relationships
                    </span>
                    <ul className="text-[11px] text-slate-400 space-y-0.5">
                      {sec.clients.map((c, i) => (
                        <li key={i} className="truncate">• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standards & Certifications Guarantee */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Compliance & Dispute-Free Approvals</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
              <div className="space-y-1.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block">MoRTH & IRC Norms</span>
                <p className="text-slate-400">All highway strip plans, cross-sections, and alignment files strictly comply with Indian Roads Congress standards.</p>
              </div>

              <div className="space-y-1.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400 block">BIS Certified Geotech Testing</span>
                <p className="text-slate-400">Safe Bearing Capacity (SBC) lab investigations follow Bureau of Indian Standards (BIS) protocols for solar array foundations.</p>
              </div>

              <div className="space-y-1.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-400 block">National Geodetic Datum</span>
                <p className="text-slate-400">Primary control points referenced directly to Survey of India (SOI) GTS benchmarks for error-free legal demarcation.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
              >
                Inquire for Your Tender or Private Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

