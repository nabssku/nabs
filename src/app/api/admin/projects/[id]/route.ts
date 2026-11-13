import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
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

    const conflict = await sql`
      SELECT id FROM projects WHERE slug = ${cleanSlug} AND id != ${id} LIMIT 1;
    `;
    if (conflict.length > 0) {
      return NextResponse.json(
        { error: `Slug "${cleanSlug}" sudah digunakan proyek lain.` },
        { status: 409 }
      );
    }

    const prev = await sql`SELECT slug FROM projects WHERE id = ${id} LIMIT 1;`;

    const updated = await sql`
      UPDATE projects
      SET
        title = ${title.trim()},
        slug = ${cleanSlug},
        summary = ${summary.trim()},
        content_markdown = ${content_markdown || ''},
        thumbnail_url = ${thumbnail_url.trim()},
        cloudinary_public_id = ${cloudinary_public_id || ''},
        category = ${category || 'Web App'},
        tech_stack = ${tech_stack || ''},
        role = ${role || ''},
        year = ${year || ''},
        demo_url = ${demo_url || ''},
        repo_url = ${repo_url || ''},
        is_featured = ${is_featured ?? false},
        is_published = ${is_published ?? true},
        sort_order = ${Number(sort_order ?? 0)},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Proyek tidak ditemukan.' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/projects/${cleanSlug}`);
    if (prev[0]?.slug && prev[0].slug !== cleanSlug) {
      revalidatePath(`/projects/${prev[0].slug}`);
    }
    revalidatePath('/resume');

    return NextResponse.json(updated[0]);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Gagal memperbarui proyek';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;

    const proj = await sql`
      SELECT slug, cloudinary_public_id FROM projects WHERE id = ${id} LIMIT 1;
    `;
    if (proj.length > 0 && proj[0].cloudinary_public_id) {
      await deleteFromCloudinary(proj[0].cloudinary_public_id as string);
    }

    await sql`DELETE FROM projects WHERE id = ${id};`;

    revalidatePath('/');
    revalidatePath('/projects');
    if (proj[0]?.slug) {
      revalidatePath(`/projects/${proj[0].slug}`);
    }
    revalidatePath('/resume');

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Gagal menghapus proyek';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
