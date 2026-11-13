import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

const ALLOWED_SETTING_KEYS = new Set([
  'profile_name',
  'profile_handle',
  'profile_title',
  'profile_location',
  'profile_status',
  'profile_bio',
  'profile_avatar_url',
  'profile_resume_url',
  'stat_years',
  'stat_projects',
  'social_github',
  'social_instagram',
  'social_linkedin',
  'social_email',
]);

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const rows = await sql`SELECT key, value FROM site_settings ORDER BY key;`;
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.key as string] = row.value as string;
    }
    return NextResponse.json({ success: true, settings });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    for (const [key, value] of Object.entries(body)) {
      if (!ALLOWED_SETTING_KEYS.has(key)) continue;
      const strVal = typeof value === 'string' ? value.trim() : String(value ?? '');
      await sql`
        INSERT INTO site_settings (key, value, updated_at)
        VALUES (${key}, ${strVal}, NOW())
        ON CONFLICT (key) DO UPDATE SET value = ${strVal}, updated_at = NOW();
      `;
    }

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/resume');

    return NextResponse.json({ success: true, message: 'Settings berhasil disimpan!' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
