import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk, Fredoka } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
  display: 'swap',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-comic',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nabs.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nabil Sahsada Suratno (@nabssku) — Full-Stack Web & AI Developer',
    template: '%s | Nabil Sahsada (@nabssku)',
  },
  description:
    'Interactive Cartoon Neo-Brutalism portfolio of Nabil Sahsada Suratno. Full-Stack Developer specializing in Next.js, Node.js, PostgreSQL, SaaS platforms, and AI agents.',
  keywords: [
    'Nabil Sahsada Suratno',
    'nabssku',
    'Full Stack Developer Malang',
    'Next.js Developer Indonesia',
    'SaaS Developer',
    'AI Web Developer',
  ],
  authors: [{ name: 'Nabil Sahsada Suratno', url: 'https://github.com/nabssku' }],
  openGraph: {
    title: 'Nabil Sahsada Suratno (@nabssku) — Full-Stack Web & AI Developer',
    description:
      'Explore interactive web apps, SaaS platforms, POS systems, and AI agent projects built by Nabil Sahsada Suratno.',
    url: siteUrl,
    siteName: 'Nabssku Portfolio',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nabil Sahsada Suratno — Full-Stack Web & AI Developer',
    description: 'Personal Portfolio & Case Study Showcase by @nabssku',
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
    url: siteUrl,
    sameAs: [
      'https://github.com/nabssku',
      'https://instagram.com/nabsskun',
      'https://linkedin.com/in/nabssku',
    ],
  };

  return (
    <html
      lang="id"
      className={`scroll-smooth ${plusJakarta.variable} ${spaceGrotesk.variable} ${fredoka.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-pop-cream text-pop-dark selection:bg-pop-yellow selection:text-black">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-pop-yellow focus:text-black focus:border-[3px] focus:border-black focus:rounded-xl focus:font-display focus:font-bold focus:shadow-pop"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
