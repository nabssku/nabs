'use client';

import React, { useState } from 'react';
import { Sparkles, ExternalLink, Github, ArrowUpRight, FolderGit2 } from 'lucide-react';
import ProjectModal from './ProjectModal';

interface ProjectsProps {
  projects: any[];
}

export default function ProjectsShowcase({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState<any | null>(null);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category || 'Web App')))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => (p.category || 'Web App') === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 border-b-[3px] border-black bg-pop-cream bg-halftone">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pop-orange border-[2px] border-black rounded-xl shadow-pop-sm font-display font-bold text-xs uppercase tracking-wider text-black">
              <FolderGit2 className="w-3.5 h-3.5" /> Featured Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-pop-dark">
              Crafted Projects & SaaS 🚀
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base max-w-xl">
              Koleksi web app, platform SaaS, dan sistem kasir yang dibangun dengan standar industri dan performa optimal.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 border-[2px] border-black rounded-xl font-display font-bold text-xs transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-pop-sm'
                    : 'bg-white text-black hover:bg-slate-100 shadow-pop-sm'
                }`}
              >
                {cat}
              </button>
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
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="flex-1 py-2.5 px-3 bg-pop-yellow border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:bg-pop-yellow/80 transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Detail Info</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white border-[2px] border-black rounded-xl shadow-pop-sm hover:bg-slate-100 transition"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4 text-black" />
                  </a>
                )}

                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white border-[2px] border-black rounded-xl shadow-pop-sm hover:bg-slate-100 transition"
                    title="Source Code"
                  >
                    <Github className="w-4 h-4 text-black" />
                  </a>
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
