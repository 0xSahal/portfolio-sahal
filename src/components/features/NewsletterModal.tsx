'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { useReCaptcha } from '@/components/features/ReCaptchaProvider';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';
const SUBSCRIBE_RECAPTCHA_ACTION = 'newsletter_subscribe';

// Pages where the modal would be redundant or intrusive: /contact is already a
// conversion surface, and the legal pages are a strange place to pitch a signup.
const EXCLUDED_PREFIXES = ['/contact', '/privacy', '/terms'];

// Show after this much time on site (ms), once conditions below are met.
const SHOW_AFTER_MS = 10_000;
// If dismissed, don't ask again for this many days.
const DISMISS_COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000;

const STORAGE_KEY = 'sahal_newsletter';

interface StoredState {
  subscribed?: boolean;
  dismissedAt?: number;
}

function readState(): StoredState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : {};
  } catch {
    return {};
  }
}

function writeState(next: StoredState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private browsing / storage disabled — fail silently, just means the
    // modal may show again next visit. Not worth breaking the page over.
  }
}

function shouldOffer(): boolean {
  const state = readState();
  if (state.subscribed) return false;
  if (state.dismissedAt && Date.now() - state.dismissedAt < DISMISS_COOLDOWN_MS) return false;
  return true;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function NewsletterModal() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { ready: recaptchaReady, executeRecaptcha } = useReCaptcha();

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const excluded = EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  // The modal never renders on an excluded page, regardless of `visible` —
  // derived here so a navigation mid-open closes it declaratively instead of
  // needing an effect to reach back in and flip state.
  const shown = visible && !excluded;

  const dismiss = useCallback(() => {
    writeState({ ...readState(), dismissedAt: Date.now() });
    setVisible(false);
  }, []);

  // Start the one-shot site-wide dwell timer. This component lives in the
  // shared portfolio layout, which the App Router does not remount between
  // page navigations, so this genuinely measures time on the site, not
  // time on any single page.
  useEffect(() => {
    if (!shouldOffer()) return;
    const timer = window.setTimeout(() => {
      if (shouldOffer()) setVisible(true);
    }, SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shown) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => emailRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [shown, dismiss]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (website) {
      // Honeypot tripped — pretend it worked, don't tell the bot why not.
      setStatus('done');
      return;
    }

    setStatus('submitting');

    let recaptchaToken: string | undefined;
    if (RECAPTCHA_SITE_KEY) {
      if (!recaptchaReady) {
        setError('Verification is still loading. Please try again in a moment.');
        setStatus('error');
        return;
      }
      const token = await executeRecaptcha(SUBSCRIBE_RECAPTCHA_ACTION);
      if (!token) {
        setError('Verification failed. Please try again.');
        setStatus('error');
        return;
      }
      recaptchaToken = token;
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website, recaptchaToken }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setError(json?.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      writeState({ ...readState(), subscribed: true });
      setStatus('done');
      window.setTimeout(() => setVisible(false), 3200);
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {shown && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            aria-hidden
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-text-primary/40 absolute inset-0 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-modal-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="border-border bg-surface relative w-full max-w-md overflow-hidden rounded-2xl border shadow-[0_28px_70px_-32px_rgba(0,0,0,0.55)]"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="text-text-muted hover:text-text-primary hover:bg-bg-secondary absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            >
              <X size={17} />
            </button>

            <div className="p-8 md:p-9">
              {status === 'done' ? (
                <div className="py-2 text-center">
                  <span className="bg-accent-soft text-accent mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                    <Check size={22} />
                  </span>
                  <h2 className="text-text-primary mt-5 font-serif text-xl font-semibold tracking-tight">
                    You&rsquo;re on the list.
                  </h2>
                  <p className="text-text-secondary mt-2 text-sm leading-relaxed">
                    I&rsquo;ll send you something worth reading, not just noise.
                  </p>
                </div>
              ) : (
                <>
                  <span aria-hidden className="bg-accent block h-px w-8" />
                  <h2
                    id="newsletter-modal-title"
                    className="text-text-primary mt-5 font-serif text-2xl leading-snug font-semibold tracking-tight"
                  >
                    Glad you&rsquo;re still here.
                  </h2>
                  <p className="text-text-secondary mt-3 text-[15px] leading-relaxed">
                    Occasional notes on shipping products. No spam, nothing else.
                  </p>

                  <form onSubmit={onSubmit} className="mt-6" noValidate>
                    <div
                      aria-hidden
                      className="absolute left-[-9999px]"
                      style={{ height: 0, overflow: 'hidden' }}
                    >
                      <label>
                        Website
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                        />
                      </label>
                    </div>

                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        ref={emailRef}
                        id="newsletter-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-border bg-bg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-accent/30 rounded-input w-full border px-4 py-2.5 text-sm transition-colors focus:ring-2 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="group bg-text-primary text-bg rounded-input inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-12px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_14px_32px_-12px_rgba(0,0,0,0.4)] active:scale-[0.98] disabled:opacity-60"
                      >
                        {status === 'submitting' ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <>
                            Keep me posted
                            <ArrowRight
                              size={15}
                              className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                          </>
                        )}
                      </button>
                    </div>
                    {error && <p className="mt-2.5 text-xs text-red-500">{error}</p>}
                    <p className="text-text-muted mt-3 text-xs leading-relaxed">
                      No spam. Reply to any email to unsubscribe.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
