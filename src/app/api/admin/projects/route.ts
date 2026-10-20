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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
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
      demo_url,
      repo_url,
      is_published,
      sort_order,
    } = body;

    const projectId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const inserted = await sql`
      INSERT INTO projects (
        id, title, slug, summary, content_markdown,
        thumbnail_url, cloudinary_public_id, category, demo_url, repo_url,
        is_published, sort_order
      )
      VALUES (
        ${projectId}, ${title}, ${slug}, ${summary}, ${content_markdown || ''},
        ${thumbnail_url}, ${cloudinary_public_id || ''}, ${category || 'Web App'}, ${demo_url || ''}, ${repo_url || ''},
        ${is_published ?? true}, ${sort_order ?? 0}
      )
      RETURNING *;
    `;

    revalidatePath('/');
    revalidatePath('/projects');

    return NextResponse.json(inserted[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
