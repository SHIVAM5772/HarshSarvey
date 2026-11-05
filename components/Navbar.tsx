"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Sun,
  FileText,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { COMPANY_PROFILE } from "@/data/surveyData";

export default function Navbar({
  onOpenDossier,
  onOpenQuote,
}: {
  onOpenDossier: () => void;
  onOpenQuote: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "SolarX Division", href: "/solarx", badge: "Clean Energy" },
    { label: "Projects", href: "/projects" },
    { label: "Equipment", href: "/equipment" },
    { label: "Team", href: "/team" },
    { label: "Clients", href: "/clients" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar for Rapid Contact */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Empanelled Survey & Planning Consultancy • Est. 2009
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              Agra, Uttar Pradesh (Pan-India Operations)
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${COMPANY_PROFILE.contacts.managingDirector.phones[0]}`}
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              Survey: {COMPANY_PROFILE.contacts.managingDirector.phones[0]}
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={`tel:${COMPANY_PROFILE.contacts.solarHead.phone}`}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Sun className="w-3 h-3 text-emerald-400" />
              SolarX: {COMPANY_PROFILE.contacts.solarHead.phone}
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={`mailto:${COMPANY_PROFILE.contacts.managingDirector.emails[0]}`}
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3 h-3 text-slate-400" />
              {COMPANY_PROFILE.contacts.managingDirector.emails[0]}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/40 py-2.5"
            : "bg-slate-950/80 backdrop-blur-sm border-b border-white/5 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Harsh Survey Consultancy Logo"
              className="h-11 sm:h-12 w-auto object-contain rounded-xl shadow-lg shadow-black/50 border border-slate-800/80 group-hover:scale-105 group-hover:border-amber-500/40 transition-all duration-300"
            />
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  HARSH SURVEY
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 tracking-wider">
                  CONSULTANCY
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Survey • Planning • Drawing • SolarX Solutions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-semibold transition-all relative flex items-center gap-1.5 py-1 ${
                    isActive
                      ? "text-amber-400 font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenDossier}
              className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
              title="View Official Company Profile Dossier"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Dossier</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="text-xs font-bold px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 flex items-center gap-1.5 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Get Quote</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="text-xs font-bold px-3 py-1.5 rounded-md bg-amber-500 text-slate-950"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 mt-2 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800 text-xs">
              <a
                href={`tel:${COMPANY_PROFILE.contacts.managingDirector.phones[0]}`}
                className="flex items-center gap-1.5 text-amber-400 py-1"
              >
                <Phone className="w-3.5 h-3.5" /> Call MD
              </a>
              <a
                href={`https://wa.me/${COMPANY_PROFILE.contacts.managingDirector.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 py-1"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp MD
              </a>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2 text-sm font-medium border-b border-slate-800/40 ${
                      isActive ? "text-amber-400 font-bold" : "text-slate-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDossier();
                }}
                className="w-full py-2.5 rounded-lg bg-slate-800 text-slate-200 text-sm font-medium border border-slate-700 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                View Full Company Profile (PDF Dossier)
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-2.5 rounded-lg bg-amber-500 text-slate-950 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                Estimate Project / Request Survey
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
