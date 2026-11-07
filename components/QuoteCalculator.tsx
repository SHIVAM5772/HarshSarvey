"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Compass,
  Sun,
  TestTubes,
  Route,
  Building,
  CheckCircle,
  MessageSquare,
  Clock,
  Wrench,
  FileCheck,
  Send,
  Phone,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/data/surveyData";

export default function QuoteCalculator({
  prefilledService,
}: {
  prefilledService?: string;
}) {
  const [projectType, setProjectType] = useState<string>("highway");
  const [quantity, setQuantity] = useState<number>(20);
  const [terrain, setTerrain] = useState<string>("plain");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const projectConfigs = {
    highway: {
      label: "Highway, Road or PMGSY Survey",
      unit: "Kilometers (KM)",
      defaultQty: 25,
      rateMultiplier: 1,
      instruments: "1 Dual-frequency DGPS + 2 Electronic Total Stations + Sokkia Auto Level",
      turnaroundDaysPerUnit: 0.35,
      deliverables: "OGL Data, L-Section (50m), X-Section (25m), Strip Plan & TBM Pillars",
      contact: "survey",
    },
    solar: {
      label: "Solar Power Plant Land Survey",
      unit: "Megawatts (MW) or Acres",
      defaultQty: 20,
      rateMultiplier: 1.2,
      instruments: "Hemisphere DGPS + Total Station + 5x5m Spot Leveling Grid",
      turnaroundDaysPerUnit: 0.25,
      deliverables: "5x5m Contour Map, Cut/Fill Earthwork Volume, MMS Table Boundary Alignment",
      contact: "solar",
    },
    soil: {
      label: "Geotechnical Investigation & Soil SBC Testing",
      unit: "Borehole / Test Points",
      defaultQty: 6,
      rateMultiplier: 0.8,
      instruments: "Soil Core Drilling Rig + SPT Kit + Pull-Out Load Testing Apparatus",
      turnaroundDaysPerUnit: 0.6,
      deliverables: "Safe Bearing Capacity (SBC) Certified Lab Report, Borehole Logs, Soil Classification",
      contact: "solar",
    },
    pipeline: {
      label: "Oil, Gas or Water Pipeline Route Survey",
      unit: "Kilometers (KM)",
      defaultQty: 30,
      rateMultiplier: 1.1,
      instruments: "Total Station + DGPS + Magellan GPS Handhelds",
      turnaroundDaysPerUnit: 0.4,
      deliverables: "Corridor Strip Plan, River/Canal/Railway HDD Crossing Profiles, ROW Demarcation",
      contact: "survey",
    },
    topography: {
      label: "Topographical & Colony/Township Survey",
      unit: "Acres",
      defaultQty: 50,
      rateMultiplier: 0.9,
      instruments: "Total Station + Sokkia Auto Level + High-Density Spot Levels",
      turnaroundDaysPerUnit: 0.2,
      deliverables: "Cadastral Boundary Verification, Contour Elevation Plan, Demarcation Pegs",
      contact: "survey",
    },
  };

  const currentConfig = projectConfigs[projectType as keyof typeof projectConfigs] || projectConfigs.highway;

  const estimatedDays = useMemo(() => {
    let terrainFactor = 1.0;
    if (terrain === "hilly") terrainFactor = 1.5;
    if (terrain === "urban") terrainFactor = 1.3;

    const days = Math.max(3, Math.ceil(quantity * currentConfig.turnaroundDaysPerUnit * terrainFactor));
    return days;
  }, [quantity, terrain, currentConfig]);

  const handleSendWhatsApp = () => {
    const contactNumber = COMPANY_PROFILE.contacts.managingDirector.whatsapp;

    const message = encodeURIComponent(
      `*SITE SURVEY / ESTIMATE INQUIRY*\n` +
      `--------------------------------\n` +
      `*Company / Name:* ${clientName || "Valued Client"}\n` +
      `*Phone:* ${clientPhone || "Not provided"}\n` +
      `*Project Type:* ${currentConfig.label}\n` +
      `*Project Size:* ${quantity} ${currentConfig.unit}\n` +
      `*Terrain Type:* ${terrain.toUpperCase()}\n` +
      `*Estimated Field Days:* ~${estimatedDays} Days\n` +
      `*Additional Details:* ${notes || "None"}\n\n` +
      `Please provide formal quote and mobilization availability.`
    );

    window.open(`https://wa.me/${contactNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="quote-calculator" className="py-20 bg-slate-950 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE FIELD ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Instant Survey & Soil Scope Estimator
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Select your infrastructure parameters below to instantly calculate field instrument requirements, mobilization timeline, and connect directly with our engineering directors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            {/* Step 1: Project Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Select Survey / Project Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(projectConfigs).map(([key, config]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setProjectType(key);
                      setQuantity(config.defaultQty);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all text-xs font-semibold ${
                      projectType === key
                        ? "bg-amber-500/15 border-amber-500 text-amber-300"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Quantity / Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-300 uppercase tracking-wider">
                  2. Project Scope Size ({currentConfig.unit})
                </label>
                <span className="font-mono text-amber-400 font-bold text-sm bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  {quantity} {currentConfig.unit.split(" ")[0]}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={projectType === "soil" ? "50" : "200"}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Min: 1</span>
                <span>Custom: type in notes if larger</span>
                <span>Max: {projectType === "soil" ? "50" : "200+"}</span>
              </div>
            </div>

            {/* Step 3: Terrain Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                3. Terrain & Ground Conditions
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "plain", label: "Plain / Farmland" },
                  { id: "hilly", label: "Hilly / Mountainous" },
                  { id: "urban", label: "Urban / High Density" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTerrain(t.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all text-xs font-semibold ${
                      terrain === t.id
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Your Name / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. ABC Infra / Project Manager"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Phone / WhatsApp Number</label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Project Site Location or Specific Requirements</label>
              <textarea
                rows={2}
                placeholder="Mention district, state, or specific milestones (e.g. urgently needed for PMGSY submission)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>
          </div>

          {/* Right Column: Dynamic Scope Summary & Action Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  Scope Estimation Summary
                </span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  {currentConfig.label}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {quantity} {currentConfig.unit.split(" ")[0]}
              </span>
            </div>

            {/* Estimated Output Metrics */}
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    Estimated Mobilization & Turnaround
                  </span>
                  <span className="text-slate-300">
                    Approximately <strong className="text-amber-400">{estimatedDays} Working Days</strong> from site handover.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <Wrench className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Equipment & Crew Deployment</span>
                  <span className="text-slate-300">{currentConfig.instruments}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Standard Engineering Deliverables</span>
                  <span className="text-slate-300">{currentConfig.deliverables}</span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send via WhatsApp for Instant Quotation</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <a
                  href={`tel:${COMPANY_PROFILE.contacts.managingDirector.phones[0]}`}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors font-medium text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Ram Kumar (MD)</span>
                </a>

                <a
                  href={`tel:${COMPANY_PROFILE.contacts.managingDirector.phones[0]}`}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors font-medium text-center"
                >
                  <Sun className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Harsh Survey (Solar)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

