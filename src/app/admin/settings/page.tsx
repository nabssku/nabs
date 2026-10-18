'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Check, User, Link as LinkIcon } from 'lucide-react';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    profile_name: '',
    profile_handle: '',
    profile_title: '',
    profile_location: '',
    profile_status: '',
    profile_bio: '',
    profile_avatar_url: '',
    profile_resume_url: '',
    social_github: '',
    social_instagram: '',
    social_linkedin: '',
    social_email: '',
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success && data.settings) {
        setFormData((prev) => ({
          ...prev,
          ...data.settings,
        }));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Gagal memuat pengaturan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      const data = await res.json();
      if (data.success) {
        setSuccessMessage('Profile & Socials settings successfully updated! 🎉');
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setErrorMessage(data.error || 'Gagal menyimpan pengaturan.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Terjadi kesalahan koneksi.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 p-6 bg-white border-[3px] border-black rounded-3xl shadow-pop font-display font-bold">
          <Loader2 className="w-6 h-6 animate-spin text-pop-orange" />
          <span>Memuat Pengaturan Profil...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-black text-slate-900 flex items-center gap-2">
          <span>Profile & Socials Settings</span>
          <span className="text-2xl">⚙️</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Kelola informasi profil utama, bio, avatar, resume, dan tautan media sosial portfolio.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-pop-green border-[3px] border-black rounded-2xl shadow-pop-sm flex items-center gap-3 font-display font-bold text-sm text-slate-900">
          <Check className="w-5 h-5 text-black" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-pop-pink border-[3px] border-black rounded-2xl shadow-pop-sm flex items-center gap-3 font-display font-bold text-sm text-slate-900">
          <span>⚠️ {errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Profile Info Card */}
        <div className="p-6 sm:p-8 bg-white border-[3px] border-black rounded-3xl shadow-pop space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b-[2px] border-black">
            <User className="w-6 h-6 text-pop-purple" />
            <h2 className="text-xl font-display font-black text-slate-900">Informasi Utama Profil</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="profile_name"
                value={formData.profile_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                Handle / Username (@)
              </label>
              <input
                type="text"
                name="profile_handle"
                value={formData.profile_handle}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                Job Title / Peran Profesional
              </label>
              <input
                type="text"
                name="profile_title"
                value={formData.profile_title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                Lokasi
              </label>
              <input
                type="text"
                name="profile_location"
                value={formData.profile_location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                Status Ketersediaan
              </label>
              <input
                type="text"
                name="profile_status"
                value={formData.profile_status}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                Bio / Tentang Saya
              </label>
              <textarea
                name="profile_bio"
                rows={4}
                value={formData.profile_bio}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                Avatar Image URL
              </label>
              <input
                type="url"
                name="profile_avatar_url"
                value={formData.profile_avatar_url}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                Resume URL / Path
              </label>
              <input
                type="text"
                name="profile_resume_url"
                value={formData.profile_resume_url}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>
          </div>
        </div>

        {/* Social Links Card */}
        <div className="p-6 sm:p-8 bg-white border-[3px] border-black rounded-3xl shadow-pop space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b-[2px] border-black">
            <LinkIcon className="w-6 h-6 text-pop-green" />
            <h2 className="text-xl font-display font-black text-slate-900">Tautan Sosial & Kontak</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                GitHub Profile URL
              </label>
              <input
                type="url"
                name="social_github"
                value={formData.social_github}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                Instagram Profile URL
              </label>
              <input
                type="url"
                name="social_instagram"
                value={formData.social_instagram}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                name="social_linkedin"
                value={formData.social_linkedin}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-black text-slate-800 uppercase tracking-wider mb-2">
                Email Kontak Utama
              </label>
              <input
                type="email"
                name="social_email"
                value={formData.social_email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pop-orange"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-4 bg-pop-orange text-black border-[3px] border-black rounded-2xl font-display font-black text-base shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
