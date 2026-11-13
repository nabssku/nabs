import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nabs.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/projects', '/projects/*', '/resume'],
        disallow: ['/admin', '/admin/*', '/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
