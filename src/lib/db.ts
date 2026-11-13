import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

let _sqlClient: NeonQueryFunction<false, false> | null = null;

function getSqlClient(): NeonQueryFunction<false, false> {
  if (!_sqlClient) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL environment variable is not configured. Please set it in .env.local or your deployment settings.'
      );
    }
    _sqlClient = neon(connectionString);
  }
  return _sqlClient;
}

/**
 * Lazy Neon SQL client so module imports during build do not fail when env vars are absent.
 */
export const sql: NeonQueryFunction<false, false> = new Proxy(
  (() => {}) as unknown as NeonQueryFunction<false, false>,
  {
    apply(_target, thisArg, argArray) {
      return Reflect.apply(getSqlClient() as unknown as Function, thisArg, argArray);
    },
    get(_target, prop, receiver) {
      const client = getSqlClient();
      const value = Reflect.get(client, prop, receiver);
      return typeof value === 'function' ? value.bind(client) : value;
    },
  }
);

/**
 * Initialize all database tables and seed default portfolio data.
 * Uses a module-level guard so it only runs once per server lifecycle,
 * and clears the guard on error so transient cold-start failures can recover.
 */
let _initPromise: Promise<{ success: boolean; error?: unknown }> | null = null;

export function initDatabase() {
  if (!_initPromise) {
    _initPromise = _doInitDatabase();
  }
  return _initPromise;
}

export function resetInitGuard() {
  _initPromise = null;
}

/**
 * Sync admin account credentials from ADMIN_EMAIL and ADMIN_PASSWORD env vars.
 * Ensures password rotation or email updates via env vars also apply to pre-existing DBs.
 */
export async function syncEnvAdminUser(): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return;

  const existingByEmail = await sql`
    SELECT id, password_hash FROM users WHERE LOWER(email) = ${adminEmail} LIMIT 1;
  `;

  if (existingByEmail.length > 0) {
    const user = existingByEmail[0];
    const matches = await bcrypt.compare(
      adminPassword,
      user.password_hash as string
    );
    if (!matches) {
      const hash = await bcrypt.hash(adminPassword, 12);
      await sql`
        UPDATE users SET password_hash = ${hash} WHERE id = ${user.id};
      `;
    }
    return;
  }

  const hash = await bcrypt.hash(adminPassword, 12);
  const defaultAdmin = await sql`
    SELECT id FROM users WHERE id = 'admin_nabssku' LIMIT 1;
  `;

  if (defaultAdmin.length > 0) {
    await sql`
      UPDATE users
      SET email = ${adminEmail}, password_hash = ${hash}
      WHERE id = 'admin_nabssku';
    `;
    return;
  }

  await sql`
    INSERT INTO users (id, email, password_hash, name, role)
    VALUES ('admin_nabssku', ${adminEmail}, ${hash}, 'Nabil Sahsada Suratno', 'admin')
    ON CONFLICT (email) DO UPDATE SET password_hash = ${hash};
  `;
}

async function _doInitDatabase() {
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
        tech_stack TEXT DEFAULT '',
        role VARCHAR(150) DEFAULT '',
        year VARCHAR(20) DEFAULT '',
        demo_url VARCHAR(500),
        repo_url VARCHAR(500),
        is_featured BOOLEAN DEFAULT FALSE,
        is_published BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Safe additive migrations for existing tables
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_stack TEXT DEFAULT '';`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS role VARCHAR(150) DEFAULT '';`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS year VARCHAR(20) DEFAULT '';`;

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

    // 6. Site Settings Table
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Seed default site settings if not exist
    await sql`
      INSERT INTO site_settings (key, value)
      VALUES
        ('profile_name', 'Nabil Sahsada Suratno'),
        ('profile_handle', '@nabssku'),
        ('profile_title', 'Full-Stack Web & AI Developer'),
        ('profile_location', 'Malang, Jawa Timur, Indonesia'),
        ('profile_status', 'Available for Freelance & Full-time'),
        ('profile_bio', 'Informatics Engineering student at UMM & Freelance Full-Stack Developer. I craft playful, high-performance web apps, SaaS platforms, and intelligent agent systems with clean code and comic-inspired aesthetics.'),
        ('profile_avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'),
        ('profile_resume_url', '/resume'),
        ('stat_years', '3+'),
        ('stat_projects', '15+'),
        ('social_github', 'https://github.com/nabssku'),
        ('social_instagram', 'https://instagram.com/nabsskun'),
        ('social_linkedin', 'https://linkedin.com/in/nabssku'),
        ('social_email', 'nabilsahsadabisnis@gmail.com')
      ON CONFLICT (key) DO NOTHING;
    `;

    // Seed initial admin user if users table is empty and env credentials are provided
    if (process.env.ADMIN_EMAIL?.trim() && process.env.ADMIN_PASSWORD) {
      const existingUsers = await sql`SELECT id FROM users LIMIT 1;`;
      if (existingUsers.length === 0) {
        await syncEnvAdminUser();
      }
    }

    // Seed default projects if empty
    const existingProjects = await sql`SELECT id FROM projects LIMIT 1;`;
    if (existingProjects.length === 0) {
      await sql`
        INSERT INTO projects (id, title, slug, summary, content_markdown, thumbnail_url, category, tech_stack, role, year, demo_url, repo_url, is_featured, is_published, sort_order)
        VALUES 
        (
          'proj_seed_001',
          'Alacart — Smart POS & Cashier System',
          'alacart-pos',
          'Sistem kasir multi-outlet berbasis web responsif dengan integrasi QRIS dynamic dan laporan keuangan real-time.',
          '## Tentang Alacart POS\n\nAlacart adalah aplikasi point-of-sale modern untuk UMKM F&B dan retail. Dilengkapi fitur manajemen stok bahan baku, split bill meja, pencetakan nota thermal via Bluetooth, dan integrasi QRIS BorderPay.\n\n### Teknologi & Highlight:\n- **Next.js 14 App Router** untuk performa UI responsif\n- **Tailwind CSS & Framer Motion** untuk transisi kasir cepat\n- **Neon Serverless PostgreSQL** untuk pencatatan transaksi real-time\n- **BorderPay API Gateway** untuk pembayaran QRIS dinamis',
          'https://images.unsplash.com/photo-1556742049-0a67e5572263?q=80&w=800&auto=format&fit=crop',
          'SaaS / POS',
          'Next.js, TypeScript, Tailwind CSS, PostgreSQL, BorderPay QRIS',
          'Full-Stack Developer',
          '2025',
          'https://alacart.vercel.app',
          'https://github.com/nabssku/alacart',
          true,
          true,
          1
        ),
        (
          'proj_seed_002',
          'Selasar Wonosalam — Eco Tourism Portal',
          'selasar-wonosalam',
          'Platform informasi destinasi ekowisata, reservasi villa, dan pusat oleh-oleh khas Wonosalam berbasis Next.js.',
          '## Portal Ekowisata Wonosalam\n\nSistem direktori wisata terintegrasi dengan peta interaktif, kalender musim panen durian, serta sistem booking penginapan mandiri.\n\n### Fitur Utama:\n- Eksplorasi rute & destinasi lokal Wonosalam\n- Kalender event & musim panen komoditas daerah\n- Sistem reservasi villa & katalog oleh-oleh UMKM',
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
          'Web App',
          'Next.js, React, Tailwind CSS, Neon DB',
          'Lead Web Developer',
          '2024',
          'https://selasar-wonosalam.vercel.app',
          'https://github.com/nabssku/selasar-wonosalam',
          true,
          true,
          2
        ),
        (
          'proj_seed_003',
          'AUinAja — AI Fanfiction & Chat Mockup SaaS',
          'auinaja-generator',
          'Generator mockup chat WhatsApp, X/Twitter, dan Instagram interaktif untuk kreator Alternate Universe (AU).',
          '## AUinAja Platform\n\nPlatform visual storytelling untuk kreator AU di X dan TikTok dengan ekspor gambar resolusi tinggi dan character vault.\n\n### Kapabilitas:\n- Editor percakapan multi-platform (WhatsApp, X, Instagram)\n- Character Vault untuk konsistensi profil karakter\n- Ekspor gambar tajam siap unggah ke media sosial',
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
          'SaaS',
          'Next.js, TypeScript, Canvas Export, PostgreSQL',
          'Creator & Full-Stack Engineer',
          '2025',
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
        INSERT INTO skills (id, name, category, proficiency_level)
        VALUES
        ('sk_seed_01', 'React & Next.js', 'frontend', 95),
        ('sk_seed_02', 'TypeScript', 'frontend', 90),
        ('sk_seed_03', 'Tailwind CSS', 'frontend', 95),
        ('sk_seed_04', 'Framer Motion', 'frontend', 85),
        ('sk_seed_05', 'Node.js & Express', 'backend', 88),
        ('sk_seed_06', 'REST & GraphQL APIs', 'backend', 90),
        ('sk_seed_07', 'PostgreSQL & Neon DB', 'database', 92),
        ('sk_seed_08', 'Prisma & Drizzle ORM', 'database', 88),
        ('sk_seed_09', 'Cloudinary CDN', 'tools', 90),
        ('sk_seed_10', 'Git & GitHub Actions', 'tools', 88),
        ('sk_seed_11', 'Vercel Edge Deploy', 'tools', 92),
        ('sk_seed_12', 'BorderPay QRIS', 'tools', 95);
      `;
    }

    // Seed default experiences if empty
    const existingExp = await sql`SELECT id FROM experiences LIMIT 1;`;
    if (existingExp.length === 0) {
      await sql`
        INSERT INTO experiences (id, title, institution, location, start_year, end_year, description, type, sort_order)
        VALUES
        (
          'exp_seed_01',
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
          'exp_seed_02',
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
          'exp_seed_03',
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
    _initPromise = null;
    console.error('Database init error:', error);
    return { success: false, error };
  }
}
