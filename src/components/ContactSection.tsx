'use client';

import React, { useState } from 'react';
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
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
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCopyEmail = async (emailAddr: string) => {
    try {
      await navigator.clipboard.writeText(emailAddr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
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
    <section
      id="contact"
      className="scroll-mt-20 py-20 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-pop-yellow border-[3px] border-black shadow-pop-xl rounded-3xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Info & Headline */}
          <div className="space-y-8">
            <div className="space-y-4">
              <NeoBadge color="orange" icon={Send}>
                LET&apos;S CONNECT
              </NeoBadge>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-pop-dark tracking-tight leading-tight">
                READY TO BUILD SOMETHING GREAT?
              </h2>
              <p className="font-medium text-pop-dark/90 text-base sm:text-lg">
                Have a project in mind, need help shipping an MVP, or want to collaborate on a web app? Drop a message and let&apos;s talk!
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {profile.socials?.email && (
                <div className="bg-white border-[3px] border-black rounded-2xl p-4 shadow-pop flex items-center justify-between gap-3 bento-card text-pop-dark">
                  <a
                    href={`mailto:${profile.socials.email}`}
                    className="flex items-center gap-4 min-w-0 group"
                  >
                    <div className="w-12 h-12 bg-pop-blue border-[2px] border-black rounded-xl flex items-center justify-center shadow-pop-sm shrink-0">
                      <Mail className="w-5 h-5 text-pop-dark" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-comic text-xs font-bold text-pop-dark/75 uppercase block">
                        Email Me
                      </span>
                      <p className="font-display font-bold text-sm sm:text-base truncate group-hover:underline">
                        {profile.socials.email}
                      </p>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyEmail(profile.socials.email)}
                    aria-label="Copy email address"
                    className="min-w-[44px] min-h-[44px] px-3 bg-pop-cream hover:bg-pop-yellow border-[2px] border-black rounded-xl font-display font-bold text-xs flex items-center gap-1.5 shadow-pop-sm shrink-0 cursor-pointer transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {profile.location && (
                <div className="bg-white border-[3px] border-black rounded-2xl p-4 shadow-pop flex items-center gap-4 bento-card text-pop-dark">
                  <div className="w-12 h-12 bg-pop-green border-[2px] border-black rounded-xl flex items-center justify-center shadow-pop-sm shrink-0">
                    <MapPin className="w-5 h-5 text-pop-dark" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-comic text-xs font-bold text-pop-dark/75 uppercase block">
                      Location
                    </span>
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
                  className="min-h-[44px] px-4 py-2.5 bg-white border-[3px] border-black rounded-xl font-comic text-xs font-bold text-pop-dark shadow-pop hover:bg-pop-blue transition flex items-center gap-2"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              )}
              {profile.socials?.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 bg-white border-[3px] border-black rounded-xl font-comic text-xs font-bold text-pop-dark shadow-pop hover:bg-pop-blue transition flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.socials?.instagram && (
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 bg-white border-[3px] border-black rounded-xl font-comic text-xs font-bold text-pop-dark shadow-pop hover:bg-pop-pink transition flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Side: Contact Form Card */}
          <div className="bg-white border-[3px] border-black shadow-pop-xl rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1.5">
              <h3 className="font-display font-extrabold text-2xl text-pop-dark">
                Send a Message
              </h3>
              <p className="font-comic text-xs font-semibold text-pop-dark/75">
                Fill out the form below and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {successMsg && (
              <div
                role="status"
                aria-live="polite"
                className="bg-pop-green border-[3px] border-black rounded-xl p-4 text-pop-dark font-medium flex items-center gap-3 shadow-pop-sm"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-900" aria-hidden="true" />
                <span className="font-comic text-sm font-bold">{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                aria-live="polite"
                className="bg-pop-pink border-[3px] border-black rounded-xl p-4 text-pop-dark font-medium flex items-center gap-3 shadow-pop-sm"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-900" aria-hidden="true" />
                <span className="font-comic text-sm font-bold">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field for bot filtering */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <NeoInput
                label="Your Name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={2}
                maxLength={100}
                required
              />

              <NeoInput
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="e.g. alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <NeoTextarea
                label="Message"
                placeholder="Tell me about your project, timeline, or inquiry..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                minLength={10}
                maxLength={2000}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[48px] bg-pop-orange border-[3px] border-black shadow-pop font-display font-bold text-pop-dark py-3.5 px-6 rounded-2xl bento-card flex items-center justify-center gap-2 hover:bg-orange-400 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Send Message</span>
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
