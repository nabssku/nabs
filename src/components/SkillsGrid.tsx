'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Skill } from '@/types';
import SectionHeader from './ui/SectionHeader';

interface SkillsProps {
  skills: Skill[];
}

const colorCycles = [
  { badge: 'bg-pop-yellow', bar: 'bg-pop-yellow' },
  { badge: 'bg-pop-blue', bar: 'bg-pop-blue' },
  { badge: 'bg-pop-green', bar: 'bg-pop-green' },
  { badge: 'bg-pop-orange', bar: 'bg-pop-orange' },
  { badge: 'bg-pop-pink', bar: 'bg-pop-pink' },
  { badge: 'bg-pop-purple', bar: 'bg-pop-purple' },
];

export default function SkillsGrid({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-white">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <SectionHeader
          badge="PROFICIENCY"
          badgeColor="green"
          badgeIcon={Sparkles}
          title="SKILLS & METRICS"
          description="Quantifiable expertise across modern frontend frameworks, backend systems, databases, and developer tooling."
          align="center"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const colors = colorCycles[index % colorCycles.length];
            const level = Math.min(Math.max(skill.proficiency_level || 80, 0), 100);

            return (
              <div
                key={skill.id}
                className="bg-white border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card space-y-4 flex flex-col justify-between"
              >
                {/* Top Row: Skill Name + Percentage Badge */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-extrabold text-xl text-pop-dark tracking-tight">
                    {skill.name}
                  </h3>
                  <span className={`${colors.badge} border-[2px] border-black rounded-xl px-2.5 py-1 font-comic text-xs font-extrabold text-pop-dark shadow-pop-sm`}>
                    {level}%
                  </span>
                </div>

                {/* Category or Subtitle */}
                <p className="font-comic text-xs text-pop-dark/70 uppercase tracking-wider">
                  {skill.category || 'Core Skill'}
                </p>

                {/* Bento Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="w-full bg-pop-cream border-[2px] border-black h-4 rounded-xl overflow-hidden shadow-pop-sm">
                    <div
                      className={`h-full ${colors.bar} border-r-2 border-black transition-all duration-500`}
                      style={{ width: `${level}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-16 bg-pop-cream border-[3px] border-black rounded-3xl shadow-pop">
            <p className="font-comic text-lg text-pop-dark">No skills recorded yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
