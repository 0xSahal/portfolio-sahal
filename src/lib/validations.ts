import { z } from 'zod';

export const budgetValues = ['under-1k', '1k-3k', '3k-7k', '7k-plus', 'not-sure'] as const;
export const timelineValues = ['asap', '1-3-months', '3-plus-months', 'flexible'] as const;

// The qualifying brief — short, with budget + timeline as the key filters.
export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(100).trim(),
  email: z.string().email('Please enter a valid email address').max(254).trim(),
  // Optional — empty string or omitted means not provided; if filled must be 10 digits.
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{10}$/.test(v), 'Please enter a valid 10-digit mobile number'),
  projectType: z
    .string()
    .min(10, 'A sentence or two is plenty')
    .max(1000, "Keep it brief. We'll dig in on the call.")
    .trim(),
  budget: z.enum(budgetValues, { message: 'Please choose a budget range' }),
  timeline: z.enum(timelineValues, { message: 'Please choose a timeline' }),
  message: z.string().max(2000).trim().optional(),
  // Honeypot — bots fill it, humans don't.
  website: z.string().max(0).optional(),
  // Google reCAPTCHA v3 token (set on submit when keys are configured).
  recaptchaToken: z.string().min(1).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const budgetOptions: { value: (typeof budgetValues)[number]; label: string }[] = [
  { value: 'under-1k', label: 'Under $1,000' },
  { value: '1k-3k', label: '$1,000 – $3,000' },
  { value: '3k-7k', label: '$3,000 – $7,000' },
  { value: '7k-plus', label: '$7,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export const timelineOptions: { value: (typeof timelineValues)[number]; label: string }[] = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: '1 – 3 months' },
  { value: '3-plus-months', label: '3+ months' },
  { value: 'flexible', label: 'Flexible' },
];

// The newsletter/marketing-list signup captured by NewsletterModal.
export const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(254).trim(),
  // Honeypot — bots fill it, humans don't.
  website: z.string().max(0).optional(),
  // Google reCAPTCHA v3 token (set on submit when keys are configured).
  recaptchaToken: z.string().min(1).optional(),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
