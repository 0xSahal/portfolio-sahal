import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import CtaButton from '@/components/ui/CtaButton';
import { outcomes } from '@/data/outcomes';

export default function FeaturedWork() {
  return (
    <Section className="border-border bg-bg-secondary/40 border-y">
      <SectionHeading
        eyebrow="Selected results"
        title="The work speaks first."
        intro="A few results I've shipped. Some details are anonymized. Client confidentiality comes first, always."
      >
        <CtaButton href="/work" variant="ghost" className="shrink-0 text-sm">
          See all work
        </CtaButton>
      </SectionHeading>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {outcomes.map((o, i) => (
          <Reveal key={o.id} delay={i * 0.08}>
            <Card className="flex h-full flex-col">
              <p className="text-text-muted text-xs font-medium tracking-[0.12em] uppercase">
                {o.category}
              </p>
              <p className="text-text-primary mt-4 flex-1 leading-relaxed">{o.summary}</p>
              <div className="border-border mt-7 border-t pt-5">
                <p className="text-accent font-serif text-[2.5rem] leading-none font-medium">
                  {o.metricValue}
                </p>
                <p className="text-text-secondary mt-2 text-sm">{o.metricLabel}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
