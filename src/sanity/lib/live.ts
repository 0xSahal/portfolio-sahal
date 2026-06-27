import { defineLive } from 'next-sanity/live';

import { client } from '@/sanity/lib/client';

// Live Content API helpers for blog fetching. `sanityFetch` uses Next.js cache tags;
// the optional <SanityLive /> listener (removed from layout) would push instant
// updates when content changes in Sanity. Without it, blog posts refresh on the
// normal cache/revalidate cycle (sitemap revalidates hourly).
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token ?? false,
  browserToken: token ?? false,
});
