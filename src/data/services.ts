import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'websites',
    title: 'Websites that earn their keep',
    outcome: 'Built to convert, not just to look nice',
    description:
      'Fast, sharp, and tied to what it does for your business. Every decision, down to the words, earns its place.',
    icon: 'Globe',
    includes: [
      'Conversion-focused design and build',
      'Copy that sells, not just fills space',
      'Fast, SEO-ready, mobile-first',
      'Analytics so you can see what works',
    ],
  },
  {
    id: 'applications',
    title: 'Applications, shipped',
    outcome: 'From idea to a working product',
    description:
      'Full-stack, end to end, built for the edge cases, not just the demo. Something real that holds up in the wild.',
    icon: 'AppWindow',
    includes: [
      'Full-stack architecture from scratch',
      'Built for the edge cases, not just the demo',
      'Clean handoff and documentation',
      'Deployed and production-ready',
    ],
  },
  {
    id: 'partner',
    title: 'A partner who owns it',
    outcome: 'One person accountable for the whole thing',
    description:
      'No hand-offs, no "that\'s not my part." You hand me the problem; I hand you the result.',
    icon: 'Handshake',
    includes: [
      'One point of accountability, start to finish',
      'Strategy, build, and ship end to end',
      'Clear communication across time zones',
      'Extra hands brought in when a project needs them',
    ],
  },
];
