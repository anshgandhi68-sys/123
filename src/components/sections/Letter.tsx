"use client";

import React, { useState, useEffect } from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { soundEngine } from "@/lib/audio";
import { Mail, Sparkles, Heart } from "lucide-react";

export function Letter() {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState<number>(0);
  const totalParagraphs = BIRTHDAY_CONFIG.letter.paragraphs.length;

  const handleOpenLetter = () => {
    setIsOpen(true);
    soundEngine.playPaperRustle();
    soundEngine.playSparkle();
  };

  const handleShowAll = () => {
    setRevealedParagraphs(totalParagraphs);
  };

  // Progressive reveal of paragraphs
  useEffect(() => {
    if (!isOpen || revealedParagraphs >= totalParagraphs) return;

    const timer = setTimeout(() => {
      setRevealedParagraphs((prev) => prev + 1);
    }, 900);

    return () => clearTimeout(timer);
  }, [isOpen, revealedParagraphs, totalParagraphs]);

  return (
    <section
      id="letter"
      className="relative min-h-[100svh] flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-24 max-w-4xl mx-auto z-10"
      aria-label="A Letter From Radhee"
    >
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171D35]/80 border border-[#F5C86A]/25 text-xs font-semibold tracking-widest text-[#F5C86A] uppercase">
          <Mail className="w-3.5 h-3.5" />
          <span>From the Heart</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF0E1]">
          {BIRTHDAY_CONFIG.letter.title}
        </h2>

        <p className="text-sm sm:text-base text-[#FAF0E1]/80 font-sans">
          {BIRTHDAY_CONFIG.letter.subtitle}
        </p>
      </div>

      {/* Interactive Envelope */}
      {!isOpen ? (
        <div className="flex flex-col items-center">
          <div className="relative w-72 sm:w-80 h-48 bg-[#F1E2C8] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#E0CFB2] flex items-center justify-center animate-float group cursor-pointer"
               onClick={handleOpenLetter}>
            {/* Envelope Flap */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-[#E6D3B1] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-md" />

            {/* Golden Wax Seal */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-tr from-[#C9962F] via-[#FFE08C] to-[#C9962F] shadow-[0_4px_12px_rgba(0,0,0,0.4)] flex items-center justify-center text-[#7A4A10] font-bold text-lg border border-[#F5C86A] group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 fill-[#7A4A10]" />
            </div>

            {/* Note on envelope */}
            <div className="absolute bottom-4 font-hand text-sm text-[#5C3A21] px-4 text-center">
              {BIRTHDAY_CONFIG.letter.envelopeNote}
            </div>
          </div>

          {/* Open Button */}
          <div className="mt-8">
            <button
              onClick={handleOpenLetter}
              className="btn-gold !text-base shadow-[0_0_25px_rgba(245,200,106,0.35)]"
            >
              <Sparkles className="w-4 h-4 text-[#10172D]" />
              <span>{BIRTHDAY_CONFIG.letter.openButtonText}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Unfolded Letter on Warm Cream Paper */
        <div className="relative bg-[#FAF0E1] text-[#3B2620] rounded-xl p-6 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.6)] border border-[#EAD8BD] font-serif leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Top Skip / Full letter shortcut */}
          {revealedParagraphs < totalParagraphs && (
            <div className="absolute top-4 right-5">
              <button
                onClick={handleShowAll}
                className="text-xs font-sans text-[#8F5146] hover:text-[#3B2620] underline underline-offset-4"
              >
                {BIRTHDAY_CONFIG.letter.skipButtonText}
              </button>
            </div>
          )}

          {/* Salutation */}
          <div className="text-2xl sm:text-3xl font-bold text-[#8F5146] mb-6">
            {BIRTHDAY_CONFIG.letter.salutation}
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg">
            {BIRTHDAY_CONFIG.letter.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`transition-all duration-700 ${
                  idx < revealedParagraphs
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3 pointer-events-none"
                }`}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Closing & Handwritten Signature */}
          <div
            className={`pt-8 space-y-2 transition-all duration-700 ${
              revealedParagraphs >= totalParagraphs
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            <p className="text-base sm:text-lg font-medium text-[#8F5146]">
              {BIRTHDAY_CONFIG.letter.closing}
            </p>
            <div className="font-hand text-3xl sm:text-4xl text-[#8F5146] flex items-center gap-2">
              <span>{BIRTHDAY_CONFIG.letter.signature}</span>
              <Heart className="w-5 h-5 fill-[#8F5146] inline" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
