'use client';

import React from 'react';
import { Sparkles, ArrowRight, Download, Terminal, Code2, Heart, Star, Coffee, Zap } from 'lucide-react';

interface HeroProps {
  profile: any;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:py-24 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Col: Headline & Bio */}
        <div className="lg:col-span-7 space-y-6 text-left z-10">
          {/* Availability Sticker Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-pop-green border-[2px] border-black rounded-full shadow-pop-sm text-xs font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
            <span>{profile?.status || 'Available for Freelance & Full-time'}</span>
          </div>

          <div className="space-y-2">
            <div className="inline-block bg-pop-yellow border-[3px] border-black px-3 py-1 rounded-xl shadow-pop-sm rotate-[-2deg] font-display font-extrabold text-sm sm:text-base">
              👋 Haii, I&apos;m Nabil Sahsada Suratno
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.1] text-pop-dark">
              Building <span className="bg-pop-blue px-2 py-0.5 border-[3px] border-black rounded-xl shadow-pop-sm inline-block rotate-[1deg]">Playful</span>, Scalable Web & SaaS Apps.
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-xl">
            Mahasiswa Teknik Informatika UMM & Full-Stack Developer asal Malang. Fokus merancang solusi digital dengan clean code, performa kilat, dan visual kartun yang berkesan.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 bg-pop-orange text-black border-[3px] border-black rounded-2xl font-display font-bold text-base shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition active:shadow-none flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 bg-white text-black border-[3px] border-black rounded-2xl font-display font-bold text-base shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition active:shadow-none flex items-center gap-2 cursor-pointer"
            >
              <Coffee className="w-5 h-5 text-pop-orange" />
              <span>Let&apos;s Talk</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-6 max-w-lg">
            <div className="p-3 bg-white border-[2px] border-black rounded-2xl shadow-pop-sm text-center">
              <div className="text-2xl font-black font-display text-pop-dark">3+</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Tahun Ngoding</div>
            </div>
            <div className="p-3 bg-pop-yellow/40 border-[2px] border-black rounded-2xl shadow-pop-sm text-center">
              <div className="text-2xl font-black font-display text-pop-dark">15+</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Proyek Selesai</div>
            </div>
            <div className="p-3 bg-pop-green/40 border-[2px] border-black rounded-2xl shadow-pop-sm text-center">
              <div className="text-2xl font-black font-display text-pop-dark">100%</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Client Happy</div>
            </div>
          </div>
        </div>

        {/* Right Col: Cartoon 2.5D Comic Avatar & Floating Stickers */}
        <div className="lg:col-span-5 flex justify-center relative">
          {/* Background Comic Bubble Graphic */}
          <div className="relative w-72 sm:w-80 h-72 sm:h-80 bg-pop-yellow border-[4px] border-black rounded-3xl shadow-pop-xl rotate-3 flex items-center justify-center overflow-hidden">
            {/* Abstract Graphic / Avatar Illustration */}
            <div className="text-center p-6 space-y-4">
              <div className="w-28 h-28 mx-auto bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-pop text-5xl">
                👨💻
              </div>
              <div className="bg-white border-[2px] border-black rounded-xl p-2.5 shadow-pop-sm">
                <span className="font-display font-black text-sm text-slate-900 block">
                  Nabil Sahsada Suratno
                </span>
                <span className="text-[11px] font-bold text-pop-orange">@nabssku • Malang, ID</span>
              </div>
            </div>

            {/* Internal comic dots */}
            <div className="absolute top-2 right-2 flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
            </div>
          </div>

          {/* Floating Sticker 1 (Top Left) */}
          <div className="absolute -top-4 -left-4 sm:left-4 bg-pop-pink border-[3px] border-black px-3 py-1.5 rounded-2xl shadow-pop rotate-[-12deg] font-display font-bold text-xs flex items-center gap-1.5 animate-bounce">
            <Star className="w-4 h-4 text-pop-yellow fill-pop-yellow" />
            <span>Next.js 15 Pro</span>
          </div>

          {/* Floating Sticker 2 (Bottom Right) */}
          <div className="absolute -bottom-4 right-0 sm:right-4 bg-pop-blue border-[3px] border-black px-3.5 py-2 rounded-2xl shadow-pop rotate-[8deg] font-display font-bold text-xs flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-pop-yellow fill-pop-yellow" />
            <span>Neon DB Master</span>
          </div>

          {/* Floating Sticker 3 (Bottom Left) */}
          <div className="absolute bottom-6 -left-6 bg-white border-[3px] border-black px-3 py-1 rounded-2xl shadow-pop-sm rotate-[-6deg] font-display font-bold text-xs flex items-center gap-1">
            <span>☕ Coffee Powered</span>
          </div>
        </div>

      </div>
    </section>
  );
}
