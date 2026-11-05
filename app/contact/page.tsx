"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import QuoteCalculator from "@/components/QuoteCalculator";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        badge="GET IN TOUCH WITH OUR DIRECTORS"
        title="Contact Harsh Survey & SolarX"
        subtitle="Connect with our managing directors directly for survey feasibility, quotation estimates, or immediate field mobilization across India."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      {/* Interactive Scope & Turnaround Estimator */}
      <QuoteCalculator />

      {/* Main Contact Section with Form & Address */}
      <ContactSection />
    </div>
  );
}

