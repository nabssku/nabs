import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const experiences = await sql`SELECT * FROM experiences ORDER BY sort_order ASC, start_year DESC;`;
    return NextResponse.json({ success: true, experiences });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { title, institution, location = 'Malang, ID', start_year, end_year = 'Sekarang', description = '', type = 'work', sort_order = 0 } = body;

    if (!title || !institution || !start_year) {
      return NextResponse.json({ error: 'Judul, institusi, dan tahun mulai wajib diisi!' }, { status: 400 });
    }

    const expId = `exp_${Date.now()}`;
    await sql`
      INSERT INTO experiences (id, title, institution, location, start_year, end_year, description, type, sort_order)
      VALUES (${expId}, ${title}, ${institution}, ${location}, ${start_year}, ${end_year}, ${description}, ${type}, ${sort_order});
    `;

    return NextResponse.json({ success: true, message: 'Riwayat berhasil ditambahkan!' });
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
    if (!id) return NextResponse.json({ error: 'ID experience diperlukan' }, { status: 400 });

    await sql`DELETE FROM experiences WHERE id = ${id};`;
    return NextResponse.json({ success: true, message: 'Riwayat berhasil dihapus!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
