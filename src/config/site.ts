export const siteConfig = {
  name: 'Sahal Shaikh',
  tagline: 'Clarity, shipped.',
  description:
    'I turn ambiguous ideas into websites and products that move the business, end to end, from the first call to the final deploy.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sahalshaikh.com',
  // Shown subtly; positioning is "works with international teams", not location-led.
  availability: 'Working with founders & teams worldwide',
  social: {
    linkedin: 'https://linkedin.com/in/sahal-shaikh',
  },
  contact: {
    // Temporary scheduler now; swap to Calendly once the domain email is set up.
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? '',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@sahalshaikh.com',
    whatsapp: {
      // Full international number, digits only (country code + number). Used to build wa.me URLs.
      number: '919512126663',
      // Prefilled message that lands in the chat. Warm, short, no obligation.
      message: 'Hi Sahal, I came across your portfolio and would like to talk about a project.',
    },
  },
} as const;
