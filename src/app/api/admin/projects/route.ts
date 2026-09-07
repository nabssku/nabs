import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const projects = await sql`
      SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC;
    `;
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
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

    if (!title || !slug || !summary || !thumbnail_url) {
      return NextResponse.json({ error: 'Judul, slug, ringkasan, dan thumbnail wajib diisi!' }, { status: 400 });
    }

    const projectId = `proj_${Date.now()}`;

    await sql`
      INSERT INTO projects (
        id, title, slug, summary, content_markdown, thumbnail_url,
        demo_url, repo_url, category, is_featured, is_published, sort_order
      ) VALUES (
        ${projectId}, ${title}, ${slug}, ${summary}, ${content_markdown}, ${thumbnail_url},
        ${demo_url}, ${repo_url}, ${category}, ${is_featured}, ${is_published}, ${sort_order}
      );
    `;

    return NextResponse.json({ success: true, message: 'Proyek berhasil ditambahkan!', id: projectId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
