'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit2, X, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skill } from '@/types';

export default function AdminSkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('frontend');
  const [proficiencyLevel, setProficiencyLevel] = useState(90);
  const [iconUrl, setIconUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchSkills = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/skills');
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      const data = await res.json();
      if (Array.isArray(data?.skills)) {
        setSkills(data.skills);
      } else if (Array.isArray(data)) {
        setSkills(data);
      } else {
        setSkills([]);
      }
    } catch (err) {
      console.error(err);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

  const openCreateModal = () => {
    setEditingSkill(null);
    setName('');
    setCategory('frontend');
    setProficiencyLevel(90);
    setIconUrl('');
    setModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setName(skill.name);
    setCategory(skill.category || 'frontend');
    setProficiencyLevel(skill.proficiency_level || 85);
    setIconUrl(skill.icon_url || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/skills', {
        method: editingSkill ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingSkill ? { id: editingSkill.id } : {}),
          name,
          category,
          proficiency_level: Number(proficiencyLevel),
          icon_url: iconUrl,
        }),
      });
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Gagal menyimpan skill');
      }
      setModalOpen(false);
      fetchSkills();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menyimpan skill');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Hapus skill ini?')) return;
    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' });
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900">
            Skills &amp; Tech Stack 🏷️
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Kelola daftar teknologi, kategori, dan persentase keahlian di portofolio.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-pop-blue border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Tambah Skill Baru</span>
        </button>
      </div>

      {/* Skills Grouped by Category */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['frontend', 'backend', 'database', 'tools'].map((cat) => {
            const catSkills = skills.filter((s) => s?.category?.toLowerCase() === cat);
            return (
              <div
                key={cat}
                className="bg-white border-[3px] border-black rounded-3xl p-6 shadow-pop space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-slate-200">
                  <h3 className="font-display font-black text-base uppercase tracking-wider text-slate-900">
                    Category: {cat}
                  </h3>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 bg-pop-yellow border border-black rounded-lg">
                    {catSkills.length} items
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {catSkills.length === 0 ? (
                    <span className="text-xs text-slate-400 font-medium">
                      Belum ada skill di kategori ini
                    </span>
                  ) : (
                    catSkills.map((sk) => (
                      <div
                        key={sk.id}
                        className="px-3 py-1.5 bg-pop-cream border-[2px] border-black rounded-xl text-xs font-bold flex items-center gap-2 shadow-pop-sm"
                      >
                        <span>{sk.name}</span>
                        <span className="text-[10px] text-slate-600 font-mono">
                          ({sk.proficiency_level}%)
                        </span>
                        <button
                          type="button"
                          onClick={() => openEditModal(sk)}
                          className="text-slate-600 hover:text-black transition cursor-pointer"
                          title="Edit"
                          aria-label={`Edit ${sk.name}`}
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(sk.id)}
                          className="text-slate-500 hover:text-rose-600 transition cursor-pointer"
                          title="Hapus"
                          aria-label={`Hapus ${sk.name}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-[4px] border-black rounded-3xl w-full max-w-md shadow-pop-xl overflow-hidden"
          >
            <div className="bg-pop-blue border-b-[3px] border-black p-4 flex items-center justify-between">
              <h3 className="font-display font-black text-base">
                {editingSkill ? 'Edit Skill' : 'Tambah Skill Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Tutup modal"
                className="w-9 h-9 bg-white border-[2px] border-black rounded-xl flex items-center justify-center font-bold cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 bg-pop-cream text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Teknologi *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Next.js, Drizzle ORM"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategori *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
                >
                  <option value="frontend">Frontend &amp; UI</option>
                  <option value="backend">Backend &amp; APIs</option>
                  <option value="database">Database &amp; ORM</option>
                  <option value="tools">Tools &amp; DevOps</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tingkat Kemampuan (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={proficiencyLevel}
                  onChange={(e) => setProficiencyLevel(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Icon URL (Opsional)
                </label>
                <input
                  type="url"
                  placeholder="https://cdn.simpleicons.org/nextdotjs"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white border-[2px] border-black rounded-xl font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-pop-blue border-[2px] border-black rounded-xl font-bold shadow-pop-sm flex items-center gap-1.5 cursor-pointer"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Simpan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
