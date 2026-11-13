import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Github, Linkedin, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrintResumeButton from '@/components/PrintResumeButton';
import { sql, initDatabase } from '@/lib/db';
import { getSiteProfile } from '@/lib/settings';
import { Experience, Project, Skill } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Resume & CV',
  description:
    'Interactive and print-ready developer resume of Nabil Sahsada Suratno (@nabssku).',
};

export default async function ResumePage() {
  await initDatabase();

  const [profile, experiencesRaw, skillsRaw, projectsRaw] = await Promise.all([
    getSiteProfile(),
    sql`SELECT * FROM experiences ORDER BY sort_order ASC, start_year DESC;`,
    sql`SELECT * FROM skills ORDER BY category ASC, proficiency_level DESC;`,
    sql`SELECT * FROM projects WHERE is_published = true ORDER BY sort_order ASC LIMIT 6;`,
  ]);

  const experiences = experiencesRaw as unknown as Experience[];
  const skills = skillsRaw as unknown as Skill[];
  const projects = projectsRaw as unknown as Project[];

  const workExperiences = experiences.filter((e) => e.type !== 'education');
  const educationList = experiences.filter((e) => e.type === 'education');

  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, sk) => {
    const cat = (sk.category || 'tools').toLowerCase();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(sk);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col font-sans bg-pop-cream bg-halftone">
      <Navbar profile={profile} />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-10 space-y-6">
        {/* Top Action Bar (hidden when printing) */}
        <div className="flex items-center justify-between gap-4 flex-wrap no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:bg-pop-yellow transition"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Portfolio</span>
          </Link>

          <PrintResumeButton />
        </div>

        {/* Resume Sheet */}
        <div className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-10 shadow-pop-xl space-y-8 print:border-0 print:shadow-none print:p-0">
          {/* Header */}
          <header className="border-b-[3px] border-black pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-black text-pop-dark">
                  {profile.name}
                </h1>
                <p className="text-base sm:text-lg font-display font-bold text-pop-orange">
                  {profile.title}
                </p>
              </div>
              <span className="px-3 py-1 bg-pop-yellow border-[2px] border-black rounded-xl font-mono text-xs font-bold w-fit">
                {profile.handle}
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {profile.bio}
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-700 pt-1">
              {profile.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pop-orange" aria-hidden="true" />
                  {profile.location}
                </span>
              )}
              {profile.socials.email && (
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-pop-orange" aria-hidden="true" />
                  {profile.socials.email}
                </a>
              )}
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  <Github className="w-3.5 h-3.5 text-pop-orange" aria-hidden="true" />
                  {profile.socials.github.replace('https://', '')}
                </a>
              )}
              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  <Linkedin className="w-3.5 h-3.5 text-pop-orange" aria-hidden="true" />
                  {profile.socials.linkedin.replace('https://', '')}
                </a>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-pop-orange" aria-hidden="true" />
                nabs.vercel.app
              </span>
            </div>
          </header>

          {/* Work Experience */}
          {workExperiences.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-display font-black uppercase tracking-wider text-pop-dark border-b-2 border-dashed border-slate-300 pb-1.5">
                Experience
              </h2>
              <div className="space-y-4">
                {workExperiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-display font-bold text-base text-slate-900">
                        {exp.title} — <span className="text-pop-dark/80">{exp.institution}</span>
                      </h3>
                      <span className="font-mono text-xs font-bold text-slate-600">
                        {exp.start_year} – {exp.end_year} {exp.location ? `• ${exp.location}` : ''}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Selected Projects */}
          {projects.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-display font-black uppercase tracking-wider text-pop-dark border-b-2 border-dashed border-slate-300 pb-1.5">
                Selected Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-display font-bold text-base text-slate-900">
                        <Link href={`/projects/${proj.slug}`} className="hover:underline">
                          {proj.title}
                        </Link>
                      </h3>
                      <span className="font-mono text-xs font-semibold text-slate-600">
                        {proj.category}
                        {proj.year ? ` • ${proj.year}` : ''}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{proj.summary}</p>
                    {proj.tech_stack && (
                      <p className="text-xs font-mono text-slate-600">
                        Stack: {proj.tech_stack}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {educationList.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-display font-black uppercase tracking-wider text-pop-dark border-b-2 border-dashed border-slate-300 pb-1.5">
                Education
              </h2>
              <div className="space-y-3">
                {educationList.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-display font-bold text-base text-slate-900">
                        {edu.title} — {edu.institution}
                      </h3>
                      <span className="font-mono text-xs font-bold text-slate-600">
                        {edu.start_year} – {edu.end_year}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Skills */}
          {skills.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-display font-black uppercase tracking-wider text-pop-dark border-b-2 border-dashed border-slate-300 pb-1.5">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {Object.entries(skillsByCategory).map(([cat, list]) => (
                  <div key={cat} className="p-3 bg-pop-cream border-[2px] border-black rounded-2xl">
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-pop-dark block mb-1">
                      {cat}
                    </span>
                    <p className="text-slate-800 font-medium">
                      {list.map((s) => s.name).join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
