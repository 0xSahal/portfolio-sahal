import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';

export default function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-24 md:py-32', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
