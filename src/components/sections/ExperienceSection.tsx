"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData, ExperienceItem } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TechChip } from "@/components/common/TechChip";
import {
  Briefcase,
  GraduationCap,
  Download,
  Calendar,
  MapPin,
  TrendingUp,
  Zap,
  CheckCircle,
} from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const { experience, education, impactMetrics } = portfolioData;

  return (
    <section
      id="experience"
      className="section-deferred scroll-mt-24 md:scroll-mt-28 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-28"
    >
      {/* Section Header */}
      <SectionHeader
        badge="Career & Track Record"
        terminalCommand='System.out.println("Professional Timeline");'
        title="Experience &"
        highlightText="Journey."
        description="Over 3 years of proven engineering impact optimizing client mobile performance, cutting battery drain, scaling user retention, and shipping reliable production apps."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Timeline Column */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* Work Experience */}
          <div className="flex flex-col gap-8">
            {experience.map((item: ExperienceItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative timeline-item pl-10 md:pl-12"
              >
                {/* Timeline Node Icon with Glowing Radar Pulse */}
                <div className="absolute left-0 top-1.5 w-8 h-8 rounded bg-[#1f2a3c] border border-[#2e5bff] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(46,91,255,0.45)]">
                  <Briefcase className="w-4 h-4 text-[#b8c3ff]" />
                </div>

                {/* Connecting Line with Laser Pulse */}
                <div className="timeline-line" />

                {/* Card */}
                <div className="bg-[#152031] p-6 sm:p-8 rounded-xl border border-[#434656] hover:border-[#2e5bff] transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-2xl hover:shadow-[#2e5bff]/10">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2e5bff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 relative z-10">
                    <div>
                      <h3 className="font-sora text-xl sm:text-2xl font-bold text-[#d8e3fb] group-hover:text-[#b8c3ff] transition-colors">
                        {item.company}
                      </h3>
                      <p className="font-mono text-sm text-[#2e5bff] font-medium mt-0.5">
                        {item.role}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#c4c5d9] bg-[#1f2a3c] px-3 py-1.5 rounded border border-[#434656]">
                      <Calendar className="w-3 h-3 text-[#b8c3ff]" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Highlights with code pointers */}
                  <ul className="space-y-3.5 relative z-10 mb-6">
                    {item.highlights.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="list-pointer text-xs sm:text-sm text-[#c4c5d9] leading-relaxed"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Skills tags */}
                  <div className="pt-4 border-t border-[#434656]/60 flex flex-wrap gap-2 relative z-10">
                    {item.skills.map((skill) => (
                      <TechChip key={skill} label={skill} variant="default" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative timeline-item pl-10 md:pl-12 pt-4"
          >
            <div className="absolute left-0 top-5 w-8 h-8 rounded bg-[#1f2a3c] border border-[#8e90a2] flex items-center justify-center z-10">
              <GraduationCap className="w-4 h-4 text-[#c4c5d9]" />
            </div>

            <div className="bg-[#152031] p-6 sm:p-8 rounded-xl border border-[#434656] hover:border-[#b8c3ff]/60 transition-all shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <div>
                  <span className="font-mono text-xs text-[#2e5bff] uppercase tracking-wider">
                    Education & Credentials
                  </span>
                  <h4 className="font-sora text-lg sm:text-xl font-bold text-[#d8e3fb] mt-0.5">
                    {education.institution}
                  </h4>
                </div>

                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#c4c5d9] bg-[#1f2a3c] px-3 py-1.5 rounded border border-[#434656]">
                  <Calendar className="w-3 h-3 text-[#b8c3ff]" />
                  <span>{education.period}</span>
                </div>
              </div>

              <p className="text-sm text-[#c4c5d9]">{education.degree}</p>

              <div className="mt-4 pt-4 border-t border-[#434656]/60 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <span className="text-[#b8c3ff] font-bold px-2.5 py-1 rounded bg-[#1f2a3c] border border-[#434656]">
                  {education.score}
                </span>

                <span className="text-[#8e90a2] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2e5bff]" />
                  {education.location}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar / Impact Stats Column */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Impact Metrics Card with Animated Progress Bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#152031] p-6 rounded-xl border border-[#434656] shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#434656]">
              <TrendingUp className="w-4 h-4 text-[#2e5bff]" />
              <h4 className="font-mono text-xs font-bold text-[#b8c3ff] uppercase tracking-wider">
                Measurable Impact
              </h4>
            </div>

            <div className="space-y-5">
              {impactMetrics.map((metric, mIdx) => (
                <div key={mIdx} className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#c4c5d9]">
                      {metric.label}
                    </span>
                    <span className="font-mono text-base font-bold text-[#b8c3ff]">
                      {metric.value}
                    </span>
                  </div>
                  <div className="w-full bg-[#1f2a3c] h-2 rounded-full overflow-hidden border border-[#434656]/50">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: mIdx * 0.2,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: metric.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#434656] font-mono text-[11px] text-[#8e90a2] flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Verified across production deployments</span>
            </div>
          </motion.div>

          {/* Quick Resume Download CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#152031] to-[#1f2a3c] p-6 rounded-xl border border-[#2e5bff]/40 flex flex-col items-center justify-center text-center gap-4 group hover:border-[#2e5bff] transition-all shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2e5bff]/20 text-[#b8c3ff] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2e5bff] group-hover:text-white transition-all shadow-lg shadow-[#2e5bff]/20">
              <Download className="w-5 h-5" />
            </div>

            <div>
              <h5 className="font-sora text-base font-bold text-[#d8e3fb]">
                Download Comprehensive CV
              </h5>
              <p className="text-xs text-[#c4c5d9] mt-1 font-mono">
                React Native & Native Mobile History (PDF)
              </p>
            </div>

            <a
              href="/Jayesh_Purohit_Resume.pdf"
              download="Jayesh_Purohit_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-2.5 text-xs text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume (PDF)</span>
            </a>
          </motion.div>

          {/* Availability Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-5 rounded-xl bg-[#111c2d] border border-[#434656] text-xs font-mono text-[#c4c5d9] space-y-2 shadow-lg"
          >
            <div className="text-[#b8c3ff] font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#2e5bff]" />
              <span>ENGAGEMENT MODELS:</span>
            </div>
            <p>• Full-Time Remote Contractor</p>
            <p>• Milestone-Based App Delivery</p>
            <p>• Performance & Battery Optimization Audits</p>
          </motion.div>
        </aside>
      </div>
    </section>
  );
};
