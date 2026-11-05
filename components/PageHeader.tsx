"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home, Sparkles } from "lucide-react";

interface PageHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PageHeader({
  badge,
  title,
  subtitle,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="relative pt-12 pb-14 bg-slate-950 border-b border-slate-900 overflow-hidden bg-grid-pattern">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-radial-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-amber-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-slate-500" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-amber-400 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-amber-400 font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

