import Image from 'next/image';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import CtaButton from '@/components/ui/CtaButton';

export default function AboutTeaser() {
  return (
    <Section className="border-border bg-bg-secondary/40 border-y">
      <Reveal>
        <div className="grid items-center gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-14">
          <div className="relative mx-auto w-full max-w-xs md:mx-0">
            <div className="rounded-card border-accent/25 absolute -inset-3 border" aria-hidden />
            <div className="rounded-card border-border bg-bg-secondary relative aspect-square w-full overflow-hidden border">
              <Image
                src="/images/portraits/sahal-candid.png"
                alt="Sahal Shaikh at his laptop, mid-build."
                fill
                sizes="(max-width: 768px) 80vw, 24vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="bg-accent h-px w-6" aria-hidden />
              <span className="text-accent text-xs font-medium tracking-[0.16em] uppercase">
                The short version
              </span>
            </div>
            <p className="text-text-primary mt-5 font-serif text-2xl leading-snug font-medium tracking-tight md:text-[1.875rem]">
              I became the person every team (design, SEO, DevOps) came to when they got stuck.
            </p>
            <p className="text-text-secondary mt-4 max-w-xl leading-relaxed">
              Turns out I was good at more than writing code: I was good at making the right call.
              Now I do that for founders who need a product shipped right.
            </p>
            <CtaButton href="/about" variant="ghost" className="mt-6 text-sm">
              More about me
            </CtaButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
