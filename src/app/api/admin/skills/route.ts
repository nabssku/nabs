import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const skills = await sql`SELECT * FROM skills ORDER BY category ASC, proficiency_level DESC;`;
    return NextResponse.json({ success: true, skills });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { name, category = 'frontend', proficiency_level = 85, icon_url = '' } = body;

    if (!name) {
      return NextResponse.json({ error: 'Nama skill wajib diisi!' }, { status: 400 });
    }

    const skillId = `sk_${Date.now()}`;
    await sql`
      INSERT INTO skills (id, name, category, proficiency_level, icon_url)
      VALUES (${skillId}, ${name}, ${category}, ${proficiency_level}, ${icon_url});
    `;

    return NextResponse.json({ success: true, message: 'Skill berhasil ditambahkan!' });
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
    if (!id) return NextResponse.json({ error: 'ID skill diperlukan' }, { status: 400 });

    await sql`DELETE FROM skills WHERE id = ${id};`;
    return NextResponse.json({ success: true, message: 'Skill berhasil dihapus!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
