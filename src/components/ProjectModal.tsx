'use client';

import React from 'react';
import { X, ExternalLink, Github, Sparkles, Layers, CheckCircle } from 'lucide-react';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white border-[4px] border-black rounded-3xl shadow-pop-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-pop-yellow border-b-[3px] border-black p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-black text-white font-display font-bold text-xs uppercase rounded-lg">
              {project.category || 'Featured'}
            </span>
            <span className="font-display font-black text-base text-black truncate max-w-xs">
              {project.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white border-[2px] border-black rounded-xl flex items-center justify-center font-bold hover:bg-slate-100 shadow-pop-sm transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-pop-cream">
          {/* Thumbnail / Mockup */}
          <div className="border-[3px] border-black rounded-2xl overflow-hidden shadow-pop bg-slate-100 relative group aspect-video">
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Summary */}
          <div className="space-y-2">
            <h3 className="text-2xl font-display font-black text-slate-900">
              {project.title}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {project.summary}
            </p>
          </div>

          {/* Markdown / Detail Content */}
          {project.content_markdown && (
            <div className="bg-white border-[2px] border-black rounded-2xl p-4 shadow-pop-sm space-y-2">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500">
                Project Deep-Dive
              </h4>
              <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                {project.content_markdown}
              </div>
            </div>
          )}

          {/* External Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[140px] py-3 px-4 bg-pop-orange text-black border-[3px] border-black rounded-2xl font-display font-bold text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[140px] py-3 px-4 bg-white text-black border-[3px] border-black rounded-2xl font-display font-bold text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
