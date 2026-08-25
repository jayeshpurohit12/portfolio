"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioData, Project } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TechChip } from "@/components/common/TechChip";
import { AndroidIcon, AppleIcon } from "@/components/common/Icons";
import {
  CheckCircle2,
  Globe2,
  Sparkles,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;

  return (
    <section
      id="projects"
      className="scroll-mt-24 md:scroll-mt-28 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-28"
    >
      {/* Section Header */}
      <SectionHeader
        badge="Case Studies & Live Stores"
        terminalCommand='git log --grep="feat: production-ready mobile apps"'
        title="Featured"
        highlightText="Projects."
        description="High-performance mobile engineering and scalable architectures shipped to the Apple App Store and Google Play Store for worldwide & US markets."
      />

      {/* Projects 2x2 Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {projects.map((project: Project, index: number) => {
          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="project-card flex flex-col group relative overflow-hidden bg-[#152031] border border-[#434656] hover:border-[#2e5bff] transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Visual Image / Hardware Mockup Header */}
                <div className="relative bg-[#0b1626] flex items-center justify-center p-6 sm:p-8 overflow-hidden border-b border-[#434656] group-hover:border-[#2e5bff]/50 transition-colors h-72 sm:h-80">
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2e5bff]/15 via-transparent to-transparent pointer-events-none" />

                  {/* Device Frame Display with Floating Animation */}
                  <div className="relative w-full max-w-[260px] sm:max-w-[280px] h-[260px] sm:h-[290px] rounded-2xl overflow-hidden border-2 border-[#2d3133] shadow-[0_20px_50px_rgba(0,0,0,0.7)] group-hover:scale-[1.04] transition-all duration-500 bg-[#081425] animate-float-slow">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Region Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#081425]/90 backdrop-blur-md border border-[#434656] text-[11px] font-mono text-[#b8c3ff] shadow-md">
                    <Globe2 className="w-3 h-3 text-[#2e5bff]" />
                    <span>{project.region}</span>
                  </div>

                  {/* Metric Tag */}
                  {project.metrics && (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2e5bff]/20 backdrop-blur-md border border-[#2e5bff]/50 text-[11px] font-mono text-[#efefff] font-semibold shadow-md">
                      <Sparkles className="w-3 h-3 text-[#b8c3ff]" />
                      <span>{project.metrics.value}</span>
                    </div>
                  )}
                </div>

                {/* Project Details Content */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Header Row: Title & Store Badges on the EXACT SAME line */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-1.5">
                      <h3 className="font-sora text-xl sm:text-2xl lg:text-3xl font-bold text-[#d8e3fb] tracking-tight group-hover:text-[#b8c3ff] transition-colors">
                        {project.title}
                      </h3>

                      {/* Clickable Store Badges (shrink-0 to guarantee single-line alignment) */}
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        {project.links?.appstore && (
                          <a
                            href={project.links.appstore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-[#1f2a3c] border border-[#434656] hover:border-[#b8c3ff] text-[10px] sm:text-[11px] font-mono text-[#d8e3fb] hover:text-[#b8c3ff] hover:bg-[#2a3548] transition-all hover:scale-105 shadow-sm group/ios shrink-0"
                            title={`Download ${project.title} on Apple App Store`}
                          >
                            <AppleIcon className="w-3.5 h-3.5 text-[#b8c3ff]" />
                            <span>iOS App</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/ios:opacity-100" />
                          </a>
                        )}

                        {project.links?.playstore && (
                          <a
                            href={project.links.playstore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-[#1f2a3c] border border-[#434656] hover:border-[#22c55e] text-[10px] sm:text-[11px] font-mono text-[#d8e3fb] hover:text-[#22c55e] hover:bg-[#2a3548] transition-all hover:scale-105 shadow-sm group/android shrink-0"
                            title={`Download ${project.title} on Google Play Store`}
                          >
                            <AndroidIcon className="w-3.5 h-3.5 text-[#22c55e]" />
                            <span>Android</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/android:opacity-100" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Subtitle / Category below title */}
                    <p className="font-mono text-xs text-[#c4c5d9] uppercase tracking-wider mb-4">
                      {project.category}
                    </p>

                    {/* Summary Description */}
                    <p className="text-sm text-[#c4c5d9] mb-5 leading-relaxed font-light">
                      {project.summary}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <TechChip key={tech} label={tech} variant="primary" />
                      ))}
                    </div>

                    {/* Architectural Highlights */}
                    <div className="space-y-3 pt-4 border-t border-[#434656]/60">
                      <div className="font-mono text-[11px] text-[#8e90a2] uppercase tracking-wider">
                        Key Architectural Deliverables:
                      </div>
                      <ul className="space-y-2.5">
                        {project.highlights.map((highlight, hIdx) => (
                          <li
                            key={hIdx}
                            className="list-pointer text-xs sm:text-sm text-[#c4c5d9] leading-relaxed"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Project Card Bottom Action with Store Buttons */}
                  <div className="mt-6 pt-4 border-t border-[#434656]/60 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs text-[#b8c3ff] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                      Live in Production
                    </span>

                    <div className="flex items-center gap-2">
                      {project.links?.appstore && (
                        <a
                          href={project.links.appstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline text-xs py-1.5 px-2.5 flex items-center gap-1.5 hover:text-white"
                          title="Open Apple App Store"
                        >
                          <AppleIcon className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">App Store</span>
                        </a>
                      )}

                      {project.links?.playstore && (
                        <a
                          href={project.links.playstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline text-xs py-1.5 px-2.5 flex items-center gap-1.5 hover:text-[#22c55e]"
                          title="Open Google Play Store"
                        >
                          <AndroidIcon className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Play Store</span>
                        </a>
                      )}

                      <a
                        href="#contact"
                        className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1 group/btn"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
