import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSiteProfile } from '@/lib/settings';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rawRows = await sql`SELECT * FROM site_settings;`;
    const profile = await getSiteProfile();

    return NextResponse.json({
      raw_site_settings: rawRows,
      resolved_profile: profile,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Settings check failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
