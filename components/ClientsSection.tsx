"use client";

import React from "react";
import { CLIENTS } from "@/data/surveyData";
import { Handshake, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ClientsSection() {
  return (
    <section id="clients" className="py-16 bg-slate-950 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Handshake className="w-3.5 h-3.5" />
            <span>ESTEEMED CLIENTELE & PARTNERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Trusted by India’s Premier Infrastructure Leaders
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Delivering mission-critical survey data to Public Sector Undertakings (PSUs), State Authorities, and Global Infrastructure Conglomerates.
          </p>
        </div>

        {/* Client Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-center items-center text-center group hover:bg-slate-900 shadow-sm"
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

        {/* Highlights banner */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            100% Client Satisfaction & Dispute-Free Approvals
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            Empanelled for PMGSY & State PWD Projects
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Certified Soil SBC Testing for Solar Parks
          </span>
        </div>
      </div>
    </section>
  );
}

