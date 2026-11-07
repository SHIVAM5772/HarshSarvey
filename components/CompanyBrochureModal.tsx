"use client";

import React from "react";
import {
  X,
  Printer,
  FileCheck,
  Compass,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Download,
} from "lucide-react";
import { COMPANY_PROFILE, EQUIPMENT, TEAM, PROJECTS } from "@/data/surveyData";

export default function CompanyBrochureModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-white uppercase tracking-wider">
              Official Executive Dossier & Company Profile
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-900 text-slate-200 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-slate-700 pb-6 print:border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/images/logo.png"
                alt="Harsh Survey Logo"
                className="w-16 h-16 rounded-xl object-contain bg-slate-950 p-1 border border-slate-700 print:border-black"
              />
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight print:text-black">
                  HARSH SURVEY CONSULTANCY
                </h1>
                <p className="text-xs text-amber-400 font-bold tracking-wider print:text-amber-800">
                  SURVEY, PLANNING, DRAWING, DESIGN & CLEAN ENERGY SOLUTIONS
                </p>
                <p className="text-[11px] text-slate-400 print:text-slate-600">
                  Land Surveying, Soil Testing & Turnkey Solar by Harsh Survey Consultancy
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1">
              <p className="font-bold text-white print:text-black">RAM KUMAR (Managing Director)</p>
              <p className="text-slate-300 print:text-black">Mob: +91 9411692001, 7351982876</p>
              <p className="text-slate-400 print:text-black">Harsh House, Plot No: 169, VPO: Deori, Agra (UP) 282009</p>
              <p className="text-amber-400 print:text-blue-700">harshsurveyconsultancy@gmail.com</p>
            </div>
          </div>

          {/* Spectrum Summary */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-1 print:text-black">
              1. Spectrum of Consulting Services
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <span className="p-2 rounded bg-slate-950/60 border border-slate-800 print:border-gray-300 print:bg-gray-100">
                ■ Roads & National Highways (DPR)
              </span>
              <span className="p-2 rounded bg-slate-950/60 border border-slate-800 print:border-gray-300 print:bg-gray-100">
                ■ Solar Power Plants & SBC Soil Testing
              </span>
              <span className="p-2 rounded bg-slate-950/60 border border-slate-800 print:border-gray-300 print:bg-gray-100">
                ■ Oil & Gas Pipeline Route Surveys
              </span>
              <span className="p-2 rounded bg-slate-950/60 border border-slate-800 print:border-gray-300 print:bg-gray-100">
                ■ High-Voltage Transmission & Substations
              </span>
              <span className="p-2 rounded bg-slate-950/60 border border-slate-800 print:border-gray-300 print:bg-gray-100">
                ■ Railway Lines & Multimodal Container Yards
              </span>
              <span className="p-2 rounded bg-slate-950/60 border border-slate-800 print:border-gray-300 print:bg-gray-100">
                ■ Urban Town Planning & Drainage (Jal Nigam)
              </span>
            </div>
          </div>

          {/* Technical Instrument Fleet */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-1 print:text-black">
              2. Precision Survey Instruments & Hardware
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 print:border-gray-300">
                <thead className="bg-slate-950 text-slate-300 print:bg-gray-200 print:text-black">
                  <tr>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Item Description</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Qty</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Make / Brand</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Primary Engineering Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-gray-300">
                  {EQUIPMENT.slice(0, 6).map((eq, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="p-2 border border-slate-800 font-medium text-white print:text-black print:border-gray-300">
                        {eq.name}
                      </td>
                      <td className="p-2 border border-slate-800 text-amber-400 font-bold print:text-black print:border-gray-300">
                        {eq.quantity}
                      </td>
                      <td className="p-2 border border-slate-800 text-slate-300 print:text-black print:border-gray-300">
                        {eq.make}
                      </td>
                      <td className="p-2 border border-slate-800 text-slate-400 print:text-black print:border-gray-300">
                        {eq.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Milestones Record */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-1 print:text-black">
              3. Prestigious Projects & Client Track Record
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 print:border-gray-300">
                <thead className="bg-slate-950 text-slate-300 print:bg-gray-200 print:text-black">
                  <tr>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Project Name</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Principal Client</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Location</th>
                    <th className="p-2 border border-slate-800 print:border-gray-300">Scope Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-gray-300">
                  {PROJECTS.slice(0, 8).map((p, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="p-2 border border-slate-800 font-medium text-white print:text-black print:border-gray-300">
                        {p.name}
                      </td>
                      <td className="p-2 border border-slate-800 text-amber-300 font-semibold print:text-black print:border-gray-300">
                        {p.client}
                      </td>
                      <td className="p-2 border border-slate-800 text-slate-400 print:text-black print:border-gray-300">
                        {p.location}
                      </td>
                      <td className="p-2 border border-slate-800 text-emerald-400 font-mono print:text-black print:border-gray-300">
                        {p.metric}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Personnel */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-1 print:text-black">
              4. Key Technical Personnel
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {TEAM.slice(0, 4).map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 print:border-gray-300 print:bg-gray-100">
                  <div className="font-bold text-white print:text-black">{m.name}</div>
                  <div className="text-amber-400 font-semibold text-[11px] print:text-black">{m.designation}</div>
                  <div className="text-slate-400 text-[10px] mt-1 print:text-black">{m.qualification}</div>
                  <div className="text-emerald-400 text-[10px] font-mono mt-0.5 print:text-black">{m.experienceYears} Years Exp.</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 print:text-gray-600 print:border-black">
            Harsh Survey Consultancy • Certified Land Survey & Geotechnical Engineering Dossier • Prepared for Tender Qualification & Client Reference.
          </div>
        </div>
      </div>
    </div>
  );
}

