'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GraduationCap, Briefcase, X, Check, Loader2 } from 'lucide-react';

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [location, setLocation] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('Sekarang');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('education');
  const [sortOrder, setSortOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/admin/experiences');
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/admin/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          institution,
          location,
          start_year: startYear,
          end_year: endYear,
          description,
          type,
          sort_order: Number(sortOrder),
        }),
      });
      setTitle('');
      setInstitution('');
      setLocation('');
      setDescription('');
      setModalOpen(false);
      fetchExperiences();
    } catch (err) {
      console.error(err);
      alert('Gagal menambah riwayat');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus riwayat ini?')) return;
    try {
      await fetch(`/api/admin/experiences?id=${id}`, { method: 'DELETE' });
      fetchExperiences();
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
            Education & Career Timeline 🗺️
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Kelola riwayat pendidikan formal dan pengalaman kerja/freelance.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-pop-green border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Timeline Baru</span>
        </button>
      </div>

      {/* Timeline List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
        </div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-16 bg-white border-[3px] border-black rounded-3xl shadow-pop text-slate-400 font-bold text-sm">
          Belum ada data timeline.
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((item) => (
            <div
              key={item.id}
              className="bg-white border-[3px] border-black rounded-3xl p-6 shadow-pop flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-lg border-[2px] border-black font-display font-bold text-[10px] uppercase ${item.type === 'education' ? 'bg-pop-yellow' : 'bg-pop-green'}`}>
                    {item.type}
                  </span>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    {item.title} — {item.institution}
                  </h3>
                </div>
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                  <span>{item.start_year} - {item.end_year}</span>
                  {item.location && <span>• {item.location}</span>}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium pt-1">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="self-end sm:self-center p-2.5 bg-rose-100 border-[2px] border-black rounded-xl shadow-pop-sm hover:bg-rose-200 text-rose-700 transition cursor-pointer"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border-[4px] border-black rounded-3xl w-full max-w-lg shadow-pop-xl overflow-hidden">
            <div className="bg-pop-green border-b-[3px] border-black p-4 flex items-center justify-between">
              <h3 className="font-display font-black text-base">Tambah Timeline Riwayat</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 bg-white border-[2px] border-black rounded-xl flex items-center justify-center font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 bg-pop-cream text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipe *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
                  >
                    <option value="education">Education (Pendidikan)</option>
                    <option value="work">Work / Freelance</option>
                  </select>
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

              <div>
                <label className="block font-bold text-slate-700 mb-1">Posisi / Jurusan *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Rekayasa Perangkat Lunak"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Institusi / Instansi / Brand *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Universitas Muhammadiyah Malang"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun Mulai *</label>
                  <input
                    type="text"
                    required
                    placeholder="2024"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun Selesai</label>
                  <input
                    type="text"
                    required
                    placeholder="Sekarang"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi</label>
                  <input
                    type="text"
                    placeholder="Malang"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Kegiatan utama, pencapaian, atau tanggung jawab..."
                  className="w-full px-3 py-2 bg-white border-[2px] border-black rounded-xl"
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
                  className="px-5 py-2 bg-pop-green border-[2px] border-black rounded-xl font-bold shadow-pop-sm flex items-center gap-1.5"
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
