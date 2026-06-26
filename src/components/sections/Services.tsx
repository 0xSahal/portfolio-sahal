import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import DynIcon from '@/components/ui/DynIcon';
import { services } from '@/data/services';

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What I do"
        title="Three ways I help, all pointed at the same thing: results."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.08}>
            <Card className="flex h-full flex-col">
              <span className="rounded-input bg-accent-soft text-accent flex h-12 w-12 items-center justify-center">
                <DynIcon name={service.icon} size={22} />
              </span>
              <h3 className="text-text-primary mt-6 font-serif text-xl font-medium">
                {service.title}
              </h3>
              <p className="text-accent mt-1.5 text-sm font-medium">{service.outcome}</p>
              <p className="text-text-secondary mt-4 text-[15px] leading-relaxed">
                {service.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
