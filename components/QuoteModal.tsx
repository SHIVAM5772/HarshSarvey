"use client";

import React, { useState } from "react";
import {
  X,
  Send,
  MessageSquare,
  CheckCircle,
  Compass,
} from "lucide-react";
import { submitInquiry } from "@/lib/submit-inquiry";
import { COMPANY_PROFILE, SERVICES } from "@/data/surveyData";

type QuoteModalProps = { isOpen: boolean; onClose: () => void; initialService?: string };

export default function QuoteModal({ isOpen, onClose, initialService }: QuoteModalProps) {
  if (!isOpen) return null;
  return <QuoteForm key={initialService || "general"} onClose={onClose} initialService={initialService} />;
}

function QuoteForm({ onClose, initialService }: Omit<QuoteModalProps, "isOpen">) {
  const [service, setService] = useState(initialService || "Topographical & Close Contour Surveys");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleWhatsApp = () => {
    const contact = COMPANY_PROFILE.contacts.managingDirector.whatsapp;

    const text = encodeURIComponent(
      `*URGENT SURVEY / QUOTATION REQUEST*\n` +
      `-----------------------------------\n` +
      `*Name:* ${name || "Client"}\n` +
      `*Organization:* ${organization || "Direct Client"}\n` +
      `*Phone:* ${phone || "Not specified"}\n` +
      `*Service Required:* ${service}\n` +
      `*Site Location:* ${location || "To be discussed"}\n` +
      `*Project Scope:* ${details || "Please contact for detailed specs"}\n\n` +
      `Requesting immediate feasibility assessment and proposal.`
    );

    window.open(`https://wa.me/${contact}?text=${text}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true); setError("");
    try {
      await submitInquiry({ name, phone, organization, service, location, message: details, email: "", source: "quote" });
      setSubmitted(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Your enquiry could not be saved. Please try WhatsApp."); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Request Site Survey / Quote</h3>
              <p className="text-[11px] text-slate-400">Harsh Survey Consultancy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Quotation Request Registered!</h4>
              <p className="text-xs text-slate-300">
                Your enquiry has been saved successfully. The Harsh Survey team will review it and contact you using the details provided.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Select Service *</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Infra Developers"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Site Location (City/State)</label>
                  <input
                    type="text"
                    placeholder="e.g. Jaipur, Rajasthan"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Project Details / Estimated Scope</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 35km state highway corridor, DPR required within 20 days..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="pt-2 space-y-2">
                {error && <p role="alert" className="rounded-lg border border-red-500/40 p-3 text-xs text-red-500 leading-relaxed">{error}</p>}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{saving ? "Saving enquiry…" : "Submit Inquiry"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Instant Quote via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

