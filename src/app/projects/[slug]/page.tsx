import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmartImage from '@/components/SmartImage';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { sql, initDatabase } from '@/lib/db';
import { getSiteProfile } from '@/lib/settings';
import { Project } from '@/types';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Wrench } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await initDatabase();
  const { slug } = params;
  const projects = await sql`
    SELECT * FROM projects WHERE slug = ${slug} AND is_published = true LIMIT 1;
  `;
  const project = projects[0] as unknown as Project | undefined;

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const hasValidOgImage =
    project.thumbnail_url &&
    (project.thumbnail_url.startsWith('https://') || project.thumbnail_url.startsWith('http://'));

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      ...(hasValidOgImage ? { images: [{ url: project.thumbnail_url }] } : {}),
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  await initDatabase();
  const { slug } = params;

  const [projectsRaw, relatedRaw, profile] = await Promise.all([
    sql`SELECT * FROM projects WHERE slug = ${slug} AND is_published = true LIMIT 1;`,
    sql`
      SELECT id, title, slug, category, summary
      FROM projects
      WHERE is_published = true AND slug != ${slug}
      ORDER BY sort_order ASC, created_at DESC
      LIMIT 2;
    `,
    getSiteProfile(),
  ]);

  const project = projectsRaw[0] as unknown as Project | undefined;
  const relatedProjects = relatedRaw as unknown as Pick<
    Project,
    'id' | 'title' | 'slug' | 'category' | 'summary'
  >[];

  if (!project) {
    notFound();
  }

  const techTags = (project.tech_stack || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-pop-cream bg-halftone">
      <Navbar profile={profile} />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-12 space-y-8">
        {/* Back Link */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:bg-pop-yellow transition"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>All Projects</span>
          </Link>

          <Link
            href="/#projects"
            className="text-xs font-display font-bold text-pop-dark/80 hover:text-black underline underline-offset-4"
          >
            Back to Portfolio Home
          </Link>
        </div>

        {/* Project Card Header */}
        <article className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-10 shadow-pop-xl space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-3 py-1 bg-pop-yellow border-[2px] border-black rounded-xl shadow-pop-sm font-display font-bold text-xs uppercase tracking-wider">
                {project.category || 'Featured Showcase'}
              </span>
              {project.year && (
                <span className="inline-block px-3 py-1 bg-pop-green border-[2px] border-black rounded-xl shadow-pop-sm font-mono font-bold text-xs">
                  {project.year}
                </span>
              )}
              {project.role && (
                <span className="inline-block px-3 py-1 bg-pop-blue border-[2px] border-black rounded-xl shadow-pop-sm font-display font-bold text-xs">
                  {project.role}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              {project.summary}
            </p>

            {techTags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-pop-cream border-[2px] border-black rounded-xl font-mono text-xs font-bold text-pop-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail */}
          <div className="relative border-[3px] border-black rounded-2xl overflow-hidden aspect-video shadow-pop bg-slate-100">
            <SmartImage
              src={project.thumbnail_url}
              alt={project.title}
              sizes="(max-width: 896px) 100vw, 896px"
              priority
              className="object-cover"
            />
          </div>

          {/* Action CTAs */}
          {(project.demo_url || project.repo_url) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] py-3.5 px-6 bg-pop-orange text-black border-[3px] border-black rounded-2xl font-display font-bold text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Live Demo</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              )}

              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] py-3.5 px-6 bg-white text-black border-[3px] border-black rounded-2xl font-display font-bold text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          )}
        </article>

        {/* Markdown Content / Technical Architecture */}
        {project.content_markdown && (
          <section className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-10 shadow-pop space-y-5">
            <h2 className="text-2xl font-display font-black text-slate-900 border-b-2 border-dashed border-slate-300 pb-3 flex items-center gap-2.5">
              <Wrench className="w-6 h-6 text-pop-orange" aria-hidden="true" />
              <span>Technical Details &amp; Solution</span>
            </h2>
            <MarkdownRenderer content={project.content_markdown} />
          </section>
        )}

        {/* More Projects */}
        {relatedProjects.length > 0 && (
          <section className="space-y-4 pt-2">
            <h2 className="font-display font-black text-xl text-pop-dark">
              More Case Studies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.slug}`}
                  className="bg-white hover:bg-pop-yellow border-[3px] border-black rounded-2xl p-5 shadow-pop bento-card flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <span className="inline-block px-2 py-0.5 bg-pop-cream border border-black rounded-lg font-comic text-[11px] font-bold">
                      {rel.category}
                    </span>
                    <h3 className="font-display font-extrabold text-lg text-pop-dark">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-700 line-clamp-2 font-medium">
                      {rel.summary}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 font-display font-bold text-xs text-pop-dark">
                    Read Case Study <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer profile={profile} />
    </div>
  );
}
