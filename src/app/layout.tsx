import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nabil Sahsada Suratno (@nabssku) — Full-Stack Web & AI Developer',
  description: 'Portofolio personal interaktif Nabil Sahsada Suratno bertema Cartoon Neo-Brutalism. Full-Stack Developer spesialis Next.js, Node.js, PostgreSQL, dan SaaS Solution.',
  keywords: ['Nabil Sahsada Suratno', 'nabssku', 'Full Stack Developer Malang', 'Next.js Developer Indonesia', 'SaaS Developer', 'Portfolio Kartun'],
  authors: [{ name: 'Nabil Sahsada Suratno', url: 'https://github.com/nabssku' }],
  openGraph: {
    title: 'Nabil Sahsada Suratno — Full-Stack Web Developer',
    description: 'Explore creative web apps, SaaS tools, and software engineering projects by Nabil (@nabssku).',
    url: 'https://nabs.vercel.app',
    siteName: 'Nabssku Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Nabil Sahsada Portfolio Preview',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nabil Sahsada Suratno — Full-Stack Developer',
    description: 'Personal Portfolio & Project Showcase by @nabssku',
    creator: '@nabsskun',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nabil Sahsada Suratno',
    alternateName: 'nabssku',
    jobTitle: 'Full-Stack Web & AI Developer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Malang',
      addressRegion: 'Jawa Timur',
      addressCountry: 'ID',
    },
    url: 'https://nabs.vercel.app',
    sameAs: [
      'https://github.com/nabssku',
      'https://instagram.com/nabsskun',
    ],
  };

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-pop-cream text-pop-dark selection:bg-pop-yellow selection:text-black">
        {children}
      </body>
    </html>
  );
}
