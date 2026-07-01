import RailSection from '@/components/ui/RailSection';
import Reveal from '@/components/ui/Reveal';
import { differentiators } from '@/data/differentiators';

// Two flat statements with the amber tick motif. No icon tiles, no boxes.
export default function WhyMe() {
  return (
    <RailSection index="05" label="Why me" title="Why founders keep coming back.">
      <div className="mt-10 grid gap-x-10 gap-y-10 md:mt-14 md:grid-cols-2">
        {differentiators.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.08}>
            <div className="border-border relative border-t pt-6">
              <span aria-hidden className="bg-accent absolute -top-px left-0 h-px w-8" />
              <h3 className="text-text-primary font-serif text-xl font-semibold tracking-tight md:text-2xl">
                {d.title}
              </h3>
              <p className="text-text-secondary mt-3 max-w-md leading-relaxed">{d.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </RailSection>
  );
}
