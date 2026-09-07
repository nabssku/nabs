import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_DPikGA6XONT2@ep-misty-violet-avt0zwb0-pooler.c-11.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require';

export const sql = neon(connectionString);

/**
 * Initialize all database tables and seed default portfolio data
 */
export async function initDatabase() {
  try {
    // 1. Users Table (Admin)
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // 2. Projects Table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(100) PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(220) UNIQUE NOT NULL,
        summary TEXT NOT NULL,
        content_markdown TEXT,
        thumbnail_url VARCHAR(500) NOT NULL,
        cloudinary_public_id VARCHAR(255) DEFAULT '',
        category VARCHAR(100) DEFAULT 'Web App',
        demo_url VARCHAR(500),
        repo_url VARCHAR(500),
        is_featured BOOLEAN DEFAULT FALSE,
        is_published BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // 3. Skills Table
    await sql`
      CREATE TABLE IF NOT EXISTS skills (
        id VARCHAR(100) PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        icon_url VARCHAR(500),
        proficiency_level INT DEFAULT 85
      );
    `;

    // 4. Experiences Table
    await sql`
      CREATE TABLE IF NOT EXISTS experiences (
        id VARCHAR(100) PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(150) NOT NULL,
        institution VARCHAR(150) NOT NULL,
        location VARCHAR(100),
        start_year VARCHAR(20) NOT NULL,
        end_year VARCHAR(20),
        description TEXT,
        type VARCHAR(50) NOT NULL,
        sort_order INT DEFAULT 0
      );
    `;

    // 5. Contact Messages Table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id VARCHAR(100) PRIMARY KEY DEFAULT gen_random_uuid(),
        sender_name VARCHAR(100) NOT NULL,
        sender_email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Check if admin user exists, if not seed it
    const existingUsers = await sql`SELECT id FROM users WHERE email = 'nabilsahsadabisnis@gmail.com' LIMIT 1;`;
    if (existingUsers.length === 0) {
      const defaultHash = '$2b$10$JAX.nGEfQEdLNK0Lb7ZT/.eUT5TXqAzya4LoQLuZEgftWnedOaOFW'; // admin123456
      await sql`
        INSERT INTO users (id, email, password_hash, name, role)
        VALUES ('admin_nabssku', 'nabilsahsadabisnis@gmail.com', ${defaultHash}, 'Nabil Sahsada Suratno', 'admin')
        ON CONFLICT (email) DO UPDATE SET password_hash = ${defaultHash};
      `;
    }

    // Seed default projects if empty
    const existingProjects = await sql`SELECT id FROM projects LIMIT 1;`;
    if (existingProjects.length === 0) {
      await sql`
        INSERT INTO projects (title, slug, summary, content_markdown, thumbnail_url, category, demo_url, repo_url, is_featured, is_published, sort_order)
        VALUES 
        (
          'Alacart — Smart POS & Cashier System',
          'alacart-pos',
          'Sistem kasir multi-outlet berbasis web responsif dengan integrasi QRIS dynamic dan laporan keuangan real-time.',
          '## Tentang Alacart POS\n\nAlacart adalah aplikasi point-of-sale modern untuk UMKM F&B dan retail. Dilengkapi fitur manajemen stok bahan baku, split bill meja, pencetakan nota thermal via Bluetooth, dan integrasi QRIS BorderPay.\n\n### Teknologi:\n- Next.js 14 App Router\n- Tailwind CSS & Framer Motion\n- Neon Serverless PostgreSQL\n- BorderPay API Gateway',
          'https://images.unsplash.com/photo-1556742049-0a67e5572263?q=80&w=800&auto=format&fit=crop',
          'SaaS / POS',
          'https://alacart.vercel.app',
          'https://github.com/nabssku/alacart',
          true,
          true,
          1
        ),
        (
          'Selasar Wonosalam — Eco Tourism Portal',
          'selasar-wonosalam',
          'Platform informasi destinasi ekowisata, reservasi villa, dan pusat oleh-oleh khas Wonosalam berbasis Next.js.',
          '## Portal Ekowisata Wonosalam\n\nSistem direktori wisata terintegrasi dengan peta interaktif, kalender musim panen durian, serta sistem booking penginapan mandiri.',
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
          'Web App',
          'https://selasar-wonosalam.vercel.app',
          'https://github.com/nabssku/selasar-wonosalam',
          true,
          true,
          2
        ),
        (
          'AUinAja — AI Fanfiction & Chat Mockup SaaS',
          'auinaja-generator',
          'Generator mockup chat WhatsApp, X/Twitter, and Instagram interaktif untuk kreator Alternate Universe (AU).',
          '## AUinAja Platform\n\nPlatform visual storytelling untuk kreator AU di Twitter dan TikTok dengan ekspor gambar 4K lossless dan character vault.',
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
          'SaaS',
          'https://auinaja.vercel.app',
          'https://github.com/nabssku/auinaja',
          true,
          true,
          3
        );
      `;
    }

    // Seed default skills if empty
    const existingSkills = await sql`SELECT id FROM skills LIMIT 1;`;
    if (existingSkills.length === 0) {
      await sql`
        INSERT INTO skills (name, category, proficiency_level)
        VALUES
        ('React & Next.js 15', 'frontend', 95),
        ('TypeScript', 'frontend', 90),
        ('Tailwind CSS', 'frontend', 95),
        ('Framer Motion', 'frontend', 85),
        ('Node.js & Express', 'backend', 88),
        ('REST & GraphQL APIs', 'backend', 90),
        ('PostgreSQL & Neon DB', 'database', 92),
        ('Prisma & Drizzle ORM', 'database', 88),
        ('Cloudinary CDN', 'tools', 90),
        ('Git & GitHub Actions', 'tools', 88),
        ('Vercel Edge Deploy', 'tools', 92),
        ('BorderPay QRIS', 'tools', 95);
      `;
    }

    // Seed default experiences if empty
    const existingExp = await sql`SELECT id FROM experiences LIMIT 1;`;
    if (existingExp.length === 0) {
      await sql`
        INSERT INTO experiences (title, institution, location, start_year, end_year, description, type, sort_order)
        VALUES
        (
          'S1 Informatika / Software Engineering',
          'Universitas Muhammadiyah Malang (UMM)',
          'Malang',
          '2024',
          'Sekarang',
          'Fokus riset rekayasa perangkat lunak, arsitektur cloud serverless, dan pengembangan antarmuka interaktif.',
          'education',
          1
        ),
        (
          'Rekayasa Perangkat Lunak (RPL)',
          'SMKS Telkom Malang',
          'Malang',
          '2021',
          '2024',
          'Mendalami fondasi pemrograman web, mobile app development, database design, dan software architecture.',
          'education',
          2
        ),
        (
          'Full-Stack Freelance Developer',
          'LN Developer & Self-Employed',
          'Remote',
          '2023',
          'Sekarang',
          'Membangun sistem POS, platform SaaS, e-commerce, dan portal kustom untuk puluhan klien bisnis.',
          'work',
          3
        );
      `;
    }

    return { success: true };
  } catch (error) {
    console.error('Database init error:', error);
    return { success: false, error };
  }
}
