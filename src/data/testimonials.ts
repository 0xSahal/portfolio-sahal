import type { VideoTestimonial, WrittenTestimonial } from '@/types';

// Real client videos only — entries without a `src` are ignored by the section,
// so it's safe to stub future ones here before the file exists.
export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'vt-foxera',
    src: '/videos/testimonials/foxera-testimonial.mp4',
    thumbnail: '/videos/testimonials/foxera-poster.jpg',
    company: 'Foxera Studio',
    companyUrl: 'https://foxerastudio.com',
    orientation: 'landscape',
    duration: '0:46',
  },
  {
    id: 'vt-fairpath',
    src: '/videos/testimonials/fairpath-testimonial.mp4',
    thumbnail: '/videos/testimonials/fairpath-poster.jpg',
    company: 'Fairpath Healthcare',
    companyUrl: 'https://www.fairpathhealthcare.com',
    location: 'Georgia, USA',
    orientation: 'portrait',
    duration: '0:46',
  },
];

export const writtenTestimonials: WrittenTestimonial[] = [
  {
    id: 'wt-shivam',
    text: "Sahal got what our business needed without me having to over-explain. Fast delivery, clean result, and the site has genuinely changed how we come across to clients. I'd work with him again without hesitation.",
    author: '',
    initials: 'VS',
    role: '',
    company: 'Veylix Staffing',
    companyUrl: 'https://www.veylixstaffing.com/',
    location: 'Cheyenne, Wyoming, USA',
  },
  {
    id: 'wt-fairpath',
    text: 'We came to Sahal with a rough idea and not much else. He turned it into a website that finally reflects the care we give. It feels warm and trustworthy, our families have noticed, and he had it live faster than we expected. Easy to work with from start to finish.',
    author: '',
    initials: 'FH',
    role: '',
    company: 'Fairpath Healthcare',
    companyUrl: 'https://www.fairpathhealthcare.com',
    location: 'Georgia, USA',
  },
];
