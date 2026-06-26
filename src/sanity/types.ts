import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/react';

// Hand-written result types for the GROQ queries in lib/queries.ts. (When you
// later run `sanity typegen`, these can be replaced by generated types.)

export interface PostAuthor {
  name: string;
  slug: string;
  image?: SanityImageSource & { alt?: string };
  bio?: string;
}

export interface PostCategory {
  title: string;
  slug: string;
}

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  featured?: boolean;
  coverImage?: SanityImageSource & { alt?: string };
  category?: PostCategory | null;
  author?: PostAuthor | null;
}

export interface PostFull extends Omit<PostCard, 'featured'> {
  metaTitle?: string;
  metaDescription?: string;
  body?: PortableTextBlock[];
}
