import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { cn } from '@/lib/utils';
import type { ShowcaseItem } from '@/types';

interface ShowcaseProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: ShowcaseItem[];
  className?: string;
  // 'grid' is the original 3-up mood/thumb band (services + decorative bands).
  // 'cases' is the bigger 2-up case-study layout (/work page).
  variant?: 'grid' | 'cases';
}

export default function Showcase({
  eyebrow,
  title,
  intro,
  items,
  className,
  variant = 'grid',
}: ShowcaseProps) {
  return (
    <Section className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
      {variant === 'cases' ? <CasesGrid items={items} /> : <ThumbsGrid items={items} />}
    </Section>
  );
}

function ThumbsGrid({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.label} delay={i * 0.08}>
          <figure className="group flex flex-col">
            <div className="rounded-card border-border relative overflow-hidden border shadow-sm transition-shadow duration-300 group-hover:shadow-md">
              <ImagePlaceholder
                src={item.src}
                alt={item.alt ?? item.label}
                prompt={item.prompt}
                label={item.label}
                aspectClassName="aspect-video"
                roundedClassName=""
                objectClassName={item.objectClassName ?? 'object-cover object-top'}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <figcaption className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-text-primary font-medium">{item.label}</p>
                {item.caption && (
                  <p className="text-text-secondary mt-1 text-sm leading-relaxed">{item.caption}</p>
                )}
              </div>
              {item.url &&
                (item.urlDisabled ? (
                  <span className="text-text-muted mt-0.5 inline-flex shrink-0 cursor-not-allowed items-center gap-1 text-xs select-none">
                    View site <ArrowUpRight size={12} />
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-strong mt-0.5 inline-flex shrink-0 items-center gap-1 text-xs font-medium transition-colors"
                  >
                    View site <ArrowUpRight size={12} />
                  </Link>
                ))}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

function CasesGrid({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
      {items.map((item, i) => (
        <Reveal key={item.label} delay={(i % 2) * 0.06}>
          <CaseCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}

function CaseCard({ item }: { item: ShowcaseItem }) {
  const clickable = Boolean(item.url) && !item.urlDisabled;
  const wrapperClass = cn(
    'group block h-full overflow-hidden rounded-card border border-border bg-surface transition-all duration-300',
    clickable &&
      'hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]',
  );

  const body = (
    <>
      <CaseMedia item={item} interactive={clickable} />
      <CaseMeta item={item} clickable={clickable} />
    </>
  );

  if (clickable) {
    return (
      <Link
        href={item.url!}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${item.label} live site in a new tab`}
        className={wrapperClass}
      >
        {body}
      </Link>
    );
  }
  return <div className={wrapperClass}>{body}</div>;
}

function CaseMedia({ item, interactive }: { item: ShowcaseItem; interactive: boolean }) {
  const motion = interactive
    ? 'transition-transform duration-500 ease-out group-hover:scale-[1.02]'
    : '';

  return (
    <div className="border-border bg-bg-secondary relative aspect-[21/10] w-full overflow-hidden border-b">
      {item.video ? (
        <video
          src={item.video}
          poster={item.videoPoster ?? item.src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={item.alt ?? item.label}
          className={cn(
            'absolute inset-0 h-full w-full',
            item.objectClassName ?? 'object-cover',
            motion,
          )}
        />
      ) : (
        <div className={cn('absolute inset-0', motion)}>
          <ImagePlaceholder
            src={item.src}
            alt={item.alt ?? item.label}
            prompt={item.prompt}
            label={item.label}
            aspectClassName="h-full"
            roundedClassName=""
            objectClassName={item.objectClassName ?? 'object-cover object-top'}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
    </div>
  );
}

function CaseMeta({ item, clickable }: { item: ShowcaseItem; clickable: boolean }) {
  return (
    <div className="flex flex-col gap-3 p-6 md:p-7">
      {item.category && (
        <p className="text-text-muted text-[11px] font-medium tracking-[0.16em] uppercase">
          {item.category}
        </p>
      )}
      <h3 className="text-text-primary font-serif text-xl leading-snug font-medium tracking-tight md:text-2xl">
        {item.label}
      </h3>
      {item.caption && (
        <p className="text-text-secondary text-[15px] leading-relaxed">{item.caption}</p>
      )}
      <div className="mt-2 flex items-center pt-1">
        {clickable ? (
          <span className="text-accent inline-flex items-center gap-1.5 text-sm font-medium">
            View live site
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        ) : (
          <span className="text-text-muted inline-flex items-center gap-1.5 text-xs font-medium">
            <Lock size={11} />
            Link unavailable
          </span>
        )}
      </div>
    </div>
  );
}
