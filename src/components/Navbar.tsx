'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Coffee } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-pop-cream/90 backdrop-blur-md border-b-[3px] border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo Sticker */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-pop-yellow border-[3px] border-black rounded-2xl flex items-center justify-center font-display font-black text-xl shadow-pop group-hover:rotate-6 group-hover:scale-105 transition">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-tight text-pop-dark group-hover:text-pop-orange transition">
              nabssku<span className="text-pop-orange">.dev</span>
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 font-display font-bold text-xs uppercase tracking-wider text-slate-700 hover:text-black hover:bg-pop-yellow/40 rounded-xl transition cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-2 bg-pop-orange text-black border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition flex items-center gap-1.5 cursor-pointer"
          >
            <Coffee className="w-4 h-4" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-pop-yellow border-[2px] border-black rounded-xl shadow-pop-sm"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-[2px] border-black bg-white p-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 font-display font-bold text-sm text-slate-800 hover:bg-pop-cream rounded-xl border border-transparent hover:border-black transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-pop-orange text-black border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm flex items-center justify-center gap-1.5"
            >
              <Coffee className="w-4 h-4" />
              <span>Hire Me</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
