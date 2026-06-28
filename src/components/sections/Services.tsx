import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { services } from '@/data/services';

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What I do"
        title="Three ways I help."
        intro="Different shapes of work, the same goal every time: results that move the business."
      />

      <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.08}>
            <div className="border-border hover:border-accent border-t pt-6 transition-colors duration-300">
              <p className="text-accent text-sm font-medium">{service.outcome}</p>
              <h3 className="text-text-primary mt-3 font-serif text-2xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="text-text-secondary mt-4 text-[15px] leading-relaxed">
                {service.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
