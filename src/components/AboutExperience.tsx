'use client';

import React from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Layers,
  Cpu,
  CreditCard,
} from 'lucide-react';
import { Experience } from '@/types';
import SectionHeader from './ui/SectionHeader';

interface AboutExperienceProps {
  experiences: Experience[];
}

const SERVICES = [
  {
    title: 'Full-Stack Web & SaaS',
    description:
      'End-to-end Next.js & TypeScript web applications, admin CMS dashboards, and scalable PostgreSQL APIs built for speed.',
    icon: Layers,
    bg: 'bg-pop-yellow',
  },
  {
    title: 'POS & Payment Systems',
    description:
      'Multi-outlet Point-of-Sale systems, inventory tracking, thermal receipt printing, and dynamic QRIS payment gateways.',
    icon: CreditCard,
    bg: 'bg-pop-blue',
  },
  {
    title: 'AI Agents & Automation',
    description:
      'LLM-powered workflow automation, smart assistants, and interactive content generators tailored to real business needs.',
    icon: Cpu,
    bg: 'bg-pop-green',
  },
];

export default function AboutExperience({ experiences }: AboutExperienceProps) {
  const badgeColors = ['bg-pop-yellow', 'bg-pop-blue', 'bg-pop-green'];

  return (
    <section id="about" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* What I Build / Services */}
        <div className="space-y-10">
          <SectionHeader
            badge="WHAT I BUILD"
            badgeColor="yellow"
            badgeIcon={Layers}
            title="SERVICES & CAPABILITIES"
            description="Helping startups, UMKM, and product teams ship fast, reliable, and memorable digital products."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className={`${service.bg} border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col justify-between space-y-4`}
                >
                  <div className="w-12 h-12 bg-white border-[2px] border-black rounded-2xl flex items-center justify-center shadow-pop-sm">
                    <Icon className="w-6 h-6 text-pop-dark" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-extrabold text-pop-dark">
                      {service.title}
                    </h3>
                    <p className="font-medium text-sm text-pop-dark/85 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Career & Education Timeline (#experience target for Navbar) */}
        <div id="experience" className="scroll-mt-24 space-y-12">
          <SectionHeader
            badge="BACKGROUND"
            badgeColor="orange"
            badgeIcon={Sparkles}
            title="MY JOURNEY & EDUCATION"
            description="From learning software engineering in vocational high school to building SaaS products and AI systems."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences && experiences.length > 0 ? (
              experiences.map((exp, index) => {
                const badgeBg = badgeColors[index % badgeColors.length];
                const isEducation = exp.type?.toLowerCase() === 'education';
                const TypeIcon = isEducation ? GraduationCap : Briefcase;

                return (
                  <div
                    key={exp.id || index}
                    className="bg-white border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 ${badgeBg} border-[2px] border-black rounded-2xl shadow-pop-sm font-comic text-xs font-bold text-pop-dark`}
                        >
                          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>
                            {exp.start_year} – {exp.end_year}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-pop-cream border-[2px] border-black rounded-xl font-display text-[11px] font-bold uppercase text-pop-dark">
                          <TypeIcon className="w-3.5 h-3.5" aria-hidden="true" />
                          {isEducation ? 'Education' : 'Work'}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-extrabold text-pop-dark">
                        {exp.title}
                      </h3>

                      <div className="font-comic font-bold text-sm text-pop-dark bg-pop-yellow/40 inline-block px-2.5 py-0.5 rounded-lg border border-black/20">
                        {exp.institution}
                      </div>

                      <p className="font-medium text-pop-dark/85 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {exp.location && (
                      <div className="border-t-[2px] border-black pt-4 mt-6 flex items-center gap-1.5 text-xs font-comic font-bold text-pop-dark/80">
                        <MapPin className="w-4 h-4 text-pop-orange shrink-0" aria-hidden="true" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-12 font-comic font-bold text-pop-dark bg-white border-[3px] border-black rounded-3xl shadow-pop">
                No experience records found yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
