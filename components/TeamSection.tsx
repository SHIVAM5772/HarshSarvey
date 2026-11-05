"use client";

import React from "react";
import { TEAM } from "@/data/surveyData";
import {
  Users,
  Award,
  GraduationCap,
  Calendar,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

export default function TeamSection() {
  return (
    <section id="team" className="py-20 bg-slate-900/60 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>EXPERT LEADERSHIP & LICENSED SURVEYORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Technical & Management Team
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Backed by certified Civil Engineers, Geodesic Surveyors, and Renewable Energy experts with up to 20+ years of dedicated on-site expertise.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEAM.map((member, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all p-5 flex flex-col justify-between space-y-4 group shadow-lg"
            >
              <div>
                {/* Header with Avatar and Experience */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/30 group-hover:border-amber-400 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-slate-900 text-amber-400 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-amber-500/30">
                      {member.experienceYears}y+
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs text-amber-300 font-semibold mt-0.5">
                      {member.designation}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-slate-300 truncate">{member.qualification}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-slate-300 truncate">{member.specialization}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-slate-400">{member.joinedYear}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-tight">
                <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                  Key Function
                </span>
                {member.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

