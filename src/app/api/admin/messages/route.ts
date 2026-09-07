import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const messages = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC;`;
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, is_read = true } = body;

    if (!id) return NextResponse.json({ error: 'ID pesan diperlukan' }, { status: 400 });

    await sql`UPDATE contact_messages SET is_read = ${is_read} WHERE id = ${id};`;
    return NextResponse.json({ success: true, message: 'Status pesan diupdate!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID pesan diperlukan' }, { status: 400 });

    await sql`DELETE FROM contact_messages WHERE id = ${id};`;
    return NextResponse.json({ success: true, message: 'Pesan berhasil dihapus!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
