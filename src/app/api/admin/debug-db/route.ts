import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check what tables exist
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    // Check current database
    const dbInfo = await sql`SELECT current_database(), current_schema();`;
    
    return NextResponse.json({
      database: dbInfo[0],
      tables: tables.map((t: any) => t.table_name),
      has_env_var: !!process.env.DATABASE_URL,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
