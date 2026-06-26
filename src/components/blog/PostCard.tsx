import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { urlFor } from '@/sanity/lib/image';
import { formatDate } from '@/lib/blog';
import type { PostCard as PostCardType } from '@/sanity/types';

export default function PostCard({ post }: { post: PostCardType }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-card border-border bg-surface hover:border-border-strong flex h-full flex-col overflow-hidden border transition-colors"
    >
      <div className="bg-bg-secondary relative aspect-[16/9] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).width(800).height(450).fit('crop').auto('format').url()}
            alt={post.coverImage.alt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="bg-accent-soft flex h-full items-center justify-center">
            <span className="text-accent/40 font-serif text-2xl">{post.title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 text-xs">
          {post.category && (
            <span className="text-accent font-medium tracking-wide uppercase">
              {post.category.title}
            </span>
          )}
          <span className="text-text-muted">{formatDate(post.publishedAt)}</span>
        </div>
        <h2 className="text-text-primary mt-4 font-serif text-xl leading-snug font-medium">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-text-secondary mt-3 flex-1 text-sm leading-relaxed">{post.excerpt}</p>
        )}
        <span className="text-text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
          Read{' '}
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
