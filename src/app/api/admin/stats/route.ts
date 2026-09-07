import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectsCount = await sql`SELECT count(*) as count FROM projects;`;
    const skillsCount = await sql`SELECT count(*) as count FROM skills;`;
    const unreadMessagesCount = await sql`SELECT count(*) as count FROM contact_messages WHERE is_read = false;`;
    const totalMessagesCount = await sql`SELECT count(*) as count FROM contact_messages;`;
    const recentMessages = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5;`;

    return NextResponse.json({
      success: true,
      stats: {
        projectsCount: Number(projectsCount[0].count),
        skillsCount: Number(skillsCount[0].count),
        unreadMessagesCount: Number(unreadMessagesCount[0].count),
        totalMessagesCount: Number(totalMessagesCount[0].count),
      },
      recentMessages,
    });
  } catch (error: any) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: error.message || 'Gagal mengambil data statistik' }, { status: 500 });
  }
}
