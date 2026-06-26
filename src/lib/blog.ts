import type { PortableTextBlock } from '@portabletext/react';

// Estimate reading time from Portable Text body (~225 words/min).
export function estimateReadingTime(blocks?: PortableTextBlock[]): string {
  if (!blocks?.length) return '1 min read';
  const words = blocks
    .filter((b) => b._type === 'block')
    .map((b) =>
      ((b as { children?: { text?: string }[] }).children ?? []).map((c) => c.text ?? '').join(' '),
    )
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 225));
  return `${minutes} min read`;
}

export function formatDate(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// A heading entry for the table of contents.
export interface TocHeading {
  id: string;
  text: string;
  level: number; // 2 or 3
}

// URL-safe anchor slug from heading text. MUST stay in sync between the rendered
// heading `id` (PortableTextBody) and the ToC links (extractHeadings).
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function blockToText(block: unknown): string {
  const children = (block as { children?: { text?: string }[] })?.children ?? [];
  return children.map((c) => c.text ?? '').join('');
}

// Stable id for a heading block (used as the scroll anchor on h2/h3).
export function headingId(block: unknown): string {
  return slugifyHeading(blockToText(block));
}

// Pull h2/h3 headings out of the body to build the table of contents.
export function extractHeadings(blocks?: PortableTextBlock[]): TocHeading[] {
  if (!blocks?.length) return [];
  const out: TocHeading[] = [];
  for (const b of blocks) {
    if (b._type !== 'block') continue;
    const style = (b as { style?: string }).style;
    if (style !== 'h2' && style !== 'h3') continue;
    const text = blockToText(b).trim();
    if (!text) continue;
    out.push({ id: slugifyHeading(text), text, level: style === 'h2' ? 2 : 3 });
  }
  return out;
}
