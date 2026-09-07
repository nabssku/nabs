'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Terminal, ExternalLink, Shield } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-pop-cream/90 backdrop-blur-md border-b-[3px] border-black px-4 sm:px-8 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo Sticker */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-pop-yellow border-[3px] border-black rounded-xl flex items-center justify-center font-display font-extrabold text-lg shadow-pop-sm group-hover:rotate-6 transition-transform">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-tight flex items-center gap-1">
              nabssku<span className="text-pop-orange">.dev</span>
            </span>
            <span className="text-[10px] font-bold text-slate-500 -mt-1 tracking-wider uppercase">
              Full-Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-bold text-sm">
          <a href="#about" className="hover:text-pop-orange transition">About</a>
          <a href="#projects" className="hover:text-pop-orange transition">Projects</a>
          <a href="#skills" className="hover:text-pop-orange transition">Tech Stack</a>
          <a href="#experience" className="hover:text-pop-orange transition">Roadmap</a>
          <a href="#contact" className="hover:text-pop-orange transition">Contact</a>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            className="px-3 py-1.5 bg-white border-[2px] border-black rounded-xl font-bold text-xs shadow-pop-sm hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-pop-purple" />
            <span>Admin CMS</span>
          </Link>
          <a
            href="#contact"
            className="px-4 py-2 bg-pop-yellow border-[3px] border-black rounded-xl font-display font-bold text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition active:shadow-none flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Hire Me!</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 bg-white border-[2px] border-black rounded-xl shadow-pop-sm cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 p-4 bg-white border-[3px] border-black rounded-2xl shadow-pop flex flex-col gap-3 font-bold text-sm animate-in fade-in slide-in-from-top-2">
          <a onClick={() => setMobileOpen(false)} href="#about" className="p-2 hover:bg-pop-yellow/30 rounded-lg">About Me</a>
          <a onClick={() => setMobileOpen(false)} href="#projects" className="p-2 hover:bg-pop-yellow/30 rounded-lg">Showcase Projects</a>
          <a onClick={() => setMobileOpen(false)} href="#skills" className="p-2 hover:bg-pop-yellow/30 rounded-lg">Skills & Stack</a>
          <a onClick={() => setMobileOpen(false)} href="#experience" className="p-2 hover:bg-pop-yellow/30 rounded-lg">Experience Timeline</a>
          <a onClick={() => setMobileOpen(false)} href="#contact" className="p-2 hover:bg-pop-yellow/30 rounded-lg">Contact Form</a>
          <hr className="border-black" />
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="flex-1 py-2 text-center bg-slate-100 border-[2px] border-black rounded-xl text-xs"
            >
              CMS Admin
            </Link>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex-1 py-2 text-center bg-pop-yellow border-[2px] border-black rounded-xl text-xs font-bold shadow-pop-sm"
            >
              Hire Me!
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
