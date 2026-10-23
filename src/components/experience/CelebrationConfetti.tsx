"use client";

import confetti from "canvas-confetti";

export function fireCelebrationConfetti(type: "cake" | "gift" | "finale" = "cake") {
  if (typeof window === "undefined") return;

  const goldColors = ["#F5C86A", "#FAF0E1", "#C8A8FF", "#EBA75E", "#8F5146"];

  if (type === "cake") {
    // Gentle warm golden sparkle burst from center
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#F5C86A", "#FFE2A8", "#FAF0E1"],
      disableForReducedMotion: true,
      gravity: 0.8,
      ticks: 200,
    });
  } else if (type === "gift") {
    // Grand celebratory burst from the gift box
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { x: 0.7, y: 0.6 },
      colors: goldColors,
      disableForReducedMotion: true,
      gravity: 0.7,
      scalar: 1.1,
      ticks: 250,
    });
    // Follow-up sparkle
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0.65, y: 0.65 },
        colors: ["#F5C86A", "#C8A8FF"],
        disableForReducedMotion: true,
      });
    }, 200);
  } else if (type === "finale") {
    // Majestic continuous celebration across the whole screen
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: goldColors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: goldColors,
        disableForReducedMotion: true,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }
}
