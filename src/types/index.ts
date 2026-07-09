export interface Service {
  id: string;
  title: string;
  outcome: string;
  description: string;
  icon: string;
  includes?: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

// Anonymized client results (NDA-safe) shown in the work / featured sections.
export interface Outcome {
  id: string;
  category: string;
  summary: string;
  metricLabel: string;
  metricValue: string;
}

// Products Sahal built and operates himself — proof of end-to-end ownership.
export interface PersonalProduct {
  id: string;
  name: string;
  description: string;
  tech: string[];
  live: string;
  image?: string; // screenshot under /public; falls back to a prompt placeholder
  imagePrompt?: string; // shown until a real screenshot is set
}

// A visual slot in a Showcase band. Renders the real image when `src` is set,
// otherwise shows the `prompt` so art can be generated and added later.
export interface ShowcaseItem {
  label: string;
  caption?: string;
  prompt: string;
  src?: string;
  alt?: string;
  url?: string;
  urlDisabled?: boolean;
  objectClassName?: string;
  // Optional video alternative (autoplay, muted, looped). Wins over `src`.
  video?: string;
  // Poster shown before the video can play. Defaults to `src` when omitted.
  videoPoster?: string;
  // Small uppercase eyebrow above the label, e.g. 'Healthcare', 'Staffing'.
  category?: string;
}

export interface VideoTestimonial {
  id: string;
  src: string;
  thumbnail: string;
  company: string;
  companyUrl?: string;
  location?: string;
  // Drives the player frame: 'portrait' (phone/reel, 9:16) or 'landscape'
  // (webcam, 16:9). Defaults to landscape. Never crop across orientations.
  orientation?: 'portrait' | 'landscape';
  // Optional: only set when the client has approved naming the person, and
  // never invent a pull-quote — the video speaks for itself.
  clientName?: string;
  role?: string;
  quote?: string;
  // Human-readable length shown next to the player, e.g. "0:46".
  duration?: string;
}

export interface WrittenTestimonial {
  id: string;
  text: string;
  author: string;
  initials: string;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
}

// A single position held at a company (companies can have more than one — e.g. a
// promotion from intern to engineer).
export interface ExperienceRole {
  title: string;
  period: string; // human-readable month range, e.g. 'Dec 2024 — Mar 2026'
  isCurrent?: boolean;
  description: string;
  highlights?: string[];
  tags: string[];
}

// A recognition / award earned at a company (real, verifiable proof). The
// certificate image is shown directly in the timeline.
export interface Award {
  title: string;
  detail?: string; // e.g. a date or qualifier
  image: string; // path to the certificate image under /public
  width: number; // intrinsic dimensions, for correct aspect ratio
  height: number;
}

// One employer in the career timeline, grouping all roles held there.
export interface ExperienceEntry {
  id: string;
  company: string;
  companyUrl?: string;
  logo?: string; // path under /public (e.g. '/images/logos/reveation.png'); falls back to a monogram
  location?: string;
  period: string; // overall span across roles at this company
  roles: ExperienceRole[];
  awards?: Award[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export type Budget = 'under-1k' | '1k-3k' | '3k-7k' | '7k-plus' | 'not-sure';

export type Timeline = 'asap' | '1-3-months' | '3-plus-months' | 'flexible';

export interface IContactSubmission {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: Budget;
  timeline: Timeline;
  message?: string;
  ip: string;
  userAgent: string;
  createdAt: Date;
  status: 'new' | 'read' | 'replied';
}

// A marketing-list signup captured by the timed NewsletterModal (or any future
// signup surface, hence `source`), separate from the qualifying-brief leads.
export interface ISubscriber {
  email: string;
  source: string;
  ip: string;
  userAgent: string;
  createdAt: Date;
  status: 'subscribed' | 'unsubscribed';
}
