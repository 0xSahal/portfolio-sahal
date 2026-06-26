import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { client } from '@/sanity/lib/client';
import { POSTS_SITEMAP_QUERY } from '@/sanity/lib/queries';

const base = siteConfig.url.replace(/\/$/, '');

// Refresh hourly so new posts surface to crawlers without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await client
      .withConfig({ useCdn: true })
      .fetch<Array<{ slug: string; updatedAt: string }>>(POSTS_SITEMAP_QUERY);
    blogEntries = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch (err) {
    console.warn('[sitemap] failed to fetch posts from Sanity:', err);
  }

  return [...staticEntries, ...blogEntries];
}
