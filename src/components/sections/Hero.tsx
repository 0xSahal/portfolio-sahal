'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import CtaButton from '@/components/ui/CtaButton';
import { siteConfig } from '@/config/site';
import { primaryCta } from '@/config/navigation';

// Ease-out-expo: long, confident decelerations. The whole hero settles rather
// than pops, which is what reads as "premium" instead of "generic fade-up".
const EASE = [0.16, 1, 0.3, 1] as const;

// Real client names shown in the ledger row under the hero. All four are real,
// shipped client work (see src/data/showcase.ts). Never pad with fakes.
const clients = ['Veylix Staffing', 'Fairpath Healthcare', 'Vallorex', 'Foxera Studio'];

/** One display line that rises out of an overflow-hidden mask. */
function MaskedLine({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className ?? ''}`}>
      <motion.span
        className="block"
        initial={reduce ? { opacity: 0 } : { y: '110%' }}
        animate={reduce ? { opacity: 1 } : { y: '0%' }}
        transition={{ duration: 0.95, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Subtle scroll parallax: the portrait drifts up a touch as you scroll past.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -48]);

  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <Container className="pt-8 pb-14 md:pt-10 md:pb-20">
        {/* Masthead meta — the hairline draws itself in. */}
        <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-1 pb-4 text-sm">
          <motion.span
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-text-secondary"
          >
            Independent product engineer
          </motion.span>
          <motion.span
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="text-text-muted"
          >
            {siteConfig.availability}
          </motion.span>
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="bg-border absolute inset-x-0 bottom-0 h-px origin-left"
          />
        </div>

        {/* Cover headline — full measure, second line steps in like set type. */}
        <h1 className="text-text-primary pt-12 font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[1.02] font-semibold tracking-[-0.035em] md:pt-16">
          <MaskedLine delay={0.15}>Ambiguous idea in.</MaskedLine>
          <MaskedLine delay={0.27} className="pl-[6%] sm:pl-[10%]">
            <span className="text-accent">Shipped product</span> out.
          </MaskedLine>
        </h1>

        {/* Lower deck: intro + CTAs beside the portrait. */}
        <div className="mt-12 grid items-start gap-x-16 gap-y-12 md:mt-16 md:grid-cols-[minmax(0,1fr)_minmax(0,400px)]">
          <div className="max-w-md md:pt-4">
            <motion.p {...fade(0.5)} className="text-text-secondary text-lg leading-relaxed">
              I&rsquo;m Sahal. Founders bring me the half-formed version, the messy brief, the thing
              that has been stuck in a doc for months. I turn it into a website or product that
              ships and moves the business. One person, the whole way through.
            </motion.p>

            <motion.div
              {...fade(0.62)}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <CtaButton href={primaryCta.href} size="lg">
                {primaryCta.label}
              </CtaButton>
              <CtaButton href="/work" variant="ghost" size="lg">
                See the work
              </CtaButton>
            </motion.div>
          </div>

          {/* Portrait — clip-wipe reveal, settle-in scale, scroll parallax. */}
          <motion.div
            style={{ y: portraitY }}
            className="relative mx-auto w-full max-w-sm md:mx-0 md:ml-auto md:max-w-none"
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="border-border bg-bg-secondary relative aspect-[4/5] w-full overflow-hidden rounded-2xl border shadow-[0_28px_70px_-32px_rgba(0,0,0,0.55)]"
            >
              <motion.div
                initial={reduce ? {} : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
                className="h-full w-full"
              >
                <Image
                  src="/images/portraits/sahal-hero.png"
                  alt="Sahal Shaikh, product engineer."
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 36vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Client ledger — real names, quiet type. Replaces the old proof strip. */}
        <motion.div {...fade(0.78)} className="relative mt-14 pt-5 md:mt-16">
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.8 }}
            className="bg-border absolute inset-x-0 top-0 h-px origin-left"
          />
          <div className="text-text-secondary flex flex-wrap items-baseline gap-x-3 gap-y-1.5 text-sm">
            <span className="text-text-muted mr-3">Recent client work</span>
            {clients.map((name, i) => (
              <span key={name} className="flex items-baseline gap-x-3">
                {i > 0 && (
                  <span aria-hidden className="text-border-strong select-none">
                    /
                  </span>
                )}
                <span>{name}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
