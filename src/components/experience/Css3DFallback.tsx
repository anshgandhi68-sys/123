"use client";

import React from "react";

interface Css3DFallbackProps {
  litStates: boolean[];
  isWishing: boolean;
}

export function Css3DFallback({ litStates }: Css3DFallbackProps) {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-radial-at-c from-[#171D35] via-[#10172D] to-[#0A0E1C]"
      aria-hidden="true"
    >
      {/* Background radial atmosphere glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_55%,rgba(245,200,106,0.12)_0%,rgba(16,23,45,0.95)_70%)]" />

      {/* Floating starry dust motes */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-[#F5C86A] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#FFE2A8] animate-pulse [animation-delay:-1s]" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#C8A8FF] animate-pulse [animation-delay:-2s]" />
        <div className="absolute top-1/2 right-1/5 w-2 h-2 rounded-full bg-[#FAF0E1] animate-pulse [animation-delay:-1.5s]" />
      </div>

      {/* Stylized CSS Cake */}
      <div className="absolute bottom-[20%] right-[10%] sm:right-[18%] flex flex-col items-center opacity-85">
        {/* Candles */}
        <div className="flex gap-4 mb-1">
          {litStates.map((isLit, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              <div
                className={`w-3.5 h-6 rounded-full bg-gradient-to-t from-[#EBA75E] via-[#F5C86A] to-[#FFF4DE] shadow-[0_0_12px_#F5C86A] transition-all duration-500 origin-bottom ${
                  isLit ? "scale-100 opacity-100 animate-pulse" : "scale-0 opacity-0"
                }`}
              />
              {/* Candle Body */}
              <div className="w-2.5 h-10 bg-gradient-to-b from-[#FAF0E1] to-[#F5C86A] rounded-t-sm shadow-md" />
            </div>
          ))}
        </div>

        {/* Top Cake Tier */}
        <div className="w-36 h-14 bg-gradient-to-b from-[#5C3328] to-[#4A2A22] rounded-t-xl border-t-4 border-[#FAF0E1] shadow-lg relative flex items-center justify-center">
          <span className="text-[10px] tracking-widest text-[#F5C86A] uppercase font-serif">
            Radhee ♡ Bhaiya
          </span>
        </div>

        {/* Bottom Cake Tier */}
        <div className="w-52 h-20 bg-gradient-to-b from-[#4A2A22] to-[#341812] rounded-t-2xl border-t-4 border-[#FAF0E1] shadow-2xl" />

        {/* Golden Platter */}
        <div className="w-64 h-3 bg-gradient-to-r from-[#F5C86A] via-[#FFE2A8] to-[#EBA75E] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)]" />
      </div>
    </div>
  );
}
