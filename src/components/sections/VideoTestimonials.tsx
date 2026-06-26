import { Play, Quote } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { videoTestimonials } from '@/data/testimonials';

// Hidden site-wide until real client videos arrive. Flip to `true` to show.
const ENABLED = false;

export default function VideoTestimonials() {
  if (!ENABLED) return null;

  return (
    <Section id="testimonials">
      <SectionHeading
        align="center"
        eyebrow="In their words"
        title="Don't take my word for it."
        intro="Three clients, on camera, on what it's actually like to work with me."
        className="mx-auto"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {videoTestimonials.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.08}>
            <figure className="group rounded-card border-border bg-surface hover:border-border-strong overflow-hidden border transition-all duration-300 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.3)]">
              <div className="bg-bg-secondary relative flex aspect-video items-center justify-center overflow-hidden">
                <button
                  type="button"
                  aria-label={`Play testimonial from ${t.clientName}`}
                  className="bg-text-primary/90 text-bg flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
                >
                  <Play size={22} className="ml-1" fill="currentColor" />
                </button>
                <span className="text-text-muted absolute right-3 bottom-2 text-[11px]">
                  Video placeholder
                </span>
              </div>
              <figcaption className="p-6">
                <Quote size={20} className="text-accent" />
                <blockquote className="text-text-primary mt-3 leading-relaxed">
                  {t.quote}
                </blockquote>
                <div className="border-border mt-5 border-t pt-4">
                  <p className="text-text-primary text-sm font-medium">{t.clientName}</p>
                  <p className="text-text-secondary text-sm">
                    {t.role}, {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
