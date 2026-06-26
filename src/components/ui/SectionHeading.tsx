import { cn } from '@/lib/utils';
import Reveal from '@/components/ui/Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: React.ReactNode; // optional trailing action (e.g. a "see all" link)
}

export default function SectionHeading({
  eyebrow,
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
          'flex flex-col gap-4',
          centered ? 'items-center text-center' : 'items-start',
          children && !centered && 'sm:flex-row sm:items-end sm:justify-between',
        )}
      >
        <div className={cn(centered && 'flex flex-col items-center')}>
          {eyebrow && (
            <div className={cn('flex items-center gap-2.5', centered && 'justify-center')}>
              <span className="bg-accent h-px w-6" aria-hidden />
              <span className="text-accent text-xs font-medium tracking-[0.16em] uppercase">
                {eyebrow}
              </span>
            </div>
          )}
          <h2
            className={cn(
              'text-text-primary mt-4 font-serif text-3xl leading-[1.12] font-medium tracking-tight md:text-[2.5rem]',
              centered ? 'max-w-2xl' : 'max-w-2xl',
            )}
          >
            {title}
          </h2>
          {intro && (
            <p
              className={cn(
                'text-text-secondary mt-4 text-lg leading-relaxed',
                centered ? 'max-w-xl' : 'max-w-xl',
              )}
            >
              {intro}
            </p>
          )}
        </div>
        {children}
      </div>
    </Reveal>
  );
}
