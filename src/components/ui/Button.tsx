'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled ?? loading}
      className={cn(
        'rounded-input inline-flex items-center justify-center gap-2 font-medium',
        'transition-[background-color,color,border-color,transform] duration-200',
        'focus-visible:outline-none active:scale-[0.98]',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-5 py-2.5 text-[15px]',
        size === 'lg' && 'px-7 py-3.5 text-base',
        // primary — solid "ink", inverts with theme for max contrast
        variant === 'primary' && 'bg-text-primary text-bg hover:bg-text-primary/90',
        // accent — the honey signal, used sparingly
        variant === 'accent' && 'bg-accent text-on-accent hover:bg-accent-strong',
        // secondary — bordered, quiet
        variant === 'secondary' &&
          'border-border-strong text-text-primary hover:bg-bg-secondary border bg-transparent',
        // ghost — text only
        variant === 'ghost' &&
          'text-text-secondary hover:bg-bg-secondary hover:text-text-primary bg-transparent',
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
