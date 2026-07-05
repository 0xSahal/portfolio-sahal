'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import RailSection from '@/components/ui/RailSection';
import Reveal from '@/components/ui/Reveal';
import { videoTestimonials } from '@/data/testimonials';
import type { VideoTestimonial } from '@/types';

// Only entries with a real video file render; the whole section disappears
// when there are none, so stubs can sit in the data file safely.
const realVideos = videoTestimonials.filter((t) => t.src);

interface VideoTestimonialsProps {
  // Only pass this when the section's position in the page's own numbered
  // sequence is known (currently just the homepage). Omit on any other page.
  index?: string;
}

function VideoPlayer({ t }: { t: VideoTestimonial }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <div className="border-border bg-bg-secondary relative aspect-video w-full overflow-hidden rounded-2xl border shadow-[0_28px_70px_-32px_rgba(0,0,0,0.55)]">
      {/* preload="none": the poster carries the section until someone actually
          presses play — the video bytes never load for visitors who don't. */}
      <video
        ref={ref}
        src={t.src}
        poster={t.thumbnail}
        preload="none"
        playsInline
        controls={started}
        onEnded={() => setStarted(false)}
        className="h-full w-full object-cover"
        aria-label={`Video testimonial from ${t.company}`}
      />
      {!started && (
        <button
          type="button"
          aria-label={`Play the testimonial from ${t.company}`}
          onClick={() => {
            setStarted(true);
            ref.current?.play();
          }}
          className="group absolute inset-0 grid cursor-pointer place-items-center"
        >
          <span className="bg-text-primary/90 text-bg flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105 md:h-[4.5rem] md:w-[4.5rem]">
            <Play size={24} className="ml-1" fill="currentColor" />
          </span>
          {t.duration && (
            <span className="bg-text-primary/80 text-bg absolute right-4 bottom-4 rounded-full px-2.5 py-1 text-xs font-medium">
              {t.duration}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

export default function VideoTestimonials({ index }: VideoTestimonialsProps = {}) {
  const [featured] = realVideos;
  if (!featured) return null;

  return (
    <RailSection
      id="testimonials"
      index={index}
      label="In their words"
      title="Don't take my word for it."
    >
      <div className="mt-10 grid gap-x-14 gap-y-8 md:mt-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-end">
        <Reveal>
          <VideoPlayer t={featured} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-border relative border-t pt-6 lg:pb-2">
            <span aria-hidden className="bg-accent absolute -top-px left-0 h-px w-8" />
            <p className="text-text-primary font-serif text-xl font-semibold tracking-tight md:text-2xl">
              {featured.companyUrl ? (
                <a
                  href={featured.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {featured.company}
                </a>
              ) : (
                featured.company
              )}
            </p>
            <p className="text-text-secondary mt-3 max-w-sm leading-relaxed">
              On camera, in their own words: what working together on their brand site was actually
              like.
            </p>
            {featured.companyUrl && (
              <a
                href={featured.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-strong mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                View the live site <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </RailSection>
  );
}
