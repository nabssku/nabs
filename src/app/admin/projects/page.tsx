'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Github, Check, X, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [category, setCategory] = useState('Web App');
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setSummary('');
    setContentMarkdown('');
    setThumbnailUrl('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop');
    setCategory('Web App');
    setDemoUrl('');
    setRepoUrl('');
    setIsPublished(true);
    setSortOrder(0);
    setModalOpen(true);
  };

  const openEditModal = (proj: any) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setSlug(proj.slug);
    setSummary(proj.summary);
    setContentMarkdown(proj.content_markdown || '');
    setThumbnailUrl(proj.thumbnail_url);
    setCategory(proj.category || 'Web App');
    setDemoUrl(proj.demo_url || '');
    setRepoUrl(proj.repo_url || '');
    setIsPublished(proj.is_published);
    setSortOrder(proj.sort_order || 0);
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProject) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        title,
        slug,
        summary,
        content_markdown: contentMarkdown,
        thumbnail_url: thumbnailUrl,
        category,
        demo_url: demoUrl,
        repo_url: repoUrl,
        is_published: isPublished,
        sort_order: Number(sortOrder),
      };

      if (editingProject) {
        await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus project ini?')) return;
    try {
      await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus');
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
            Tambah, edit, dan kelola portofolio showcase & SaaS apps.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-pop-yellow border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Proyek Baru</span>
        </button>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-white border-[3px] border-black rounded-3xl shadow-pop text-slate-400 font-bold text-sm">
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
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base text-slate-900 truncate">
                      {p.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${p.is_published ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-slate-100 border-slate-400 text-slate-600'}`}>
                      {p.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                    {p.summary}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <span className="text-[10px] font-mono text-slate-400">Order: {p.sort_order}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-2 bg-pop-yellow border-[2px] border-black rounded-xl shadow-pop-sm hover:bg-pop-yellow/80 transition cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 bg-rose-100 border-[2px] border-black rounded-xl shadow-pop-sm hover:bg-rose-200 transition text-rose-700 cursor-pointer"
                    title="Hapus"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border-[4px] border-black rounded-3xl w-full max-w-2xl shadow-pop-xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="bg-pop-yellow border-b-[3px] border-black p-4 flex items-center justify-between">
              <h3 className="font-display font-black text-base">
                {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 bg-white border-[2px] border-black rounded-xl flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 bg-pop-cream flex-1 text-xs sm:text-sm">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
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
                  <label className="block font-bold text-slate-700 mb-1">Urutan (Sort Order)</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Thumbnail Image URL *</label>
                <input
                  type="url"
                  required
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Demo URL (Opsional)</label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://app.example.com"
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">GitHub Repo URL (Opsional)</label>
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
                <label className="block font-bold text-slate-700 mb-1">Detail Markdown / Solusi Teknis</label>
                <textarea
                  rows={4}
                  value={contentMarkdown}
                  onChange={(e) => setContentMarkdown(e.target.value)}
                  placeholder="Deskripsikan fitur utama, arsitektur, dan teknologi yang dipakai..."
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <label htmlFor="pub" className="font-bold text-slate-800 cursor-pointer">
                  Publikasikan langsung di web portofolio
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white border-[2px] border-black rounded-xl font-bold hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-pop-yellow border-[2px] border-black rounded-xl font-bold shadow-pop-sm hover:bg-pop-yellow/90 flex items-center gap-1.5"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
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
