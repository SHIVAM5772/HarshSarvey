"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Menu, X, FileText, ArrowUpRight, ShieldCheck } from "lucide-react";
import { COMPANY_PROFILE } from "@/data/surveyData";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solar", href: "/solar" },
  { label: "Projects", href: "/projects" },
  { label: "Equipment", href: "/equipment" },
  { label: "Team", href: "/team" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ onOpenDossier, onOpenQuote }: {
  onOpenDossier: () => void;
  onOpenQuote: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="contact-strip">
        <div className="site-container contact-strip-inner">
          <span><ShieldCheck size={14} /> Survey & planning expertise since 2009</span>
          <div className="contact-strip-links">
            <span className="contact-location"><MapPin size={13} /> Agra, UP · Across India</span>
            <a href={`tel:${COMPANY_PROFILE.contacts.managingDirector.phones[0]}`}><Phone size={13} /> {COMPANY_PROFILE.contacts.managingDirector.phones[0]}</a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="site-container nav-main">
          <Link href="/" className="brand-lockup" aria-label="Harsh Survey Consultancy home" onClick={() => setMobileMenuOpen(false)}>
            <img src="/images/logo.png" alt="Harsh Survey company logo" width={48} height={48} />
            <div className="brand-copy"><span>HARSH SURVEY<span className="brand-dot">.</span></span><small>CONSULTANCY & SOLAR</small></div>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={link.href === "/solar" ? "solar-nav-link" : ""}>{link.label}</Link>
            ))}
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <button className="profile-button" onClick={onOpenDossier} title="View company profile"><FileText size={16} /><span>Profile</span></button>
            <button className="quote-button" onClick={onOpenQuote}>Get a quote<ArrowUpRight size={16} /></button>
            <button className="menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">{mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav id="mobile-navigation" className="mobile-navigation site-container" aria-label="Mobile navigation">
            {navLinks.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setMobileMenuOpen(false)}>{link.label}<ArrowUpRight size={15} /></Link>)}
            <button onClick={() => { setMobileMenuOpen(false); onOpenDossier(); }}><FileText size={16} /> Company profile</button>
          </nav>
        )}
      </header>
    </>
  );
}
