import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-pill inline-flex items-center gap-1.5 px-3 py-1',
        'text-xs font-medium',
        variant === 'default' && 'border border-[var(--border)] text-[var(--text-secondary)]',
        variant === 'accent' && 'bg-accent text-on-accent',
        variant === 'success' && 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-600',
        className,
      )}
      style={variant === 'default' ? { background: 'var(--surface)' } : undefined}
    >
      {children}
    </span>
  );
}
