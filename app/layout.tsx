import type { Metadata, Viewport } from "next";
import "./compiled.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090d16",
};

export const metadata: Metadata = {
  title: "Harsh Survey Consultancy | Precision Land Surveying & Solar Engineering",
  description:
    "Leading Survey, Planning, Drawing, and Design Consultancy in India. Specializing in Topographical Surveys, DGPS & Total Station Mapping, Highway DPRs, Transmission Lines, Pipelines, and Solar Power Projects.",
  keywords: [
    "Harsh Survey Consultancy",
    "Land Survey Agra",
    "DGPS Survey",
    "Total Station Survey",
    "Topographical Survey",
    "Highway Survey PMGSY",
    "Solar Power Plant Survey",
    "Soil Testing SBC Report",
    "GIS Mapping Uttar Pradesh",
  ],
  authors: [{ name: "Harsh Survey Consultancy" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
