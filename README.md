# 🎨 Nabssku — Personal Cartoon Portfolio & Headless CMS

> **Personal Cartoon / Neo-brutalism Pop Art Portfolio & Headless CMS Web App for Nabil Sahsada Suratno (@nabssku)**.  
> Built with Next.js 14 (App Router), Tailwind CSS, Neon Serverless PostgreSQL, Framer Motion, Lucide Icons, and Full Admin Dashboard CMS.

---

## 🌟 Highlight Features

- **🎭 Playful Cartoon / Neo-brutalism Pop Art UI:** 
  - Bold black outlines (`border-[3px] border-black`), offset hard shadows (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`), vibrant retro pop colors (Yellow `#FDE047`, Orange `#FB923C`, Blue `#93C5FD`, Pink `#F472B6`, Green `#86EFAC`).
  - Optimized Google Fonts (*Plus Jakarta Sans*, *Space Grotesk*, *Fredoka*) via `next/font/google`.
  - Smooth Framer Motion transitions respecting `prefers-reduced-motion`.
- **🗺️ Interactive Career Roadmap & Services:** Timeline edukasi dan karir freelance serta layanan yang ditawarkan.
- **🚀 Featured Projects Showcase, Archive & Case Study (`/projects`, `/projects/[slug]`):** Filter kategori dinamis, tech stack tags, modal quick-preview, direct demo & GitHub links, serta halaman detail Markdown dengan OpenGraph tags.
- **🏷️ Interactive Skills Grid:** Filter kategori Frontend, Backend, Database, dan Tools dengan proficiency bar animatif.
- **📄 Printable Dynamic Resume (`/resume`):** Halaman CV interaktif yang tersinkronisasi langsung dengan database dan siap ekspor ke PDF.
- **📬 Live Interactive Contact Box:** Form terhubung ke database Neon PostgreSQL (`contact_messages`) dengan validasi input, honeypot anti-spam, dan rate limiting.
- **🔐 Protected Admin CMS Dashboard (`/admin`):**
  - **Overview Stats:** Metrik realtime total proyek, tech stack, timeline karir, notifikasi pesan unread, dan daftar pesan terbaru.
  - **Projects Manager:** Full CRUD proyek, status Draft/Published, Cloudinary upload, tech stack, role, tahun, dan Markdown deep-dive.
  - **Skills Manager:** Full CRUD kategori teknologi dan tingkat keahlian.
  - **Experiences Manager:** Full CRUD riwayat pendidikan & karir.
  - **Inbox Messages:** Kelola pesan masuk dari pengunjung, tandai baca/belum dibaca, dan hapus pesan.
  - **Profile Settings:** Kelola bio, avatar, link resume, metrik, dan tautan sosial.

---

## 🛠️ Tech Stack & Architecture

- **Frontend & Routing:** Next.js 14 (App Router), React 18, TypeScript
- **Styling & Motion:** Tailwind CSS (Custom Neo-brutalism config), Framer Motion, Lucide React
- **Database:** Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- **Media CDN:** Cloudinary
- **Authentication:** `HttpOnly` JWT Cookie Auth (Node + Edge Web Crypto verification) + Bcrypt.js

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
Salin `.env.example` menjadi `.env.local` dan isi kredensial Anda sendiri:
```bash
cp .env.example .env.local
```
Pastikan minimal `DATABASE_URL`, `JWT_SECRET` (min. 16 karakter acak), `ADMIN_EMAIL`, dan `ADMIN_PASSWORD` sudah terisi sebelum menjalankan app pertama kali.

### 4. Run Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

### 5. Access Admin Portal
- URL: `http://localhost:3000/admin/login`
- Login menggunakan `ADMIN_EMAIL` dan `ADMIN_PASSWORD` yang Anda konfigurasikan di environment variables.

---

## 📦 Deployment ke Vercel

1. Push repository ke GitHub.
2. Import repository di [Vercel Dashboard](https://vercel.com).
3. Isi Environment Variables (`DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, serta `CLOUDINARY_*` untuk upload gambar).
4. Klik **Deploy** 🚀.

---

## 👤 Author
**Nabil Sahsada Suratno**
- GitHub: [@nabssku](https://github.com/nabssku)
- Instagram: [@nabsskun](https://instagram.com/nabsskun)
- Email: `nabilsahsadabisnis@gmail.com`
