import type { ExperienceEntry, Education } from '@/types';

// Real career history (source: Sahal's LinkedIn). Honest dates and roles.
// To show real company logos: drop image files into /public/images/logos and set
// the `logo` field below (e.g. logo: '/images/logos/reveation.png'). Until then a
// clean monogram is shown automatically.
export const experience: ExperienceEntry[] = [
  {
    id: 'vallorex',
    company: 'Vallorex',
    location: 'Remote',
    period: 'Mar 2026 - Present',
    logo: '/images/logos/vallorex.png',
    roles: [
      {
        title: 'Head of Product Engineering',
        period: 'Mar 2026 - Present',
        isCurrent: true,
        description:
          'I lead product engineering end to end, from the first architecture call to the final deploy, shipping production AI systems and full-stack products for startups and enterprise teams.',
        highlights: [
          'Own technical decisions and keep delivery on track across concurrent projects',
          'Design and build scalable full-stack systems from scratch',
          'Build and integrate LLM pipelines into real, shipping products',
          'Set and enforce the engineering bar across every project',
        ],
        tags: ['Product Leadership', 'Architecture', 'AI / LLM', 'Full-stack'],
      },
    ],
  },
  {
    id: 'reveation',
    company: 'Reveation Labs',
    location: 'Plano, TX · Remote',
    period: 'Jul 2024 - Mar 2026',
    logo: '/images/logos/reveation.png',
    roles: [
      {
        title: 'SDE-1, Full-Stack Developer',
        period: 'Dec 2024 - Mar 2026',
        description:
          'Shipped full-stack features for US-based clients across React, Node.js, WordPress and WooCommerce, in a remote environment where ambiguity was the default and clarity was the deliverable.',
        highlights: [
          'Built and maintained scalable front-end architectures in React and modern UI frameworks',
          'Designed and integrated REST APIs connecting complex back-end logic to clean user experiences',
          'Drove codebase decisions that reduced technical debt, not just sprint velocity',
          'Worked across time zones with US clients, and learned that good engineering is also good communication',
        ],
        tags: ['React', 'Node.js', 'REST APIs', 'US Clients'],
      },
      {
        title: 'Software Engineer Intern',
        period: 'Jul 2024 - Dec 2024',
        description:
          'Joined as a front-end intern and left understanding why back-end decisions determine front-end outcomes.',
        highlights: [
          'Built React interfaces driven by user behavior, not just visual correctness',
          'Learned the MERN stack under production pressure, not in a tutorial',
        ],
        tags: ['React', 'MERN'],
      },
    ],
    awards: [
      {
        title: 'Incredible Employee of the Month',
        detail: 'Feb 2025',
        image: '/images/awards/employee-of-the-month.jpg',
        width: 1280,
        height: 904,
      },
      {
        title: 'Shining Star of the Month',
        image: '/images/awards/shining-star.jpg',
        width: 800,
        height: 800,
      },
    ],
  },
  {
    id: 'grabthesite',
    company: 'GrabTheSite',
    location: 'Ahmedabad',
    period: 'Jan 2023 - Mar 2023',
    logo: '/images/logos/grabthesite.png',
    roles: [
      {
        title: 'Web Development Intern',
        period: 'Jan 2023 - Mar 2023',
        description:
          'First hands-on exposure to building real web products, where I learned that React is easy to write and hard to write well.',
        highlights: [
          'Developed React components for live client projects',
          "First professional lesson: the goal isn't clean code, it's maintainable thinking",
        ],
        tags: ['React', 'First role'],
      },
    ],
  },
];

export const education: Education = {
  school: 'Silver Oak University',
  degree: 'BCA, Computer Engineering',
  period: '2021 - 2024',
};
