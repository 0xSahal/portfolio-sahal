import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { personalProducts } from '@/data/products';

export default function Products() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Things I built for myself"
        title="I don't just build for clients."
        intro="Products I conceived, built, and operate myself. Proof I can own a thing end to end with no one directing me."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {personalProducts.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <Card className="flex h-full flex-col">
              <ImagePlaceholder
                src={p.image}
                alt={`${p.name} screenshot`}
                prompt={p.imagePrompt ?? 'Add a product screenshot.'}
                label="Product screenshot"
                aspectClassName="aspect-video"
                roundedClassName="rounded-input"
                objectClassName="object-contain bg-bg-secondary"
                className="mb-6"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-text-primary font-serif text-xl font-medium">{p.name}</h3>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-strong inline-flex items-center gap-1 text-sm font-medium"
                  >
                    Visit <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
              <p className="text-text-secondary mt-3 flex-1 text-[15px] leading-relaxed">
                {p.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-pill border-border text-text-secondary border px-2.5 py-0.5 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
