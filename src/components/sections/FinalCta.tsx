import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { primaryCta } from '@/config/navigation';

export default function FinalCta() {
  return (
    <Section>
      <Reveal>
        <div className="rounded-card bg-text-primary relative overflow-hidden px-6 py-16 text-center md:px-8 md:py-20">
          <h2 className="text-bg mx-auto max-w-xl font-serif text-3xl leading-tight font-medium tracking-tight md:text-[2.75rem]">
            Let&rsquo;s build the path.
          </h2>
          <p className="text-bg/65 mx-auto mt-4 max-w-md leading-relaxed">
            A 30-minute call. No pitch, no obligation. We&rsquo;ll figure out if it&rsquo;s a fit.
          </p>
          <Link
            href={primaryCta.href}
            className="group rounded-input bg-accent text-on-accent hover:bg-accent-strong mt-9 inline-flex items-center gap-2 px-6 py-3.5 text-base font-medium transition-all duration-200 active:scale-[0.98]"
          >
            {primaryCta.label}
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
