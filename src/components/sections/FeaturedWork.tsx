import Link from 'next/link';
import Image from 'next/image';
import RailSection from '@/components/ui/RailSection';
import Reveal from '@/components/ui/Reveal';
import CtaButton from '@/components/ui/CtaButton';
import { workShowcase } from '@/data/showcase';
import { writtenTestimonials } from '@/data/testimonials';
import type { ShowcaseItem, WrittenTestimonial } from '@/types';

// Real client work on the homepage: actual screenshots from /work, paired with
// the real, approved testimonial from the same client where one exists.
// Images only here (the screen recordings stay on /work; they're heavy).
const featuredSpecs: { host: string; quoteId?: string; result?: string }[] = [
  { host: 'veylixstaffing', quoteId: 'wt-shivam' },
  { host: 'fairpathhealthcare', quoteId: 'wt-fairpath', result: 'Live in 2 weeks' },
  { host: 'vallorex', result: 'Qualified leads up 64%' },
];

const featured: { work: ShowcaseItem; quoteId?: string; result?: string }[] = featuredSpecs.flatMap(
  (spec) => {
    const work = workShowcase.find((w) => w.url?.includes(spec.host));
    return work ? [{ work, quoteId: spec.quoteId, result: spec.result }] : [];
  },
);

function quoteFor(id?: string): WrittenTestimonial | undefined {
  return id ? writtenTestimonials.find((t) => t.id === id) : undefined;
}

function WorkEntry({
  work,
  quote,
  result,
  wide,
}: {
  work: ShowcaseItem;
  quote?: WrittenTestimonial;
  result?: string;
  wide?: boolean;
}) {
  return (
    <Link href="/work" className="group block">
      <div
        className={`rounded-card border-border bg-bg-secondary relative w-full overflow-hidden border ${
          wide ? 'aspect-[21/10]' : 'aspect-[16/10]'
        }`}
      >
        {work.src && (
          <Image
            src={work.src}
            alt={work.alt ?? work.label}
            fill
            sizes={wide ? '(max-width: 1024px) 100vw, 960px' : '(max-width: 768px) 100vw, 46vw'}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        )}
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-6">
        <div>
          <p className="text-accent text-sm font-medium">{work.category}</p>
          <h3 className="text-text-primary group-hover:text-accent mt-1.5 font-serif text-xl font-semibold tracking-tight transition-colors duration-300 md:text-2xl">
            {work.label}
          </h3>
        </div>
        {result && <p className="text-text-secondary hidden shrink-0 text-sm sm:block">{result}</p>}
      </div>
      <p className="text-text-secondary mt-2 max-w-lg text-[15px] leading-relaxed">
        {work.caption}
      </p>

      {quote && (
        <figure className="border-border mt-6 border-t pt-5">
          <blockquote className="text-text-primary text-[15px] leading-relaxed">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <figcaption className="text-text-muted mt-3 text-sm">
            {quote.company}
            {quote.location ? `, ${quote.location}` : ''}
          </figcaption>
        </figure>
      )}
    </Link>
  );
}

export default function FeaturedWork() {
  const [first, ...rest] = featured;
  if (!first) return null;

  return (
    <RailSection
      index="04"
      label="Selected work"
      title="The work speaks first."
      intro="Real client sites, live right now. The words under each one are the client's, not mine."
      action={
        <CtaButton href="/work" variant="ghost" className="text-sm">
          See all work
        </CtaButton>
      }
    >
      <div className="mt-10 md:mt-14">
        <Reveal>
          <WorkEntry work={first.work} quote={quoteFor(first.quoteId)} result={first.result} wide />
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
          {rest.map((entry, i) => (
            <Reveal key={entry.work.label} delay={i * 0.08}>
              <WorkEntry work={entry.work} quote={quoteFor(entry.quoteId)} result={entry.result} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="border-border text-text-secondary mt-14 border-t pt-5 text-sm">
            Also shipped: a slow e-commerce storefront rebuilt for speed, conversion rate up 50%.
          </p>
        </Reveal>
      </div>
    </RailSection>
  );
}
