import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { BLOG_CACHE_TAG } from '@/sanity/lib/client';

// On-demand revalidation for blog content. Configure a Sanity GROQ-powered
// webhook (Manage → API → Webhooks) pointing at POST /api/revalidate, filtered
// to `_type == "post"`, with the same secret as SANITY_REVALIDATE_SECRET.
//
// `parseBody` verifies the request signature against that secret and waits for
// Content Lake eventual consistency, so the refetch triggered by the tag purge
// reads the just-published data. Without a configured secret the route refuses
// to revalidate (fail closed), so it can't be abused as an open cache-buster.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.warn('[revalidate] SANITY_REVALIDATE_SECRET not set; refusing to revalidate.');
    return NextResponse.json(
      { ok: false, message: 'Revalidation not configured.' },
      { status: 401 },
    );
  }

  let isValidSignature: boolean | null;
  let body: { _type?: string } | null;
  try {
    ({ isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret));
  } catch (err) {
    console.error('[revalidate] failed to parse webhook body:', err);
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  if (!isValidSignature) {
    return NextResponse.json({ ok: false, message: 'Invalid signature.' }, { status: 401 });
  }

  if (body?._type !== 'post') {
    // Not a post change we care about; acknowledge without touching the cache.
    return NextResponse.json({ ok: true, revalidated: false, reason: 'ignored type' });
  }

  // Next.js 16 requires a cacheLife profile; "max" marks the tag stale and
  // revalidates in the background (correct for a webhook Route Handler —
  // updateTag is Server Actions only).
  revalidateTag(BLOG_CACHE_TAG, 'max');
  return NextResponse.json({ ok: true, revalidated: true, tag: BLOG_CACHE_TAG, now: Date.now() });
}
