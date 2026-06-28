'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import CtaButton from '@/components/ui/CtaButton';
import { siteConfig } from '@/config/site';
import { primaryCta } from '@/config/navigation';

// Ease-out-expo: long, confident decelerations. The whole hero settles rather
// than pops, which is what reads as "premium" instead of "generic fade-up".
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Subtle scroll parallax: the portrait drifts up a touch as you scroll past.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -56]);

  const enter = (delay: number): Variants => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE, delay } },
  });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <Container className="pt-8 pb-16 md:pt-10 md:pb-24">
        {/* Masthead meta — kept. The hairline draws itself in. */}
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

        <div className="grid items-center gap-12 pt-14 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:pt-24">
          {/* Type column */}
          <div>
            <motion.h1
              variants={enter(0.15)}
              initial="hidden"
              animate="show"
              className="text-text-primary font-serif text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.0] font-semibold tracking-[-0.03em]"
            >
              Ambiguous idea in.
              <br />
              <span className="text-accent">Shipped product</span> out.
            </motion.h1>

            <motion.p
              variants={enter(0.42)}
              initial="hidden"
              animate="show"
              className="text-text-secondary mt-7 max-w-md text-lg leading-relaxed"
            >
              I&rsquo;m Sahal. Founders bring me the half-formed version, the messy brief, the thing
              that has been stuck in a doc for months. I turn it into a website or product that
              ships and moves the business. One person, the whole way through.
            </motion.p>

            <motion.div
              variants={enter(0.56)}
              initial="hidden"
              animate="show"
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

          {/* Portrait — clip-wipe reveal, settle-in scale, scroll parallax, sharp frame */}
          <motion.div
            style={{ y: portraitY }}
            className="relative mx-auto w-full max-w-sm md:mx-0 md:ml-auto md:max-w-none"
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
              className="border-border bg-bg-secondary relative aspect-[4/5] w-full overflow-hidden rounded-2xl border shadow-[0_28px_70px_-32px_rgba(0,0,0,0.55)]"
            >
              <motion.div
                initial={reduce ? {} : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: EASE, delay: 0.25 }}
                className="h-full w-full"
              >
                <Image
                  src="/images/portraits/sahal-hero.png"
                  alt="Sahal Shaikh, product engineer."
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 42vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
