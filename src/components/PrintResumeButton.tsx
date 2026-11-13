'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintResumeButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="px-5 py-2.5 bg-pop-orange text-black border-[3px] border-black rounded-xl font-display font-bold text-xs sm:text-sm shadow-pop hover:translate-x-[1px] hover:translate-y-[1px] transition inline-flex items-center gap-2 cursor-pointer"
    >
      <Printer className="w-4 h-4" aria-hidden="true" />
      <span>Print / Save as PDF</span>
    </button>
  );
}
