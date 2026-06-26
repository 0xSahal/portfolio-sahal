import type { ReactNode } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import type { LegalDocument } from '@/data/legal';

const linkClass =
  'font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent';

// Matches markdown-style links: [label](href). href may be internal (/path),
// external (https://...), or mailto:.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  LINK.lastIndex = 0;

  while ((m = LINK.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const label = m[1] ?? '';
    const href = m[2] ?? '';
    const key = `${keyPrefix}-${i++}`;

    if (href.startsWith('/')) {
      nodes.push(
        <Link key={key} href={href} className={linkClass}>
          {label}
        </Link>,
      );
    } else {
      const external = href.startsWith('http');
      nodes.push(
        <a
          key={key}
          href={href}
          className={linkClass}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function LegalDoc({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={doc.title} subtitle={doc.subtitle} />
      <Container className="pb-20 md:pb-28">
        <div className="max-w-2xl">
          <p className="text-text-muted text-sm">Last updated: {doc.lastUpdated}</p>

          <div className="mt-10 space-y-10">
            {doc.sections.map((section, si) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-text-primary font-serif text-2xl font-medium tracking-tight">
                  {section.heading}
                </h2>
                {section.blocks.map((block, bi) => {
                  const key = `${si}-${bi}`;
                  if (block.type === 'ul') {
                    return (
                      <ul
                        key={key}
                        className="text-text-secondary marker:text-accent list-disc space-y-2 pl-5 leading-relaxed"
                      >
                        {block.items.map((item, ii) => (
                          <li key={ii}>{renderInline(item, `${key}-${ii}`)}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={key} className="text-text-secondary leading-relaxed">
                      {renderInline(block.text, key)}
                    </p>
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
