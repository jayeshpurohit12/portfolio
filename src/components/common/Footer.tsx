import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/common/Icons";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full relative z-10 border-t border-[#434656] bg-[#040e1f]/90 py-12 px-6 md:px-12 mt-24 mb-24 md:mb-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="font-sora font-bold text-lg md:text-xl text-[#d8e3fb] tracking-tight uppercase flex items-center gap-2">
            <span className="text-[#2e5bff] font-mono">&gt;</span>
            JAYESH PUROHIT
          </div>
          <p className="text-xs md:text-sm text-[#c4c5d9] mt-1 font-mono">
            React Native Freelance Engineer & Mobile Architect
          </p>
          <p className="text-xs text-[#8e90a2] mt-1">
            Worldwide Delivery • Remote • Scalable iOS & Android Solutions
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={portfolioData.profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded bg-[#152031] border border-[#434656] text-[#c4c5d9] hover:text-[#b8c3ff] hover:border-[#2e5bff] transition-all"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded bg-[#152031] border border-[#434656] text-[#c4c5d9] hover:text-[#b8c3ff] hover:border-[#2e5bff] transition-all"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.profile.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded bg-[#152031] border border-[#434656] text-[#c4c5d9] hover:text-[#b8c3ff] hover:border-[#2e5bff] transition-all"
            aria-label="Twitter Profile"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.profile.socials.email}
            className="p-2.5 rounded bg-[#152031] border border-[#434656] text-[#c4c5d9] hover:text-[#b8c3ff] hover:border-[#2e5bff] transition-all"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Back to Top & Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2">
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#b8c3ff] hover:text-white transition-colors group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <div className="font-mono text-[11px] text-[#8e90a2]">
            © {new Date().getFullYear()} Jayesh Purohit. Engineered with precision.
          </div>
        </div>
      </div>
    </footer>
  );
};
