import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-md px-[10px] py-1',
        'font-mono text-[11px]',
        'border border-[var(--border)]',
        'text-[var(--text-secondary)]',
        className,
      )}
      style={{ background: 'var(--bg-secondary)' }}
    >
      {children}
    </span>
  );
}
