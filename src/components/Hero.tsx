'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, Mail, MapPin, Sparkles } from 'lucide-react';
import { Profile } from '@/types';
import SmartImage from './SmartImage';

interface HeroProps {
  profile: Profile;
  projectsCount?: number;
  skillsCount?: number;
}

export default function Hero({ profile, projectsCount, skillsCount }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const firstName = profile?.name ? profile.name.split(' ')[0] : 'Nabil';
  const initials = profile?.name
    ? profile.name
        .split(' ')
        .slice(0, 2)
        .map((n) => n.charAt(0).toUpperCase())
        .join('')
    : 'NS';

  const resumeHref = profile?.resumeUrl || '/resume';
  const isExternalResume = resumeHref.startsWith('http');

  const yearsDisplay = profile?.statYears || '3+';
  const projectsDisplay =
    profile?.statProjects && profile.statProjects.trim().length > 0
      ? profile.statProjects
      : projectsCount
      ? `${projectsCount}+`
      : '15+';

  const cardMotion = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0.92, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.35,
            delay,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  return (
    <section className="relative overflow-hidden py-12 md:py-16 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Bio Card */}
        <motion.div
          {...cardMotion(0)}
          className="md:col-span-4 lg:col-span-8 bg-pop-yellow border-[3px] border-black shadow-pop-xl rounded-3xl p-8 md:p-12 bento-card flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-pop-cream border-[2px] border-black rounded-2xl shadow-pop-sm font-comic text-xs uppercase font-bold tracking-wider">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
              </span>
              <span>{profile?.status?.replace(/^🟢\s*/, '') || 'Available for Freelance & Full-time'}</span>
            </div>

            {/* H1 Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-pop-dark leading-[1.1]">
              Hi, I&apos;m{' '}
              <span className="bg-pop-orange px-3 border-[3px] border-black rounded-2xl rotate-[-1deg] inline-block shadow-pop-sm">
                {firstName}
              </span>
              . {profile?.title || 'Full-Stack Web & AI Developer'}.
            </h1>
          </div>

          {/* Bio Paragraph */}
          <p className="text-base sm:text-xl font-medium text-pop-dark/90 leading-relaxed max-w-2xl">
            {profile?.bio ||
              'Informatics Engineering student & Freelance Full-Stack Developer building playful web apps, SaaS tools, and intelligent AI systems.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#projects"
              className="min-h-[48px] bg-pop-dark text-pop-cream border-[3px] border-black px-6 py-3 rounded-xl shadow-pop font-display font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] transition flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </a>

            <Link
              href={resumeHref}
              target={isExternalResume ? '_blank' : undefined}
              rel={isExternalResume ? 'noopener noreferrer' : undefined}
              className="min-h-[48px] bg-white text-pop-dark border-[3px] border-black px-5 py-3 rounded-xl shadow-pop font-display font-bold hover:bg-pop-blue hover:translate-x-[-2px] hover:translate-y-[-2px] transition flex items-center gap-2"
            >
              <FileText className="w-5 h-5" aria-hidden="true" />
              <span>View Resume</span>
            </Link>

            <a
              href="#contact"
              className="min-h-[48px] bg-pop-cream text-pop-dark border-[3px] border-black px-5 py-3 rounded-xl shadow-pop font-display font-bold hover:bg-pop-green hover:translate-x-[-2px] hover:translate-y-[-2px] transition flex items-center gap-2"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              <span>Get in Touch</span>
            </a>
          </div>
        </motion.div>

        {/* Avatar Card */}
        <motion.div
          {...cardMotion(0.05)}
          className="md:col-span-4 lg:col-span-4 bg-pop-pink border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col items-center justify-center text-center space-y-4"
        >
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-pop-yellow border-[3px] border-black rounded-2xl overflow-hidden shadow-pop">
            <SmartImage
              src={profile?.avatarUrl}
              alt={`${profile?.name || 'Nabil Sahsada'} avatar`}
              sizes="(max-width: 640px) 160px, 192px"
              priority
              className="object-cover"
              fallbackText={initials}
            />
          </div>
          <div className="space-y-1.5">
            <div className="font-comic bg-pop-cream border-[2px] border-black px-3.5 py-1 rounded-xl font-bold text-sm shadow-pop-sm text-pop-dark inline-block">
              {profile?.handle || '@nabssku'}
            </div>
            <div className="text-sm font-comic font-semibold text-pop-dark flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{profile?.location || 'Malang, Jawa Timur'}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Card 1 */}
        <motion.div
          {...cardMotion(0.1)}
          className="md:col-span-2 lg:col-span-4 bg-pop-blue border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col justify-between"
        >
          <div className="inline-block bg-pop-cream border-[3px] border-black px-4 py-2 rounded-2xl shadow-pop-sm font-display text-4xl sm:text-5xl font-extrabold text-pop-dark w-fit">
            {yearsDisplay}
          </div>
          <div className="mt-4">
            <h2 className="font-display font-bold text-lg text-pop-dark">Years Coding & Building</h2>
            <p className="font-medium text-sm text-pop-dark/85">
              Web apps, POS & SaaS solutions{skillsCount ? ` across ${skillsCount}+ tools` : ''}
            </p>
          </div>
        </motion.div>

        {/* Stats Card 2 */}
        <motion.div
          {...cardMotion(0.15)}
          className="md:col-span-2 lg:col-span-4 bg-pop-green border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col justify-between"
        >
          <div className="inline-block bg-pop-cream border-[3px] border-black px-4 py-2 rounded-2xl shadow-pop-sm font-display text-4xl sm:text-5xl font-extrabold text-pop-dark w-fit">
            {projectsDisplay}
          </div>
          <div className="mt-4">
            <h2 className="font-display font-bold text-lg text-pop-dark">Projects Delivered</h2>
            <p className="font-medium text-sm text-pop-dark/85">
              Production-ready full-stack products
            </p>
          </div>
        </motion.div>

        {/* Socials Card */}
        <motion.div
          {...cardMotion(0.2)}
          className="md:col-span-4 lg:col-span-4 bg-pop-purple border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col justify-between space-y-4"
        >
          <h2 className="font-display font-bold text-xl text-pop-dark">Connect Directly</h2>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={profile?.socials?.github || 'https://github.com/nabssku'}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] bg-pop-cream hover:bg-pop-yellow border-[3px] border-black p-3 rounded-xl shadow-pop-sm font-bold text-sm flex items-center justify-between transition text-pop-dark"
            >
              <span>GitHub</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={profile?.socials?.linkedin || 'https://linkedin.com/in/nabssku'}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] bg-pop-cream hover:bg-pop-yellow border-[3px] border-black p-3 rounded-xl shadow-pop-sm font-bold text-sm flex items-center justify-between transition text-pop-dark"
            >
              <span>LinkedIn</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={profile?.socials?.instagram || 'https://instagram.com/nabsskun'}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] bg-pop-cream hover:bg-pop-yellow border-[3px] border-black p-3 rounded-xl shadow-pop-sm font-bold text-sm flex items-center justify-between transition text-pop-dark"
            >
              <span>Instagram</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile?.socials?.email || 'nabilsahsadabisnis@gmail.com'}`}
              className="min-h-[44px] bg-pop-cream hover:bg-pop-yellow border-[3px] border-black p-3 rounded-xl shadow-pop-sm font-bold text-sm flex items-center justify-between transition text-pop-dark"
            >
              <span>Email</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
