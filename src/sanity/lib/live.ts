import { defineLive } from 'next-sanity/live';

import { client } from '@/sanity/lib/client';

// Live Content API: published content fetched through `sanityFetch` updates in
// real time (via <SanityLive />) with no redeploy. No token is required for a
// public dataset; add SANITY_API_READ_TOKEN later to preview drafts.
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
