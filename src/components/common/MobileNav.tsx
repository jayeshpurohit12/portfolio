"use client";

import React, { useState, useEffect, useRef } from "react";
import { Home, Layers, History, Terminal, Send } from "lucide-react";

export const MobileNav: React.FC = () => {
  const [active, setActive] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) return hash;
    }
    return "home";
  });
  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sections = ["home", "projects", "experience", "skills", "contact"];

    const updateActive = () => {
      // If user clicked a nav tab manually, allow smooth scroll to finish
      if (isManualScrollingRef.current) return;

      // Top of page
      if (window.scrollY < 80) {
        setActive("home");
        return;
      }

      // Bottom of page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 150
      ) {
        setActive("contact");
        return;
      }

      // Scan from bottom to top for the lowest section that entered the upper viewport
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 350 && rect.bottom > 100) {
            setActive(sections[i]);
            break;
          }
        }
      }
    };

    const handleScrollEnd = () => {
      isManualScrollingRef.current = false;
      updateActive();
    };

    // Run on initial load and timed retries for browser scroll restoration
    const t0 = setTimeout(updateActive, 0);
    const t1 = setTimeout(updateActive, 100);
    const t2 = setTimeout(updateActive, 350);
    const t3 = setTimeout(updateActive, 700);

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd, { passive: true });

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("scrollend", handleScrollEnd);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    setActive(id);

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

  const items = [
    { id: "home", label: "Home", icon: Home, href: "#home" },
    { id: "projects", label: "Projects", icon: Layers, href: "#projects" },
    { id: "experience", label: "Timeline", icon: History, href: "#experience" },
    { id: "skills", label: "Skills", icon: Terminal, href: "#skills" },
    { id: "contact", label: "Contact", icon: Send, href: "#contact" },
  ];

  return (
    <nav
      className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-40 md:hidden glass-panel border border-[#434656] rounded-2xl shadow-2xl py-2 px-3 transition-all"
      aria-label="Mobile Navigation Dock"
    >
      <div className="flex justify-around items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? "text-[#b8c3ff] bg-[#1f2a3c] scale-105 shadow-sm"
                  : "text-[#c4c5d9] hover:text-[#d8e3fb]"
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="font-mono text-[9px] tracking-tight">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
