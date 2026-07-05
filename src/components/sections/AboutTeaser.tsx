import Image from 'next/image';
import RailSection from '@/components/ui/RailSection';
import Reveal from '@/components/ui/Reveal';
import CtaButton from '@/components/ui/CtaButton';

export default function AboutTeaser() {
  return (
    <RailSection index="07" label="About">
      <Reveal>
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16">
          <div className="border-border bg-bg-secondary relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl border shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)] md:mx-0">
            <Image
              src="/images/portraits/sahal-candid.png"
              alt="Sahal Shaikh at his laptop, mid-build."
              fill
              sizes="(max-width: 768px) 80vw, 24vw"
              className="object-cover object-center"
            />
          </div>

          <div>
            <p className="text-text-primary font-serif text-2xl leading-snug font-semibold tracking-tight text-balance md:text-3xl">
              I became the person every team (design, SEO, DevOps) came to when they got stuck.
            </p>
            <p className="text-text-secondary mt-5 max-w-xl text-lg leading-relaxed">
              Turns out I was good at more than writing code: I was good at making the right call.
              Now I do that for founders who need a product shipped right.
            </p>
            <CtaButton href="/about" variant="ghost" className="mt-7 text-sm">
              More about me
            </CtaButton>
          </div>
        </div>
      </Reveal>
    </RailSection>
  );
}
