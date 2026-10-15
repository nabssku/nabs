import { NextRequest, NextResponse } from 'next/server';
import { sql, initDatabase } from '@/lib/db';
import { PROFILE } from '@/lib/profile';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await initDatabase();

    const projects = await sql`
      SELECT * FROM projects 
      WHERE is_published = true 
      ORDER BY sort_order ASC, created_at DESC;
    `;

    const skills = await sql`
      SELECT * FROM skills 
      ORDER BY category ASC, proficiency_level DESC;
    `;

    const experiences = await sql`
      SELECT * FROM experiences 
      ORDER BY sort_order ASC, start_year DESC;
    `;

    return NextResponse.json({
      success: true,
      data: {
        projects,
        skills,
        experiences,
        profile: PROFILE,
      }
    });
  } catch (error: unknown) {
    console.error('Public data query error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Gagal memuat data';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
