import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '@/sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN for fast, cached reads at runtime. Disable per-request (useCdn:false)
  // only where guaranteed freshness matters (e.g. generateStaticParams).
  useCdn: true,
});

// Blog freshness strategy (Sanity best practice for a mostly-static blog):
//
//   1. PRIMARY — on-demand revalidation. Every blog read is tagged 'post', and
//      a Sanity webhook hits `/api/revalidate` on publish/edit/delete, which
//      calls `revalidateTag('post')`. New content appears near-instantly and we
//      only refetch when something actually changed, not on a timer.
//   2. FALLBACK — a long, 1-hour time-based revalidate, so content is never
//      frozen if the webhook is ever removed or misconfigured. Under traffic
//      this is at most one background refetch per page per hour (matching the
//      sitemap), not the per-minute polling an aggressive ISR window causes.
//
// This replaces `defineLive`'s `sanityFetch`, which pins fetches to
// `revalidate: false` and only invalidates via a mounted <SanityLive/> — which
// this app does not mount, so published posts never surfaced without a redeploy.
// Keep this a plain literal so route segments can mirror it.
export const BLOG_REVALIDATE = 3600;

// Tag applied to every blog read; `/api/revalidate` purges it on Sanity events.
export const BLOG_CACHE_TAG = 'post';

export const blogFetchOptions = {
  next: { revalidate: BLOG_REVALIDATE, tags: [BLOG_CACHE_TAG] },
};
