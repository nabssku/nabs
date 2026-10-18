'use client';

import React from 'react';
import { ArrowRight, Github, Instagram, MapPin, Sparkles } from 'lucide-react';
import { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 px-4 sm:px-8 bg-pop-cream bg-halftone">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Main Bio Card */}
        <div className="md:col-span-4 lg:col-span-8 bg-pop-yellow border-[3px] border-black shadow-pop-xl rounded-3xl p-8 md:p-12 bento-card flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pop-cream border-[2px] border-black rounded-2xl shadow-pop-sm font-comic text-xs uppercase font-bold tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{profile?.status || 'Available for Freelance & Full-time'}</span>
            </div>

            {/* H1 Title */}
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-pop-dark leading-[1.1]">
              Hi, I&apos;m{' '}
              <span className="bg-pop-orange px-3 border-[3px] border-black rounded-2xl rotate-[-1deg] inline-block shadow-pop-sm">
                {profile?.name ? profile.name.split(' ')[0] : 'Nabil'}
              </span>
              . Full-Stack & AI Developer.
            </h1>
          </div>

          {/* Bio Paragraph */}
          <p className="text-lg sm:text-xl font-medium text-pop-dark/90 leading-relaxed max-w-2xl">
            {profile?.bio || 'Mahasiswa Teknik Informatika & Freelance Full-Stack Developer yang membangun web apps interaktif dan agen AI.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="bg-pop-dark text-pop-cream border-[3px] border-black px-6 py-3.5 rounded-xl shadow-pop font-display font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] transition flex items-center gap-2"
            >
              Explore Bento <Sparkles className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profile?.socials?.email || 'nabilsahsadabisnis@gmail.com'}`}
              className="bg-pop-cream text-pop-dark border-[3px] border-black px-6 py-3.5 rounded-xl shadow-pop font-display font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] transition flex items-center gap-2"
            >
              Get in Touch 📬
            </a>
          </div>
        </div>

        {/* Avatar Card */}
        <div className="md:col-span-4 lg:col-span-4 bg-pop-pink border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-40 h-40 sm:w-48 sm:h-48 bg-pop-yellow border-[3px] border-black rounded-2xl font-display text-6xl font-black flex items-center justify-center shadow-pop text-pop-dark">
            NS
          </div>
          <div className="font-comic bg-pop-cream border-[2px] border-black px-3 py-1 rounded-xl font-bold text-sm shadow-pop-sm text-pop-dark">
            {profile?.handle || '@nabssku'}
          </div>
          <div className="text-sm font-comic font-semibold text-pop-dark/80 flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> {profile?.location || 'Malang, Jawa Timur'}
          </div>
        </div>

        {/* Stats Card 1 */}
        <div className="md:col-span-2 lg:col-span-4 bg-pop-blue border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col justify-between">
          <div className="inline-block bg-pop-cream border-[3px] border-black px-4 py-2 rounded-2xl shadow-pop-sm font-display text-5xl font-extrabold text-pop-dark w-fit">
            3+
          </div>
          <div className="mt-4">
            <h4 className="font-display font-bold text-lg text-pop-dark">Years Experience</h4>
            <p className="font-medium text-sm text-pop-dark/80">Building web apps & SaaS platforms</p>
          </div>
        </div>

        {/* Stats Card 2 */}
        <div className="md:col-span-2 lg:col-span-4 bg-pop-green border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col justify-between">
          <div className="inline-block bg-pop-cream border-[3px] border-black px-4 py-2 rounded-2xl shadow-pop-sm font-display text-5xl font-extrabold text-pop-dark w-fit">
            15+
          </div>
          <div className="mt-4">
            <h4 className="font-display font-bold text-lg text-pop-dark">Projects Delivered</h4>
            <p className="font-medium text-sm text-pop-dark/80">Production-ready robust code</p>
          </div>
        </div>

        {/* Socials Card */}
        <div className="md:col-span-4 lg:col-span-4 bg-pop-purple border-[3px] border-black shadow-pop-xl rounded-3xl p-6 bento-card flex flex-col justify-between space-y-4">
          <h3 className="font-display font-bold text-xl text-pop-dark">Connect Directly</h3>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={profile?.socials?.github || 'https://github.com/nabssku'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pop-cream hover:bg-pop-yellow border-[3px] border-black p-3.5 rounded-xl shadow-pop-sm font-bold text-sm flex items-center justify-between transition text-pop-dark"
            >
              <span>GitHub</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={profile?.socials?.instagram || 'https://instagram.com/nabsskun'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pop-cream hover:bg-pop-yellow border-[3px] border-black p-3.5 rounded-xl shadow-pop-sm font-bold text-sm flex items-center justify-between transition text-pop-dark"
            >
              <span>Instagram</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
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
