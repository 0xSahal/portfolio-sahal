'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { primaryCta } from '@/config/navigation';
import { cn } from '@/lib/utils';

// Sticky bottom CTA on mobile — always thumb-reachable. Appears after the hero.
export default function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'border-border bg-bg/95 fixed inset-x-0 bottom-0 z-40 border-t px-4 pt-3 transition-transform duration-300 md:hidden',
        show ? 'translate-y-0' : 'translate-y-full',
      )}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <Link
        href={primaryCta.href}
        className="rounded-input bg-text-primary text-bg block px-5 py-3.5 text-center text-base font-medium shadow-lg"
      >
        {primaryCta.label}
      </Link>
    </div>
  );
}
