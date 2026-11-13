'use client';

import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Stack',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & DevOps',
};

export default function SkillsGrid({ skills }: SkillsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const rawCats = Array.from(
      new Set(skills.map((s) => (s.category || 'tools').toLowerCase()))
    );
    return ['all', ...rawCats];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return skills;
    return skills.filter((s) => (s.category || 'tools').toLowerCase() === selectedCategory);
  }, [skills, selectedCategory]);

  return (
    <section id="skills" className="scroll-mt-20 py-20 px-4 sm:px-8 border-b-[3px] border-black bg-white">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <SectionHeader
          badge="PROFICIENCY"
          badgeColor="green"
          badgeIcon={Sparkles}
          title="SKILLS & TECH STACK"
          description="Core technologies I use across modern frontend interfaces, backend APIs, databases, and deployment workflows."
          align="center"
        />

        {/* Category Filter Pills */}
        {skills.length > 0 && (
          <div
            className="flex flex-wrap items-center justify-center gap-2"
            role="group"
            aria-label="Filter skills by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`min-h-[40px] px-4 py-2 rounded-xl border-[3px] border-black font-display font-bold text-xs sm:text-sm transition-all shadow-pop-sm cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-pop-green text-pop-dark translate-x-[2px] translate-y-[2px] shadow-none'
                    : 'bg-pop-cream text-pop-dark hover:bg-pop-yellow'
                }`}
              >
                {CATEGORY_LABELS[cat] || cat.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const colors = colorCycles[index % colorCycles.length];
            const level = Math.min(Math.max(skill.proficiency_level || 80, 0), 100);

            return (
              <div
                key={skill.id}
                className="bg-white border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card space-y-4 flex flex-col justify-between"
              >
                {/* Top Row: Skill Name + Percentage Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {skill.icon_url && (
                      <img
                        src={skill.icon_url}
                        alt=""
                        className="w-6 h-6 object-contain shrink-0"
                        loading="lazy"
                      />
                    )}
                    <h3 className="font-display font-extrabold text-xl text-pop-dark tracking-tight truncate">
                      {skill.name}
                    </h3>
                  </div>
                  <span
                    className={`${colors.badge} border-[2px] border-black rounded-xl px-2.5 py-1 font-comic text-xs font-extrabold text-pop-dark shadow-pop-sm shrink-0`}
                  >
                    {level}%
                  </span>
                </div>

                {/* Category Label */}
                <p className="font-comic text-xs font-semibold text-pop-dark/80 uppercase tracking-wider">
                  {CATEGORY_LABELS[(skill.category || '').toLowerCase()] || skill.category || 'Core Skill'}
                </p>

                {/* Bento Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div
                    className="w-full bg-pop-cream border-[2px] border-black h-4 rounded-xl overflow-hidden shadow-pop-sm"
                    role="progressbar"
                    aria-valuenow={level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency`}
                  >
                    <motion.div
                      initial={shouldReduceMotion ? { width: `${level}%` } : { width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      className={`h-full ${colors.bar} border-r-2 border-black`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 bg-pop-cream border-[3px] border-black rounded-3xl shadow-pop">
            <p className="font-comic text-lg text-pop-dark">No skills recorded in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
