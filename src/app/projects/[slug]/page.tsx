import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Sparkles, FolderGit2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const projects = await sql`SELECT * FROM projects WHERE slug = ${slug} LIMIT 1;`;
  const project = projects[0];

  if (!project) {
    return {
      title: 'Project Not Found | Nabil Sahsada',
    };
  }

  return {
    title: `${project.title} — Case Study & Project Showcase | @nabssku`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.thumbnail_url }],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const projects = await sql`SELECT * FROM projects WHERE slug = ${slug} LIMIT 1;`;
  const project = projects[0];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-pop-cream bg-halftone">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-12 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portofolio</span>
          </Link>
        </div>

        {/* Project Card Header */}
        <div className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-10 shadow-pop space-y-6">
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 bg-pop-yellow border-[2px] border-black rounded-xl shadow-pop-sm font-display font-bold text-xs uppercase tracking-wider">
              {project.category || 'Featured Showcase'}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Thumbnail */}
          <div className="border-[3px] border-black rounded-2xl overflow-hidden aspect-video shadow-pop bg-slate-100">
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[160px] py-3.5 px-6 bg-pop-orange text-black border-[3px] border-black rounded-2xl font-display font-bold text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lihat Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[160px] py-3.5 px-6 bg-white text-black border-[3px] border-black rounded-2xl font-display font-bold text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Markdown Content / Technical Architecture */}
        {project.content_markdown && (
          <div className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-10 shadow-pop space-y-4">
            <h2 className="text-2xl font-display font-black text-slate-900 border-b-2 border-dashed border-slate-300 pb-3">
              Technical Details & Solution 🛠️
            </h2>
            <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
              {project.content_markdown}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
