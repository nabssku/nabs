import { NextRequest, NextResponse } from 'next/server';
import { sql, initDatabase } from '@/lib/db';
import { getSiteProfile } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await initDatabase();

    const [projects, skills, experiences, profile] = await Promise.all([
      sql`
        SELECT * FROM projects 
        WHERE is_published = true 
        ORDER BY sort_order ASC, created_at DESC;
      `,
      sql`
        SELECT * FROM skills 
        ORDER BY category ASC, proficiency_level DESC;
      `,
      sql`
        SELECT * FROM experiences 
        ORDER BY sort_order ASC, start_year DESC;
      `,
      getSiteProfile(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        projects,
        skills,
        experiences,
        profile,
      }
    });
  } catch (error: unknown) {
    console.error('Public data query error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Gagal memuat data';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
