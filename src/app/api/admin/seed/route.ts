import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

const SEED_SECRET = process.env.SEED_SECRET || 'nabssku_seed_2026';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const log: string[] = [];

  try {
    // Step 1: Delete
    await sql`DELETE FROM projects;`;
    log.push('✅ DELETE projects');
    await sql`DELETE FROM skills;`;
    log.push('✅ DELETE skills');
    await sql`DELETE FROM experiences;`;
    log.push('✅ DELETE experiences');
  } catch (e: any) {
    return NextResponse.json({ step: 'DELETE', error: e.message, log }, { status: 500 });
  }

  try {
    await sql`
      INSERT INTO projects (id, title, slug, summary, content_markdown, thumbnail_url, category, demo_url, repo_url, is_featured, is_published, sort_order) VALUES
      ('proj_seed_001','Alacart — Smart POS & Cashier System','alacart-pos','Sistem kasir multi-outlet berbasis web responsif dengan integrasi QRIS dynamic dan laporan keuangan real-time.','## Alacart POS','https://images.unsplash.com/photo-1556742049-0a67e5572263?q=80&w=800&auto=format&fit=crop','SaaS / POS','https://alacart.vercel.app','https://github.com/nabssku/alacart',true,true,1),
      ('proj_seed_002','Selasar Wonosalam — Eco Tourism Portal','selasar-wonosalam','Platform informasi destinasi ekowisata, reservasi villa, dan pusat oleh-oleh khas Wonosalam berbasis Next.js.','## Selasar Wonosalam','https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop','Web App','https://selasar-wonosalam.vercel.app','https://github.com/nabssku/selasar-wonosalam',true,true,2),
      ('proj_seed_003','AUinAja — AI Fanfiction & Chat Mockup SaaS','auinaja-generator','Generator mockup chat WhatsApp, X/Twitter, and Instagram interaktif untuk kreator Alternate Universe (AU).','## AUinAja','https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop','SaaS','https://auinaja.vercel.app','https://github.com/nabssku/auinaja',true,true,3);
    `;
    log.push('✅ INSERT projects');
  } catch (e: any) {
    return NextResponse.json({ step: 'INSERT projects', error: e.message, log }, { status: 500 });
  }

  try {
    await sql`
      INSERT INTO skills (id, name, category, proficiency_level) VALUES
      ('sk_seed_01','React & Next.js 15','frontend',95),
      ('sk_seed_02','TypeScript','frontend',90),
      ('sk_seed_03','Tailwind CSS','frontend',95),
      ('sk_seed_04','Framer Motion','frontend',85),
      ('sk_seed_05','Node.js & Express','backend',88),
      ('sk_seed_06','REST & GraphQL APIs','backend',90),
      ('sk_seed_07','PostgreSQL & Neon DB','database',92),
      ('sk_seed_08','Prisma & Drizzle ORM','database',88),
      ('sk_seed_09','Cloudinary CDN','tools',90),
      ('sk_seed_10','Git & GitHub Actions','tools',88),
      ('sk_seed_11','Vercel Edge Deploy','tools',92),
      ('sk_seed_12','BorderPay QRIS','tools',95);
    `;
    log.push('✅ INSERT skills');
  } catch (e: any) {
    return NextResponse.json({ step: 'INSERT skills', error: e.message, log }, { status: 500 });
  }

  try {
    await sql`
      INSERT INTO experiences (id, title, institution, location, start_year, end_year, description, type, sort_order) VALUES
      ('exp_seed_01','S1 Informatika / Software Engineering','Universitas Muhammadiyah Malang (UMM)','Malang','2024','Sekarang','Fokus riset rekayasa perangkat lunak, arsitektur cloud serverless, dan pengembangan antarmuka interaktif.','education',1),
      ('exp_seed_02','Rekayasa Perangkat Lunak (RPL)','SMKS Telkom Malang','Malang','2021','2024','Mendalami fondasi pemrograman web, mobile app development, database design, dan software architecture.','education',2),
      ('exp_seed_03','Full-Stack Freelance Developer','LN Developer & Self-Employed','Remote','2023','Sekarang','Membangun sistem POS, platform SaaS, e-commerce, dan portal kustom untuk puluhan klien bisnis.','work',3);
    `;
    log.push('✅ INSERT experiences');
  } catch (e: any) {
    return NextResponse.json({ step: 'INSERT experiences', error: e.message, log }, { status: 500 });
  }

  try {
    const projectCount = await sql`SELECT count(*) as count FROM projects;`;
    const skillCount   = await sql`SELECT count(*) as count FROM skills;`;
    const expCount     = await sql`SELECT count(*) as count FROM experiences;`;

    return NextResponse.json({
      success: true,
      message: 'Database re-seeded!',
      log,
      seeded: {
        projects:    Number(projectCount[0].count),
        skills:      Number(skillCount[0].count),
        experiences: Number(expCount[0].count),
      },
    });
  } catch (e: any) {
    return NextResponse.json({ step: 'COUNT', error: e.message, log }, { status: 500 });
  }
}
