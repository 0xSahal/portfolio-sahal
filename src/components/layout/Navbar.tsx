'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { navLinks, primaryCta } from '@/config/navigation';
import ThemeToggle from '@/components/features/ThemeToggle';
import Container from '@/components/ui/Container';
import Logo from '@/components/layout/Logo';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-border bg-bg/95 border-b backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Sahal, home" className="shrink-0">
          <Logo className="text-[1.75rem]" blink />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-text-secondary hover:text-text-primary text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href={primaryCta.href}
            className="rounded-input bg-text-primary text-bg px-4 py-2 text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-12px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {primaryCta.label}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-input border-border text-text-primary flex h-9 w-9 items-center justify-center border"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-border bg-bg border-t md:hidden">
          <Container className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-text-primary py-3 text-base"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={primaryCta.href}
              onClick={() => setOpen(false)}
              className="rounded-input bg-text-primary text-bg mt-2 mb-2 px-4 py-3 text-center text-base font-medium"
            >
              {primaryCta.label}
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
