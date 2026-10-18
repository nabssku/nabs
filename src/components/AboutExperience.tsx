'use client';

import React from 'react';
import { Sparkles, MapPin, Calendar } from 'lucide-react';
import { Experience } from '@/types';
import SectionHeader from './ui/SectionHeader';

interface AboutExperienceProps {
  experiences: Experience[];
}

export default function AboutExperience({ experiences }: AboutExperienceProps) {
  const badgeColors = ['bg-pop-yellow', 'bg-pop-blue', 'bg-pop-green'];

  return (
    <section id="about" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <SectionHeader
          badge="BACKGROUND"
          badgeColor="orange"
          badgeIcon={Sparkles}
          title="MY JOURNEY & EDUCATION"
          description="Dari coding sejak SMK hingga membangun solusi web interaktif dan sistem AI di bangku kuliah."
        />

        {/* Bento Grid Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences && experiences.length > 0 ? (
            experiences.map((exp, index) => {
              const badgeBg = badgeColors[index % badgeColors.length];
              return (
                <div
                  key={exp.id || index}
                  className="bg-white border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Year Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 ${badgeBg} border-[2px] border-black rounded-2xl shadow-pop-sm font-comic text-xs font-bold text-pop-dark`}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.start_year} - {exp.end_year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl font-extrabold text-pop-dark">
                      {exp.title}
                    </h3>

                    {/* Institution */}
                    <div className="font-comic font-bold text-sm text-pop-orange">
                      {exp.institution}
                    </div>

                    {/* Description */}
                    <p className="font-medium text-pop-dark/80 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Footer Location */}
                  {exp.location && (
                    <div className="border-t-[2px] border-black pt-4 mt-6 flex items-center gap-1.5 text-xs font-comic font-bold text-pop-dark/70">
                      <MapPin className="w-4 h-4 text-pop-orange" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-12 font-comic font-bold text-pop-dark">
              No experience records found.
            </div>
          )}
        </div>

      </div>

      <style jsx>{`
        .bento-card {
          transition: all 0.2s ease;
        }
        .bento-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 7px 7px 0px 0px rgba(0, 0, 0, 1);
        }
      `}</style>
    </section>
  );
}
