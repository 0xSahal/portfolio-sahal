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

// Real client names shown in the ledger row that closes the hero. All four are
// real, shipped client work (see src/data/showcase.ts). Never pad with fakes.
const clients = ['Veylix Staffing', 'Fairpath Healthcare', 'Vallorex', 'Foxera Studio'];

/** One display line that rises out of an overflow-hidden mask. */
function MaskedLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden">
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
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

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

        {/* Cover headline — two flush-left lines, sized so neither ever rewraps
            on desktop. The line break is the composition; don't let it drift. */}
        <h1 className="text-text-primary pt-12 font-serif text-[clamp(2.25rem,7vw,5.75rem)] leading-[1.04] font-semibold tracking-[-0.035em] md:pt-16">
          <MaskedLine delay={0.15}>Ambiguous idea in.</MaskedLine>
          <MaskedLine delay={0.27}>
            <span className="text-accent">Shipped product</span> out.
          </MaskedLine>
        </h1>

        {/* Deck — a locked two-column composition. The portrait's height is tied
            to the copy column (grid stretch), and the client ledger is pinned to
            the shared baseline, so there is never dead space between them. */}
        <div className="mt-12 grid gap-x-14 gap-y-12 md:mt-16 md:grid-cols-[minmax(0,1fr)_minmax(0,440px)] md:grid-rows-[1fr_auto]">
          {/* Intro + CTAs */}
          <div className="md:col-start-1 md:row-start-1">
            <motion.p
              {...fade(0.5)}
              className="text-text-secondary max-w-lg text-lg leading-relaxed md:text-xl"
            >
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

          {/* Portrait — wipes open left to right, settles, then drifts on scroll.
              Fills the full height of the deck on desktop. */}
          <motion.div
            style={{ y: portraitY }}
            className="relative mx-auto w-full max-w-sm md:col-start-2 md:row-span-2 md:row-start-1 md:m-0 md:h-full md:max-w-none"
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
              className="border-border bg-bg-secondary relative aspect-[4/5] w-full overflow-hidden rounded-2xl border shadow-[0_28px_70px_-32px_rgba(0,0,0,0.55)] md:aspect-auto md:h-full md:min-h-[440px]"
            >
              <motion.div
                initial={reduce ? {} : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
                className="h-full w-full"
              >
                <Image
                  src="/images/portraits/sahal-hero-2.png"
                  alt="Sahal Shaikh, product engineer."
                  fill
                  priority
                  sizes="(max-width: 768px) 88vw, 440px"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Client ledger — closes the copy column on the portrait's baseline. */}
          <div className="relative self-end pt-5 md:col-start-1 md:row-start-2">
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.8 }}
              className="bg-border absolute inset-x-0 top-0 h-px origin-left"
            />
            <motion.p {...fade(0.85)} className="text-text-muted text-sm">
              Recent client work
            </motion.p>
            <div className="text-text-secondary mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 text-sm">
              {clients.map((name, i) => (
                <motion.span
                  key={name}
                  {...fade(0.9 + i * 0.07)}
                  className="flex items-baseline gap-x-3"
                >
                  {i > 0 && (
                    <span aria-hidden className="text-border-strong select-none">
                      /
                    </span>
                  )}
                  <span>{name}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
