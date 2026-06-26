import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  media,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  // Optional right-column visual. When present, the header becomes a split hero
  // with a warm glow and a bottom border that separates it from the next section.
  media?: React.ReactNode;
}) {
  const heading = (
    <div>
      {eyebrow && (
        <div className="flex items-center gap-2.5">
          <span className="bg-accent h-px w-6" aria-hidden />
          <span className="text-accent text-xs font-medium tracking-[0.16em] uppercase">
            {eyebrow}
          </span>
        </div>
      )}
      <h1 className="text-text-primary mt-4 max-w-2xl font-serif text-4xl leading-[1.08] font-medium tracking-tight md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-text-secondary mt-5 max-w-xl text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );

  if (media) {
    return (
      <section className="border-border relative overflow-hidden border-b">
        <span
          aria-hidden
          className="bg-accent/[0.06] pointer-events-none absolute -top-32 right-[-8%] h-[420px] w-[420px] rounded-full blur-3xl"
        />
        <Container className="relative grid items-center gap-12 pt-16 pb-16 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:pt-24 md:pb-24">
          {heading}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="rounded-card border-accent/20 absolute -inset-3 border" aria-hidden />
              {media}
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }

  return <Container className="pt-16 pb-4 md:pt-24">{heading}</Container>;
}
