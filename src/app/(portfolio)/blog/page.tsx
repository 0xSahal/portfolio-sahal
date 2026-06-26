import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/blog/Pagination';
import JsonLd from '@/components/seo/JsonLd';
import { sanityFetch } from '@/sanity/lib/live';
import { POSTS_QUERY, POSTS_COUNT_QUERY } from '@/sanity/lib/queries';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';
import type { PostCard as PostCardType } from '@/sanity/types';

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description:
    'Notes on product engineering, shipping fast, and working with international clients.',
  path: '/blog',
});

const PER_PAGE = 6;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  const [{ data: posts }, { data: total }] = await Promise.all([
    sanityFetch({ query: POSTS_QUERY, params: { start, end } }),
    sanityFetch({ query: POSTS_COUNT_QUERY }),
  ]);

  const list = (posts ?? []) as PostCardType[];
  const count = typeof total === 'number' ? total : 0;
  const totalPages = Math.ceil(count / PER_PAGE);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <PageHeader
        eyebrow="Blog"
        title="How I think about building."
        subtitle="Notes on product engineering, shipping, and the business behind the build."
      />

      <Container className="py-12 md:py-16">
        {list.length === 0 ? (
          <div className="rounded-card border-border-strong bg-bg-secondary mx-auto max-w-md border border-dashed p-10 text-center">
            <p className="text-text-primary font-medium">No posts yet.</p>
            <p className="text-text-secondary mt-2 text-sm leading-relaxed">
              The first articles are on the way. Check back soon.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((post, i) => (
                <Reveal key={post._id} delay={i * 0.06}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
            <Pagination current={page} total={totalPages} />
          </>
        )}
      </Container>
    </>
  );
}
