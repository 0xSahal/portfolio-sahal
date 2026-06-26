import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { principles } from '@/data/principles';

export default function Principles() {
  return (
    <Section className="border-border bg-bg-secondary/40 border-y">
      <SectionHeading eyebrow="How I work" title="Four things I hold to." />

      <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <div className="border-border-strong flex gap-5 border-t pt-5">
              <span className="text-accent font-serif text-2xl font-medium">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-text-primary text-lg font-medium">{p.title}</h3>
                <p className="text-text-secondary mt-2 leading-relaxed">{p.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
