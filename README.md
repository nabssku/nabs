# 🎨 Nabssku — Personal Cartoon Portfolio & Headless CMS

> **Personal Cartoon / Neo-brutalism Pop Art Portfolio & Headless CMS Web App for Nabil Sahsada Suratno (@nabssku)**.  
> Built with Next.js 14 (App Router), Tailwind CSS, Neon Serverless PostgreSQL, Lucide Icons, and Full Admin Dashboard CMS.

---

## 🌟 Highlight Features

- **🎭 Playful Cartoon / Neo-brutalism Pop Art UI:** 
  - Bold black outlines (`border-[3px] border-black`), offset hard shadows (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`), vibrant retro pop colors (Yellow `#FDE047`, Orange `#FB923C`, Blue `#93C5FD`, Pink `#F472B6`, Green `#86EFAC`).
  - Google Fonts (*Plus Jakarta Sans*, *Space Grotesk*, *Fredoka*).
  - Floating 2.5D comic badges, sticker tech stack, and interactive idle animations.
- **🗺️ Interactive Career Roadmap:** Timeline edukasi (SMK Telkom Malang, UMM) dan karir freelance disajikan dalam format comic board game.
- **🚀 Featured Projects Showcase & Slug Deep-Dive:** Filter kategori dinamis (SaaS, Web App, POS), rich modal info, direct demo & GitHub links, serta halaman slug detail (`/projects/[slug]`) dengan OpenGraph tags.
- **🏷️ Stickers & Skills Grid:** Filter kategori Frontend, Backend, Database, dan DevOps dengan badge persentase kemampuan.
- **📬 Live Interactive Contact Box:** Form terhubung langsung ke database Neon PostgreSQL (`contact_messages`) dengan validasi real-time.
- **🔐 Protected Admin CMS Dashboard (`/admin`):**
  - **Overview Stats:** Metrik realtime total proyek, tech stack, timeline karir, dan notifikasi pesan unread.
  - **Projects Manager:** Full CRUD proyek, status Draft/Published, thumbnail, dan markdown technical breakdown.
  - **Skills Manager:** Full CRUD kategori teknologi dan tingkat keahlian.
  - **Experiences Manager:** Full CRUD riwayat pendidikan & karir.
  - **Inbox Messages:** Kelola pesan masuk dari pengunjung, tandai baca/belum dibaca, dan arsip pesan.

---

## 🛠️ Tech Stack & Architecture

- **Frontend & Routing:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS (Custom Neo-brutalism config), Lucide React
- **Database:** Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- **Authentication:** JWT Token Cookie Auth + Bcrypt.js
- **Icons & Typography:** Lucide React, Google Fonts

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/nabssku/nabs.git
cd nabs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env.local` di root directory:
```env
DATABASE_URL="postgresql://neondb_owner:***@ep-***-pooler.c-11.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require"
JWT_SECRET="your_secure_jwt_secret_key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Run Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

### 5. Access Admin Portal
- URL: `http://localhost:3000/admin/login`
- Default Email: `nabilsahsadabisnis@gmail.com`
- Default Password: `admin123456`

---

## 📦 Deployment ke Vercel

1. Push repository ke GitHub.
2. Import repository di [Vercel Dashboard](https://vercel.com).
3. Isi Environment Variables (`DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`).
4. Klik **Deploy** 🚀.

---

## 👤 Author
**Nabil Sahsada Suratno**
- GitHub: [@nabssku](https://github.com/nabssku)
- Instagram: [@nabsskun](https://instagram.com/nabsskun)
- Email: `nabilsahsadabisnis@gmail.com`
