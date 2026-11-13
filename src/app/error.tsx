'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft } from 'lucide-react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-pop-cream bg-halftone flex items-center justify-center p-6 font-sans">
      <div className="max-w-lg w-full bg-white border-[4px] border-black rounded-3xl p-8 sm:p-10 shadow-pop-xl text-center space-y-6">
        <div className="inline-block px-4 py-2 bg-pop-pink border-[3px] border-black rounded-2xl shadow-pop font-display font-black text-2xl text-pop-dark">
          Something Went Wrong
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          An unexpected error occurred while loading this page. Try refreshing or return to the homepage.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="px-5 py-3 bg-pop-yellow text-black border-[3px] border-black rounded-xl font-display font-bold text-sm shadow-pop hover:translate-x-[1px] hover:translate-y-[1px] transition inline-flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="px-5 py-3 bg-white text-black border-[3px] border-black rounded-xl font-display font-bold text-sm shadow-pop hover:translate-x-[1px] hover:translate-y-[1px] transition inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
