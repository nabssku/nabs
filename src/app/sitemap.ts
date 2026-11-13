import type { MetadataRoute } from 'next';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nabs.vercel.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  try {
    const rows = await sql`
      SELECT slug, updated_at, created_at
      FROM projects
      WHERE is_published = true;
    `;

    const projectRoutes: MetadataRoute.Sitemap = rows.map((row) => ({
      url: `${baseUrl}/projects/${row.slug}`,
      lastModified: new Date((row.updated_at || row.created_at || Date.now()) as string),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
