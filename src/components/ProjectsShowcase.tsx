'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, ArrowUpRight, FolderGit2 } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { Project } from '@/types';
import SectionHeader from './ui/SectionHeader';
import NeoButton from './ui/NeoButton';

interface ProjectsProps {
  projects: Project[];
}

const cardBgColors = [
  'bg-pop-yellow',
  'bg-pop-blue',
  'bg-pop-green',
  'bg-pop-purple',
];

export default function ProjectsShowcase({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category || 'Web App')))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => (p.category || 'Web App') === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            badge="PORTFOLIO"
            badgeColor="pink"
            badgeIcon={FolderGit2}
            title="FEATURED BENTO PROJECTS"
            description="Explore our latest SaaS platforms, web applications, and interactive digital experiences built with precision and flair."
            align="left"
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl border-[3px] border-black font-display font-bold text-xs sm:text-sm transition-all shadow-pop-sm ${
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isLarge = index % 4 === 0 || index % 4 === 3;
            const bgClass = cardBgColors[index % cardBgColors.length];
            const projectNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={project.id}
                onClick={() => setActiveProjectModal(project)}
                className={`${bgClass} border-[3px] border-black shadow-pop-xl rounded-3xl p-8 bento-card cursor-pointer flex flex-col justify-between space-y-6 ${
                  isLarge ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Top Row: Category Badge + Project Number */}
                <div className="flex items-center justify-between">
                  <span className="bg-white border-[2px] border-black rounded-lg px-3 py-1 font-comic text-xs font-bold text-pop-dark shadow-pop-sm">
                    {project.category || 'Web App'}
                  </span>
                  <span className="font-comic font-extrabold text-lg text-pop-dark bg-white/80 border-[2px] border-black rounded-xl px-3 py-0.5">
                    {projectNumber}
                  </span>
                </div>

                {/* Thumbnail Preview if available */}
                {project.thumbnail_url && (
                  <div className="relative w-full h-48 sm:h-60 rounded-2xl border-[3px] border-black overflow-hidden bg-white shadow-pop-sm">
                    <Image
                      src={project.thumbnail_url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  <h3 className={`font-display font-extrabold text-pop-dark tracking-tight ${isLarge ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
                    {project.title}
                  </h3>
                  <p className="font-medium text-pop-dark/90 text-sm sm:text-base line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                {/* Bottom Row / CTA */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-black/20">
                  <div className="flex items-center gap-2">
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 bg-white border-[2px] border-black rounded-xl font-comic text-xs font-bold text-pop-dark hover:bg-pop-yellow transition shadow-pop-sm flex items-center gap-1.5"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 bg-white border-[2px] border-black rounded-xl font-comic text-xs font-bold text-pop-dark hover:bg-pop-green transition shadow-pop-sm flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>

                  <div className="bg-pop-dark text-pop-cream border-[2px] border-black rounded-xl px-4 py-2 font-display text-xs font-bold flex items-center gap-2 shadow-pop-sm group-hover:bg-black transition">
                    <span>View Code ➔</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white border-[3px] border-black rounded-3xl shadow-pop">
            <p className="font-comic text-lg text-pop-dark">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </section>
  );
}
