import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = params;
    const body = await req.json();
    const {
      title,
      slug,
      summary,
      content_markdown = '',
      thumbnail_url,
      demo_url = '',
      repo_url = '',
      category = 'Full-Stack Web',
      is_featured = false,
      is_published = true,
      sort_order = 0,
    } = body;

    await sql`
      UPDATE projects SET
        title = ${title},
        slug = ${slug},
        summary = ${summary},
        content_markdown = ${content_markdown},
        thumbnail_url = ${thumbnail_url},
        demo_url = ${demo_url},
        repo_url = ${repo_url},
        category = ${category},
        is_featured = ${is_featured},
        is_published = ${is_published},
        sort_order = ${sort_order},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id};
    `;

    return NextResponse.json({ success: true, message: 'Proyek berhasil diupdate!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = params;
    await sql`DELETE FROM projects WHERE id = ${id};`;
    return NextResponse.json({ success: true, message: 'Proyek berhasil dihapus!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
