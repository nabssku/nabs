import { NextRequest, NextResponse } from 'next/server';
import { sql, initDatabase } from '@/lib/db';

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
        profile: {
          name: 'Nabil Sahsada Suratno',
          handle: '@nabssku',
          title: 'Full-Stack Web & AI Developer',
          location: 'Malang, Jawa Timur, Indonesia',
          status: 'Available for Freelance & Full-Time',
          bio: 'Informatics Engineering student at UMM & Freelance Full-Stack Developer. I craft playful, high-performance web apps, SaaS platforms, and intelligent agent systems with clean code and comic-inspired aesthetics.',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
          resumeUrl: '/resume_nabil.pdf',
          socials: {
            github: 'https://github.com/nabssku',
            instagram: 'https://instagram.com/nabsskun',
            linkedin: 'https://linkedin.com/in/nabssku',
            email: 'nabilsahsadabisnis@gmail.com',
          }
        }
      }
    });
  } catch (error: any) {
    console.error('Public data query error:', error);
    return NextResponse.json({ error: error.message || 'Gagal memuat data' }, { status: 500 });
  }
}
