"use client";

import React from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { Sparkles, ChevronDown } from "lucide-react";

interface WelcomeProps {
  isOpen: boolean;
  onEnter: () => void;
  onSkip: () => void;
}

export function Welcome({ isOpen, onEnter, onSkip }: WelcomeProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-center bg-radial-at-c from-[#10172D]/85 via-[#10172D]/95 to-[#0A0E1A] backdrop-blur-xl transition-opacity duration-1000"
      role="dialog"
      aria-label="Welcome to Bhaiya's Birthday World"
    >
      <div className="max-w-xl mx-auto space-y-6">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171D35]/80 border border-[#F5C86A]/30 text-xs font-semibold tracking-widest text-[#F5C86A] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#F5C86A]" />
          <span>{BIRTHDAY_CONFIG.welcome.eyebrow}</span>
        </div>

        {/* Cinematic Heading */}
        <h1 className="text-5xl sm:text-7xl font-serif font-bold text-[#FAF0E1] tracking-tight leading-none drop-shadow-lg">
          {BIRTHDAY_CONFIG.welcome.heading}
        </h1>

        {/* Warm supporting text */}
        <p className="text-base sm:text-lg text-[#FAF0E1]/85 font-sans leading-relaxed max-w-md mx-auto">
          {BIRTHDAY_CONFIG.welcome.text}
        </p>

        {/* Primary Action Button */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            onClick={onEnter}
            className="btn-gold !text-base !px-8 !py-3.5 shadow-[0_0_35px_rgba(245,200,106,0.45)] hover:shadow-[0_0_50px_rgba(245,200,106,0.7)]"
          >
            <span>{BIRTHDAY_CONFIG.welcome.buttonText}</span>
          </button>

          <button
            onClick={onSkip}
            className="text-xs text-[#FAF0E1]/60 hover:text-[#F5C86A] underline underline-offset-4 py-2 transition-colors"
          >
            {BIRTHDAY_CONFIG.welcome.skipText}
          </button>
        </div>

        {/* Gentle bouncing indicator */}
        <div className="pt-6 text-[#F5C86A]/70 flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
