import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import { primaryCta } from '@/config/navigation';
import { siteConfig } from '@/config/site';

// The closing plate: full-bleed ink, left-aligned display type. Not a rounded
// box floating in padding — the page ends on a committed, edge-to-edge moment.
export default function FinalCta() {
  return (
    <section className="bg-text-primary mt-16 md:mt-24">
      <Container className="py-24 md:py-32">
        <Reveal>
          <span aria-hidden className="bg-accent block h-px w-10" />
          <h2 className="text-bg mt-8 max-w-3xl font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
            Let&rsquo;s build the path.
          </h2>
          <p className="text-bg/65 mt-6 max-w-md text-lg leading-relaxed">
            A 30-minute call. No pitch, no obligation. We&rsquo;ll figure out if it&rsquo;s a fit.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={primaryCta.href}
              className="group rounded-input bg-accent text-on-accent hover:bg-accent-strong inline-flex items-center gap-2 px-7 py-4 text-base font-medium transition-all duration-200 active:scale-[0.98]"
            >
              {primaryCta.label}
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="link-underline text-bg/70 hover:text-bg text-[15px] transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
