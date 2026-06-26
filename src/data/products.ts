import type { PersonalProduct } from '@/types';

export const personalProducts: PersonalProduct[] = [
  {
    id: 'salonsync',
    name: 'SalonSync',
    description:
      'A full POS and salon management platform I designed, built, and operate. Covers bookings, billing, customers, staff, inventory, and revenue analytics in one app. Real salons use it daily.',
    tech: ['React', 'Next.js', 'TypeScript', 'MongoDB', 'Recharts'],
    live: 'https://salonsync.co.in',
    image: '/images/products/salonsync.png',
    imagePrompt:
      'A salon management SaaS dashboard on a laptop, dark sidebar navigation, amber accent color, revenue charts and booking cards, clean modern UI, warm studio background.',
  },
  {
    id: 'menumojo',
    name: 'MenuMojo',
    description:
      'A QR-based digital menu platform for restaurants. Owners set up in minutes, update their menu in real time, and customers scan to browse on their phone.',
    tech: ['React', 'Next.js', 'TypeScript', 'MongoDB', 'QR Code API'],
    live: 'https://menucraftt.in',
    image: '/images/products/menumojo.png',
    imagePrompt:
      'A digital menu SaaS landing page on a laptop, bold blue and white color scheme, large hero headline, clean modern UI, soft gradient background.',
  },
];
