'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Coffee, FileText } from 'lucide-react';
import { Profile } from '@/types';

interface NavbarProps {
  profile?: Profile;
}

const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'contact'];

export default function Navbar({ profile }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navLinks = [
    { label: 'About', id: 'about', href: isHome ? '#about' : '/#about' },
    { label: 'Experience', id: 'experience', href: isHome ? '#experience' : '/#experience' },
    { label: 'Projects', id: 'projects', href: isHome ? '#projects' : '/projects' },
    { label: 'Skills', id: 'skills', href: isHome ? '#skills' : '/#skills' },
    { label: 'Contact', id: 'contact', href: isHome ? '#contact' : '/#contact' },
  ];

  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const brandName = 'nabs';
  const brandTitle = profile?.title || 'Full-Stack Web & AI Developer';
  const resumeHref = profile?.resumeUrl || '/resume';
  const isExternalResume = resumeHref.startsWith('http');

  return (
    <header className="sticky top-0 z-40 bg-pop-cream/95 backdrop-blur-md border-b-[3px] border-black no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo Sticker */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 bg-pop-yellow border-[3px] border-black rounded-2xl flex items-center justify-center font-display font-black text-xl shadow-pop group-hover:rotate-6 group-hover:scale-105 transition">
            {profile?.name ? profile.name.charAt(0) : 'N'}
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-tight text-pop-dark group-hover:text-pop-orange transition">
              {brandName}
            </span>
            <span className="text-[11px] font-bold text-pop-dark/75 uppercase tracking-wider truncate max-w-[165px]">
              {brandTitle}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              (isHome && activeSection === link.id) ||
              (!isHome && link.id === 'projects' && pathname.startsWith('/projects'));

            return (
              <Link
                key={link.id}
                href={link.href}
                className={`px-3.5 py-2 font-display font-bold text-xs uppercase tracking-wider rounded-xl border-[2px] transition cursor-pointer ${
                  isActive
                    ? 'bg-pop-yellow border-black text-black shadow-pop-sm'
                    : 'border-transparent text-pop-dark/80 hover:text-black hover:bg-pop-yellow/40'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <Link
            href={resumeHref}
            target={isExternalResume ? '_blank' : undefined}
            rel={isExternalResume ? 'noopener noreferrer' : undefined}
            className="px-3.5 py-2 bg-white text-black border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:bg-pop-blue transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            <span>CV</span>
          </Link>

          <Link
            href={isHome ? '#contact' : '/#contact'}
            className="px-4 py-2 bg-pop-orange text-black border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition flex items-center gap-1.5 cursor-pointer"
          >
            <Coffee className="w-4 h-4" aria-hidden="true" />
            <span>Hire Me</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button (min 44x44px touch target) */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-pop-yellow border-[2px] border-black rounded-xl shadow-pop-sm"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-t-[2px] border-black bg-white p-4 space-y-3"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3.5 py-2.5 font-display font-bold text-sm text-pop-dark hover:bg-pop-yellow/40 rounded-xl border-2 border-transparent hover:border-black transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2 border-t-2 border-dashed border-slate-200 grid grid-cols-2 gap-2.5">
            <Link
              href={resumeHref}
              target={isExternalResume ? '_blank' : undefined}
              rel={isExternalResume ? 'noopener noreferrer' : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] py-2.5 bg-white text-black border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Resume</span>
            </Link>
            <Link
              href={isHome ? '#contact' : '/#contact'}
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] py-2.5 bg-pop-orange text-black border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm flex items-center justify-center gap-1.5"
            >
              <Coffee className="w-4 h-4" aria-hidden="true" />
              <span>Hire Me</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
