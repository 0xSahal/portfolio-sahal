import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import DynIcon from '@/components/ui/DynIcon';
import { skills } from '@/data/skills';

export default function Capabilities() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Where I go deep"
        title="Range, with depth where it counts."
        intro="I work across the stack because the best solutions don't respect layer boundaries."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {skills.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.08}>
            <Card className="h-full">
              <span className="rounded-input bg-accent-soft text-accent flex h-11 w-11 items-center justify-center">
                <DynIcon name={cat.icon} size={20} />
              </span>
              <h3 className="text-text-primary mt-5 font-serif text-lg font-medium">{cat.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-pill border-border text-text-secondary border px-2.5 py-0.5 text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
