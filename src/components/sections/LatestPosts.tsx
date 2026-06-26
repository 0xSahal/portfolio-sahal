import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import PostCard from '@/components/blog/PostCard';
import { sanityFetch } from '@/sanity/lib/live';
import { LATEST_POSTS_QUERY } from '@/sanity/lib/queries';
import type { PostCard as PostCardType } from '@/sanity/types';

export default async function LatestPosts() {
  const { data } = await sanityFetch({ query: LATEST_POSTS_QUERY });
  const posts = (data ?? []) as PostCardType[];

  if (!posts.length) return null;

  return (
    <Section>
      <SectionHeading eyebrow="From the blog" title="How I think about building.">
        <Reveal>
          <Link
            href="/blog"
            className="group text-text-secondary hover:text-text-primary inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors"
          >
            All posts
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </SectionHeading>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post._id} delay={i * 0.07}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
