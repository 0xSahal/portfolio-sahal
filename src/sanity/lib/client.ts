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
