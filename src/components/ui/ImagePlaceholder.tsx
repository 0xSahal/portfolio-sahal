import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  /** When set, the real image renders instead of the prompt placeholder. */
  src?: string;
  alt?: string;
  /** Generation prompt shown until a real image is dropped in. Swap later. */
  prompt: string;
  /** Short caption above the prompt, e.g. "Hero visual". */
  label?: string;
  /** Tailwind aspect-ratio class. Defaults to a 4:3 box. */
  aspectClassName?: string;
  /** Radius token applied to the frame. */
  roundedClassName?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Tailwind object-fit/position classes. Defaults to object-cover. */
  objectClassName?: string;
}

// A premium-looking placeholder that doubles as a brief. While `src` is empty it
// shows the image prompt so Sahal can generate art later and just set `src`.
export default function ImagePlaceholder({
  src,
  alt = '',
  prompt,
  label = 'Image',
  aspectClassName = 'aspect-[4/3]',
  roundedClassName = 'rounded-card',
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority,
  objectClassName = 'object-cover',
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        aspectClassName,
        roundedClassName,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={objectClassName}
        />
      ) : (
        <div className="border-border-strong bg-bg-secondary absolute inset-0 flex flex-col items-center justify-center gap-4 border border-dashed p-6 text-center">
          <span
            aria-hidden
            className="bg-accent/[0.07] pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl"
          />
          <span className="bg-accent-soft text-accent flex h-11 w-11 items-center justify-center rounded-full">
            <ImageIcon size={20} strokeWidth={1.75} />
          </span>
          <p className="text-text-secondary text-sm font-medium">{label}</p>
          <div className="rounded-input border-border bg-surface/70 max-w-sm border px-3.5 py-2.5 backdrop-blur-[1px]">
            <p className="text-text-muted text-[10px] font-semibold tracking-[0.16em] uppercase">
              Image prompt
            </p>
            <p className="text-text-secondary mt-1 text-xs leading-relaxed">{prompt}</p>
          </div>
        </div>
      )}
    </div>
  );
}
