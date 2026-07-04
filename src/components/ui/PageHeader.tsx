import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';

export default function PageHeader({
  title,
  subtitle,
  media,
}: {
  // Accepted for backwards compatibility but intentionally NOT rendered, same
  // convention as SectionHeading: a repeated uppercase kicker above every page
  // title is an AI/template tell. Call sites can keep passing it.
  eyebrow?: string;
  title: string;
  subtitle?: string;
  // Optional right-column visual. When present, the header becomes a split hero
  // with a warm glow separating it from the next section. The visual should
  // carry its own frame (rounded-2xl border + shadow, matching Hero/AboutTeaser)
  // rather than relying on this component to wrap it.
  media?: React.ReactNode;
}) {
  const heading = (
    <div>
      <h1 className="text-text-primary font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance">
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
          <Reveal delay={0.1}>{media}</Reveal>
        </Container>
      </section>
    );
  }

  return <Container className="pt-16 pb-4 md:pt-24">{heading}</Container>;
}
