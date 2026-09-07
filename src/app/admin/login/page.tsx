'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Sparkles, Key, Mail, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('nabilsahsadabisnis@gmail.com');
  const [password, setPassword] = useState('admin123456');
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

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Email atau password tidak sesuai');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pop-cream bg-halftone flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white border-[4px] border-black rounded-3xl p-6 sm:p-8 shadow-pop-xl space-y-6">
        
        {/* Header */}
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
          <div className="p-3.5 bg-rose-100 border-[2px] border-black rounded-2xl text-xs font-bold text-rose-900 shadow-pop-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Admin
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pop-yellow shadow-pop-sm"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pop-yellow shadow-pop-sm"
              />
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-pop-yellow hover:bg-pop-yellow/90 text-black border-[3px] border-black rounded-2xl font-display font-black text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Memverifikasi...
              </>
            ) : (
              <>
                <span>Masuk Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link
            href="/"
            className="text-xs font-display font-bold text-slate-500 hover:text-black transition inline-flex items-center gap-1"
          >
            ← Kembali ke Halaman Utama
          </Link>
        </div>

      </div>
    </div>
  );
}
