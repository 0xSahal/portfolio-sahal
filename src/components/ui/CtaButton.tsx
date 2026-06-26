import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'lg';
  arrow?: boolean;
  className?: string;
}

// The site's canonical link-button. Subtle arrow nudge on hover; restrained depth.
export default function CtaButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  arrow = true,
  className,
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group rounded-input inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-[0.98]',
        size === 'md' && 'px-5 py-3 text-[15px]',
        size === 'lg' && 'px-6 py-3.5 text-base',
        variant === 'primary' &&
          'bg-text-primary text-bg shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-12px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_14px_32px_-12px_rgba(0,0,0,0.4)]',
        variant === 'ghost' && 'text-text-primary hover:text-accent',
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          size={size === 'lg' ? 17 : 16}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
