import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { deleteFromCloudinary } from '@/lib/cloudinary';

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
      demo_url,
      repo_url,
      is_published,
      sort_order,
    } = body;

    const updated = await sql`
      UPDATE projects
      SET
        title = ${title},
        slug = ${slug},
        summary = ${summary},
        content_markdown = ${content_markdown},
        thumbnail_url = ${thumbnail_url},
        cloudinary_public_id = ${cloudinary_public_id || ''},
        category = ${category},
        demo_url = ${demo_url},
        repo_url = ${repo_url},
        is_published = ${is_published},
        sort_order = ${sort_order},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json(updated[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    
    // Find project to check for cloudinary public_id
    const existing = await sql`SELECT cloudinary_public_id FROM projects WHERE id = ${id} LIMIT 1;`;
    if (existing.length > 0 && existing[0].cloudinary_public_id) {
      await deleteFromCloudinary(existing[0].cloudinary_public_id);
    }

    await sql`DELETE FROM projects WHERE id = ${id};`;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
