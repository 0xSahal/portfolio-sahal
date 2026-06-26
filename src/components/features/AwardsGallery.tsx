'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Award } from '@/types';

export default function AwardsGallery({ awards }: { awards: Award[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = active !== null;
  const multiple = awards.length > 1;

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % awards.length)),
    [awards.length],
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + awards.length) % awards.length)),
    [awards.length],
  );

  // Keyboard controls + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, next, prev]);

  const activeAward = active !== null ? awards[active] : null;
  const fade = { duration: reduce ? 0 : 0.2 };
  const pop = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.96 },
      };

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-6">
        {awards.map((a, i) => (
          <figure key={a.title} className="flex flex-col">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Enlarge ${a.title} certificate`}
              className="group rounded-input border-border focus-visible:ring-accent/40 relative overflow-hidden border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none"
            >
              <Image
                src={a.image}
                alt={a.title}
                width={a.width}
                height={a.height}
                className="h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] sm:h-52"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/15">
                <span className="rounded-pill text-text-primary flex items-center gap-1.5 bg-white/95 px-3 py-1.5 text-xs font-medium opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 size={13} />
                  Enlarge
                </span>
              </span>
            </button>
            <figcaption className="text-text-secondary mt-2.5 text-xs">
              <span className="text-text-primary font-medium">{a.title}</span>
              {a.detail ? ` · ${a.detail}` : ''}
            </figcaption>
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && activeAward && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeAward.title} certificate`}
            onClick={close}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden />

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
            >
              <X size={20} />
            </button>

            {multiple && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous certificate"
                  className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none sm:left-6"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next certificate"
                  className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none sm:right-6"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <motion.figure
              key={activeAward.title}
              className="relative z-[1] flex max-w-5xl flex-col items-center"
              {...pop}
              transition={fade}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeAward.image}
                alt={activeAward.title}
                width={activeAward.width}
                height={activeAward.height}
                priority
                sizes="(max-width: 768px) 90vw, 80vw"
                className="h-auto max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
              <figcaption className="mt-4 text-center text-sm text-white/75">
                <span className="font-medium text-white">{activeAward.title}</span>
                {activeAward.detail ? ` · ${activeAward.detail}` : ''}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
