import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import Principles from '@/components/sections/Principles';
import Capabilities from '@/components/sections/Capabilities';
import Trajectory from '@/components/sections/Trajectory';
import FinalCta from '@/components/sections/FinalCta';
import JsonLd from '@/components/seo/JsonLd';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'I turn ambiguous ideas into products that work, and I care more about your business than your tech stack.',
  path: '/about',
});

const values = [
  {
    title: 'Confidence',
    description: "I'll tell you what I actually think, even when it's not what you hoped to hear.",
  },
  {
    title: 'Clarity',
    description:
      "Clarity is the deliverable. If you're ever unsure where things stand, I've failed.",
  },
  {
    title: 'Trust',
    description: "I'd rather lose a deal than break someone's trust. It's the whole game.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <PageHeader eyebrow="About" title="I care more about your business than your tech stack." />

      <Container className="pt-8 pb-4">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
          <Reveal>
            <div className="relative mx-auto w-full max-w-sm md:mx-0">
              <div className="rounded-card border-accent/25 absolute -inset-3 border" aria-hidden />
              <div className="rounded-card border-border bg-bg-secondary relative aspect-[4/5] w-full overflow-hidden border">
                <Image
                  src="/images/portraits/sahal-headshot.jpg"
                  alt="Portrait of Sahal Shaikh."
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 32vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="text-text-secondary max-w-prose space-y-5 text-lg leading-relaxed">
              <p>
                I became the engineer every team came to when they got stuck: design, SEO, DevOps,
                all of it. Somewhere along the way I realised I was better at making the right call
                than at any single piece of the stack.
              </p>
              <p>
                Today I lead product engineering and take on a small number of independent clients.
                The throughline is the same: I take an ambiguous idea and turn it into something
                real that works, and doesn&rsquo;t need babysitting.
              </p>
              <p className="text-text-primary">
                I optimise for what happens three tasks later, not just the one in front of me. The
                best solutions don&rsquo;t respect layer boundaries, and neither do I.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>

      <Section>
        <SectionHeading eyebrow="What I operate by" title="Three values I don't bend on." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <Card className="h-full">
                <h3 className="text-text-primary font-serif text-xl font-medium">{v.title}</h3>
                <p className="text-text-secondary mt-3 leading-relaxed">{v.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Principles />
      <Capabilities />
      <Trajectory />
      <FinalCta />
    </>
  );
}
