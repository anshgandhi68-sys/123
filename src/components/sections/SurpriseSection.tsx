"use client";

import React from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { Sparkles, Gift, Heart, RotateCcw, ArrowRight } from "lucide-react";

interface SurpriseSectionProps {
  isRevealed: boolean;
  onOpenGift: () => void;
  onReplayGift: () => void;
  onContinue: () => void;
}

export function SurpriseSection({
  isRevealed,
  onOpenGift,
  onReplayGift,
  onContinue,
}: SurpriseSectionProps) {
  return (
    <section
      id="surprise"
      className="relative min-h-[100svh] flex flex-col justify-center items-center px-4 sm:px-8 py-24 max-w-4xl mx-auto z-10 text-center"
      aria-label="The Secret Birthday Surprise"
    >
      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171D35]/80 border border-[#F5C86A]/25 text-xs font-semibold tracking-widest text-[#F5C86A] uppercase">
          <Gift className="w-3.5 h-3.5 text-[#F5C86A]" />
          <span>The Secret Surprise</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF0E1]">
          {BIRTHDAY_CONFIG.surprise.title}
        </h2>

        <p className="font-hand text-xl sm:text-2xl text-[#F5C86A]">
          {BIRTHDAY_CONFIG.surprise.handwrittenTag}
        </p>
      </div>

      {/* Trigger Button or Revealed Message Card */}
      {!isRevealed ? (
        <div className="pt-24 sm:pt-36">
          <button
            onClick={onOpenGift}
            className="btn-gold !text-base !px-8 !py-3.5 shadow-[0_0_35px_rgba(245,200,106,0.5)] hover:shadow-[0_0_55px_rgba(245,200,106,0.8)] animate-pulse"
          >
            <Sparkles className="w-5 h-5 text-[#10172D]" />
            <span>{BIRTHDAY_CONFIG.surprise.buttonText}</span>
          </button>
        </div>
      ) : (
        /* Revealed Final Message Card */
        <div className="glass-panel p-6 sm:p-10 max-w-2xl text-left border-[#F5C86A]/40 shadow-[0_0_60px_rgba(245,200,106,0.25)] animate-in fade-in zoom-in-95 duration-700">
          <div className="space-y-4 font-serif text-base sm:text-xl text-[#FAF0E1] leading-relaxed">
            {BIRTHDAY_CONFIG.surprise.finalMessageParagraphs.map((para, i) => (
              <p
                key={i}
                className={i === 0 ? "text-2xl sm:text-3xl font-bold text-[#F5C86A]" : ""}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Sweet Sign-off */}
          <div className="pt-6 border-t border-[#F5C86A]/20 mt-6 flex items-center justify-between flex-wrap gap-4">
            <p className="font-hand text-xl sm:text-2xl text-[#F5C86A] flex items-center gap-1.5">
              <span>{BIRTHDAY_CONFIG.surprise.signOff}</span>
              <Heart className="w-4 h-4 fill-[#F5C86A]" />
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-6">
            <button
              onClick={onReplayGift}
              className="btn-ghost !text-xs !py-2 !px-4"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{BIRTHDAY_CONFIG.surprise.replayButtonText}</span>
            </button>

            <button
              onClick={onContinue}
              className="btn-gold !text-sm !py-2.5 !px-5 shadow-lg"
            >
              <span>{BIRTHDAY_CONFIG.surprise.continueButtonText}</span>
              <ArrowRight className="w-4 h-4 text-[#10172D]" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
