import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSiteProfile } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rawRows = await sql`SELECT * FROM site_settings;`;
    const profile = await getSiteProfile();
    
    return NextResponse.json({
      raw_site_settings: rawRows,
      resolved_profile: profile,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
