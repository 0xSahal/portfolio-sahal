import { Check } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import DynIcon from '@/components/ui/DynIcon';
import { services } from '@/data/services';

export default function ServicesDetail() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What I do"
        title="Three ways I help, all pointed at the same thing: results."
      />

      <div className="mt-14 flex flex-col gap-6">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.06}>
            <Card className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:p-9">
              <div>
                <span className="rounded-input bg-accent-soft text-accent flex h-12 w-12 items-center justify-center">
                  <DynIcon name={service.icon} size={22} />
                </span>
                <h3 className="text-text-primary mt-6 font-serif text-2xl font-medium">
                  {service.title}
                </h3>
                <p className="text-accent mt-1.5 text-sm font-medium">{service.outcome}</p>
                <p className="text-text-secondary mt-4 max-w-md leading-relaxed">
                  {service.description}
                </p>
              </div>

              {service.includes && (
                <div className="md:border-border md:border-l md:pl-8">
                  <p className="text-text-muted text-xs font-medium tracking-[0.12em] uppercase">
                    What&rsquo;s included
                  </p>
                  <ul className="mt-4 space-y-3">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="text-text-secondary flex items-start gap-3 text-[15px]"
                      >
                        <Check size={17} className="text-accent mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
