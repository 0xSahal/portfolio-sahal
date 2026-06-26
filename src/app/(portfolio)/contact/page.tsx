import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import ContactTabs from '@/components/features/ContactTabs';
import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { writtenTestimonials } from '@/data/testimonials';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Book a call',
  description:
    "Two ways in: send a brief or pick a time on the calendar. Either way, a 30-minute call to figure out if we're a fit.",
  path: '/contact',
});

const reassurances = [
  'A 30-minute call, no pitch, no obligation',
  'I come prepared, briefed or not',
  "If we're not a fit, I'll point you somewhere better",
];

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Book a call', path: '/contact' },
        ])}
      />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="rounded-pill border-border bg-surface text-text-secondary inline-flex items-center gap-2.5 border px-3.5 py-1.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
              <span className="bg-accent relative inline-flex h-2 w-2 rounded-full" />
            </span>
            {siteConfig.availability}
          </p>

          <h1 className="text-text-primary mt-6 font-serif text-4xl leading-[1.08] font-medium tracking-tight md:text-5xl">
            Let&rsquo;s get started.
          </h1>
          <p className="text-text-secondary mt-5 max-w-md text-lg leading-relaxed">
            Two ways in: send a quick brief so I show up to our call already understanding your
            project, or grab a time on the calendar. Either way, you hear back within one business
            day.
          </p>

          <ul className="mt-8 space-y-3">
            {reassurances.map((r) => (
              <li key={r} className="text-text-secondary flex items-start gap-3">
                <span className="bg-accent-soft text-accent mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <Check size={13} />
                </span>
                {r}
              </li>
            ))}
          </ul>

          {(() => {
            const t = writtenTestimonials[0];
            if (!t) return null;
            return (
              <figure className="rounded-card border-border bg-surface mt-10 border p-6">
                <blockquote className="text-text-primary font-serif text-lg leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="border-border mt-4 flex items-center gap-3 border-t pt-4">
                  <span className="bg-accent-soft text-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    {t.initials}
                  </span>
                  <span className="text-sm">
                    {t.author ? (
                      <span className="text-text-secondary">
                        {t.author}
                        {t.company ? `, ${t.company}` : ''}
                      </span>
                    ) : (
                      <span className="flex flex-col gap-0.5">
                        {t.companyUrl ? (
                          <Link
                            href={t.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-primary decoration-border hover:text-accent hover:decoration-accent font-medium underline underline-offset-2 transition-colors"
                          >
                            {t.company}
                          </Link>
                        ) : (
                          <span className="text-text-primary font-medium">{t.company}</span>
                        )}
                        {t.location && (
                          <span className="text-text-muted text-xs">{t.location}</span>
                        )}
                      </span>
                    )}
                  </span>
                </figcaption>
              </figure>
            );
          })()}
        </div>

        <ContactTabs />
      </div>
    </Container>
  );
}
