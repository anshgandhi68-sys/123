"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { soundEngine } from "@/lib/audio";

interface AudioToggleProps {
  className?: string;
}

export function AudioToggle({ className = "" }: AudioToggleProps) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(soundEngine.getMuted());
  }, []);

  const handleToggle = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <button
      onClick={handleToggle}
      className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium 
        border transition-all duration-300 ${
          isMuted
            ? "bg-[#171D35]/70 border-[#F5C86A]/20 text-[#FAF0E1]/70 hover:border-[#F5C86A]/50 hover:text-[#FAF0E1]"
            : "bg-[#F5C86A]/15 border-[#F5C86A] text-[#F5C86A] shadow-[0_0_15px_rgba(245,200,106,0.3)]"
        } ${className}`}
      aria-label={isMuted ? "Turn background music and sounds on" : "Turn background music and sounds off"}
      aria-pressed={!isMuted}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 opacity-75" />
      ) : (
        <Volume2 className="w-4 h-4 text-[#F5C86A] animate-pulse" />
      )}
      <span className="hidden sm:inline">
        {isMuted ? "Sound off" : "Sound on"}
      </span>
      {!isMuted && (
        <span className="flex gap-0.5 items-center">
          <span className="w-0.5 h-2 bg-[#F5C86A] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-0.5 h-3 bg-[#F5C86A] animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-0.5 h-1.5 bg-[#F5C86A] animate-bounce"></span>
        </span>
      )}
    </button>
  );
}
