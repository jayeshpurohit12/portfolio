"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const InteractiveBackground: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
          if (spotlightRef.current.style.opacity !== "0.35") {
            spotlightRef.current.style.opacity = "0.35";
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* High-Performance GPU Cursor Spotlight (Zero React re-render overhead) */}
      <div
        ref={spotlightRef}
        id="cursor-spotlight"
        className="hidden md:block absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-0 pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(46, 91, 255, 0.35) 0%, rgba(8, 20, 37, 0) 70%)",
        }}
      />

      {/* Floating Constellation Nodes (Desktop Only for Maximum Mobile Speed) */}
      <div className="hidden md:block absolute inset-0 opacity-40">
        {[
          { x: "12%", y: "18%", size: 3, delay: 0 },
          { x: "85%", y: "22%", size: 4, delay: 1 },
          { x: "78%", y: "65%", size: 3, delay: 2 },
          { x: "25%", y: "75%", size: 4, delay: 1.5 },
          { x: "48%", y: "42%", size: 2, delay: 0.5 },
          { x: "92%", y: "88%", size: 3, delay: 2.5 },
        ].map((node, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-[#b8c3ff] shadow-[0_0_10px_#2e5bff]"
            style={{
              left: node.x,
              top: node.y,
              width: `${node.size}px`,
              height: `${node.size}px`,
            }}
            animate={{
              y: ["0px", "-15px", "0px"],
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};
