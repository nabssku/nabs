import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

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
    // body is { key: value, key: value, ... }
    for (const [key, value] of Object.entries(body)) {
      await sql`
        INSERT INTO site_settings (key, value, updated_at)
        VALUES (${key}, ${value as string}, NOW())
        ON CONFLICT (key) DO UPDATE SET value = ${value as string}, updated_at = NOW();
      `;
    }
    return NextResponse.json({ success: true, message: 'Settings berhasil disimpan!' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
