'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import RailSection from '@/components/ui/RailSection';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
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

function VideoCard({ t, delay }: { t: VideoTestimonial; delay: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const portrait = t.orientation === 'portrait';

  return (
    <Reveal delay={delay} className="flex flex-col">
      {/* Videos share a fixed height on lg so a landscape (16:9) and a portrait
          (9:16) clip sit on the same baseline; widths derive from each clip's
          own aspect ratio, so neither is ever cropped. They stack on mobile. */}
      <div
        className={cn(
          'border-border bg-bg-secondary relative mx-auto overflow-hidden rounded-2xl border shadow-[0_28px_70px_-32px_rgba(0,0,0,0.55)] lg:mx-0 lg:h-[360px] lg:w-auto',
          portrait
            ? 'aspect-[9/16] w-full max-w-[240px] lg:max-w-none'
            : 'aspect-video w-full max-w-[580px] lg:max-w-none',
        )}
      >
        {/* preload="none": the poster carries the card until someone actually
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
            <span className="bg-text-primary/90 text-bg flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105">
              <Play size={24} className="ml-1" fill="currentColor" />
            </span>
            {t.duration && (
              <span className="bg-text-primary/80 text-bg absolute right-3 bottom-3 rounded-full px-2.5 py-1 text-xs font-medium">
                {t.duration}
              </span>
            )}
          </button>
        )}
      </div>

      <figcaption className="mt-4 text-center lg:text-left">
        <p className="text-text-primary font-serif text-lg font-semibold tracking-tight">
          {t.companyUrl ? (
            <a
              href={t.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              {t.company}
            </a>
          ) : (
            t.company
          )}
        </p>
        {t.location && <p className="text-text-muted mt-0.5 text-sm">{t.location}</p>}
      </figcaption>
    </Reveal>
  );
}

export default function VideoTestimonials({ index }: VideoTestimonialsProps = {}) {
  if (realVideos.length === 0) return null;

  return (
    <RailSection
      id="testimonials"
      index={index}
      label="In their words"
      title="Don't take my word for it."
      intro="Real clients, unscripted, on what it was actually like to work together."
    >
      <div className="mt-10 flex flex-col items-center gap-12 md:mt-12 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
        {realVideos.map((t, i) => (
          <VideoCard key={t.id} t={t} delay={i * 0.1} />
        ))}
      </div>
    </RailSection>
  );
}
