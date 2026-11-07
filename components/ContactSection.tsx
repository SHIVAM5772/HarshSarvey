"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle,
  Sun,
  Compass,
  Building,
} from "lucide-react";
import { submitInquiry } from "@/lib/submit-inquiry";
import { COMPANY_PROFILE } from "@/data/surveyData";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Highway / Road DPR Survey",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true); setError("");
    try {
      await submitInquiry({ ...formData, organization: "", location: "", source: "contact" });
      setFormSubmitted(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Your enquiry could not be saved. Please contact us on WhatsApp."); }
    finally { setSaving(false); }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/40 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>LET’S CONNECT FOR YOUR NEXT INFRASTRUCTURE PROJECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Harsh Survey Consultancy
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Reach out to our leadership directly for survey quotes, technical inquiries, or immediate field team mobilization across India.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Managing Director Card */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                Land Survey & Management
              </span>
              <Compass className="w-5 h-5 text-amber-400" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Ram Kumar</h3>
              <p className="text-xs text-slate-400 font-medium">Managing Director (Founder)</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <div className="space-x-2">
                  <a href={`tel:${COMPANY_PROFILE.contacts.managingDirector.phones[0]}`} className="text-white hover:text-amber-400">
                    {COMPANY_PROFILE.contacts.managingDirector.phones[0]}
                  </a>
                  <span>/</span>
                  <a href={`tel:${COMPANY_PROFILE.contacts.managingDirector.phones[1]}`} className="text-white hover:text-amber-400">
                    {COMPANY_PROFILE.contacts.managingDirector.phones[1]}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href={`mailto:${COMPANY_PROFILE.contacts.managingDirector.emails[0]}`} className="text-slate-300 hover:text-amber-400 truncate">
                  {COMPANY_PROFILE.contacts.managingDirector.emails[0]}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href={`mailto:${COMPANY_PROFILE.contacts.managingDirector.emails[1]}`} className="text-slate-300 hover:text-amber-400 truncate">
                  {COMPANY_PROFILE.contacts.managingDirector.emails[1]}
                </a>
              </div>
            </div>

            <a
              href={`https://wa.me/${COMPANY_PROFILE.contacts.managingDirector.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all block text-center"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Ram Kumar (MD)</span>
            </a>
          </div>

          {/* Solar & Clean Energy Card */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/30 hover:border-emerald-500/50 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                Solar & Soil Investigation
              </span>
              <Sun className="w-5 h-5 text-emerald-400" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Harsh Survey Consultancy</h3>
              <p className="text-xs text-emerald-400 font-medium">Surveying & Solar Services</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${COMPANY_PROFILE.contacts.managingDirector.phones[0]}`} className="text-white hover:text-emerald-400 font-medium">
                  {COMPANY_PROFILE.contacts.managingDirector.phones[0]}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href={`mailto:${COMPANY_PROFILE.contacts.managingDirector.emails[0]}`} className="text-slate-300 hover:text-emerald-400 truncate">
                  {COMPANY_PROFILE.contacts.managingDirector.emails[0]}
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Surveying & solar project enquiries</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${COMPANY_PROFILE.contacts.managingDirector.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all block text-center shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Harsh Survey</span>
            </a>
          </div>

          {/* Head Office Location Card */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-900">
                Registered Head Office
              </span>
              <Building className="w-5 h-5 text-amber-400" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Harsh House</h3>
              <p className="text-xs text-slate-400">Plot No: 169, VPO: Deori, Deori Agra</p>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Agra, Uttar Pradesh (UP) - 282009, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Mon – Sat: 8:30 AM – 7:30 PM (Field 24x7)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-white block mb-0.5">Pan-India Field Mobilization:</strong>
              Field teams can mobilize across UP, Rajasthan, MP, Uttarakhand, Punjab, Haryana, and Maharashtra within 48-72 hours.
            </div>
          </div>
        </div>

        {/* Interactive In-Page Inquiry Form */}
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Send Direct Site Survey Request</h3>
            <p className="text-xs text-slate-400 mt-1">
              Share your requirements and our engineering office will get in touch to discuss your project.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Inquiry Received Successfully!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you! Your enquiry has been saved successfully for the Harsh Survey team to review.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs text-amber-400 font-semibold underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p role="alert" className="rounded-lg border border-red-500/40 p-3 text-xs text-red-500 leading-relaxed">{error}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Er. Rajesh Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Service Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Highway / Road DPR Survey</option>
                    <option>Topographical & Close Contour Survey</option>
                    <option>Solar Power Plant Survey & Installation</option>
                    <option>Geotechnical Soil Testing & SBC Report</option>
                    <option>Oil & Gas Pipeline Alignment</option>
                    <option>Railway Line / Container Yard Survey</option>
                    <option>Transmission Line / Substation Survey</option>
                    <option>Urban Drainage & Town Planning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Project Details / Location / Scope</label>
                <textarea
                  rows={3}
                  placeholder="Describe project location, estimated length/area, timeline requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <Send className="w-4 h-4" />
                <span>{saving ? "Saving enquiry…" : "Submit Technical Survey Inquiry"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

