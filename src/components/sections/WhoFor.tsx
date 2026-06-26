import { Check, X } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import { goodFit, notFit } from '@/data/fit';

export default function WhoFor() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Honestly"
        title="Who this is for, and who it isn't."
        intro="I do my best work with the right people. Being upfront saves us both time."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <p className="text-text-primary font-serif text-lg font-medium">A great fit if…</p>
            <ul className="mt-5 space-y-3.5">
              {goodFit.map((item) => (
                <li key={item} className="text-text-secondary flex items-start gap-3 text-[15px]">
                  <span className="bg-accent-soft text-accent mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <Check size={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="h-full">
            <p className="text-text-primary font-serif text-lg font-medium">Probably not if…</p>
            <ul className="mt-5 space-y-3.5">
              {notFit.map((item) => (
                <li key={item} className="text-text-secondary flex items-start gap-3 text-[15px]">
                  <span className="bg-bg-secondary text-text-muted mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <X size={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
