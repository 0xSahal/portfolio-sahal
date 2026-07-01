import RailSection from '@/components/ui/RailSection';
import Reveal from '@/components/ui/Reveal';
import { processSteps } from '@/data/process';

export default function Process() {
  return (
    <RailSection index="04" label="How it works" title="Clarity from day one.">
      <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
        {processSteps.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.07}>
            <div className="border-border relative border-t pt-6">
              {/* Amber tick on the rule — the ledger's highlight mark. */}
              <span aria-hidden className="bg-accent absolute -top-px left-0 h-px w-8" />
              <span className="text-text-muted font-serif text-lg">
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
    </RailSection>
  );
}
