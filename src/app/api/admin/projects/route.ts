import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = await sql`
      SELECT * FROM projects 
      ORDER BY sort_order ASC, created_at DESC;
    `;
    return NextResponse.json(projects);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load projects';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug,
      summary,
      content_markdown,
      thumbnail_url,
      cloudinary_public_id,
      category,
      tech_stack,
      role,
      year,
      demo_url,
      repo_url,
      is_featured,
      is_published,
      sort_order,
    } = body;

    if (!title?.trim() || !slug?.trim() || !summary?.trim() || !thumbnail_url?.trim()) {
      return NextResponse.json(
        { error: 'Judul, slug, summary, dan thumbnail URL wajib diisi.' },
        { status: 400 }
      );
    }

    const cleanSlug = String(slug)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!cleanSlug) {
      return NextResponse.json({ error: 'Slug URL tidak valid.' }, { status: 400 });
    }

    const existing = await sql`SELECT id FROM projects WHERE slug = ${cleanSlug} LIMIT 1;`;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: `Slug "${cleanSlug}" sudah digunakan proyek lain.` },
        { status: 409 }
      );
    }

    const projectId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const inserted = await sql`
      INSERT INTO projects (
        id, title, slug, summary, content_markdown,
        thumbnail_url, cloudinary_public_id, category, tech_stack, role, year,
        demo_url, repo_url, is_featured, is_published, sort_order
      )
      VALUES (
        ${projectId}, ${title.trim()}, ${cleanSlug}, ${summary.trim()}, ${content_markdown || ''},
        ${thumbnail_url.trim()}, ${cloudinary_public_id || ''}, ${category || 'Web App'},
        ${tech_stack || ''}, ${role || ''}, ${year || ''},
        ${demo_url || ''}, ${repo_url || ''}, ${is_featured ?? false},
        ${is_published ?? true}, ${Number(sort_order ?? 0)}
      )
      RETURNING *;
    `;

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/projects/${cleanSlug}`);
    revalidatePath('/resume');

    return NextResponse.json(inserted[0], { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Gagal menyimpan proyek';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
