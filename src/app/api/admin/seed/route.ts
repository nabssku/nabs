import { NextResponse } from 'next/server';
import { sql, initDatabase, resetInitGuard } from '@/lib/db';

export const dynamic = 'force-dynamic';

const SEED_SECRET = process.env.SEED_SECRET || 'nabssku_seed_2026';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Clear seeded tables
    await sql`TRUNCATE TABLE projects, skills, experiences RESTART IDENTITY CASCADE;`;

    // Reset singleton guard so initDatabase re-runs the seed
    resetInitGuard();
    await initDatabase();

    const projectCount = await sql`SELECT count(*) as count FROM projects;`;
    const skillCount   = await sql`SELECT count(*) as count FROM skills;`;
    const expCount     = await sql`SELECT count(*) as count FROM experiences;`;

    return NextResponse.json({
      success: true,
      message: 'Database re-seeded!',
      seeded: {
        projects:    Number(projectCount[0].count),
        skills:      Number(skillCount[0].count),
        experiences: Number(expCount[0].count),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
