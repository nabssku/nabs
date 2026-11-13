'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  Sparkles,
  GraduationCap,
  MessageSquare,
  Settings2,
  LogOut,
  ArrowUpRight,
  Menu,
  X,
  Loader2,
  FileText,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(pathname !== '/admin/login');

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsVerifying(false);
      return;
    }

    fetch('/api/auth/me')
      .then((res) => {
        if (res.status === 401) {
          window.location.href = '/admin/login';
        } else {
          setIsVerifying(false);
        }
      })
      .catch(() => {
        setIsVerifying(false);
      });
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-pop-cream flex items-center justify-center">
        <div className="p-6 bg-white border-[3px] border-black rounded-3xl shadow-pop flex items-center gap-3 font-display font-bold text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-pop-orange" aria-hidden="true" />
          <span>Memverifikasi Akses Admin...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Skills & Stack', href: '/admin/skills', icon: Sparkles },
    { label: 'Experiences', href: '/admin/experiences', icon: GraduationCap },
    { label: 'Inbox Messages', href: '/admin/messages', icon: MessageSquare },
    { label: 'Profile Settings', href: '/admin/settings', icon: Settings2 },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/me', { method: 'POST' });
    } catch {
      // Fallback redirect regardless
    }
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-pop-cream bg-halftone flex flex-col md:flex-row font-sans">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-white border-b-[3px] border-black p-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pop-yellow border-[2px] border-black rounded-lg flex items-center justify-center font-display font-black text-sm shadow-pop-sm">
            N
          </div>
          <span className="font-display font-black text-base">Nabssku CMS</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Tutup menu admin' : 'Buka menu admin'}
          aria-expanded={mobileOpen}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-pop-yellow border-[2px] border-black rounded-xl shadow-pop-sm"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r-[3px] border-black flex flex-col justify-between p-6 transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Logo Brand */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-pop-yellow border-[2px] border-black rounded-2xl shadow-pop-sm">
              <span className="font-display font-black text-lg text-slate-900">Nabssku CMS</span>
            </div>
            <div className="text-[11px] font-bold text-slate-600 pl-1">
              Portfolio Admin Portal
            </div>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Admin navigation" className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-display font-bold text-xs transition border-[2px] cursor-pointer ${
                    active
                      ? 'bg-pop-yellow border-black shadow-pop-sm text-black'
                      : 'border-transparent text-slate-700 hover:bg-pop-cream hover:border-black'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2.5 pt-6 border-t-2 border-dashed border-slate-200">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 bg-white border-[2px] border-black rounded-2xl font-display font-bold text-xs text-slate-800 shadow-pop-sm hover:bg-pop-cream transition"
          >
            <span>Lihat Website</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <Link
            href="/resume"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 bg-pop-blue/40 border-[2px] border-black rounded-2xl font-display font-bold text-xs text-slate-800 shadow-pop-sm hover:bg-pop-blue transition"
          >
            <span>Preview CV / Resume</span>
            <FileText className="w-4 h-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 bg-rose-50 border-[2px] border-rose-300 hover:border-black rounded-2xl font-display font-bold text-xs text-rose-700 hover:bg-rose-100 shadow-pop-sm transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-6xl overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
