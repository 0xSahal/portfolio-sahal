import { cn } from '@/lib/utils';

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
        'rounded-card border-border bg-surface border p-7 transition-all duration-300',
        'hover:border-border-strong hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-28px_rgba(0,0,0,0.28)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
