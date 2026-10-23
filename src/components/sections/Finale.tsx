"use client";

import React from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { RotateCcw, Image as ImageIcon, Heart } from "lucide-react";

interface FinaleProps {
  onRestartExperience: () => void;
  onBackToMemories: () => void;
}

export function Finale({
  onRestartExperience,
  onBackToMemories,
}: FinaleProps) {
  return (
    <section
      id="finale"
      className="relative min-h-[100svh] flex flex-col justify-center items-center px-4 sm:px-8 py-24 max-w-4xl mx-auto z-10 text-center"
      aria-label="Grand Birthday Finale"
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Glowing Grand Heading */}
        <h1 className="text-4xl sm:text-7xl font-serif font-bold text-[#F5C86A] drop-shadow-[0_0_35px_rgba(245,200,106,0.4)] leading-tight">
          {BIRTHDAY_CONFIG.finale.heading}
        </h1>

        {/* Supporting Message */}
        <p className="text-base sm:text-xl text-[#FAF0E1]/90 font-sans leading-relaxed max-w-xl mx-auto">
          {BIRTHDAY_CONFIG.finale.supportingMessage}
        </p>

        {/* Radhee Signature */}
        <div className="pt-2 font-hand text-2xl sm:text-3xl text-[#FAF0E1] flex items-center justify-center gap-2">
          <span>{BIRTHDAY_CONFIG.finale.signature}</span>
          <Heart className="w-5 h-5 fill-[#8F5146] text-[#8F5146] inline" />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <button
            onClick={onRestartExperience}
            className="btn-gold !text-base !px-7 !py-3.5 shadow-[0_0_30px_rgba(245,200,106,0.35)]"
          >
            <RotateCcw className="w-4 h-4 text-[#10172D]" />
            <span>{BIRTHDAY_CONFIG.finale.restartButtonText}</span>
          </button>

          <button
            onClick={onBackToMemories}
            className="btn-ghost !text-base !px-7 !py-3.5"
          >
            <ImageIcon className="w-4 h-4" />
            <span>{BIRTHDAY_CONFIG.finale.backToMemoriesButtonText}</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="pt-20 text-xs sm:text-sm text-[#FAF0E1]/60 font-sans">
          <p>{BIRTHDAY_CONFIG.finale.footerText}</p>
        </footer>
      </div>
    </section>
  );
}
