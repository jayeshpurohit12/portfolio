import React from "react";
import { generateJsonLd } from "@/config/seo";
import { Navbar } from "@/components/common/Navbar";
import { MobileNav } from "@/components/common/MobileNav";
import { Footer } from "@/components/common/Footer";
import { InteractiveBackground } from "@/components/common/InteractiveBackground";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";

function safeJsonLd(schema: Record<string, unknown>) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function Home() {
  const { personSchema, serviceSchema, faqSchema, webSiteSchema } =
    generateJsonLd();

  return (
    <>
      {/* Structured Data JSON-LD for Worldwide Google Search, Knowledge Graph & FAQ Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(webSiteSchema) }}
      />

      {/* Interactive Cursor Spotlight & Constellation Particles */}
      <InteractiveBackground />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Canvas */}
      <main className="flex-grow w-full flex flex-col relative overflow-hidden">
        {/* Ambient Glows and Grid Background */}
        <div className="absolute inset-0 bg-grid-premium pointer-events-none z-0" />
        <div className="bg-glow-orb-1" />
        <div className="bg-glow-orb-2" />

        {/* Hero Section with Interactive Terminal & Floating Badges */}
        <HeroSection />

        {/* Featured Projects with 3D Tilt & Floating Hardware */}
        <ProjectsSection />

        {/* Experience & Journey Timeline with Laser Pulse Energy */}
        <ExperienceSection />

        {/* System Capabilities & Skills Bento Grid */}
        <SkillsSection />

        {/* Freelance Engineering Services */}
        <ServicesSection />

        {/* Terminal Connection / Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Dock Navigation */}
      <MobileNav />
    </>
  );
}
