'use client';

import React from 'react';
import { GraduationCap, Briefcase, Sparkles } from 'lucide-react';
import { Experience } from '@/types';
import SectionHeader from './ui/SectionHeader';
import NeoCard from './ui/NeoCard';
import NeoBadge from './ui/NeoBadge';

interface AboutProps {
  experiences: Experience[];
}

export default function AboutExperience({ experiences }: AboutProps) {
  return (
    <section id="about" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-white">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <SectionHeader
          badge="Story & Journey"
          badgeColor="yellow"
          badgeIcon={Sparkles}
          title="About Me & Career Roadmap 🗺️"
          description="Dari coding sejak SMK hingga membangun solusi web interaktif dan sistem AI di bangku kuliah."
        />

        {/* About Card & Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Bio Card */}
          <NeoCard className="lg:col-span-5 bg-pop-cream relative space-y-4">
            <div className="w-12 h-12 bg-pop-pink border-[2px] border-black rounded-2xl flex items-center justify-center font-display font-extrabold text-2xl shadow-pop-sm">
              💡
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900">
              Passionate Full-Stack Craftsman
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              Hai! Aku <strong>Nabil Sahsada Suratno</strong>. Mengembangkan website bukan sekadar menulis baris kode, tapi menciptakan produk yang memanjakan mata, mudah digunakan, dan memecahkan masalah nyata bagi penggunanya.
            </p>
            <div className="pt-2 space-y-2 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span>📍 Berdomisili di Malang, Jawa Timur</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span>🎓 Rekayasa Perangkat Lunak, UMM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span>🚀 Spesialis React, Next.js, & Neon DB</span>
              </div>
            </div>
          </NeoCard>

          {/* Right Roadmap / Experience Timeline */}
          <div id="experience" className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b-2 border-dashed border-slate-300">
              <h3 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-pop-orange" /> Education & Experience
              </h3>
              <NeoBadge color="blue">Chronological</NeoBadge>
            </div>

            <div className="space-y-4">
              {experiences.map((item, idx) => {
                const isEdu = item.type === 'education';
                return (
                  <NeoCard
                    key={item.id || idx}
                    variant="interactive"
                    padding={false}
                    className="p-5 rounded-2xl relative overflow-hidden group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-xl border-[2px] border-black ${isEdu ? 'bg-pop-yellow' : 'bg-pop-green'}`}>
                          {isEdu ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                        </div>
                        <h4 className="font-display font-bold text-base text-slate-900">
                          {item.title}
                        </h4>
                      </div>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 border border-black rounded-lg">
                        {item.start_year} — {item.end_year}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-2">
                      <span>{item.institution}</span>
                      {item.location && <span>• {item.location}</span>}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </NeoCard>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
