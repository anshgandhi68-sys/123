"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { soundEngine } from "@/lib/audio";
import { isWebGLAvailable, prefersReducedMotion } from "@/lib/deviceCapabilities";
import { Navbar } from "@/components/ui/Navbar";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { Welcome } from "@/components/sections/Welcome";
import { Hero } from "@/components/sections/Hero";
import { Memories } from "@/components/sections/Memories";
import { Letter } from "@/components/sections/Letter";
import { Appreciation } from "@/components/sections/Appreciation";
import { SurpriseSection } from "@/components/sections/SurpriseSection";
import { Finale } from "@/components/sections/Finale";
import { MemoryModal } from "@/components/ui/MemoryModal";
import { Css3DFallback } from "@/components/experience/Css3DFallback";
import { fireCelebrationConfetti } from "@/components/experience/CelebrationConfetti";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Dynamically import 3D Canvas scene to prevent SSR issues
const BirthdayScene = dynamic(
  () =>
    import("@/components/experience/BirthdayScene").then((mod) => mod.BirthdayScene),
  {
    ssr: false,
    loading: () => null,
  }
);

export function BirthdayExperience() {
  const [mounted, setMounted] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [litStates, setLitStates] = useState([true, true, true, true, true]);
  const [isWishing, setIsWishing] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isGiftRevealed, setIsGiftRevealed] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);

  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasWebGL(isWebGLAvailable());
    setReducedMotion(prefersReducedMotion());

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track active section for camera choreography
  useEffect(() => {
    if (isWelcomeOpen) return;

    const sections = ["hero", "memories", "letter", "special", "surprise", "finale"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            if (entry.target.id === "finale") {
              fireCelebrationConfetti("finale");
            }
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isWelcomeOpen]);

  // Welcome actions
  const handleEnterWorld = (fast = false) => {
    setIsWelcomeOpen(false);
    soundEngine.playSparkle();
    fireCelebrationConfetti("cake");
    if (BIRTHDAY_CONFIG.settings.musicEnabledByDefault) {
      soundEngine.setMuted(false);
    }
  };

  // Candle wishing interaction
  const handleStartWish = () => {
    setIsWishing(true);
    soundEngine.playSparkle();
  };

  const handleBlowCandles = () => {
    soundEngine.playCandleBlow();

    // Sequence candle extinguishing
    if (reducedMotion) {
      setLitStates([false, false, false, false, false]);
      setCandlesBlown(true);
      fireCelebrationConfetti("cake");
      soundEngine.playSparkle();
    } else {
      [0, 1, 2, 3, 4].forEach((idx) => {
        setTimeout(() => {
          setLitStates((prev) => {
            const next = [...prev];
            next[idx] = false;
            return next;
          });
        }, idx * 280);
      });

      setTimeout(() => {
        setCandlesBlown(true);
        fireCelebrationConfetti("cake");
        soundEngine.playSparkle();
      }, 5 * 280 + 200);
    }
  };

  const handleRelightCandles = () => {
    setLitStates([true, true, true, true, true]);
    setCandlesBlown(false);
    soundEngine.playSparkle();
  };

  const handleContinueAfterWish = () => {
    setIsWishing(false);
    const memoriesEl = document.getElementById("memories");
    if (memoriesEl) {
      memoriesEl.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  // Secret gift reveal interaction
  const handleOpenGift = () => {
    setIsGiftRevealed(true);
    soundEngine.playSparkle();

    // Animate revealProgress from 0 to 1
    const startTime = performance.now();
    const duration = reducedMotion ? 300 : 2000;

    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      setRevealProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        fireCelebrationConfetti("gift");
        soundEngine.playMagicReveal();
      }
    };
    requestAnimationFrame(animateProgress);
  };

  const handleReplayGift = () => {
    setIsGiftRevealed(false);
    setRevealProgress(0);
  };

  const handleContinueToFinale = () => {
    const finaleEl = document.getElementById("finale");
    if (finaleEl) {
      finaleEl.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  // Restart whole experience
  const handleRestartExperience = () => {
    setIsGiftRevealed(false);
    setRevealProgress(0);
    setIsWishing(false);
    setCandlesBlown(false);
    setLitStates([true, true, true, true, true]);
    setIsWelcomeOpen(true);
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const handleBackToMemories = () => {
    const memoriesEl = document.getElementById("memories");
    if (memoriesEl) {
      memoriesEl.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#10172D] text-[#FAF0E1] selection:bg-[#F5C86A] selection:text-[#10172D]">
      {/* Top Fixed Progress Bar */}
      <ProgressIndicator />

      {/* Fixed Top Header Navigation */}
      <Navbar />

      {/* 3D Scene Background (or CSS Fallback) */}
      <ErrorBoundary fallback={<Css3DFallback litStates={litStates} isWishing={isWishing} />}>
        {mounted && (
          hasWebGL ? (
            <BirthdayScene
              activeSection={isWelcomeOpen ? "welcome" : activeSection}
              litStates={litStates}
              isWishing={isWishing}
              isGiftRevealed={isGiftRevealed}
              revealProgress={revealProgress}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />
          ) : (
            <Css3DFallback litStates={litStates} isWishing={isWishing} />
          )
        )}
      </ErrorBoundary>

      {/* Cinematic Welcome Overlay */}
      <Welcome
        isOpen={isWelcomeOpen}
        onEnter={() => handleEnterWorld(false)}
        onSkip={() => handleEnterWorld(true)}
      />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        <Hero
          isWishing={isWishing}
          candlesBlown={candlesBlown}
          onStartWish={handleStartWish}
          onBlowCandles={handleBlowCandles}
          onRelightCandles={handleRelightCandles}
          onContinue={handleContinueAfterWish}
        />

        <Memories onSelectMemory={(idx) => setSelectedMemoryIndex(idx)} />

        <Letter />

        <Appreciation />

        <SurpriseSection
          isRevealed={isGiftRevealed}
          onOpenGift={handleOpenGift}
          onReplayGift={handleReplayGift}
          onContinue={handleContinueToFinale}
        />

        <Finale
          onRestartExperience={handleRestartExperience}
          onBackToMemories={handleBackToMemories}
        />
      </main>

      {/* Photo Lightbox Dialog */}
      <MemoryModal
        isOpen={selectedMemoryIndex !== null}
        onClose={() => setSelectedMemoryIndex(null)}
        items={BIRTHDAY_CONFIG.memories.items}
        currentIndex={selectedMemoryIndex ?? 0}
        onNavigate={(newIdx) => setSelectedMemoryIndex(newIdx)}
      />
    </div>
  );
}
