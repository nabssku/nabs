import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const experiences = await sql`SELECT * FROM experiences ORDER BY sort_order ASC, start_year DESC;`;
    return NextResponse.json({ success: true, experiences });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to load experiences';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      title,
      institution,
      location = 'Malang, ID',
      start_year,
      end_year = 'Sekarang',
      description = '',
      type = 'work',
      sort_order = 0,
    } = body;

    if (!title || !institution || !start_year) {
      return NextResponse.json(
        { error: 'Judul, institusi, dan tahun mulai wajib diisi!' },
        { status: 400 }
      );
    }

    const expId = `exp_${Date.now()}`;
    await sql`
      INSERT INTO experiences (id, title, institution, location, start_year, end_year, description, type, sort_order)
      VALUES (${expId}, ${title}, ${institution}, ${location}, ${start_year}, ${end_year}, ${description}, ${type}, ${Number(sort_order) || 0});
    `;

    revalidatePath('/');
    revalidatePath('/resume');

    return NextResponse.json({ success: true, message: 'Riwayat berhasil ditambahkan!' });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to add experience';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      id,
      title,
      institution,
      location = '',
      start_year,
      end_year = 'Sekarang',
      description = '',
      type = 'work',
      sort_order = 0,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID experience diperlukan' }, { status: 400 });
    }
    if (!title || !institution || !start_year) {
      return NextResponse.json(
        { error: 'Judul, institusi, dan tahun mulai wajib diisi!' },
        { status: 400 }
      );
    }

    await sql`
      UPDATE experiences
      SET title = ${title},
          institution = ${institution},
          location = ${location},
          start_year = ${start_year},
          end_year = ${end_year},
          description = ${description},
          type = ${type},
          sort_order = ${Number(sort_order) || 0}
      WHERE id = ${id};
    `;

    revalidatePath('/');
    revalidatePath('/resume');

    return NextResponse.json({ success: true, message: 'Riwayat berhasil diperbarui!' });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to update experience';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID experience diperlukan' }, { status: 400 });

    await sql`DELETE FROM experiences WHERE id = ${id};`;

    revalidatePath('/');
    revalidatePath('/resume');

    return NextResponse.json({ success: true, message: 'Riwayat berhasil dihapus!' });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to delete experience';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
