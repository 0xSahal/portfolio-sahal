import { defineLive } from 'next-sanity/live';

import { client } from '@/sanity/lib/client';

// Live Content API helpers. NOTE: the app does NOT use `sanityFetch` for blog
// reads anymore, and does not mount <SanityLive />. `sanityFetch` pins every
// fetch to `revalidate: false` (cache forever) and relies on a mounted
// <SanityLive /> to call revalidateTag on content-change events; with that
// listener absent, published posts never surfaced without a redeploy. Blog
// reads now use time-based ISR via `client.fetch` + `blogFetchOptions` (see
// sanity/lib/client.ts). These exports are kept only for a possible future
// move to full live preview; wire <SanityLive /> back into the layout and
// switch reads back to `sanityFetch` if you go that route.
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token ?? false,
  browserToken: token ?? false,
});
