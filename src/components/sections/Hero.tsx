'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import CtaButton from '@/components/ui/CtaButton';
import { siteConfig } from '@/config/site';
import { primaryCta } from '@/config/navigation';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Subtle warm glow for depth — not a gradient surface, just a soft accent */}
      <div
        aria-hidden
        className="bg-accent/[0.07] pointer-events-none absolute -top-32 right-[-10%] h-[460px] w-[460px] rounded-full blur-3xl"
      />

      <Container className="relative grid items-center gap-12 pt-16 pb-20 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:pt-24 md:pb-28">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="rounded-pill border-border bg-surface text-text-secondary inline-flex items-center gap-2.5 border px-3.5 py-1.5 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
              <span className="bg-accent relative inline-flex h-2 w-2 rounded-full" />
            </span>
            {siteConfig.availability}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-text-primary mt-7 max-w-[15ch] font-serif text-[2.75rem] leading-[1.04] font-medium tracking-tight sm:text-5xl md:text-[3.75rem]"
          >
            You know what you want. <span className="text-accent">I build the path</span> to get
            there.
          </motion.h1>

          <motion.p
            variants={item}
            className="text-text-secondary mt-7 max-w-lg text-lg leading-relaxed"
          >
            I&rsquo;m Sahal, a product engineer who turns ambiguous ideas into websites and
            applications that move the business. End to end, from the first call to the final
            deploy.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <CtaButton href={primaryCta.href} size="lg">
              {primaryCta.label}
            </CtaButton>
            <CtaButton href="/work" variant="ghost" size="lg">
              See the work
            </CtaButton>
          </motion.div>
        </motion.div>

        {/* Portrait — temporary photo; swap to the founder intro video when it's ready */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm md:mx-0 md:ml-auto"
        >
          <div className="rounded-card border-accent/25 absolute -inset-3 border" aria-hidden />
          <div className="rounded-card border-border bg-bg-secondary relative aspect-[4/5] w-full overflow-hidden border">
            <Image
              src="/images/portraits/sahal-hero.png"
              alt="Sahal Shaikh, product engineer."
              fill
              priority
              sizes="(max-width: 768px) 80vw, 34vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
