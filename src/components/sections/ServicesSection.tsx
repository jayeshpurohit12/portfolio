"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData, ServiceItem } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Smartphone, Zap, Cpu, ArrowRight, Check } from "lucide-react";

export const ServicesSection: React.FC = () => {
  const { services } = portfolioData;

  const iconMap: Record<string, React.ReactNode> = {
    Smartphone: <Smartphone className="w-6 h-6 text-[#b8c3ff]" />,
    Zap: <Zap className="w-6 h-6 text-[#b8c3ff]" />,
    Cpu: <Cpu className="w-6 h-6 text-[#b8c3ff]" />,
  };

  return (
    <section
      id="services"
      className="section-deferred scroll-mt-24 md:scroll-mt-28 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-28"
    >
      {/* Section Header */}
      <SectionHeader
        badge="Freelance Solutions"
        terminalCommand='cat ./offerings.json | jq ".services[]"'
        title="Engineering"
        highlightText="Services."
        description="End-to-end mobile architecture and specialized technical consulting for product teams, funded startups, and enterprises."
      />

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service: ServiceItem, index: number) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -6 }}
            className="glass-panel p-6 sm:p-8 rounded-xl border border-[#434656] hover:border-[#2e5bff] transition-all flex flex-col justify-between group duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#2e5bff]/15"
          >
            <div>
              <div className="p-3 rounded-lg bg-[#1f2a3c] border border-[#2e5bff]/30 w-fit mb-5 group-hover:scale-110 group-hover:border-[#2e5bff] group-hover:bg-[#2e5bff]/20 transition-all">
                {iconMap[service.icon] || (
                  <Smartphone className="w-6 h-6 text-[#b8c3ff]" />
                )}
              </div>

              <span className="font-mono text-xs text-[#2e5bff] uppercase tracking-wider block mb-1">
                {service.subtitle}
              </span>

              <h3 className="font-sora text-xl font-bold text-[#d8e3fb] mb-3 group-hover:text-[#b8c3ff] transition-colors">
                {service.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#c4c5d9] leading-relaxed mb-6 font-light">
                {service.description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#434656]/60">
                <div className="font-mono text-[11px] text-[#8e90a2] uppercase tracking-wider">
                  Deliverables Include:
                </div>
                {service.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-center gap-2 text-xs text-[#d8e3fb]"
                  >
                    <Check className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#434656]/60">
              <a
                href="#contact"
                className="btn-outline w-full text-xs flex items-center justify-center gap-2 group/btn"
              >
                <span>Discuss Scope & Quote</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
