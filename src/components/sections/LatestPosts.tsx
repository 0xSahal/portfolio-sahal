import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import RailSection from '@/components/ui/RailSection';
import Reveal from '@/components/ui/Reveal';
import { urlFor } from '@/sanity/lib/image';
import { formatDate } from '@/lib/blog';
import { sanityFetch } from '@/sanity/lib/live';
import { LATEST_POSTS_QUERY } from '@/sanity/lib/queries';
import type { PostCard as PostCardType } from '@/sanity/types';

// Homepage-only editorial post entries: rounded media (photos may round), flat
// text below with a hairline rule. The boxed PostCard stays on /blog.
function PostEntry({ post }: { post: PostCardType }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="bg-bg-secondary border-border relative aspect-[16/9] overflow-hidden rounded-xl border">
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).width(800).height(450).fit('crop').auto('format').url()}
            alt={post.coverImage.alt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="bg-accent-soft flex h-full items-center justify-center">
            <span className="text-accent/40 font-serif text-2xl">{post.title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="border-border mt-5 border-t pt-4">
        <div className="flex items-baseline gap-3 text-sm">
          {post.category && <span className="text-accent font-medium">{post.category.title}</span>}
          <span className="text-text-muted">{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className="text-text-primary group-hover:text-accent mt-3 font-serif text-xl leading-snug font-semibold tracking-tight transition-colors duration-300">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-text-secondary mt-2 line-clamp-2 text-sm leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export default async function LatestPosts() {
  const { data } = await sanityFetch({ query: LATEST_POSTS_QUERY });
  const posts = (data ?? []) as PostCardType[];

  if (!posts.length) return null;

  return (
    <RailSection
      index="08"
      label="Writing"
      title="How I think about building."
      action={
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
      }
    >
      <div className="mt-10 grid gap-x-8 gap-y-12 md:mt-12 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post._id} delay={i * 0.07}>
            <PostEntry post={post} />
          </Reveal>
        ))}
      </div>
    </RailSection>
  );
}
