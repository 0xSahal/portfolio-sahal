import { cn } from '@/lib/utils';

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('max-w-content mx-auto w-full px-6 md:px-8', className)}>{children}</div>
  );
}
