"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import { TEAM } from "@/data/surveyData";
import {
  Users,
  Award,
  GraduationCap,
  Calendar,
  Briefcase,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function TeamPage() {
  return (
    <div>
      <PageHeader
        badge="TECHNICAL CORE & LEADERSHIP"
        title="Meet Our Certified Surveyors & Engineers"
        subtitle="Our team brings together over 100+ cumulative years of practical on-site experience across Civil Engineering, Geodesy, Satellite GNSS, and Renewable Energy."
        breadcrumbs={[{ label: "Our Team" }]}
      />

      <div className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Executive Leadership Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM.slice(0, 2).map((leader, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row gap-6 items-center"
              >
                <div className="relative shrink-0">
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="w-28 h-28 rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-slate-950 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-lg border border-amber-500/30">
                    {leader.experienceYears}+ Yrs
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                    Executive Leadership
                  </span>
                  <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                  <p className="text-xs text-amber-300 font-semibold">{leader.designation}</p>

                  <div className="space-y-1 text-xs text-slate-300 pt-1">
                    <p><strong>Qualification:</strong> {leader.qualification}</p>
                    <p><strong>Specialization:</strong> {leader.specialization}</p>
                    <p className="text-slate-400 text-[11px]">{leader.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Survey Officers Grid */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Field Specialists & CAD Officers
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Technical Survey & Design Team
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM.slice(2).map((member, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all p-6 flex flex-col justify-between space-y-4 shadow-lg group"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 group-hover:border-amber-400 transition-colors"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-slate-950 text-amber-400 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-amber-500/30">
                          {member.experienceYears}y
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                          {member.name}
                        </h3>
                        <div className="text-xs text-amber-300 font-medium">
                          {member.designation}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-400">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="text-slate-300">{member.qualification}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="text-slate-300">{member.specialization}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="text-slate-400">{member.joinedYear}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-tight">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                      Key Role
                    </span>
                    {member.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Career / Field Deployment Call */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white">Need a Dedicated Field Survey Crew Mobilized?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Our licensed civil surveyors can be deployed with DGPS and Total Stations within 48-72 hours across India.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 shadow-lg shadow-amber-500/20"
            >
              Contact Engineering Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

