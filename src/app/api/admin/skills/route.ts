import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const skills = await sql`SELECT * FROM skills ORDER BY category ASC, proficiency_level DESC;`;
    return NextResponse.json({ success: true, skills });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to load skills';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { name, category = 'frontend', proficiency_level = 85, icon_url = '' } = body;

    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: 'Nama skill wajib diisi!' }, { status: 400 });
    }

    const level = Math.min(Math.max(Number(proficiency_level) || 85, 1), 100);
    const skillId = `sk_${Date.now()}`;
    await sql`
      INSERT INTO skills (id, name, category, proficiency_level, icon_url)
      VALUES (${skillId}, ${String(name).trim()}, ${category}, ${level}, ${icon_url});
    `;

    revalidatePath('/');
    revalidatePath('/resume');

    return NextResponse.json({ success: true, message: 'Skill berhasil ditambahkan!' });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to add skill';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, name, category = 'frontend', proficiency_level = 85, icon_url = '' } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID skill diperlukan' }, { status: 400 });
    }
    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: 'Nama skill wajib diisi!' }, { status: 400 });
    }

    const level = Math.min(Math.max(Number(proficiency_level) || 85, 1), 100);

    await sql`
      UPDATE skills
      SET name = ${String(name).trim()},
          category = ${category},
          proficiency_level = ${level},
          icon_url = ${icon_url}
      WHERE id = ${id};
    `;

    revalidatePath('/');
    revalidatePath('/resume');

    return NextResponse.json({ success: true, message: 'Skill berhasil diperbarui!' });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to update skill';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID skill diperlukan' }, { status: 400 });

    await sql`DELETE FROM skills WHERE id = ${id};`;

    revalidatePath('/');
    revalidatePath('/resume');

    return NextResponse.json({ success: true, message: 'Skill berhasil dihapus!' });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to delete skill';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
