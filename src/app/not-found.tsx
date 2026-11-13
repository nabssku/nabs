import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FolderGit2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pop-cream bg-halftone flex items-center justify-center p-6 font-sans">
      <div className="max-w-lg w-full bg-white border-[4px] border-black rounded-3xl p-8 sm:p-10 shadow-pop-xl text-center space-y-6">
        <div className="inline-block px-5 py-2 bg-pop-yellow border-[3px] border-black rounded-2xl shadow-pop font-display font-black text-5xl sm:text-6xl text-pop-dark">
          404
        </div>
        <div className="space-y-2">
          <h1 className="font-display font-black text-2xl sm:text-3xl text-pop-dark">
            Oops! Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-700 font-medium">
            The page or project you are looking for might have been moved, drafted, or never existed.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="px-5 py-3 bg-pop-orange text-black border-[3px] border-black rounded-xl font-display font-bold text-sm shadow-pop hover:translate-x-[1px] hover:translate-y-[1px] transition inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back Home</span>
          </Link>
          <Link
            href="/projects"
            className="px-5 py-3 bg-pop-blue text-black border-[3px] border-black rounded-xl font-display font-bold text-sm shadow-pop hover:translate-x-[1px] hover:translate-y-[1px] transition inline-flex items-center gap-2"
          >
            <FolderGit2 className="w-4 h-4" aria-hidden="true" />
            <span>Browse Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
