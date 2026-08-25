"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { TerminalSimulator } from "@/components/common/TerminalSimulator";
import { ArrowRight, Terminal, Smartphone, Cpu } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="scroll-mt-28 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 md:pb-28 flex flex-col items-center justify-center text-center min-h-[85vh]"
    >
      {/* Floating 3D Orbiting Badges (Visible on XL+ screens with safe margins) */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none overflow-hidden">
        {/* Badge 1: React Native */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-4 xl:left-8 2xl:left-16 glass-panel px-3.5 py-1.5 rounded-lg border border-[#2e5bff]/50 shadow-lg shadow-[#2e5bff]/10 flex items-center gap-2 text-xs font-mono text-[#b8c3ff] pointer-events-auto hover:scale-105 transition-transform"
        >
          <span className="w-2 h-2 rounded-full bg-[#2e5bff] animate-pulse" />
          <span>&lt;ReactNative /&gt;</span>
        </motion.div>

        {/* Badge 2: Swift Native Bridge */}
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [0, -2, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-4 xl:right-8 2xl:right-16 glass-panel px-3.5 py-1.5 rounded-lg border border-[#434656] shadow-lg flex items-center gap-2 text-xs font-mono text-[#efefff] pointer-events-auto hover:scale-105 transition-transform"
        >
          <Cpu className="w-3.5 h-3.5 text-[#2e5bff]" />
          <span>Swift.TurboModule()</span>
        </motion.div>

        {/* Badge 3: 60 FPS Target */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-52 left-6 xl:left-10 2xl:left-20 glass-panel px-3 py-1.5 rounded-lg border border-[#22c55e]/40 shadow-lg flex items-center gap-2 text-xs font-mono text-[#22c55e] pointer-events-auto hover:scale-105 transition-transform"
        >
          <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
          <span>60 FPS Fluid UI</span>
        </motion.div>

        {/* Badge 4: Offline-First */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-56 right-6 xl:right-10 2xl:right-20 glass-panel px-3 py-1.5 rounded-lg border border-[#b8c3ff]/40 shadow-lg flex items-center gap-2 text-xs font-mono text-[#b8c3ff] pointer-events-auto hover:scale-105 transition-transform"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#2e5bff]" />
          <span>100% Offline-First</span>
        </motion.div>
      </div>

      {/* Availability Status Badge with Mobile-Safe Margins */}
      <div className="hero-animate-1 mb-5 sm:mb-8 inline-flex items-center gap-2 sm:gap-2.5 glass-panel px-3 sm:px-4 py-1.5 rounded-full text-[#b8c3ff] font-mono text-xs sm:text-sm tracking-wide border border-[#434656] shadow-sm hover:border-[#2e5bff] transition-all max-w-[92vw] sm:max-w-none mx-auto">
        <div className="relative w-5 h-5 rounded-full overflow-hidden border border-[#2e5bff] shrink-0 bg-[#152031]">
          <Image
            src={portfolioData.profile.avatar}
            alt="Jayesh Purohit"
            fill
            sizes="20px"
            priority
            className="object-cover object-top"
          />
        </div>
        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2e5bff] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#2e5bff]"></span>
        </span>
        <span className="hidden sm:inline truncate">
          System Status: Available for Freelance & Contract
        </span>
        <span className="sm:hidden text-xs truncate">
          Available for Freelance & Contract
        </span>
      </div>

      {/* Main Hero Headline with Mobile Wrap Protection */}
      <h1 className="hero-animate-2 font-sora text-[28px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.18] text-[#d8e3fb] mb-5 sm:mb-8 max-w-4xl tracking-tight px-1">
        Engineering <br className="hidden sm:block" />
        <span className="text-gradient-premium">High-Performance</span>{" "}
        <br className="hidden sm:block" />
        Mobile Experiences.
        <span className="sr-only">
          {" "}
          — Freelance React Native & Mobile App Engineer for Hire Worldwide
        </span>
      </h1>

      {/* Hero Subtitle / Value Proposition */}
      <p className="hero-animate-3 text-xs sm:text-base md:text-lg lg:text-xl text-[#c4c5d9] max-w-3xl mx-auto mb-7 sm:mb-10 leading-relaxed font-light px-2">
        Helping startups and global enterprises build scalable,
        battery-efficient, and cross-platform apps that users love. Specializing
        in{" "}
        <strong className="text-[#d8e3fb] font-semibold">React Native</strong>,{" "}
        <strong className="text-[#d8e3fb] font-semibold">TypeScript</strong>,
        and{" "}
        <strong className="text-[#d8e3fb] font-semibold">
          Native Swift/Kotlin Bridges
        </strong>
        .
      </p>

      {/* CTA Buttons */}
      <div className="hero-animate-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mb-10 sm:mb-14 w-full sm:w-auto px-2 sm:px-0">
        <a
          href="#projects"
          className="btn-primary w-full sm:w-auto px-7 py-3.5 text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2.5 group shadow-lg"
        >
          <span>Explore Projects</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <a
          href="#contact"
          className="btn-outline w-full sm:w-auto px-7 py-3.5 text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2"
        >
          <Terminal className="w-4 h-4 text-[#2e5bff]" />
          <span>Hire Me (Get Quote)</span>
        </a>
      </div>

      {/* Live Interactive Code Terminal / Telemetry Simulator */}
      <div className="hero-animate-5 w-full mb-10 sm:mb-16 px-1 sm:px-0">
        <TerminalSimulator />
      </div>

      {/* Highlights Bar with Metric Cards */}
      <div className="hero-animate-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-5xl mx-auto">
        {portfolioData.stats.map((stat, index) => (
          <div
            key={index}
            className="glass-panel p-4 sm:p-5 md:p-6 rounded-xl border border-[#434656] flex flex-col items-center justify-center text-center group hover:border-[#2e5bff] transition-all hover:-translate-y-1 duration-300"
          >
            <span className="font-sora text-2xl sm:text-3xl md:text-4xl text-[#b8c3ff] font-bold mb-1 tracking-tight group-hover:text-white transition-colors">
              {stat.value}
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-[#d8e3fb] font-semibold uppercase tracking-wider mb-0.5 sm:mb-1">
              {stat.label}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#8e90a2] font-mono leading-tight">
              {stat.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
