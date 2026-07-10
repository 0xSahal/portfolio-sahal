import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

import Container from '@/components/ui/Container';
import PortableTextBody from '@/components/blog/PortableTextBody';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import PostCard from '@/components/blog/PostCard';
import { client, blogFetchOptions } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { POST_QUERY, POST_SLUGS_QUERY, RELATED_POSTS_QUERY } from '@/sanity/lib/queries';
import { estimateReadingTime, extractHeadings, formatDate } from '@/lib/blog';
import { breadcrumbJsonLd } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import type { PostFull, PostCard as PostCardType } from '@/sanity/types';

// Existing posts are prerendered at build; brand-new slugs render on demand
// (dynamicParams defaults to true). The Sanity webhook at /api/revalidate
// purges the 'post' tag on publish/edit for near-instant refresh; this hourly
// value is only a fallback. Keep in sync with BLOG_REVALIDATE in
// sanity/lib/client.ts.
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<PostFull | null>(POST_QUERY, { slug }, blogFetchOptions);
  if (!post) return { title: 'Not found' };

  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).fit('crop').url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/blog/${post.slug}`,
      siteName: siteConfig.name,
      locale: 'en_US',
      publishedTime: post.publishedAt,
      authors: [post.author?.name ?? siteConfig.name],
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await client.fetch(POST_QUERY, { slug }, blogFetchOptions);
  const post = data as PostFull | null;
  if (!post) notFound();

  const relatedData = await client.fetch(RELATED_POSTS_QUERY, { slug }, blogFetchOptions);
  const related = (relatedData ?? []) as PostCardType[];

  const readingTime = estimateReadingTime(post.body);
  const authorName = post.author?.name ?? siteConfig.name;
  const headings = extractHeadings(post.body);
  const hasToc = headings.length >= 2;
  const shareUrl = `${siteConfig.url}/blog/${post.slug}`;

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: authorName, '@id': `${siteConfig.url}/#person` },
    publisher: { '@id': `${siteConfig.url}/#person` },
    ...(post.coverImage
      ? { image: urlFor(post.coverImage).width(1200).height(630).fit('crop').url() }
      : {}),
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <Container className="py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      {/* Hero */}
      <div className="mx-auto max-w-5xl">
        <Link
          href="/blog"
          className="text-text-secondary hover:text-text-primary inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft size={15} /> All posts
        </Link>

        <header className="mx-auto mt-8 max-w-3xl text-center md:mt-10">
          {post.category && (
            <p className="text-accent text-sm font-medium tracking-[0.14em] uppercase">
              {post.category.title}
            </p>
          )}
          <h1 className="text-text-primary mt-4 font-serif text-4xl leading-[1.1] font-medium tracking-tighter sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-text-secondary mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="text-text-muted mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
            <span className="text-text-secondary font-medium">{authorName}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden>·</span>
            <span>{readingTime}</span>
          </div>
        </header>

        {post.coverImage && (
          <div className="rounded-card border-border bg-bg-secondary relative mt-10 aspect-[16/9] overflow-hidden border shadow-sm md:mt-12">
            <Image
              src={urlFor(post.coverImage)
                .width(1920)
                .height(1080)
                .fit('crop')
                .auto('format')
                .url()}
              alt={post.coverImage.alt ?? post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Body + table of contents */}
      <div
        className={cn(
          'mx-auto mt-14 max-w-6xl md:mt-16',
          hasToc && 'lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14',
        )}
      >
        <article className="mx-auto w-full max-w-2xl lg:mx-0">
          {post.body && post.body.length > 0 ? (
            <PortableTextBody value={post.body} />
          ) : (
            <div className="rounded-card border-border-strong bg-bg-secondary text-text-secondary border border-dashed p-8">
              <p className="text-text-primary font-medium">This one is still being written.</p>
              <p className="mt-2 text-sm">Check back soon for the full article.</p>
            </div>
          )}

          <div className="border-border mt-12 border-t pt-8">
            <ShareButtons url={shareUrl} title={post.title} />
          </div>
        </article>

        {hasToc && (
          <aside className="mt-12 hidden lg:mt-0 lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section className="border-border mx-auto mt-20 max-w-6xl border-t pt-12">
          <h2 className="text-text-primary font-serif text-2xl font-medium tracking-tight md:text-3xl">
            Read next
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
