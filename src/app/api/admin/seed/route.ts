import { NextResponse } from 'next/server';
import { sql, initDatabase, resetInitGuard } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

async function runSeed() {
  const log: string[] = [];

  try {
    resetInitGuard();
    await initDatabase();
    log.push('✅ initDatabase (tables ensured)');
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'initDatabase error';
    return NextResponse.json({ step: 'initDatabase', error: msg, log }, { status: 500 });
  }

  try {
    await sql`DELETE FROM projects;`;
    log.push('✅ DELETE projects');
    await sql`DELETE FROM skills;`;
    log.push('✅ DELETE skills');
    await sql`DELETE FROM experiences;`;
    log.push('✅ DELETE experiences');
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Delete error';
    return NextResponse.json({ step: 'DELETE', error: msg, log }, { status: 500 });
  }

  try {
    await sql`
      INSERT INTO projects (id, title, slug, summary, content_markdown, thumbnail_url, category, tech_stack, role, year, demo_url, repo_url, is_featured, is_published, sort_order) VALUES
      ('proj_seed_001','Alacart — Smart POS & Cashier System','alacart-pos','Sistem kasir multi-outlet berbasis web responsif dengan integrasi QRIS dynamic dan laporan keuangan real-time.','## Tentang Alacart POS\n\nAlacart adalah aplikasi point-of-sale modern untuk UMKM F&B dan retail. Dilengkapi fitur manajemen stok bahan baku, split bill meja, pencetakan nota thermal via Bluetooth, dan integrasi QRIS BorderPay.\n\n### Teknologi:\n- Next.js 14 App Router\n- Tailwind CSS & Framer Motion\n- Neon Serverless PostgreSQL\n- BorderPay API Gateway','https://images.unsplash.com/photo-1556742049-0a67e5572263?q=80&w=800&auto=format&fit=crop','SaaS / POS','Next.js, TypeScript, Tailwind CSS, PostgreSQL, BorderPay QRIS','Full-Stack Developer','2025','https://alacart.vercel.app','https://github.com/nabssku/alacart',true,true,1),
      ('proj_seed_002','Selasar Wonosalam — Eco Tourism Portal','selasar-wonosalam','Platform informasi destinasi ekowisata, reservasi villa, dan pusat oleh-oleh khas Wonosalam berbasis Next.js.','## Portal Ekowisata Wonosalam\n\nSistem direktori wisata terintegrasi dengan peta interaktif, kalender musim panen durian, serta sistem booking penginapan mandiri.','https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop','Web App','Next.js, React, Tailwind CSS, Neon DB','Lead Web Developer','2024','https://selasar-wonosalam.vercel.app','https://github.com/nabssku/selasar-wonosalam',true,true,2),
      ('proj_seed_003','AUinAja — AI Fanfiction & Chat Mockup SaaS','auinaja-generator','Generator mockup chat WhatsApp, X/Twitter, dan Instagram interaktif untuk kreator Alternate Universe (AU).','## AUinAja Platform\n\nPlatform visual storytelling untuk kreator AU di Twitter dan TikTok dengan ekspor gambar 4K lossless dan character vault.','https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop','SaaS','Next.js, TypeScript, Canvas Export, PostgreSQL','Creator & Engineer','2025','https://auinaja.vercel.app','https://github.com/nabssku/auinaja',true,true,3);
    `;
    log.push('✅ INSERT projects');
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Insert projects error';
    return NextResponse.json({ step: 'INSERT projects', error: msg, log }, { status: 500 });
  }

  try {
    await sql`
      INSERT INTO skills (id, name, category, proficiency_level) VALUES
      ('sk_seed_01','React & Next.js','frontend',95),
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
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Insert skills error';
    return NextResponse.json({ step: 'INSERT skills', error: msg, log }, { status: 500 });
  }

  try {
    await sql`
      INSERT INTO experiences (id, title, institution, location, start_year, end_year, description, type, sort_order) VALUES
      ('exp_seed_01','S1 Informatika / Software Engineering','Universitas Muhammadiyah Malang (UMM)','Malang','2024','Sekarang','Fokus riset rekayasa perangkat lunak, arsitektur cloud serverless, dan pengembangan antarmuka interaktif.','education',1),
      ('exp_seed_02','Rekayasa Perangkat Lunak (RPL)','SMKS Telkom Malang','Malang','2021','2024','Mendalami fondasi pemrograman web, mobile app development, database design, dan software architecture.','education',2),
      ('exp_seed_03','Full-Stack Freelance Developer','LN Developer & Self-Employed','Remote','2023','Sekarang','Membangun sistem POS, platform SaaS, e-commerce, dan portal kustom untuk puluhan klien bisnis.','work',3);
    `;
    log.push('✅ INSERT experiences');
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Insert experiences error';
    return NextResponse.json({ step: 'INSERT experiences', error: msg, log }, { status: 500 });
  }

  try {
    const projectCount = await sql`SELECT count(*) as count FROM projects;`;
    const skillCount = await sql`SELECT count(*) as count FROM skills;`;
    const expCount = await sql`SELECT count(*) as count FROM experiences;`;

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/resume');

    return NextResponse.json({
      success: true,
      message: 'Database re-seeded!',
      log,
      seeded: {
        projects: Number(projectCount[0].count),
        skills: Number(skillCount[0].count),
        experiences: Number(expCount[0].count),
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Count error';
    return NextResponse.json({ step: 'COUNT', error: msg, log }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  const envSecret = process.env.SEED_SECRET;
  const { searchParams } = new URL(req.url);
  const querySecret = searchParams.get('secret');

  const hasValidSecret = Boolean(envSecret && envSecret.length >= 12 && querySecret === envSecret);

  if (!session && !hasValidSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return runSeed();
}
