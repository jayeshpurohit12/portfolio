"use client";

import React, { useRef, useState, useCallback } from "react";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = "",
  maxTilt = 12,
  glareOpacity = 0.25,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = (mouseX / width) * 100;
      const yPct = (mouseY / height) * 100;

      // Calculate tilt: mouseX controls Y rotation, mouseY controls X rotation
      const rotateY = ((mouseX - width / 2) / (width / 2)) * maxTilt;
      const rotateX = -((mouseY - height / 2) / (height / 2)) * maxTilt;

      setTilt({ x: rotateX, y: rotateY });
      setGlarePos({ x: xPct, y: yPct });
    },
    [maxTilt],
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateZ(10px)`
          : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
      }}
    >
      {/* 3D Specular Glare Layer */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-xl z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(46, 91, 255, ${glareOpacity}) 0%, rgba(56, 189, 248, ${glareOpacity * 0.5}) 25%, transparent 65%)`,
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* Card Content with 3D Depth */}
      <div
        style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
};
