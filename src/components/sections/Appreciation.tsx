"use client";

import React, { useState } from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { soundEngine } from "@/lib/audio";
import { ShieldCheck, Laugh, Sparkles, Home, Heart, ChevronDown } from "lucide-react";

export function Appreciation() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const icons: Record<string, any> = {
    ShieldHeart: ShieldCheck,
    Smile: Laugh,
    Sparkles: Sparkles,
    Home: Home,
    Heart: Heart,
  };

  const handleToggle = (id: string) => {
    if (expandedId !== id) {
      soundEngine.playSparkle();
      setExpandedId(id);
    } else {
      setExpandedId(null);
    }
  };

  return (
    <section
      id="special"
      className="relative min-h-[100svh] flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-24 max-w-7xl mx-auto z-10"
      aria-label="Why You're Special"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171D35]/80 border border-[#F5C86A]/25 text-xs font-semibold tracking-widest text-[#F5C86A] uppercase">
          <Heart className="w-3.5 h-3.5 text-[#F5C86A]" />
          <span>Infinite Reasons</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF0E1]">
          {BIRTHDAY_CONFIG.specialQualities.title}
        </h2>

        <p className="text-sm sm:text-base text-[#FAF0E1]/80 font-sans">
          {BIRTHDAY_CONFIG.specialQualities.instruction}
        </p>
      </div>

      {/* 5 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        {BIRTHDAY_CONFIG.specialQualities.items.map((item, idx) => {
          const IconComponent = icons[item.iconName] || Heart;
          const isExpanded = expandedId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`text-left p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                isExpanded
                  ? "bg-[#171D35] border-[#F5C86A] shadow-[0_0_35px_rgba(245,200,106,0.25)] ring-1 ring-[#F5C86A]"
                  : "bg-[#171D35]/75 border-[#F5C86A]/20 hover:border-[#F5C86A]/50 shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:-translate-y-1"
              }`}
              aria-expanded={isExpanded}
            >
              {/* Card Index & Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#252744] border border-[#F5C86A]/30 text-[#F5C86A]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-[#F5C86A]/60">
                  0{idx + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif font-semibold text-[#FAF0E1] mb-2 group-hover:text-[#F5C86A]">
                {item.title}
              </h3>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-[#FAF0E1]/85 font-sans leading-relaxed pt-2 border-t border-[#F5C86A]/15">
                  {item.message}
                </p>
              </div>

              {/* Tap to expand hint */}
              <div className="flex items-center justify-between text-xs text-[#F5C86A]/80 font-sans mt-3">
                <span>{isExpanded ? "Tap to close" : "Tap to read ✦"}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isExpanded ? "rotate-180 text-[#F5C86A]" : ""
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
