import { cn } from '@/lib/utils';

// The "Sahal" wordmark + amber terminal cursor — the site's brand mark.
// Theme-aware via tokens: `text-text-primary` flips ink/cream and `bg-accent`
// brightens in dark, so it matches both generated wordmarks automatically.
// Size is set by the caller via `className` (font-size); the cursor scales in em.
// Pass `blink` to play the load-in terminal blink (a few blinks, then rests solid).
export default function Logo({
  className,
  blink = false,
}: {
  className?: string;
  blink?: boolean;
}) {
  return (
    <span className={cn('text-text-primary font-serif font-medium tracking-tighter', className)}>
      Sahal
      <span
        aria-hidden
        className={cn(
          'bg-accent ml-[0.16em] inline-block h-[0.8em] w-[0.2em] rounded-[1px] align-baseline',
          blink && 'cursor-blink',
        )}
      />
    </span>
  );
}
