"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { Sparkles, Maximize2, Heart } from "lucide-react";

interface MemoriesProps {
  onSelectMemory: (index: number) => void;
}

export function Memories({ onSelectMemory }: MemoriesProps) {
  const [tiltStyles, setTiltStyles] = useState<Record<number, { rx: number; ry: number }>>({});

  const handlePointerMove = (index: number, e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyles((prev) => ({
      ...prev,
      [index]: { rx: -y * 12, ry: x * 12 },
    }));
  };

  const handlePointerLeave = (index: number) => {
    setTiltStyles((prev) => ({
      ...prev,
      [index]: { rx: 0, ry: 0 },
    }));
  };

  return (
    <section
      id="memories"
      className="relative min-h-[100svh] flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-24 max-w-7xl mx-auto z-10"
      aria-label="Memories Gallery"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171D35]/80 border border-[#F5C86A]/25 text-xs font-semibold tracking-widest text-[#F5C86A] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Scrapbook of Moments</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF0E1]">
          {BIRTHDAY_CONFIG.memories.title}
        </h2>

        <p className="font-hand text-xl sm:text-2xl text-[#F5C86A] pt-1">
          {BIRTHDAY_CONFIG.memories.quote}
        </p>
      </div>

      {/* Grid of 5 Memory Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {BIRTHDAY_CONFIG.memories.items.map((item, idx) => {
          const tilt = tiltStyles[idx] || { rx: 0, ry: 0 };
          return (
            <button
              key={item.id}
              onClick={() => onSelectMemory(idx)}
              onPointerMove={(e) => handlePointerMove(idx, e)}
              onPointerLeave={() => handlePointerLeave(idx)}
              className="group relative text-left p-3.5 rounded-2xl bg-[#171D35]/75 border border-[#F5C86A]/20 hover:border-[#F5C86A]/60 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_rgba(245,200,106,0.22)] transition-all duration-300 transform perspective-1000"
              style={{
                transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${
                  tilt.rx !== 0 ? "-6px" : "0px"
                })`,
              }}
              aria-label={`Open photo memory: ${item.title}`}
            >
              {/* Photo Box */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#10172D] mb-4">
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Tag pill */}
                {item.tag && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#10172D]/85 text-[#F5C86A] border border-[#F5C86A]/30 backdrop-blur-sm">
                    {item.tag}
                  </span>
                )}

                {/* Hover expand hint */}
                <div className="absolute inset-0 bg-[#10172D]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#10172D]/80 border border-[#F5C86A] text-xs text-[#F5C86A] shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Bigger</span>
                  </div>
                </div>
              </div>

              {/* Card Meta */}
              <div className="px-1.5 pb-2">
                <h3 className="text-xl font-serif font-semibold text-[#FAF0E1] group-hover:text-[#F5C86A] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF0E1]/75 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>

              {/* Decorative Corner Heart */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-4 h-4 text-[#F5C86A]/60 fill-[#F5C86A]/20" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
