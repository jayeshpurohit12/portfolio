import React from "react";

interface TechChipProps {
  label: string;
  tag?: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "outline";
  className?: string;
}

export const TechChip: React.FC<TechChipProps> = ({
  label,
  tag,
  icon,
  variant = "default",
  className = "",
}) => {
  const variantStyles = {
    default: "bg-[#1f2a3c] border-[#434656] text-[#d8e3fb] hover:border-[#b8c3ff]",
    primary: "bg-[#152031] border-[#2e5bff]/40 text-[#b8c3ff] hover:border-[#2e5bff]",
    outline: "bg-transparent border-[#434656] text-[#c4c5d9] hover:border-[#b8c3ff] hover:text-[#d8e3fb]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono tracking-wide border transition-all duration-200 ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="text-xs opacity-80">{icon}</span>}
      <span>{label}</span>
      {tag && (
        <span className="text-[10px] px-1 py-0.5 rounded bg-[#2a3548] text-[#b8c3ff] font-sans font-medium">
          {tag}
        </span>
      )}
    </span>
  );
};
