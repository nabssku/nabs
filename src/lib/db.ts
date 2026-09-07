import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_DPikGA6XONT2@ep-misty-violet-avt0zwb0-pooler.c-11.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require';

export const sql = neon(connectionString);

export async function initDatabase() {
  try {
    // 1. Users table (Admin)
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(220) UNIQUE NOT NULL,
        summary TEXT NOT NULL,
        content_markdown TEXT,
        thumbnail_url VARCHAR(500) NOT NULL,
        cloudinary_public_id VARCHAR(255) DEFAULT '',
        demo_url VARCHAR(500),
        repo_url VARCHAR(500),
        is_featured BOOLEAN DEFAULT FALSE,
        is_published BOOLEAN DEFAULT TRUE,
        category VARCHAR(100) DEFAULT 'Full-Stack',
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Skills table
    await sql`
      CREATE TABLE IF NOT EXISTS skills (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL, -- 'frontend', 'backend', 'database', 'tools'
        icon_url VARCHAR(500),
        proficiency_level INT DEFAULT 85,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 4. Project Skills relation
    await sql`
      CREATE TABLE IF NOT EXISTS project_skills (
        project_id VARCHAR(255) REFERENCES projects(id) ON DELETE CASCADE,
        skill_id VARCHAR(255) REFERENCES skills(id) ON DELETE CASCADE,
        PRIMARY KEY (project_id, skill_id)
      );
    `;

    // 5. Experiences & Education table
    await sql`
      CREATE TABLE IF NOT EXISTS experiences (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        institution VARCHAR(150) NOT NULL,
        location VARCHAR(100),
        start_year VARCHAR(20) NOT NULL,
        end_year VARCHAR(20),
        description TEXT,
        type VARCHAR(50) NOT NULL, -- 'education' / 'work'
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 6. Contact Messages table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id VARCHAR(255) PRIMARY KEY,
        sender_name VARCHAR(100) NOT NULL,
        sender_email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default admin user jika belum ada
    const adminCheck = await sql`SELECT id FROM users WHERE email = 'nabil@nabssku.dev' LIMIT 1;`;
    if (adminCheck.length === 0) {
      const hashedPass = await bcrypt.hash('admin12345', 10);
      await sql`
        INSERT INTO users (id, email, password_hash, name, role)
        VALUES ('admin_nabssku', 'nabil@nabssku.dev', ${hashedPass}, 'Nabil Sahsada Suratno', 'admin');
      `;
    }

    // Seed default skills jika kosong
    const skillCount = await sql`SELECT count(*) as count FROM skills;`;
    if (Number(skillCount[0].count) === 0) {
      await sql`
        INSERT INTO skills (id, name, category, proficiency_level) VALUES
          ('sk_1', 'Next.js 15 & React 19', 'frontend', 95),
          ('sk_2', 'TypeScript', 'frontend', 90),
          ('sk_3', 'Tailwind CSS', 'frontend', 98),
          ('sk_4', 'Framer Motion', 'frontend', 88),
          ('sk_5', 'Node.js & Express', 'backend', 90),
          ('sk_6', 'Neon PostgreSQL', 'database', 92),
          ('sk_7', 'Prisma / Drizzle ORM', 'database', 88),
          ('sk_8', 'Cloudinary CDN', 'tools', 85),
          ('sk_9', 'Git & GitHub CI/CD', 'tools', 92),
          ('sk_10', 'Python & AI Agents', 'tools', 85);
      `;
    }

    // Seed sample projects jika kosong
    const projectCount = await sql`SELECT count(*) as count FROM projects;`;
    if (Number(projectCount[0].count) === 0) {
      await sql`
        INSERT INTO projects (id, title, slug, summary, content_markdown, thumbnail_url, demo_url, repo_url, is_featured, is_published, category, sort_order) VALUES
          ('proj_1', 'Alacart POS Cloud System', 'alacart-pos-cloud', 'Sistem kasir cloud cerdas multi-outlet dengan laporan omset realtime dan integrasi QRIS dinamis.', '# Alacart POS\n\nSolusi kasir modern berbasis cloud untuk UMKM F&B dan retail dengan sinkronisasi multi-outlet instan.', 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?w=800&auto=format&fit=crop&q=80', 'https://alacart.id', 'https://github.com/nabssku/alacart-pos', true, true, 'Full-Stack Web', 1),
          ('proj_2', 'AUMaker — Social Mock Simulator', 'aumaker-social-mock', 'Platform SaaS pembuat tangkapan layar simulasi WhatsApp, Twitter/X, dan Instagram untuk kreator cerita AU.', '# AUMaker\n\nPlatform workspace kreator AU untuk membuat mockup percakapan 1:1 mirip aplikasi asli dan batch export carousel.', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80', 'https://aumaker.vercel.app', 'https://github.com/nabssku/aumaker', true, true, 'SaaS Product', 2),
          ('proj_3', 'Selasar Wonosalam Tourism Portal', 'selasar-wonosalam-tourism', 'Portal digital pariwisata terpadu Wonosalam dengan sistem booking tiket atraksi dan katalog UMKM lokal.', '# Selasar Wonosalam\n\nPortal promosi potensi wisata alam, agrowisata kopi, dan UMKM khas Wonosalam berbasis web interaktif.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', 'https://selasarwonosalam.id', 'https://github.com/nabssku/selasar-wonosalam', true, true, 'Web App', 3);
      `;
    }

    // Seed sample experiences jika kosong
    const expCount = await sql`SELECT count(*) as count FROM experiences;`;
    if (Number(expCount[0].count) === 0) {
      await sql`
        INSERT INTO experiences (id, title, institution, location, start_year, end_year, description, type, sort_order) VALUES
          ('exp_1', 'Teknik Informatika (Software Engineering)', 'Universitas Muhammadiyah Malang (UMM)', 'Malang, ID', '2024', 'Sekarang', 'Fokus pada arsitektur perangkat lunak, sistem terdistribusi, dan implementasi modern full-stack web.', 'education', 1),
          ('exp_2', 'Rekayasa Perangkat Lunak (RPL)', 'SMKS Telkom Malang', 'Malang, ID', '2021', '2024', 'Mendalami dasar web development, database relasional, dan kompetisi software development.', 'education', 2),
          ('exp_3', 'Lead Full-Stack Freelance Developer', 'LN | Developer Studio', 'Remote / Malang', '2023', 'Sekarang', 'Membangun puluhan aplikasi SaaS, dashboard kasir POS, dan landing page performa tinggi untuk berbagai klien nasional.', 'work', 3);
      `;
    }

    return { success: true, message: 'Database initialized successfully.' };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}
