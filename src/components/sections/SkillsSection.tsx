"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TechChip } from "@/components/common/TechChip";
import {
  Terminal,
  Code2,
  Smartphone,
  Trophy,
  Wrench,
  CheckCircle2,
} from "lucide-react";

export const SkillsSection: React.FC = () => {
  const { skillsCategories, achievements } = portfolioData;

  const coreLanguages =
    skillsCategories.find((c) => c.title === "Core Languages")?.skills || [];
  const mobileFrontend =
    skillsCategories.find((c) => c.title === "Mobile & Frontend")?.skills || [];
  const devopsTools =
    skillsCategories.find((c) => c.title === "DevOps & Tooling")?.skills || [];

  return (
    <section
      id="skills"
      className="section-deferred scroll-mt-24 md:scroll-mt-28 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-28"
    >
      {/* Section Header */}
      <SectionHeader
        badge="System Capabilities"
        terminalCommand="npx capabilities --audit --deep"
        title="System"
        highlightText="<Capabilities/>"
        description="Architecting ultra-responsive mobile applications, robust state systems, high-speed data pipelines, and native platform bindings."
      />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Core Languages (Span 2 on lg) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6 sm:p-8 rounded-xl border border-[#434656] lg:col-span-2 relative overflow-hidden group hover:border-[#2e5bff] transition-all shadow-xl hover:shadow-2xl hover:shadow-[#2e5bff]/15"
        >
          {/* Subtle Ambient Watermark */}
          <div className="absolute top-2 right-2 p-4 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none group-hover:scale-110 duration-500">
            <Code2 className="w-32 h-32 text-[#b8c3ff]" />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[#1f2a3c] border border-[#2e5bff]/40 text-[#b8c3ff] group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora text-xl font-bold text-[#d8e3fb] group-hover:text-[#b8c3ff] transition-colors">
                Core Programming Languages
              </h3>
              <p className="font-mono text-xs text-[#c4c5d9]">
                Typed, memory-safe, and native platform languages
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 relative z-10">
            {coreLanguages.map((skill) => (
              <TechChip
                key={skill.name}
                label={skill.name}
                tag={skill.tag}
                variant="primary"
                className="py-1.5 px-3 text-xs"
              />
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#434656]/50 flex items-center gap-2 font-mono text-xs text-[#c4c5d9]">
            <span className="text-[#2e5bff] font-bold">&gt;</span>
            <span>
              Bridging Javascript & Native Swift/Kotlin via TurboModules & JSI.
            </span>
          </div>
        </motion.div>

        {/* Card 2: Notable Achievement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-panel p-6 sm:p-8 rounded-xl border border-[#434656] lg:col-span-1 flex flex-col justify-between hover:border-[#b8c3ff] transition-all bg-gradient-to-br from-[#152031] to-[#1f2a3c] shadow-xl group"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#2e5bff]/20 text-[#b8c3ff] font-mono text-xs mb-4 border border-[#2e5bff]/30 group-hover:border-[#2e5bff] transition-colors">
              <Trophy className="w-3.5 h-3.5 text-[#b8c3ff] group-hover:scale-110 transition-transform" />
              <span>Notable Recognition</span>
            </div>

            <h4 className="font-sora text-lg font-bold text-[#d8e3fb] mb-2 group-hover:text-[#b8c3ff] transition-colors">
              {achievements[0].title}
            </h4>

            <p className="text-xs sm:text-sm text-[#c4c5d9] leading-relaxed">
              {achievements[0].description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#434656]/50 font-mono text-xs text-[#22c55e] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{achievements[0].badge}</span>
          </div>
        </motion.div>

        {/* Card 3: Mobile & Frontend Ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel p-6 sm:p-8 rounded-xl border border-[#434656] lg:col-span-2 hover:border-[#2e5bff] transition-all shadow-xl group"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[#1f2a3c] border border-[#2e5bff]/40 text-[#b8c3ff] group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora text-xl font-bold text-[#d8e3fb] group-hover:text-[#b8c3ff] transition-colors">
                Mobile & Frontend Architecture
              </h3>
              <p className="font-mono text-xs text-[#c4c5d9]">
                State management, rendering optimization, navigation, stores
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs sm:text-sm text-[#c4c5d9]">
            {mobileFrontend.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 p-2.5 rounded bg-[#1f2a3c]/60 border border-[#434656]/60 hover:border-[#b8c3ff] hover:bg-[#1f2a3c] transition-all hover:translate-x-1 duration-200"
              >
                <span className="text-[#2e5bff] font-bold">-&gt;</span>
                <span className="text-[#d8e3fb]">{skill.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 4: DevOps, Tooling & Testing */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-panel p-6 sm:p-8 rounded-xl border border-[#434656] lg:col-span-1 hover:border-[#2e5bff] transition-all shadow-xl group"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[#1f2a3c] border border-[#2e5bff]/40 text-[#b8c3ff] group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora text-xl font-bold text-[#d8e3fb] group-hover:text-[#b8c3ff] transition-colors">
                DevOps & Tooling
              </h3>
              <p className="font-mono text-xs text-[#c4c5d9]">
                CI/CD, QA, native IDEs
              </p>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs text-[#c4c5d9]">
            {devopsTools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2 p-2 rounded bg-[#1f2a3c]/40 hover:bg-[#1f2a3c] border border-transparent hover:border-[#434656] transition-all hover:translate-x-1 duration-200"
              >
                <span className="text-[#b8c3ff]">&gt;</span>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
