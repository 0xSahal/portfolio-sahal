import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from '@portabletext/react';
import type { SanityImageSource } from '@sanity/image-url';

import { urlFor } from '@/sanity/lib/image';
import { headingId } from '@/lib/blog';
import CopyButton from '@/components/blog/CopyButton';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-text-secondary mt-6 leading-[1.8]">{children}</p>,
    h2: ({ children, value }) => (
      <h2
        id={headingId(value)}
        className="text-text-primary mt-14 mb-4 scroll-mt-24 font-serif text-2xl font-medium tracking-tight md:text-3xl"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={headingId(value)}
        className="text-text-primary mt-10 mb-3 scroll-mt-24 font-serif text-xl font-medium tracking-tight md:text-2xl"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-text-primary mt-8 mb-2 scroll-mt-24 text-lg font-semibold">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-accent text-text-primary my-8 border-l-2 pl-6 font-serif text-xl leading-relaxed italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 space-y-2.5 pl-1">{children}</ul>,
    number: ({ children }) => (
      <ol className="text-text-secondary marker:text-text-muted mt-6 list-decimal space-y-2.5 pl-5">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-text-secondary flex gap-3 leading-[1.75]">
        <span className="bg-accent mt-2.5 h-1 w-1 shrink-0 rounded-full" aria-hidden />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="leading-[1.75]">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-text-primary font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-bg-secondary text-text-primary rounded px-1.5 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? '#';
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-accent decoration-accent/30 hover:decoration-accent font-medium underline underline-offset-2 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const img = value as SanityImageSource & { alt?: string; caption?: string };
      const url = urlFor(img).width(1600).fit('max').auto('format').url();
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={img.alt ?? ''}
            loading="lazy"
            className="rounded-card border-border w-full border"
          />
          {img.caption && (
            <figcaption className="text-text-muted mt-3 text-center text-sm">
              {img.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => {
      const block = value as { code?: string; language?: string };
      const code = block.code ?? '';
      return (
        <div className="group relative my-8">
          {block.language && block.language !== 'text' && (
            <span className="text-text-muted absolute top-3 left-4 text-[10px] font-medium tracking-[0.14em] uppercase">
              {block.language}
            </span>
          )}
          <CopyButton text={code} />
          <pre className="rounded-card border-border bg-bg-secondary overflow-x-auto border p-5 pt-9 text-sm leading-relaxed">
            <code className="text-text-primary font-mono">{code}</code>
          </pre>
        </div>
      );
    },
  },
};

export default function PortableTextBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
