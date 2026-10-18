'use client';

import React, { useState } from 'react';
import { Send, Mail, MapPin, Github, Linkedin, Instagram, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Profile } from '@/types';
import NeoBadge from './ui/NeoBadge';
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
      if (!res.ok) throw new Error(data.error || 'Failed to send message');

      setSuccessMsg(data.message || 'Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone">
      <div className="max-w-6xl mx-auto">
        {/* Outer Bento Container */}
        <div className="bg-pop-yellow border-[3px] border-black shadow-pop-xl rounded-3xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Info & Headline */}
          <div className="space-y-8">
            <div className="space-y-4">
              <NeoBadge color="orange" icon={Send}>
                LET&apos;S CONNECT
              </NeoBadge>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-pop-dark tracking-tight leading-tight">
                READY TO BUILD SOMETHING EPIC?
              </h2>
              <p className="font-medium text-pop-dark/90 text-base sm:text-lg">
                Have a project in mind, a question about our work, or just want to chat about tech and design? Drop a message and let&apos;s talk!
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {profile.socials?.email && (
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="bg-white border-[3px] border-black rounded-2xl p-4 shadow-pop flex items-center gap-4 bento-card text-pop-dark group"
                >
                  <div className="w-12 h-12 bg-pop-blue border-[2px] border-black rounded-xl flex items-center justify-center text-xl shadow-pop-sm">
                    📧
                  </div>
                  <div>
                    <span className="font-comic text-xs text-pop-dark/70 uppercase">Email Me</span>
                    <p className="font-display font-bold text-base sm:text-lg group-hover:underline">
                      {profile.socials.email}
                    </p>
                  </div>
                </a>
              )}

              {profile.location && (
                <div className="bg-white border-[3px] border-black rounded-2xl p-4 shadow-pop flex items-center gap-4 bento-card text-pop-dark">
                  <div className="w-12 h-12 bg-pop-green border-[2px] border-black rounded-xl flex items-center justify-center text-xl shadow-pop-sm">
                    📍
                  </div>
                  <div>
                    <span className="font-comic text-xs text-pop-dark/70 uppercase">Location</span>
                    <p className="font-display font-bold text-base sm:text-lg">
                      {profile.location}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {profile.socials?.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border-[3px] border-black rounded-xl font-comic text-xs font-bold text-pop-dark shadow-pop hover:bg-pop-blue transition flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {profile.socials?.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border-[3px] border-black rounded-xl font-comic text-xs font-bold text-pop-dark shadow-pop hover:bg-pop-blue transition flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.socials?.instagram && (
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border-[3px] border-black rounded-xl font-comic text-xs font-bold text-pop-dark shadow-pop hover:bg-pop-pink transition flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Side: Contact Form Card */}
          <div className="bg-white border-[3px] border-black shadow-pop-xl rounded-3xl p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-2xl text-pop-dark">
                Send a Message ✉️
              </h3>
              <p className="font-comic text-xs text-pop-dark/70">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {successMsg && (
              <div className="bg-pop-green border-[3px] border-black rounded-xl p-4 text-pop-dark font-medium flex items-center gap-3 shadow-pop-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-800" />
                <span className="font-comic text-sm">{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="bg-pop-pink border-[3px] border-black rounded-xl p-4 text-pop-dark font-medium flex items-center gap-3 shadow-pop-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-800" />
                <span className="font-comic text-sm">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <NeoInput
                label="Your Name"
                type="text"
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <NeoInput
                label="Email Address"
                type="email"
                placeholder="e.g. alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <NeoTextarea
                label="Message"
                placeholder="Tell us about your project or inquiry..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pop-orange border-[3px] border-black shadow-pop font-display font-bold text-pop-dark py-3.5 px-6 rounded-2xl bento-card flex items-center justify-center gap-2 hover:bg-orange-400 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message 🚀</span>
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
