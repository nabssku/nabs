'use client';

import React, { useState } from 'react';
import { Key, Mail, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login gagal');

      // Hard redirect so HttpOnly cookie is sent on next request
      window.location.href = '/admin';
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message || 'Email atau password tidak sesuai');
      } else {
        setErrorMsg('Email atau password tidak sesuai');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pop-cream bg-halftone flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white border-[4px] border-black rounded-3xl p-6 sm:p-8 shadow-pop-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto bg-pop-yellow border-[3px] border-black rounded-2xl flex items-center justify-center shadow-pop text-2xl font-black">
            🔐
          </div>
          <h1 className="text-2xl font-display font-black text-slate-900">
            Admin CMS Login
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Masuk untuk mengelola portofolio @nabssku
          </p>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="p-3.5 bg-rose-100 border-[2px] border-black rounded-2xl text-xs font-bold text-rose-900 shadow-pop-sm"
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Email Admin
            </label>
            <div className="relative">
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pop-yellow shadow-pop-sm"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" aria-hidden="true" />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pop-yellow shadow-pop-sm"
              />
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" aria-hidden="true" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-pop-yellow hover:bg-pop-yellow/90 text-black border-[3px] border-black rounded-2xl font-display font-black text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Memverifikasi...
              </>
            ) : (
              <>
                <span>Masuk Dashboard</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link
            href="/"
            className="text-xs font-display font-bold text-slate-600 hover:text-black transition inline-flex items-center gap-1"
          >
            ← Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
