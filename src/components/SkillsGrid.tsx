'use client';

import React from 'react';
import { Sparkles, Terminal, Database, Wrench, Layout } from 'lucide-react';

interface SkillsProps {
  skills: any[];
}

export default function SkillsGrid({ skills }: SkillsProps) {
  const categories = [
    { key: 'frontend', label: 'Frontend & UI', icon: Layout, color: 'bg-pop-yellow' },
    { key: 'backend', label: 'Backend & APIs', icon: Terminal, color: 'bg-pop-orange' },
    { key: 'database', label: 'Database & ORM', icon: Database, color: 'bg-pop-blue' },
    { key: 'tools', label: 'Tools & DevOps', icon: Wrench, color: 'bg-pop-pink' },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-white">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pop-green border-[2px] border-black rounded-xl shadow-pop-sm font-display font-bold text-xs uppercase tracking-wider text-black">
            <Sparkles className="w-3.5 h-3.5" /> Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-pop-dark">
            Tech Stack & Skills Stickers 🏷️
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base max-w-xl mx-auto">
            Kumpulan teknologi dan tools yang biasa aku gunakan untuk membangun aplikasi end-to-end.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category?.toLowerCase() === cat.key);
            const Icon = cat.icon;

            return (
              <div
                key={cat.key}
                className="bg-pop-cream border-[3px] border-black rounded-3xl p-6 shadow-pop space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 pb-3 border-b-2 border-dashed border-slate-300 mb-4">
                    <div className={`p-2 rounded-xl border-[2px] border-black ${cat.color} shadow-pop-sm`}>
                      <Icon className="w-4 h-4 text-black" />
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-900">
                      {cat.label}
                    </h3>
                  </div>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2">
                    {catSkills.length === 0 ? (
                      <span className="text-xs text-slate-400">Belum ada data</span>
                    ) : (
                      catSkills.map((sk) => (
                        <div
                          key={sk.id}
                          className="px-3 py-1.5 bg-white border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:rotate-2 hover:bg-pop-yellow transition cursor-default flex items-center justify-between gap-2"
                        >
                          <span>{sk.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {sk.proficiency_level}%
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {catSkills.length} Verified Stack
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
