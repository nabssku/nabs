'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Github, Linkedin, Instagram } from 'lucide-react';
import { Profile } from '@/types';

interface FooterProps {
  profile?: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const brandHandle = profile?.handle ? profile.handle.replace('@', '') + '.dev' : 'nabssku.dev';
  const locationText = profile?.location ? profile.location.split(',')[0] : 'Malang';

  return (
    <footer className="py-8 px-4 sm:px-8 bg-pop-yellow border-t-[3px] border-black font-display no-print">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5 font-black text-sm text-pop-dark">
          <span className="w-8 h-8 bg-white border-[2px] border-black rounded-xl flex items-center justify-center shadow-pop-sm">
            {profile?.name ? profile.name.charAt(0) : 'N'}
          </span>
          <span>
            {brandHandle} © {new Date().getFullYear()}
          </span>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-pop-dark">
          <Link href="/projects" className="hover:underline underline-offset-4">
            Projects
          </Link>
          <Link href="/resume" className="hover:underline underline-offset-4">
            Resume
          </Link>
          <Link href="/#contact" className="hover:underline underline-offset-4">
            Contact
          </Link>
          {profile?.socials?.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2 bg-white border-[2px] border-black rounded-lg shadow-pop-sm hover:bg-pop-cream transition"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {profile?.socials?.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 bg-white border-[2px] border-black rounded-lg shadow-pop-sm hover:bg-pop-cream transition"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          )}
          {profile?.socials?.instagram && (
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              className="p-2 bg-white border-[2px] border-black rounded-lg shadow-pop-sm hover:bg-pop-cream transition"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          )}
        </nav>

        <div className="text-xs font-bold text-pop-dark flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-4 h-4 text-rose-600 fill-rose-600 animate-pulse" aria-hidden="true" />
          <span>using Next.js &amp; Neon DB in {locationText}</span>
        </div>
      </div>
    </footer>
  );
}
