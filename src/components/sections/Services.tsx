import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import RailSection from '@/components/ui/RailSection';
import Reveal from '@/components/ui/Reveal';
import { services } from '@/data/services';

// Index-list treatment: each service is a full-width ledger row (numeral, title,
// description) instead of a card. The whole row links to /services.
export default function Services() {
  return (
    <RailSection
      id="services"
      index="03"
      label="What I do"
      title="Three ways I help."
      intro="Different shapes of work, the same goal every time: results that move the business."
    >
      <div className="mt-10 md:mt-14">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.06}>
            <Link
              href="/services"
              className="group border-border grid gap-x-10 gap-y-3 border-t py-8 md:grid-cols-[48px_minmax(0,1.1fr)_minmax(0,1fr)] md:py-10"
            >
              <span className="text-text-muted font-serif text-lg leading-none md:pt-1.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-text-primary group-hover:text-accent font-serif text-2xl font-semibold tracking-tight transition-colors duration-300 md:text-[1.75rem]">
                  {service.title}
                </h3>
                <p className="text-accent mt-2 text-sm font-medium">{service.outcome}</p>
              </div>
              <div className="flex items-start justify-between gap-6">
                <p className="text-text-secondary max-w-md text-[15px] leading-relaxed">
                  {service.description}
                </p>
                <ArrowUpRight
                  size={20}
                  className="text-text-muted group-hover:text-accent mt-0.5 hidden shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:block"
                />
              </div>
            </Link>
          </Reveal>
        ))}
        <div aria-hidden className="border-border border-t" />
      </div>
    </RailSection>
  );
}
