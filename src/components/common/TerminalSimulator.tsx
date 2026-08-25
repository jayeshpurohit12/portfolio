"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Check } from "lucide-react";

export const TerminalSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "architecture" | "bridge" | "profiler"
  >("architecture");
  const [fps, setFps] = useState(60);
  const [batterySave, setBatterySave] = useState(32);

  // Simulated telemetry fluctuations (Deferred to eliminate Total Blocking Time on mobile load)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setFps(59 + Math.floor(Math.random() * 2));
        setBatterySave(30 + Math.floor(Math.random() * 5));
      }, 3000);
    }, 4000);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl bg-[#081425]/95 border border-[#434656] shadow-2xl overflow-hidden backdrop-blur-xl relative group hover:border-[#2e5bff] transition-all">
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#111c2d] border-b border-[#434656]/70 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]/80" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]/80" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]/80" />
          </div>
          <span className="text-[11px] sm:text-xs font-mono text-[#8e90a2] ml-1.5 hidden md:inline">
            jayesh@macbook-pro: ~/react-native-engine
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-mono transition-colors whitespace-nowrap ${
              activeTab === "architecture"
                ? "bg-[#1f2a3c] text-[#b8c3ff] border border-[#2e5bff]/40"
                : "text-[#8e90a2] hover:text-[#d8e3fb]"
            }`}
          >
            Architecture.ts
          </button>
          <button
            onClick={() => setActiveTab("bridge")}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-mono transition-colors whitespace-nowrap ${
              activeTab === "bridge"
                ? "bg-[#1f2a3c] text-[#b8c3ff] border border-[#2e5bff]/40"
                : "text-[#8e90a2] hover:text-[#d8e3fb]"
            }`}
          >
            NativeBridge.swift
          </button>
          <button
            onClick={() => setActiveTab("profiler")}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-mono transition-colors flex items-center gap-1 whitespace-nowrap ${
              activeTab === "profiler"
                ? "bg-[#1f2a3c] text-[#22c55e] border border-[#22c55e]/40"
                : "text-[#8e90a2] hover:text-[#d8e3fb]"
            }`}
          >
            <Activity className="w-3 h-3 text-[#22c55e]" />
            Profiler
          </button>
        </div>
      </div>

      {/* Code / Simulation Body */}
      <div className="p-3.5 sm:p-5 font-mono text-[11px] sm:text-xs text-[#d8e3fb] min-h-[170px] flex flex-col justify-between overflow-x-auto text-left">
        <AnimatePresence mode="wait">
          {activeTab === "architecture" && (
            <motion.div
              key="arch"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-1.5 leading-relaxed"
            >
              <div className="text-[#8e90a2]">
                {"// 1. TurboModule JSI Architecture"}
              </div>
              <div className="text-[#b8c3ff] break-words">
                <span className="text-[#ffb4ab]">export async function</span>{" "}
                <span className="text-[#efefff] font-bold">
                  initLocationEngine
                </span>
                (<span className="text-[#c5c6ce]">options</span>:{" "}
                <span className="text-[#2e5bff]">EngineConfig</span>) &#123;
              </div>
              <div className="pl-3 sm:pl-4 text-[#c4c5d9] break-words">
                <span className="text-[#ffb4ab]">const</span> engine ={" "}
                <span className="text-[#2e5bff]">TurboModuleRegistry</span>
                .get(&quot;GPSTracker&quot;);
              </div>
              <div className="pl-3 sm:pl-4 text-[#c4c5d9] break-words">
                <span className="text-[#ffb4ab]">await</span>{" "}
                engine.enablePathSmoothing(&#123; algorithm:{" "}
                <span className="text-[#22c55e]">
                  &quot;Ramer-Douglas-Peucker&quot;
                </span>{" "}
                &#125;);
              </div>
              <div className="pl-3 sm:pl-4 text-[#22c55e] break-words">
                return &#123; fpsTarget: 60, batteryOptimization:
                &quot;ACTIVE&quot; &#125;;
              </div>
              <div className="text-[#b8c3ff]">&#125;</div>
            </motion.div>
          )}

          {activeTab === "bridge" && (
            <motion.div
              key="bridge"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-1.5 leading-relaxed"
            >
              <div className="text-[#8e90a2]">
                {"// 2. High-Performance Swift Bridge"}
              </div>
              <div className="text-[#ffb4ab]">@objc(GPSTracker)</div>
              <div className="text-[#b8c3ff] break-words">
                <span className="text-[#ffb4ab]">public class</span>{" "}
                <span className="text-[#efefff] font-bold">GPSTracker</span>:{" "}
                <span className="text-[#2e5bff]">NSObject</span> &#123;
              </div>
              <div className="pl-3 sm:pl-4 text-[#c4c5d9] break-words">
                <span className="text-[#ffb4ab]">@objc public func</span>{" "}
                optimizeBatteryPolling() -&gt;{" "}
                <span className="text-[#2e5bff]">Void</span> &#123;
              </div>
              <div className="pl-6 sm:pl-8 text-[#22c55e] break-words">
                locationManager.allowsBackgroundLocationUpdates = true
              </div>
              <div className="pl-6 sm:pl-8 text-[#22c55e] break-words">
                locationManager.pausesLocationUpdatesAutomatically = true
              </div>
              <div className="pl-3 sm:pl-4 text-[#b8c3ff]">&#125;</div>
              <div className="text-[#b8c3ff]">&#125;</div>
            </motion.div>
          )}

          {activeTab === "profiler" && (
            <motion.div
              key="prof"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#434656]/50">
                <span className="text-[#8e90a2]">
                  REAL-TIME TELEMETRY PROFILER
                </span>
                <span className="inline-flex items-center gap-1 text-[#22c55e]">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
                  ONLINE
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded bg-[#152031] border border-[#434656] text-center">
                  <div className="text-[9px] sm:text-[10px] text-[#8e90a2] truncate">
                    UI RENDER RATE
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#22c55e]">
                    {fps} FPS
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 rounded bg-[#152031] border border-[#434656] text-center">
                  <div className="text-[9px] sm:text-[10px] text-[#8e90a2] truncate">
                    BATTERY DRAIN
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#2e5bff]">
                    -{batterySave}%
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 rounded bg-[#152031] border border-[#434656] text-center">
                  <div className="text-[9px] sm:text-[10px] text-[#8e90a2] truncate">
                    CRASH STABILITY
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#b8c3ff]">
                    99.9%
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terminal Bottom Output Status */}
        <div className="pt-2.5 sm:pt-3 mt-3 border-t border-[#434656]/50 flex flex-col sm:flex-row gap-1.5 sm:gap-0 items-start sm:items-center justify-between text-[10px] sm:text-[11px] text-[#8e90a2]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#2e5bff] font-bold">&gt;</span>
            <span className="text-[#d8e3fb] truncate">
              Bundle size: 1.8MB • Native Modules Linked
            </span>
          </div>
          <span className="text-[#22c55e] flex items-center gap-1 shrink-0">
            <Check className="w-3 h-3" />
            Production Shipped
          </span>
        </div>
      </div>
    </div>
  );
};
