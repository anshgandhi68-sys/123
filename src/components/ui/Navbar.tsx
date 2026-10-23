"use client";

import React, { useState } from "react";
import { AudioToggle } from "./AudioToggle";
import { Menu, X, Heart } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Memories", href: "#memories" },
    { label: "My Letter", href: "#letter" },
    { label: "Why You're Special", href: "#special" },
    { label: "Surprise", href: "#surprise" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#10172D]/75 backdrop-blur-md border-b border-[#F5C86A]/15 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-xl font-serif font-semibold text-[#F5C86A] tracking-wide hover:opacity-90 transition-opacity"
        >
          <span>Radhee</span>
          <Heart className="w-4 h-4 text-[#8F5146] fill-[#8F5146] inline-block animate-pulse" />
          <span>Bhaiya</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#FAF0E1]/80 hover:text-[#F5C86A] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <AudioToggle />

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#FAF0E1]/80 hover:text-[#F5C86A] rounded-lg border border-[#F5C86A]/20 bg-[#171D35]/60"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#10172D]/95 border-b border-[#F5C86A]/20 px-4 pt-3 pb-5 space-y-2 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#FAF0E1]/90 hover:bg-[#252744] hover:text-[#F5C86A] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
