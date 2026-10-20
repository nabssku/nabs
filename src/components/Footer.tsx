'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { Profile } from '@/types';

interface FooterProps {
  profile?: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const brandHandle = profile?.handle ? profile.handle.replace('@', '') + '.dev' : 'nabssku.dev';
  const locationText = profile?.location ? profile.location.split(',')[0] : 'Malang';

  return (
    <footer className="py-8 px-4 sm:px-8 bg-pop-yellow border-t-[3px] border-black text-center font-display">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-black text-sm">
          <span className="w-7 h-7 bg-white border-[2px] border-black rounded-lg flex items-center justify-center shadow-pop-sm">
            {profile?.name ? profile.name.charAt(0) : 'N'}
          </span>
          <span>{brandHandle} © {new Date().getFullYear()}</span>
        </div>

        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-4 h-4 text-rose-600 fill-rose-600 animate-pulse" />
          <span>using Next.js 15 & Neon DB in {locationText}</span>
        </div>
      </div>
    </footer>
  );
}
