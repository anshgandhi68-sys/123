"use client";

import React, { useState } from "react";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { Sparkles, Heart, Mic, Wind, RefreshCw, ArrowRight } from "lucide-react";

interface HeroProps {
  isWishing: boolean;
  candlesBlown: boolean;
  onStartWish: () => void;
  onBlowCandles: () => void;
  onRelightCandles: () => void;
  onContinue: () => void;
}

export function Hero({
  isWishing,
  candlesBlown,
  onStartWish,
  onBlowCandles,
  onRelightCandles,
  onContinue,
}: HeroProps) {
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState("");

  const handleEnableMic = async () => {
    try {
      setMicError("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicActive(true);

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioCtx();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      analyser.fftSize = 256;
      microphone.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let blowCount = 0;

      const checkVolume = () => {
        if (!isWishing || candlesBlown) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;

        // Threshold for wind / breath blowing
        if (average > 65) {
          blowCount++;
          if (blowCount > 3) {
            onBlowCandles();
            stream.getTracks().forEach((track) => track.stop());
            setMicActive(false);
            return;
          }
        }
        requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch {
      setMicError("Microphone access not granted. Please use the button below!");
      setMicActive(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-20 max-w-7xl mx-auto z-10"
      aria-label="Birthday Hero"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-7 xl:col-span-6 space-y-6 text-left">
          {!isWishing ? (
            <>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171D35]/80 border border-[#F5C86A]/25 text-xs font-semibold tracking-widest text-[#F5C86A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{BIRTHDAY_CONFIG.hero.eyebrow}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#FAF0E1] leading-tight">
                {BIRTHDAY_CONFIG.hero.title}
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#FAF0E1]/85 font-sans leading-relaxed max-w-xl">
                {BIRTHDAY_CONFIG.hero.supportingText}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onStartWish}
                  className="btn-gold !text-base shadow-[0_0_25px_rgba(245,200,106,0.35)]"
                >
                  <Sparkles className="w-4 h-4 text-[#10172D]" />
                  <span>{BIRTHDAY_CONFIG.hero.primaryButton}</span>
                </button>

                <a href="#memories" className="btn-ghost !text-base">
                  <span>{BIRTHDAY_CONFIG.hero.secondaryButton}</span>
                </a>
              </div>
            </>
          ) : (
            /* Wishing Interaction Card */
            <div className="glass-panel p-6 sm:p-8 space-y-6 max-w-lg border-[#F5C86A]/40 shadow-[0_0_50px_rgba(245,200,106,0.2)] animate-in fade-in zoom-in-95 duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C86A]/20 text-[#F5C86A] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Make a Birthday Wish</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#FAF0E1]">
                {candlesBlown
                  ? BIRTHDAY_CONFIG.hero.wishCompletedMessage
                  : BIRTHDAY_CONFIG.hero.wishStepPrompt}
              </h2>

              {!candlesBlown ? (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Manual accessible blow button */}
                    <button
                      onClick={onBlowCandles}
                      className="btn-gold !text-sm !py-2.5 shadow-lg"
                    >
                      <Wind className="w-4 h-4 text-[#10172D]" />
                      <span>{BIRTHDAY_CONFIG.hero.wishStepAction}</span>
                    </button>

                    {/* Optional microphone toggle */}
                    <button
                      onClick={handleEnableMic}
                      className={`btn-ghost !text-xs !py-2 !px-3.5 ${
                        micActive ? "border-[#F5C86A] text-[#F5C86A]" : ""
                      }`}
                      title="Blow into your microphone (optional)"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>{micActive ? "Listening for blow..." : "Blow via Mic"}</span>
                    </button>
                  </div>

                  {micError && (
                    <p className="text-xs text-[#EBA75E] font-sans">{micError}</p>
                  )}
                </div>
              ) : (
                /* Post-Blow Actions */
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={onContinue}
                    className="btn-gold !text-sm !py-2.5 shadow-lg"
                  >
                    <span>{BIRTHDAY_CONFIG.hero.continueAction}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onRelightCandles}
                    className="btn-ghost !text-xs !py-2 !px-3.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{BIRTHDAY_CONFIG.hero.relightAction}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side spacer on desktop (the 3D cake shines here!) */}
        <div className="lg:col-span-5 xl:col-span-6 h-64 lg:h-96 pointer-events-none" />
      </div>

      {/* Handwritten note badge from Radhee */}
      <div className="absolute right-4 sm:right-10 bottom-6 font-hand text-xl sm:text-2xl text-[#F5C86A] rotate-[-3deg] drop-shadow-md select-none pointer-events-none flex items-center gap-1.5">
        <span>{BIRTHDAY_CONFIG.hero.handwrittenNote}</span>
        <Heart className="w-4 h-4 fill-[#F5C86A] text-[#F5C86A] inline" />
      </div>
    </section>
  );
}
