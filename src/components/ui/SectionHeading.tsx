import { cn } from '@/lib/utils';
import Reveal from '@/components/ui/Reveal';

interface SectionHeadingProps {
  // `eyebrow` is accepted for backwards compatibility but intentionally NOT
  // rendered. The repeated uppercase tracked kicker above every section is the
  // single most recognizable AI/template tell; the display title carries it now.
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: React.ReactNode; // optional trailing action (e.g. a "see all" link)
}

export default function SectionHeading({
  title,
  intro,
  align = 'left',
  className,
  children,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={className}>
      <div
        className={cn(
          'flex flex-col gap-5',
          centered ? 'items-center text-center' : 'items-start',
          children && !centered && 'sm:flex-row sm:items-end sm:justify-between sm:gap-10',
        )}
      >
        <div className={cn('max-w-2xl', centered && 'flex flex-col items-center')}>
          <h2 className="text-text-primary font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance">
            {title}
          </h2>
          {intro && (
            <p className="text-text-secondary mt-5 max-w-xl text-lg leading-relaxed">{intro}</p>
          )}
        </div>
        {children}
      </div>
    </Reveal>
  );
}
