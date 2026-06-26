import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Build a compact page list with ellipses: 1 … 4 5 [6] 7 8 … 12
function pageList(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | 'gap')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push('gap');
    out.push(p);
    prev = p;
  }
  return out;
}

function href(base: string, page: number) {
  return page <= 1 ? base : `${base}?page=${page}`;
}

export default function Pagination({
  current,
  total,
  basePath = '/blog',
}: {
  current: number;
  total: number;
  basePath?: string;
}) {
  if (total <= 1) return null;
  const pages = pageList(current, total);
  const hasPrev = current > 1;
  const hasNext = current < total;

  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-1.5">
      {hasPrev ? (
        <Link
          href={href(basePath, current - 1)}
          rel="prev"
          aria-label="Previous page"
          className="rounded-input border-border text-text-secondary hover:border-border-strong hover:text-text-primary inline-flex h-10 items-center gap-1.5 border px-3 text-sm transition-colors"
        >
          <ArrowLeft size={15} /> Prev
        </Link>
      ) : (
        <span className="rounded-input border-border text-text-muted inline-flex h-10 cursor-not-allowed items-center gap-1.5 border px-3 text-sm opacity-50">
          <ArrowLeft size={15} /> Prev
        </span>
      )}

      <div className="mx-1 flex items-center gap-1">
        {pages.map((p, i) =>
          p === 'gap' ? (
            <span key={`gap-${i}`} className="text-text-muted px-1.5">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={href(basePath, p)}
              aria-current={p === current ? 'page' : undefined}
              className={cn(
                'rounded-input inline-flex h-10 min-w-10 items-center justify-center px-3 text-sm transition-colors',
                p === current
                  ? 'bg-text-primary text-bg font-medium'
                  : 'border-border text-text-secondary hover:border-border-strong hover:text-text-primary border',
              )}
            >
              {p}
            </Link>
          ),
        )}
      </div>

      {hasNext ? (
        <Link
          href={href(basePath, current + 1)}
          rel="next"
          aria-label="Next page"
          className="rounded-input border-border text-text-secondary hover:border-border-strong hover:text-text-primary inline-flex h-10 items-center gap-1.5 border px-3 text-sm transition-colors"
        >
          Next <ArrowRight size={15} />
        </Link>
      ) : (
        <span className="rounded-input border-border text-text-muted inline-flex h-10 cursor-not-allowed items-center gap-1.5 border px-3 text-sm opacity-50">
          Next <ArrowRight size={15} />
        </span>
      )}
    </nav>
  );
}
