'use client';

import React, { useState } from 'react';
import { Send, Mail, MapPin, Github, Instagram, Linkedin, MessageSquare, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  profile: any;
}

export default function ContactSection({ profile }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengirim pesan');

      setSuccessMsg(data.message || 'Pesanmu berhasil terkirim!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pop-pink border-[2px] border-black rounded-xl shadow-pop-sm font-display font-bold text-xs uppercase tracking-wider text-black">
            <MessageSquare className="w-3.5 h-3.5" /> Direct Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-pop-dark">
            Let&apos;s Build Something Epic! 📬
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base max-w-xl mx-auto">
            Tertarik membuat website, berkolaborasi proyek SaaS, atau ingin konsultasi teknis? Kirim pesanmu di bawah.
          </p>
        </div>

        {/* Form & Social Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Socials */}
          <div className="lg:col-span-5 bg-white border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-pop space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-black text-2xl text-slate-900">
                Get In Touch
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Aku selalu terbuka untuk tawaran freelance project, full-time opportunities, ataupun sekadar ngobrol seputar software development.
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm font-bold text-slate-800">
              <div className="flex items-center gap-3 p-3 bg-pop-cream border-[2px] border-black rounded-2xl shadow-pop-sm">
                <Mail className="w-4 h-4 text-pop-orange" />
                <span className="truncate">{profile?.socials?.email || 'nabilsahsadabisnis@gmail.com'}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-pop-cream border-[2px] border-black rounded-2xl shadow-pop-sm">
                <MapPin className="w-4 h-4 text-pop-pink" />
                <span>Malang, Jawa Timur, Indonesia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Verified Socials
              </span>
              <div className="flex gap-2">
                <a
                  href={profile?.socials?.github || 'https://github.com/nabssku'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-pop-yellow border-[2px] border-black rounded-xl shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 text-black" />
                </a>
                <a
                  href={profile?.socials?.instagram || 'https://instagram.com/nabsskun'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-pop-pink border-[2px] border-black rounded-xl shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 text-black" />
                </a>
                <a
                  href={profile?.socials?.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-pop-blue border-[2px] border-black rounded-xl shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-black" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-pop">
            <form onSubmit={handleSubmit} className="space-y-4">
              {successMsg && (
                <div className="p-4 bg-pop-green border-[2px] border-black rounded-2xl shadow-pop-sm flex items-center gap-2 text-xs sm:text-sm font-bold text-black">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 bg-rose-100 border-[2px] border-black rounded-2xl shadow-pop-sm text-xs sm:text-sm font-bold text-rose-900">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Alex Pratama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pop-yellow shadow-pop-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Alamat Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pop-yellow shadow-pop-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Pesan / Rencana Proyek *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan detail proyek atau ajakan diskusi kamu..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pop-yellow shadow-pop-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-pop-yellow hover:bg-pop-yellow/90 text-black border-[3px] border-black rounded-2xl font-display font-black text-sm sm:text-base shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Mengirim Pesan...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Kirim Pesan Sekarang
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
