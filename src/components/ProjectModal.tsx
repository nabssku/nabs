'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';
import SmartImage from './SmartImage';
import MarkdownRenderer from './MarkdownRenderer';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const techTags = (project?.tech_stack || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white border-[4px] border-black rounded-3xl shadow-pop-xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header Bar */}
            <div className="bg-pop-yellow border-b-[3px] border-black px-5 py-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2.5 py-1 bg-black text-white font-display font-bold text-xs uppercase rounded-lg shrink-0">
                  {project.category || 'Featured'}
                </span>
                <span className="font-display font-black text-base text-black truncate">
                  {project.title}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project preview"
                className="w-11 h-11 shrink-0 bg-white border-[2px] border-black rounded-xl flex items-center justify-center font-bold hover:bg-pop-orange shadow-pop-sm transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-pop-cream">
              {/* Thumbnail */}
              <div className="border-[3px] border-black rounded-2xl overflow-hidden shadow-pop bg-slate-100 relative aspect-video">
                <SmartImage
                  src={project.thumbnail_url}
                  alt={project.title}
                  sizes="(max-width: 672px) 100vw, 672px"
                  className="object-cover"
                />
              </div>

              {/* Title, Metadata & Summary */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-display font-bold text-pop-dark/80">
                  {project.role && (
                    <span className="px-2.5 py-1 bg-pop-blue/50 border-[2px] border-black rounded-lg">
                      Role: {project.role}
                    </span>
                  )}
                  {project.year && (
                    <span className="px-2.5 py-1 bg-pop-green/60 border-[2px] border-black rounded-lg font-mono">
                      {project.year}
                    </span>
                  )}
                </div>

                <h3
                  id="project-modal-title"
                  className="text-2xl font-display font-black text-slate-900"
                >
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {project.summary}
                </p>

                {techTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {techTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white border-[2px] border-black rounded-lg font-mono text-xs font-bold text-pop-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Rendered Markdown Content */}
              {project.content_markdown && (
                <div className="bg-white border-[2px] border-black rounded-2xl p-5 shadow-pop-sm space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-600">
                    Project Deep-Dive
                  </h4>
                  <MarkdownRenderer content={project.content_markdown} />
                </div>
              )}

              {/* External Links & Full Case Study */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/projects/${project.slug}`}
                  onClick={onClose}
                  className="flex-1 min-w-[160px] py-3 px-4 bg-pop-dark text-pop-cream border-[3px] border-black rounded-2xl font-display font-bold text-sm shadow-pop hover:bg-black transition flex items-center justify-center gap-2"
                >
                  <span>Full Case Study</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] py-3 px-4 bg-pop-orange text-black border-[3px] border-black rounded-2xl font-display font-bold text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}

                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] py-3 px-4 bg-white text-black border-[3px] border-black rounded-2xl font-display font-bold text-sm shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
