"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { Menu, X, Terminal, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sections = [
      "home",
      "projects",
      "experience",
      "skills",
      "services",
      "contact",
    ];

    const updateActiveSection = () => {
      setScrolled(window.scrollY > 20);

      // If user clicked a nav tab manually, allow smooth scroll to finish
      if (isManualScrollingRef.current) return;

      // Top of page
      if (window.scrollY < 80) {
        setActiveSection("home");
        return;
      }

      // Bottom of page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 150
      ) {
        setActiveSection("contact");
        return;
      }

      // Scan from bottom to top for the lowest section that entered the upper viewport
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 350 && rect.bottom > 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    const handleScrollEnd = () => {
      isManualScrollingRef.current = false;
      updateActiveSection();
    };

    // Run on initial load and timed retries for browser scroll restoration
    const t0 = setTimeout(updateActiveSection, 50);
    const t1 = setTimeout(updateActiveSection, 150);
    const t2 = setTimeout(updateActiveSection, 350);
    const t3 = setTimeout(updateActiveSection, 700);

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd, { passive: true });

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("scrollend", handleScrollEnd);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    setActiveSection(id);
    setIsOpen(false);

    isManualScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80;
      const topPos =
        id === "home"
          ? 0
          : el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: topPos,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 850);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glass-panel border-b border-[#434656]/50 shadow-lg shadow-black/20 py-2.5 sm:py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="flex items-center gap-2.5 sm:gap-3 group text-[#d8e3fb] hover:text-[#b8c3ff] transition-colors"
            aria-label="Jayesh Purohit Portfolio Home"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#2e5bff]/50 bg-[#152031] flex items-center justify-center shrink-0">
              <Image
                src={portfolioData.profile.avatar}
                alt="Jayesh Purohit"
                fill
                sizes="32px"
                className="object-cover object-top group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sora font-bold text-sm sm:text-base md:text-lg tracking-tight uppercase flex items-center gap-1">
                <span className="text-[#2e5bff] font-mono">/</span>
                JAYESH
              </span>
            </div>
          </a>

          {/* Desktop Navigation (Visible on lg+ to prevent tablet cramming) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`px-2.5 xl:px-3 py-1.5 rounded text-xs xl:text-sm font-mono tracking-wide transition-all ${
                    isActive
                      ? "text-[#b8c3ff] bg-[#1f2a3c] border border-[#434656] shadow-sm"
                      : "text-[#c4c5d9] hover:text-[#d8e3fb] hover:bg-[#152031]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA (Visible on lg+) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile & Tablet Hamburger Toggle (Visible below lg) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded text-[#d8e3fb] hover:text-[#b8c3ff] hover:bg-[#152031] transition-colors border border-[#434656] flex items-center justify-center"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#081425]/98 backdrop-blur-2xl pt-20 px-6 flex flex-col justify-between pb-8 overflow-y-auto animate-in fade-in duration-200">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#434656] text-[#b8c3ff] font-mono text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#2e5bff]" />
                <span>NAVIGATION MENU</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-[#c4c5d9] hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`py-3 px-4 rounded-lg font-mono text-sm sm:text-base flex items-center justify-between border transition-colors ${
                  activeSection === link.id
                    ? "bg-[#1f2a3c] border-[#2e5bff] text-[#b8c3ff]"
                    : "border-transparent text-[#d8e3fb] hover:bg-[#152031]"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-[#2e5bff] text-xs font-mono">
                  {activeSection === link.id ? "[ACTIVE]" : "->"}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-[#434656]">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="btn-primary w-full py-3 text-center text-xs sm:text-sm font-mono flex items-center justify-center gap-2"
            >
              <span>Initialize Connection (Hire Me)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="text-center font-mono text-[11px] text-[#8e90a2]">
              Available Worldwide • Remote Engagements
            </div>
          </div>
        </div>
      )}
    </>
  );
};
