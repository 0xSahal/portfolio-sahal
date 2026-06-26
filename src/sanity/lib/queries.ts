import { defineQuery } from 'next-sanity';

// Shared projection for post cards (list + related).
const POST_CARD_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  coverImage,
  "category": category->{ title, "slug": slug.current },
  "author": author->{ name, "slug": slug.current, image }
`;

// Paginated, newest-first list of published posts.
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  | order(publishedAt desc) [$start...$end] {
    ${POST_CARD_FIELDS}
  }
`);

// Total count, for building the pagination UI.
export const POSTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "post" && defined(slug.current)])
`);

// A single post by slug, with full body and author bio.
export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    metaTitle,
    metaDescription,
    body,
    "category": category->{ title, "slug": slug.current },
    "author": author->{ name, "slug": slug.current, image, bio }
  }
`);

// Other recent posts (excluding the current one) for the "Read next" section.
export const RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && slug.current != $slug]
  | order(publishedAt desc) [0...2] {
    ${POST_CARD_FIELDS}
  }
`);

// Three most recent posts for the homepage teaser strip.
export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  | order(publishedAt desc) [0...3] {
    ${POST_CARD_FIELDS}
  }
`);

// All slugs, for generateStaticParams.
export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);

// Slugs + last-modified timestamps for sitemap.xml.
export const POSTS_SITEMAP_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": _updatedAt
  }
`);
