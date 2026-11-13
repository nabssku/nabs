'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Calendar, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ContactMessage } from '@/types';

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/messages');
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      const data = await res.json();
      if (Array.isArray(data?.messages)) {
        setMessages(data.messages);
      } else if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error(err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markAsRead = async (id: string | number, isRead: boolean) => {
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: isRead }),
      });
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Hapus pesan ini?')) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900">
            Inbox Messages 📬
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Pesan masuk dari formulir kontak publik website.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 bg-white border-[3px] border-black rounded-3xl shadow-pop text-slate-500 font-bold text-sm">
          Kotak masuk masih kosong.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`border-[3px] border-black rounded-3xl p-6 shadow-pop transition flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                msg.is_read ? 'bg-white' : 'bg-pop-yellow/30'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {!msg.is_read && (
                    <span className="px-2 py-0.5 bg-rose-500 text-white rounded-lg font-display font-bold text-[10px] uppercase">
                      New
                    </span>
                  )}
                  <h3 className="font-display font-bold text-base text-slate-900">
                    {msg.sender_name}
                  </h3>
                  <a
                    href={`mailto:${msg.sender_email}`}
                    className="text-xs text-slate-600 font-medium hover:underline"
                  >
                    &lt;{msg.sender_email}&gt;
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 font-medium whitespace-pre-line leading-relaxed bg-white/80 p-3 rounded-xl border border-slate-200">
                  {msg.message}
                </p>

                {msg.created_at && (
                  <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 pt-1">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    <span>{new Date(msg.created_at).toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start">
                <button
                  type="button"
                  onClick={() => markAsRead(msg.id, !msg.is_read)}
                  className={`px-3 py-1.5 border-[2px] border-black rounded-xl text-xs font-bold shadow-pop-sm transition cursor-pointer ${
                    msg.is_read
                      ? 'bg-slate-100 hover:bg-slate-200'
                      : 'bg-pop-green hover:bg-pop-green/80'
                  }`}
                >
                  {msg.is_read ? 'Tandai Belum Dibaca' : 'Tandai Dibaca'}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(msg.id)}
                  className="p-2 bg-rose-100 border-[2px] border-black rounded-xl text-rose-700 shadow-pop-sm hover:bg-rose-200 transition cursor-pointer"
                  title="Hapus"
                  aria-label={`Hapus pesan dari ${msg.sender_name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
