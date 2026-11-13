import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;

    const dbInfo = await sql`SELECT current_database(), current_schema();`;

    return NextResponse.json({
      database: dbInfo[0],
      tables: tables.map((t) => t.table_name),
      has_env_var: Boolean(process.env.DATABASE_URL),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Database check failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
