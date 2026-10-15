'use client';

import React, { useState } from 'react';
import { Send, Mail, MapPin, Github, Instagram, Linkedin, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { Profile } from '@/types';
import SectionHeader from './ui/SectionHeader';
import NeoCard from './ui/NeoCard';
import NeoButton from './ui/NeoButton';
import { NeoInput, NeoTextarea } from './ui/NeoInput';

interface ContactProps {
  profile: Profile;
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <SectionHeader
          badge="Direct Contact"
          badgeColor="pink"
          badgeIcon={MessageSquare}
          title="Let's Build Something Epic! 📬"
          description="Tertarik membuat website, berkolaborasi proyek SaaS, atau ingin konsultasi teknis? Kirim pesanmu di bawah."
        />

        {/* Form & Social Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Socials */}
          <NeoCard className="lg:col-span-5 space-y-6">
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
                <span>{profile?.location || 'Malang, Jawa Timur, Indonesia'}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Verified Socials
              </span>
              <div className="flex gap-2">
                <NeoButton variant="icon" size="sm" href={profile?.socials?.github || 'https://github.com/nabssku'} target="_blank" rel="noreferrer" className="p-3 bg-pop-yellow">
                  <Github className="w-5 h-5 text-black" />
                </NeoButton>
                <NeoButton variant="icon" size="sm" href={profile?.socials?.instagram || 'https://instagram.com/nabsskun'} target="_blank" rel="noreferrer" className="p-3 bg-pop-pink">
                  <Instagram className="w-5 h-5 text-black" />
                </NeoButton>
                <NeoButton variant="icon" size="sm" href={profile?.socials?.linkedin || 'https://linkedin.com'} target="_blank" rel="noreferrer" className="p-3 bg-pop-blue">
                  <Linkedin className="w-5 h-5 text-black" />
                </NeoButton>
              </div>
            </div>
          </NeoCard>

          {/* Right: Contact Form */}
          <NeoCard className="lg:col-span-7">
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

              <NeoInput
                label="Nama Lengkap *"
                type="text"
                required
                placeholder="Misal: Alex Pratama"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <NeoInput
                label="Alamat Email *"
                type="email"
                required
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <NeoTextarea
                label="Pesan / Rencana Proyek *"
                required
                rows={4}
                placeholder="Ceritakan detail proyek atau ajakan diskusi kamu..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <NeoButton
                type="submit"
                disabled={loading}
                variant="ghost"
                size="lg"
                className="w-full py-4 bg-pop-yellow hover:bg-pop-yellow/90 border-[3px] font-black"
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
              </NeoButton>
            </form>
          </NeoCard>

        </div>

      </div>
    </section>
  );
}
