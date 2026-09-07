'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Sparkles, X, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminSkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('frontend');
  const [proficiencyLevel, setProficiencyLevel] = useState(90);
  const [saving, setSaving] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/admin/skills');
      if (res.status === 401) {
        router.replace('/');
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
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
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          proficiency_level: Number(proficiencyLevel),
        }),
      });
      if (res.status === 401) {
        router.replace('/');
        return;
      }
      setName('');
      setModalOpen(false);
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert('Gagal menambah skill');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus skill ini?')) return;
    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' });
      if (res.status === 401) {
        router.replace('/');
        return;
      }
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900">
            Skills & Tech Stack 🏷️
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Kelola daftar teknologi dan keahlian untuk badge stiker portofolio.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-pop-blue border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
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
            const catSkills = safeSkills.filter((s) => s?.category?.toLowerCase() === cat);
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
                    <span className="text-xs text-slate-400 font-medium">Belum ada skill di kategori ini</span>
                  ) : (
                    catSkills.map((sk) => (
                      <div
                        key={sk.id}
                        className="px-3 py-1.5 bg-pop-cream border-[2px] border-black rounded-xl text-xs font-bold flex items-center gap-2 shadow-pop-sm"
                      >
                        <span>{sk.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({sk.proficiency_level}%)</span>
                        <button
                          onClick={() => handleDelete(sk.id)}
                          className="text-slate-400 hover:text-rose-600 transition"
                          title="Hapus"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border-[4px] border-black rounded-3xl w-full max-w-md shadow-pop-xl overflow-hidden">
            <div className="bg-pop-blue border-b-[3px] border-black p-4 flex items-center justify-between">
              <h3 className="font-display font-black text-base">Tambah Skill Baru</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 bg-white border-[2px] border-black rounded-xl flex items-center justify-center font-bold"
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
                  placeholder="Misal: Next.js 15, Drizzle ORM"
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
                  <option value="frontend">Frontend & UI</option>
                  <option value="backend">Backend & APIs</option>
                  <option value="database">Database & ORM</option>
                  <option value="tools">Tools & DevOps</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tingkat Kemampuan (%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={proficiencyLevel}
                  onChange={(e) => setProficiencyLevel(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white border-[2px] border-black rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-pop-blue border-[2px] border-black rounded-xl font-bold shadow-pop-sm flex items-center gap-1.5"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
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
