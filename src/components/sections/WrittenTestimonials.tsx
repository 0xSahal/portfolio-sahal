import Link from 'next/link';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import { writtenTestimonials } from '@/data/testimonials';

export default function WrittenTestimonials() {
  return (
    <Section className="border-border bg-bg-secondary/40 border-t">
      <SectionHeading eyebrow="More words" title="And a few more, in writing." />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {writtenTestimonials.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.08}>
            <Card className="flex h-full flex-col">
              <blockquote className="text-text-primary flex-1 font-serif text-lg leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="border-border mt-6 flex items-center gap-3 border-t pt-5">
                <span className="bg-accent-soft text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                  {t.initials}
                </span>
                <div>
                  {t.author ? (
                    <>
                      <p className="text-text-primary text-sm font-medium">{t.author}</p>
                      <p className="text-text-secondary text-sm">
                        {[t.role, t.company].filter(Boolean).join(', ')}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-text-primary text-sm font-medium">
                        {t.companyUrl ? (
                          <Link
                            href={t.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="decoration-border hover:text-accent hover:decoration-accent underline underline-offset-2 transition-colors"
                          >
                            {t.company}
                          </Link>
                        ) : (
                          t.company
                        )}
                      </p>
                      {t.location && <p className="text-text-muted mt-0.5 text-xs">{t.location}</p>}
                    </>
                  )}
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
