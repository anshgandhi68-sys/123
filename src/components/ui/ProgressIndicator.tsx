"use client";

import React, { useEffect, useState } from "react";

export function ProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Story experience progress"
    >
      <div
        className="h-full bg-gradient-to-r from-[#F5C86A] via-[#EBA75E] to-[#C8A8FF] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,200,106,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
