'use client';

import React, { useEffect, useState } from 'react';
import { LayoutDashboard, FolderGit2, Sparkles, GraduationCap, MessageSquare, Plus, ArrowUpRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Proyek', value: stats?.projects_count || 0, color: 'bg-pop-yellow', icon: FolderGit2, href: '/admin/projects' },
    { label: 'Skills / Stack', value: stats?.skills_count || 0, color: 'bg-pop-blue', icon: Sparkles, href: '/admin/skills' },
    { label: 'Experiences', value: stats?.experiences_count || 0, color: 'bg-pop-green', icon: GraduationCap, href: '/admin/experiences' },
    { label: 'Pesan Masuk', value: stats?.messages_count || 0, unread: stats?.unread_messages_count || 0, color: 'bg-pop-pink', icon: MessageSquare, href: '/admin/messages' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900">
            Overview Dashboard 📊
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Kelola konten portofolio @nabssku secara realtime.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/projects"
            className="px-4 py-2 bg-pop-yellow border-[2px] border-black rounded-xl font-display font-bold text-xs shadow-pop-sm hover:translate-x-[1px] hover:translate-y-[1px] transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Proyek</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`${card.color} border-[3px] border-black rounded-3xl p-6 shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition block group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-white border-[2px] border-black rounded-2xl shadow-pop-sm">
                  <Icon className="w-5 h-5 text-black" />
                </div>
                {card.unread !== undefined && card.unread > 0 && (
                  <span className="px-2 py-0.5 bg-rose-500 text-white font-display font-bold text-[10px] uppercase rounded-lg">
                    {card.unread} Baru
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-display font-black text-slate-900">
                  {card.value}
                </div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {card.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Contact Messages */}
      <div className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-pop space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-slate-200">
          <h2 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-pop-orange" /> Pesan Pengunjung Terbaru
          </h2>
          <Link
            href="/admin/messages"
            className="text-xs font-bold text-slate-600 hover:text-black flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats?.recent_messages?.length === 0 ? (
          <div className="text-center py-8 text-xs font-semibold text-slate-400">
            Belum ada pesan yang masuk.
          </div>
        ) : (
          <div className="space-y-3">
            {stats?.recent_messages?.map((msg: any) => (
              <div
                key={msg.id}
                className="p-4 bg-pop-cream border-[2px] border-black rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-pop-sm"
              >
                <div>
                  <div className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span>{msg.sender_name}</span>
                    <span className="text-xs font-normal text-slate-500 font-sans">({msg.sender_email})</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium line-clamp-1 mt-0.5">
                    {msg.message}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                  {new Date(msg.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
