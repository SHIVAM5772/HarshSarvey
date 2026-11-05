"use client";

import React, { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { PROJECTS, ProjectItem } from "@/data/surveyData";
import {
  Search,
  MapPin,
  Calendar,
  Building,
  TrendingUp,
  X,
  ExternalLink,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: "all", label: "All 50+ Projects" },
    { id: "solar", label: "Solar Energy" },
    { id: "highways", label: "Highways & PMGSY" },
    { id: "pipelines", label: "Oil & Gas Pipelines" },
    { id: "railways", label: "Railways & Ports" },
    { id: "transmission", label: "Transmission & Power" },
    { id: "utilities", label: "Urban Drainage & Telecom" },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesCategory =
        selectedCategory === "all" || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        proj.name.toLowerCase().includes(q) ||
        proj.client.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        proj.scope.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div>
      <PageHeader
        badge="PROVEN TRACK RECORD (2009–PRESENT)"
        title="Landmark Project Track Record"
        subtitle="Review our verified project portfolio spanning more than 50 major infrastructure survey contracts executed for leading government authorities and Fortune-500 developers across India."
        breadcrumbs={[{ label: "Projects Record" }]}
      />

      <div className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Filter & Search Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-900">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition-all ${
                    selectedCategory === cat.id
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 font-bold"
                      : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by client, location, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group shadow-lg hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-900/90 text-amber-400 border border-amber-500/30 uppercase tracking-wider backdrop-blur-md">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      {project.metric}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="line-clamp-1">{project.location}</span>
                  </div>
                </div>

                {/* Project Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {project.scope}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 truncate max-w-[190px]">
                      <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <strong className="text-slate-300 font-medium truncate">{project.client}</strong>
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{project.year}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">
              No projects matched your criteria. Try adjusting the search keywords.
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="relative h-60">
              <img
                src={activeProject.image}
                alt={activeProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeProject.categoryLabel}
                </span>
                <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  {activeProject.metric}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white leading-snug">
                {activeProject.name}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeProject.scope}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block">Principal Client</span>
                  <span className="text-white font-semibold">{activeProject.client}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Location</span>
                  <span className="text-white font-semibold">{activeProject.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Year of Execution</span>
                  <span className="text-white font-semibold">{activeProject.year}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Consultancy Role</span>
                  <span className="text-amber-400 font-semibold">Lead Survey & Planning</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Link
                  href="/contact"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold text-center"
                >
                  Inquire Similar Project
                </Link>
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

