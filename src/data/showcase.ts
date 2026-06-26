import type { ShowcaseItem } from '@/types';

// Real client work for the /work page case-study grid. Each entry can render an
// image (`src`) or an autoplay video (`video`). When neither is set, a styled
// placeholder shows `prompt` so art can be generated and dropped in later.
export const workShowcase: ShowcaseItem[] = [
  {
    category: 'Staffing',
    label: 'Staffing agency website',
    caption: 'A fast, clean rebuild that changed how they come across to clients.',
    prompt:
      'The Veylix Staffing website on a laptop, warm professional palette, clear hero with staffing messaging, premium minimal aesthetic, soft daylight on a clean desk.',
    src: '/images/work/veylix.png',
    alt: "Veylix Staffing site scrolling through the 'Staffing That Builds Empires Not Just Teams' hero and live placement stats",
    url: 'https://www.veylixstaffing.com',
    video: '/videos/work/veylix.mp4',
    videoPoster: '/images/work/veylix.png',
  },
  {
    category: 'Healthcare',
    label: 'Home care provider website',
    caption: 'From a vague brief to a warm, trust-first site in two weeks.',
    prompt:
      'A polished healthcare website on a desktop monitor, warm earthy tones, compassionate imagery, clean navigation, sitting on a wooden desk with soft ambient light.',
    src: '/images/work/fairpath.png',
    alt: 'Fairpath Healthcare website scrolling through the hero and service sections',
    url: 'https://www.fairpathhealthcare.com',
    video: '/videos/work/fairpath.mp4',
    videoPoster: '/images/work/fairpath.png',
  },
  {
    category: 'AI & enterprise',
    label: 'AI and blockchain engineering firm',
    caption: 'Full marketing presence for an elite tech firm, end to end.',
    prompt:
      'A sleek technology company marketing site on a laptop, dark navy and blue tones, bold headline, enterprise aesthetic, clean desk background, shallow depth of field.',
    src: '/images/work/vallorex.png',
    alt: 'Vallorex Technology website scrolling through the hero, globe graphic, and services sections',
    url: 'https://vallorex.com',
    video: '/videos/work/vallorex.mp4',
    videoPoster: '/images/work/vallorex.png',
  },
  {
    category: 'Creative studio',
    label: 'Creative studio brand site',
    caption: 'A polished brand presence built to match the studio behind it.',
    prompt:
      'The Foxera Studio website on a laptop, modern minimal design with bold typography, neutral palette, premium creative agency aesthetic, soft natural light.',
    src: '/images/work/foxera.png',
    alt: 'Fox Era Studio site scrolling through the cinematic dark hero, luxury sports car, and portfolio sections',
    url: 'https://foxerastudio.com',
    video: '/videos/work/foxera.mp4',
    videoPoster: '/images/work/foxera.png',
  },
];

// Visual prompt slots for the /services page, themed around how the work runs.
export const servicesShowcase: ShowcaseItem[] = [
  {
    label: 'Strategy and planning',
    caption: 'We map the path before a line of code.',
    prompt:
      'Close-up of hands sketching a product flow on paper with a pen, warm desk lighting, sticky notes and a laptop nearby, candid and authentic, shallow depth of field.',
    src: '/images/services/strategy.png',
    alt: 'A hand sketching a user-flow diagram in a notebook beside a laptop and sticky notes',
  },
  {
    label: 'Design and build',
    caption: 'Shipped in tight, visible loops.',
    prompt:
      'A calm developer workspace with a code editor open on a large monitor, warm ambient light, clean desk, soft plants in the background, premium and focused atmosphere.',
    src: '/images/services/build.png',
    alt: 'A monitor showing a code editor next to a clean task-management dashboard on a warm desk',
  },
  {
    label: 'Ship and launch',
    caption: 'Live, stable, and pointed at results.',
    prompt:
      'A product launch moment: a laptop showing a live website with an analytics graph trending up, warm celebratory lighting, minimal and professional composition.',
    src: '/images/services/launch.png',
    alt: 'A laptop showing a freshly launched website with a visitor analytics graph trending up',
  },
];
