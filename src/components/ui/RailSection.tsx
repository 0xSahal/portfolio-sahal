import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';

interface RailSectionProps {
  id?: string;
  /**
   * Ledger index, e.g. "01". Rendered in amber serif in the left rail.
   * Omit when the section is reused on a page other than the one that
   * defines its position in the sequence (the numeral only makes sense
   * relative to a specific page's composition, not to the component itself).
   */
  index?: string;
  /** Quiet sentence-case label under the index. Not an uppercase eyebrow. */
  label: string;
  title?: React.ReactNode;
  intro?: string;
  /** Optional trailing action rendered beside the title (e.g. a "see all" link). */
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * The homepage's section signature: a full-width hairline rule, then a two-column
 * "ledger" grid. The left rail carries a small amber index numeral + a quiet label
 * (sticky on desktop, inline on mobile); the content column carries the display
 * title and body. This replaces the centered stack + eyebrow pattern entirely.
 */
export default function RailSection({
  id,
  index,
  label,
  title,
  intro,
  action,
  children,
  className,
}: RailSectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-16 md:py-24', className)}>
      <Container>
        <div className="border-border border-t pt-8 md:pt-10">
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[160px_minmax(0,1fr)]">
            {/* Rail */}
            <Reveal>
              <div className="flex items-baseline gap-3 lg:sticky lg:top-28 lg:block">
                {index && (
                  <span className="text-accent font-serif text-lg font-semibold tracking-tight">
                    {index}
                  </span>
                )}
                <span className="text-text-muted text-sm lg:mt-1 lg:block">{label}</span>
              </div>
            </Reveal>

            {/* Content */}
            <div className="min-w-0">
              {(title || intro || action) && (
                <Reveal>
                  <div
                    className={cn(
                      action &&
                        'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10',
                    )}
                  >
                    <div className="max-w-3xl">
                      {title && (
                        <h2 className="text-text-primary font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance">
                          {title}
                        </h2>
                      )}
                      {intro && (
                        <p className="text-text-secondary mt-5 max-w-xl text-lg leading-relaxed">
                          {intro}
                        </p>
                      )}
                    </div>
                    {action && <div className="shrink-0">{action}</div>}
                  </div>
                </Reveal>
              )}
              {children}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
