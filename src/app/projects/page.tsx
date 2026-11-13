import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import { sql, initDatabase } from '@/lib/db';
import { getSiteProfile } from '@/lib/settings';
import { Project } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects & Case Studies',
  description:
    'Complete archive of web applications, SaaS platforms, POS systems, and AI projects built by Nabil Sahsada Suratno (@nabssku).',
};

export default async function ProjectsArchivePage() {
  await initDatabase();

  const [projectsRaw, profile] = await Promise.all([
    sql`
      SELECT * FROM projects
      WHERE is_published = true
      ORDER BY sort_order ASC, created_at DESC;
    `,
    getSiteProfile(),
  ]);

  const projects = projectsRaw as unknown as Project[];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-pop-cream bg-halftone">
      <Navbar profile={profile} />
      <main id="main-content" className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:bg-pop-yellow transition"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>

        <ProjectsShowcase
          projects={projects}
          showSearch={true}
          showArchiveLink={false}
        />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
