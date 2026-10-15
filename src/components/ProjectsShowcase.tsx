'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, FolderGit2 } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { Project } from '@/types';
import SectionHeader from './ui/SectionHeader';
import NeoButton from './ui/NeoButton';

interface ProjectsProps {
  projects: Project[];
}

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
            badge="Featured Works"
            badgeColor="orange"
            badgeIcon={FolderGit2}
            title="Crafted Projects & SaaS 🚀"
            description="Koleksi web app, platform SaaS, dan sistem kasir yang dibangun dengan standar industri dan performa optimal."
            align="left"
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <NeoButton
                key={cat}
                variant={selectedCategory === cat ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat
                  ? 'bg-black text-white border-[2px] shadow-pop-sm'
                  : 'border-[2px] shadow-pop-sm'
                }
              >
                {cat}
              </NeoButton>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border-[3px] border-black rounded-3xl overflow-hidden shadow-pop hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-pop-sm transition flex flex-col justify-between group"
            >
              {/* Thumbnail Container */}
              <div>
                <div className="relative aspect-video border-b-[3px] border-black overflow-hidden bg-slate-100">
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-pop-yellow border-[2px] border-black px-2.5 py-0.5 rounded-lg font-display font-bold text-[10px] uppercase shadow-pop-sm">
                    {project.category || 'Full-Stack'}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-black text-xl text-slate-900 group-hover:text-pop-orange transition line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <NeoButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveProjectModal(project)}
                  className="flex-1 py-2.5"
                >
                  <span>Detail Info</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </NeoButton>

                {project.demo_url && (
                  <NeoButton variant="icon" size="sm" href={project.demo_url} target="_blank" rel="noreferrer" className="p-2.5">
                    <ExternalLink className="w-4 h-4 text-black" />
                  </NeoButton>
                )}

                {project.repo_url && (
                  <NeoButton variant="icon" size="sm" href={project.repo_url} target="_blank" rel="noreferrer" className="p-2.5">
                    <Github className="w-4 h-4 text-black" />
                  </NeoButton>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </section>
  );
}
