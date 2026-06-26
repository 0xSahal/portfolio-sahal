import type { VideoTestimonial, WrittenTestimonial } from '@/types';

// Your strongest asset. Drop the 3 real videos into /public/videos and set
// `src` + `thumbnail`. Names/roles below are PLACEHOLDERS — replace with real.
export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'vt-1',
    src: '',
    thumbnail: '',
    clientName: 'Client name',
    role: 'Role',
    company: 'Company',
    quote: 'Short pull-quote from the video.',
  },
  {
    id: 'vt-2',
    src: '',
    thumbnail: '',
    clientName: 'Client name',
    role: 'Role',
    company: 'Company',
    quote: 'Short pull-quote from the video.',
  },
  {
    id: 'vt-3',
    src: '',
    thumbnail: '',
    clientName: 'Client name',
    role: 'Role',
    company: 'Company',
    quote: 'Short pull-quote from the video.',
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
