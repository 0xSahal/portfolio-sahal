import { cn } from '@/lib/utils';

// Flat, editorial surface: a hairline top rule plus breathing room, instead of
// the rounded-border box with hover-lift (the "AI card" look). The rule warms
// to the accent on hover. Callers add their own layout classes (flex, etc.).
export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'border-border hover:border-accent border-t pt-6 transition-colors duration-300',
        className,
      )}
    >
      {children}
    </div>
  );
}
