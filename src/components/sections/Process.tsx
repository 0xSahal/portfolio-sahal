import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { processSteps } from '@/data/process';

export default function Process() {
  return (
    <Section className="border-border bg-bg-secondary/40 border-y">
      <SectionHeading eyebrow="How it works" title="Clarity from day one." />

      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.08}>
            <div className="border-border-strong border-t pt-5">
              <span className="text-accent font-serif text-2xl font-medium">
                {String(s.step).padStart(2, '0')}
              </span>
              <h3 className="text-text-primary mt-3 text-lg font-medium">{s.title}</h3>
              <p className="text-text-secondary mt-2 text-[15px] leading-relaxed">
                {s.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
