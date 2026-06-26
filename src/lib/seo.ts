import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

const DEFAULT_OG = '/images/og-image.jpg';

interface PageMetadataInput {
  /** Becomes the <title>; the root layout's template appends `| Sahal Shaikh`. */
  title: string;
  /** Meta description; under ~155 chars renders cleanly in Google. */
  description: string;
  /** Site-relative path, e.g. '/work'. Used for canonical + og:url. */
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

// Builds canonical + OG/Twitter for a page, layered on top of the root metadata.
export function pageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG,
  ogType = 'website',
  noIndex = false,
}: PageMetadataInput): Metadata {
  const headline = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: headline,
      description,
      url: path,
      type: ogType,
      siteName: siteConfig.name,
      locale: 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: headline }],
    },
    twitter: {
      card: 'summary_large_image',
      title: headline,
      description,
      images: [ogImage],
    },
  };
}

// Person + WebSite schema for the root layout (applies site-wide). Linked by
// @id so the WebSite's publisher resolves to the Person without duplication.
export function rootJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
        name: siteConfig.name,
        jobTitle: 'Independent Product Engineer',
        description: siteConfig.description,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/sahal-hero.jpg`,
        email: `mailto:${siteConfig.contact.email}`,
        sameAs: [siteConfig.social.linkedin].filter(Boolean),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { '@id': `${siteConfig.url}/#person` },
        inLanguage: 'en-US',
      },
    ],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

// Used on /services. Marks Sahal as a service provider with a defined offering.
export function professionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/services#service`,
    name: `${siteConfig.name} Consulting`,
    description:
      'Independent product engineering for founders and teams: websites, web applications, and end-to-end product delivery.',
    provider: { '@id': `${siteConfig.url}/#person` },
    url: `${siteConfig.url}/services`,
    areaServed: 'Worldwide',
    serviceType: [
      'Website development',
      'Web application development',
      'Product engineering',
      'Conversion optimization',
    ],
  };
}

// FAQ pages can mark up Q&A pairs. Use only on the single page where the FAQ
// is the primary content (avoids competing markup signals across pages).
export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
