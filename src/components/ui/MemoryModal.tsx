"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { MemoryItem } from "@/config/birthday";

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MemoryItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
}

export function MemoryModal({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: MemoryModalProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Handle keyboard events (Escape, Left, Right)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080C1A]/90 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#171D35] border border-[#F5C86A]/30 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F5C86A]/15 bg-[#10172D]/60">
          <span className="text-xs font-semibold tracking-wider text-[#F5C86A] uppercase font-sans">
            Memory {currentIndex + 1} of {items.length}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#FAF0E1]/70 hover:text-[#FAF0E1] hover:bg-[#252744] transition-colors"
            aria-label="Close photo viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative w-full h-80 sm:h-96 bg-[#10172D] flex items-center justify-center overflow-hidden">
          <Image
            src={currentItem.image}
            alt={currentItem.alt || currentItem.title}
            fill
            className="object-contain p-2"
            priority
          />

          {/* Previous / Next Arrow Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#10172D]/80 text-[#FAF0E1] border border-[#F5C86A]/20 hover:border-[#F5C86A] hover:bg-[#252744] transition-all shadow-lg"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#10172D]/80 text-[#FAF0E1] border border-[#F5C86A]/20 hover:border-[#F5C86A] hover:bg-[#252744] transition-all shadow-lg"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Caption & Content */}
        <div className="p-6 bg-[#171D35] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 id="modal-title" className="text-2xl font-serif text-[#F5C86A] mb-1">
              {currentItem.title}
            </h3>
            <p className="text-sm text-[#FAF0E1]/85 leading-relaxed font-sans max-w-lg">
              {currentItem.caption}
            </p>
          </div>

          <button
            onClick={onClose}
            className="btn-gold !py-2 !px-5 text-sm shrink-0"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
