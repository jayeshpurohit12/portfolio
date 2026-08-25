import React from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightText?: string;
  description?: string;
  align?: "left" | "center";
  terminalCommand?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlightText,
  description,
  align = "left",
  terminalCommand,
  className = "",
}) => {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex flex-col mb-12 md:mb-16 ${alignment} max-w-3xl ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#152031] border border-[#434656] text-[#b8c3ff] font-mono text-xs uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2e5bff]"></span>
          {badge}
        </div>
      )}

      {terminalCommand && (
        <p className="font-mono text-xs md:text-sm text-[#b8c3ff] mb-2 tracking-wide">
          {terminalCommand}
        </p>
      )}

      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#d8e3fb] leading-tight font-sora">
        {title} {highlightText && <span className="text-[#2e5bff]">{highlightText}</span>}
      </h2>

      {description && (
        <p className="mt-4 text-base md:text-lg text-[#c4c5d9] leading-relaxed font-light">
          {description}
        </p>
      )}
    </div>
  );
};
