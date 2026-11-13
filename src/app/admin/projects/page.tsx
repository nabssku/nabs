'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Plus,
  Edit2,
  Trash2,
  ArrowUpRight,
  Check,
  X,
  Loader2,
  UploadCloud,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Project } from '@/types';

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState('');
  const [category, setCategory] = useState('Web App');
  const [techStack, setTechStack] = useState('');
  const [role, setRole] = useState('');
  const [year, setYear] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setSummary('');
    setContentMarkdown('');
    setThumbnailUrl(
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
    );
    setCloudinaryPublicId('');
    setCategory('Web App');
    setTechStack('');
    setRole('Full-Stack Developer');
    setYear(String(new Date().getFullYear()));
    setDemoUrl('');
    setRepoUrl('');
    setIsFeatured(false);
    setIsPublished(true);
    setSortOrder(0);
    setErrorMsg(null);
    setSuccessMsg(null);
    setModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setSlug(proj.slug);
    setSummary(proj.summary);
    setContentMarkdown(proj.content_markdown || '');
    setThumbnailUrl(proj.thumbnail_url);
    setCloudinaryPublicId(proj.cloudinary_public_id || '');
    setCategory(proj.category || 'Web App');
    setTechStack(proj.tech_stack || '');
    setRole(proj.role || '');
    setYear(proj.year || '');
    setDemoUrl(proj.demo_url || '');
    setRepoUrl(proj.repo_url || '');
    setIsFeatured(Boolean(proj.is_featured));
    setIsPublished(Boolean(proj.is_published));
    setSortOrder(proj.sort_order || 0);
    setErrorMsg(null);
    setSuccessMsg(null);
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProject) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'portfolio/projects');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload gagal');
      if (!data.url) throw new Error('Upload gagal: URL tidak ditemukan');

      setThumbnailUrl(data.url);
      setCloudinaryPublicId(data.public_id || '');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal mengunggah gambar';
      setErrorMsg(message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim() || !slug.trim() || !summary.trim() || !thumbnailUrl.trim()) {
      setErrorMsg('Harap isi semua field yang wajib (*): Judul, Slug, Summary, dan Thumbnail.');
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title,
        slug,
        summary,
        content_markdown: contentMarkdown,
        thumbnail_url: thumbnailUrl,
        cloudinary_public_id: cloudinaryPublicId,
        category,
        tech_stack: techStack,
        role,
        year,
        demo_url: demoUrl,
        repo_url: repoUrl,
        is_featured: isFeatured,
        is_published: isPublished,
        sort_order: Number(sortOrder),
      };

      const res = editingProject
        ? await fetch(`/api/admin/projects/${editingProject.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/admin/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan project');
      }

      setSuccessMsg('Proyek berhasil disimpan!');
      setSaving(false);
      setTimeout(() => {
        setModalOpen(false);
        fetchProjects();
      }, 900);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal menyimpan project';
      setErrorMsg(message);
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Yakin ingin menghapus project ini beserta aset medianya?')) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus proyek');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900">
            Projects Manager 🚀
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Tambah, edit, dan kelola portofolio showcase &amp; aset Cloudinary.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-pop-yellow border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Buat Proyek Baru</span>
        </button>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-white border-[3px] border-black rounded-3xl shadow-pop text-slate-500 font-bold text-sm">
          Belum ada proyek. Klik tombol &quot;Buat Proyek Baru&quot; di atas.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white border-[3px] border-black rounded-3xl overflow-hidden shadow-pop flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video border-b-[2px] border-black bg-slate-100">
                  <img
                    src={p.thumbnail_url}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-pop-yellow border-[2px] border-black rounded-lg text-[10px] font-display font-bold">
                    {p.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-base text-slate-900 truncate">
                      {p.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                        p.is_published
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                          : 'bg-slate-100 border-slate-400 text-slate-600'
                      }`}
                    >
                      {p.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                    {p.summary}
                  </p>
                  {p.tech_stack && (
                    <p className="text-[11px] font-mono text-slate-500 truncate">
                      {p.tech_stack}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-3 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500">Order: {p.sort_order}</span>
                  {p.is_published && (
                    <Link
                      href={`/projects/${p.slug}`}
                      target="_blank"
                      className="text-[11px] font-display font-bold text-pop-dark hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Buka</span>
                      <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(p)}
                    className="p-2 bg-pop-yellow border-[2px] border-black rounded-xl shadow-pop-sm hover:bg-pop-yellow/80 transition cursor-pointer"
                    title="Edit proyek"
                    aria-label={`Edit ${p.title}`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    className="p-2 bg-rose-100 border-[2px] border-black rounded-xl shadow-pop-sm hover:bg-rose-200 transition text-rose-700 cursor-pointer"
                    title="Hapus proyek"
                    aria-label={`Hapus ${p.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-[4px] border-black rounded-3xl w-full max-w-2xl shadow-pop-xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="bg-pop-yellow border-b-[3px] border-black p-4 flex items-center justify-between">
              <h3 className="font-display font-black text-base">
                {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Tutup modal"
                className="w-9 h-9 bg-white border-[2px] border-black rounded-xl flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="p-6 overflow-y-auto space-y-4 bg-pop-cream flex-1 text-xs sm:text-sm"
            >
              {errorMsg && (
                <div className="p-3 bg-rose-100 border-[2px] border-black rounded-xl text-rose-800 text-xs font-bold flex items-center justify-between">
                  <span>{errorMsg}</span>
                  <button
                    type="button"
                    onClick={() => setErrorMsg(null)}
                    className="text-rose-900 font-bold text-sm"
                  >
                    ×
                  </button>
                </div>
              )}
              {successMsg && (
                <div className="p-3 bg-emerald-100 border-[2px] border-black rounded-xl text-emerald-800 text-xs font-bold">
                  {successMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Judul Proyek *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Slug URL *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="SaaS / Web App / POS"
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Urutan</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tech Stack (pisahkan koma)
                  </label>
                  <input
                    type="text"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    placeholder="Next.js, TypeScript, PostgreSQL"
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Peran (Role)</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Full-Stack Developer"
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
                  />
                </div>
              </div>

              {/* Cloudinary Media Uploader / URL Fallback */}
              <div className="p-4 bg-white border-[2px] border-black rounded-2xl shadow-pop-sm space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4 text-pop-blue" aria-hidden="true" />
                    <span>Thumbnail (Cloudinary / URL) *</span>
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="px-3 py-1.5 bg-pop-blue border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:bg-pop-blue/80 flex items-center gap-1 cursor-pointer"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Mengunggah...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-3.5 h-3.5" /> Upload dari Komputer
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {thumbnailUrl && (
                    <div className="w-20 h-14 border-[2px] border-black rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={thumbnailUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="url"
                    required
                    placeholder="https://res.cloudinary.com/... atau URL gambar eksternal"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-pop-cream border-[2px] border-black rounded-xl font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Demo URL (Opsional)
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://app.example.com"
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    GitHub Repo URL (Opsional)
                  </label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/nabssku/repo"
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Summary Singkat *</label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Detail Markdown / Solusi Teknis
                </label>
                <textarea
                  rows={4}
                  value={contentMarkdown}
                  onChange={(e) => setContentMarkdown(e.target.value)}
                  placeholder="## Tentang Proyek&#10;- Fitur 1&#10;- Fitur 2"
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 accent-black"
                  />
                  <span>Publikasikan di website</span>
                </label>

                <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 accent-black"
                  />
                  <span>Tandai Featured</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white border-[2px] border-black rounded-xl font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-pop-yellow border-[2px] border-black rounded-xl font-bold shadow-pop-sm hover:bg-pop-yellow/90 flex items-center gap-1.5 cursor-pointer"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Simpan Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
