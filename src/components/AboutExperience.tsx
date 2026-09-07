'use client';

import React from 'react';
import { GraduationCap, Briefcase, MapPin, Calendar, CheckCircle, Sparkles } from 'lucide-react';

interface AboutProps {
  experiences: any[];
}

export default function AboutExperience({ experiences }: AboutProps) {
  const education = experiences.filter((e) => e.type === 'education');
  const work = experiences.filter((e) => e.type === 'work');

  return (
    <section id="about" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-white">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pop-yellow border-[2px] border-black rounded-xl shadow-pop-sm font-display font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Story & Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-pop-dark">
            About Me & Career Roadmap 🗺️
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base max-w-2xl mx-auto">
            Dari coding sejak SMK hingga membangun solusi web interaktif dan sistem AI di bangku kuliah.
          </p>
        </div>

        {/* About Card & Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Bio Card */}
          <div className="lg:col-span-5 bg-pop-cream border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-pop relative space-y-4">
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
          </div>

          {/* Right Roadmap / Experience Timeline */}
          <div id="experience" className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b-2 border-dashed border-slate-300">
              <h3 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-pop-orange" /> Education & Experience
              </h3>
              <span className="text-xs font-bold px-2.5 py-1 bg-pop-blue border-[2px] border-black rounded-xl shadow-pop-sm">
                Chronological
              </span>
            </div>

            <div className="space-y-4">
              {experiences.map((item, idx) => {
                const isEdu = item.type === 'education';
                return (
                  <div
                    key={item.id || idx}
                    className="bg-white border-[3px] border-black rounded-2xl p-5 shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition relative overflow-hidden group"
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
