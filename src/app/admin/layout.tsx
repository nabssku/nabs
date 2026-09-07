'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderGit2, Sparkles, GraduationCap, MessageSquare, LogOut, ArrowUpRight, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, don't show admin sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Skills & Stack', href: '/admin/skills', icon: Sparkles },
    { label: 'Experiences', href: '/admin/experiences', icon: GraduationCap },
    { label: 'Inbox Messages', href: '/admin/messages', icon: MessageSquare },
  ];

  const handleLogout = async () => {
    // Clear cookies & redirect
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
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
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-pop-yellow border-[2px] border-black rounded-xl shadow-pop-sm"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r-[3px] border-black flex flex-col justify-between p-6 transition-transform duration-200 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-8">
          {/* Logo Brand */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-pop-yellow border-[2px] border-black rounded-2xl shadow-pop-sm">
              <span className="font-display font-black text-lg text-slate-900">🎨 Nabssku CMS</span>
            </div>
            <div className="text-[11px] font-bold text-slate-500 pl-1">
              Admin Portal • Q2 2026
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-display font-bold text-xs transition border-[2px] cursor-pointer
                    ${active
                      ? 'bg-pop-yellow border-black shadow-pop-sm text-black'
                      : 'border-transparent text-slate-600 hover:bg-pop-cream hover:border-black'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-6 border-t-2 border-dashed border-slate-200">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 bg-white border-[2px] border-black rounded-2xl font-display font-bold text-xs text-slate-800 shadow-pop-sm hover:bg-pop-cream transition"
          >
            <span>Live Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 bg-rose-50 border-[2px] border-rose-300 hover:border-black rounded-2xl font-display font-bold text-xs text-rose-700 hover:bg-rose-100 shadow-pop-sm transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
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
