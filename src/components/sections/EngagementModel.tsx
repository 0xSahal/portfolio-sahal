import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { engagement } from '@/data/fit';

export default function EngagementModel() {
  return (
    <Section className="border-border bg-bg-secondary/40 border-y">
      <SectionHeading
        eyebrow="How it works"
        title="Straightforward, by design."
        intro="No hourly billing games, no scope you can't see. Here's how working together actually works."
      />

      <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
        {engagement.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <div className="border-border-strong border-t pt-5">
              <h3 className="text-text-primary font-serif text-xl font-medium">{e.title}</h3>
              <p className="text-text-secondary mt-3 leading-relaxed">{e.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
