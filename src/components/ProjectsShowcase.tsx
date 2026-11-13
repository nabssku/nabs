'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, ArrowUpRight, FolderGit2, Eye, Search } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { Project } from '@/types';
import SectionHeader from './ui/SectionHeader';
import SmartImage from './SmartImage';

interface ProjectsProps {
  projects: Project[];
  showSearch?: boolean;
  showArchiveLink?: boolean;
}

const cardBgColors = ['bg-pop-yellow', 'bg-pop-blue', 'bg-pop-green', 'bg-pop-purple'];

export default function ProjectsShowcase({
  projects,
  showSearch = false,
  showArchiveLink = true,
}: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category || 'Web App')))],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat =
        selectedCategory === 'All' || (p.category || 'Web App') === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.tech_stack || '').toLowerCase().includes(q)
      );
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section
      id="projects"
      className="scroll-mt-20 py-20 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            badge="PORTFOLIO"
            badgeColor="pink"
            badgeIcon={FolderGit2}
            title="FEATURED PROJECTS"
            description="Selected SaaS platforms, POS systems, web applications, and digital experiences I have designed and engineered."
            align="left"
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`min-h-[40px] px-4 py-2 rounded-xl border-[3px] border-black font-display font-bold text-xs sm:text-sm transition-all shadow-pop-sm cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-pop-orange text-pop-dark translate-x-[2px] translate-y-[2px] shadow-none'
                    : 'bg-white text-pop-dark hover:bg-pop-yellow'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Search Bar (used on /projects archive) */}
        {showSearch && (
          <div className="relative max-w-md">
            <Search
              className="w-4 h-4 text-pop-dark/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title or tech stack..."
              aria-label="Search projects"
              className="w-full pl-11 pr-4 py-3 bg-white border-[3px] border-black rounded-2xl text-sm font-medium text-pop-dark placeholder:text-slate-500 shadow-pop-sm"
            />
          </div>
        )}

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isLarge = index % 4 === 0 || index % 4 === 3;
            const bgClass = cardBgColors[index % cardBgColors.length];
            const projectNumber = String(index + 1).padStart(2, '0');
            const techTags = (project.tech_stack || '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean);
            const visibleTags = techTags.slice(0, 4);
            const extraTagCount = Math.max(techTags.length - visibleTags.length, 0);

            return (
              <article
                key={project.id}
                className={`${bgClass} border-[3px] border-black shadow-pop-xl rounded-3xl p-6 sm:p-8 bento-card flex flex-col justify-between space-y-5 ${
                  isLarge ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                <div className="space-y-5">
                  {/* Top Row: Category Badge + Year/Number */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-white border-[2px] border-black rounded-lg px-3 py-1 font-comic text-xs font-bold text-pop-dark shadow-pop-sm">
                        {project.category || 'Web App'}
                      </span>
                      {project.year && (
                        <span className="bg-pop-cream border-[2px] border-black rounded-lg px-2.5 py-1 font-mono text-xs font-bold text-pop-dark">
                          {project.year}
                        </span>
                      )}
                    </div>
                    <span className="font-comic font-extrabold text-base text-pop-dark bg-white/90 border-[2px] border-black rounded-xl px-3 py-0.5">
                      {projectNumber}
                    </span>
                  </div>

                  {/* Thumbnail Preview */}
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(project)}
                    className="group relative block w-full h-48 sm:h-60 rounded-2xl border-[3px] border-black overflow-hidden bg-white shadow-pop-sm cursor-pointer text-left"
                    aria-label={`Quick preview ${project.title}`}
                  >
                    <SmartImage
                      src={project.thumbnail_url}
                      alt={project.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </button>

                  {/* Content */}
                  <div className="space-y-2.5">
                    <h3
                      className={`font-display font-extrabold text-pop-dark tracking-tight ${
                        isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                      }`}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:underline decoration-[3px] underline-offset-4"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="font-medium text-pop-dark/90 text-sm sm:text-base line-clamp-3">
                      {project.summary}
                    </p>

                    {visibleTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {visibleTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 bg-white/90 border-[2px] border-black rounded-lg font-mono text-[11px] font-bold text-pop-dark"
                          >
                            {tag}
                          </span>
                        ))}
                        {extraTagCount > 0 && (
                          <span className="px-2 py-0.5 bg-pop-cream border-[2px] border-black rounded-lg font-mono text-[11px] font-bold text-pop-dark">
                            +{extraTagCount}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Row / Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t-2 border-black/20">
                  <div className="flex items-center gap-2">
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] px-3 py-2 bg-white border-[2px] border-black rounded-xl font-comic text-xs font-bold text-pop-dark hover:bg-pop-cream transition shadow-pop-sm flex items-center gap-1.5"
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] px-3 py-2 bg-white border-[2px] border-black rounded-xl font-comic text-xs font-bold text-pop-dark hover:bg-pop-cream transition shadow-pop-sm flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveProjectModal(project)}
                      className="min-h-[40px] px-3 py-2 bg-white border-[2px] border-black rounded-xl font-display text-xs font-bold text-pop-dark hover:bg-pop-orange transition shadow-pop-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Preview</span>
                    </button>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="min-h-[40px] bg-pop-dark text-pop-cream border-[2px] border-black rounded-xl px-3.5 py-2 font-display text-xs font-bold flex items-center gap-1.5 shadow-pop-sm hover:bg-black transition"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white border-[3px] border-black rounded-3xl shadow-pop space-y-3">
            <p className="font-comic text-lg text-pop-dark">
              No projects matched this filter.
            </p>
            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-pop-yellow border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* Archive CTA */}
        {showArchiveLink && projects.length > 0 && (
          <div className="flex justify-center pt-2">
            <Link
              href="/projects"
              className="px-6 py-3 bg-white hover:bg-pop-yellow text-pop-dark border-[3px] border-black rounded-2xl font-display font-bold text-sm shadow-pop hover:translate-x-[-2px] hover:translate-y-[-2px] transition inline-flex items-center gap-2"
            >
              <span>Browse All Projects & Case Studies</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
}
