'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TocHeading } from '@/lib/blog';

// Sticky right-rail table of contents with scroll-spy: highlights the section
// currently in view. Hidden by the caller on small screens.
export default function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Trigger when a heading is near the top third of the viewport.
      { rootMargin: '-96px 0px -68% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-text-muted mb-4 text-xs font-semibold tracking-[0.14em] uppercase">
        On this page
      </p>
      <ul className="border-border space-y-1 border-l">
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && 'ml-3')}>
            <a
              href={`#${h.id}`}
              className={cn(
                '-ml-px block border-l-2 py-1 pl-4 leading-snug transition-colors',
                activeId === h.id
                  ? 'border-accent text-text-primary font-medium'
                  : 'text-text-muted hover:text-text-secondary border-transparent',
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
