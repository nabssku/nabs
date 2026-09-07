import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Nama, email, dan pesan wajib diisi!' }, { status: 400 });
    }

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    await sql`
      INSERT INTO contact_messages (id, sender_name, sender_email, message, is_read)
      VALUES (${messageId}, ${name}, ${email}, ${message}, false);
    `;

    return NextResponse.json({
      success: true,
      message: 'Pesanmu berhasil terkirim ke Nabil! Terima kasih sudah menyapa. 🎉',
    });
  } catch (error: any) {
    console.error('Contact submit error:', error);
    return NextResponse.json({ error: error.message || 'Gagal mengirim pesan' }, { status: 500 });
  }
}
