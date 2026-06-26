import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import DynIcon from '@/components/ui/DynIcon';
import { differentiators } from '@/data/differentiators';

export default function WhyMe() {
  return (
    <Section>
      <SectionHeading eyebrow="Why me" title="Why founders keep coming back." />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {differentiators.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.08}>
            <Card className="flex h-full gap-5">
              <span className="rounded-input bg-accent-soft text-accent flex h-12 w-12 shrink-0 items-center justify-center">
                <DynIcon name={d.icon} size={22} />
              </span>
              <div>
                <h3 className="text-text-primary font-serif text-xl font-medium">{d.title}</h3>
                <p className="text-text-secondary mt-3 leading-relaxed">{d.description}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
