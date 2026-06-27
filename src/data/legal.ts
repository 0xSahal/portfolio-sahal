import { siteConfig } from '@/config/site';

// Content for the /privacy and /terms pages. Plain strings so apostrophes live
// safely in double-quoted TS literals (no JSX entity escaping needed). Paragraph
// and list text supports markdown-style links: [label](/internal), [label](https://x),
// or [label](mailto:you@example.com). Rendered by components/sections/LegalDoc.tsx.

export type LegalBlock = { type: 'p'; text: string } | { type: 'ul'; items: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const email = siteConfig.contact.email;
const emailLink = `[${email}](mailto:${email})`;

// Keep this in sync when the policies change. Format: Month D, YYYY.
const LAST_UPDATED = 'June 27, 2026';

export const privacyDoc: LegalDocument = {
  title: 'Privacy Policy',
  subtitle: 'How I handle the information you share with me.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'The short version',
      blocks: [
        {
          type: 'p',
          text: 'I keep this simple. I only collect the information you choose to share when you get in touch, I use it to reply and to work together, and I never sell it. The detail below explains exactly how it works.',
        },
      ],
    },
    {
      heading: 'Who I am',
      blocks: [
        {
          type: 'p',
          text: `This site is run by ${siteConfig.name}, an independent product engineer. If you have any questions about this policy or your data, you can reach me at ${emailLink}.`,
        },
      ],
    },
    {
      heading: 'Information I collect',
      blocks: [
        { type: 'p', text: 'I collect two kinds of information:' },
        {
          type: 'ul',
          items: [
            'Information you give me. When you fill out the contact form, I collect your name, email address, an optional phone number, and the project details you share, such as your budget and timeline. If you reach out by email, WhatsApp, or by booking a call, I receive whatever you choose to send.',
            'Basic technical information. Like most websites, my hosting provider may automatically log standard data such as your IP address, browser type, and the pages you visit, to keep the site secure and running well.',
          ],
        },
      ],
    },
    {
      heading: 'How I use your information',
      blocks: [
        { type: 'p', text: 'I use the information you share to:' },
        {
          type: 'ul',
          items: [
            'Reply to your message and answer your questions.',
            'Schedule and prepare for a call.',
            'Send you a confirmation that I received your brief.',
            'Discuss and carry out work if we decide to move forward.',
            'Keep basic records of inquiries and projects.',
          ],
        },
      ],
    },
    {
      heading: 'The tools I rely on',
      blocks: [
        {
          type: 'p',
          text: 'To run this site and respond to you, I use a small number of trusted services. They handle data only so I can provide what you asked for, each under its own privacy policy:',
        },
        {
          type: 'ul',
          items: [
            'Vercel, for hosting the website.',
            'MongoDB Atlas, for securely storing contact form submissions.',
            'Resend, for sending email, including my reply and your confirmation.',
            'Calendly, if you choose to book a call. Calendly collects the details you enter to schedule it.',
            'WhatsApp, if you choose to message me there. Your chat is handled by WhatsApp.',
            'Sanity, which powers the articles on the blog. It does not collect your personal information.',
          ],
        },
      ],
    },
    {
      heading: 'Cookies and your browser',
      blocks: [
        {
          type: 'p',
          text: 'This site uses a cookie consent banner (CookieYes) to remember your cookie preferences. Google Analytics runs only if you accept analytics cookies. If you switch between light and dark mode, that preference is saved in your browser so the site remembers it next time. If you open the Calendly scheduler, Calendly may set its own cookies to make booking work. You can change your cookie choices anytime from the banner or the cookie settings link in the site footer.',
        },
      ],
    },
    {
      heading: 'How long I keep it',
      blocks: [
        {
          type: 'p',
          text: 'I keep your information only as long as I need it to respond to you and to keep reasonable business records. If we never end up working together, you can ask me to delete your details at any time.',
        },
      ],
    },
    {
      heading: 'Your choices',
      blocks: [
        {
          type: 'p',
          text: `You can ask me to show you what information I hold, correct it, or delete it. Just email me at ${emailLink} and I will take care of it.`,
        },
      ],
    },
    {
      heading: 'Security',
      blocks: [
        {
          type: 'p',
          text: 'I take reasonable steps to protect your information. No website or method of sending data over the internet is ever completely secure, but I work with established providers and limit who can access what you share.',
        },
      ],
    },
    {
      heading: 'Children',
      blocks: [
        {
          type: 'p',
          text: 'This site is meant for business inquiries and is not directed at children. I do not knowingly collect information from anyone under the age of 16.',
        },
      ],
    },
    {
      heading: 'Changes to this policy',
      blocks: [
        {
          type: 'p',
          text: 'I may update this policy from time to time. When I do, I will change the date at the top of this page, so please check back now and then.',
        },
      ],
    },
    {
      heading: 'Questions',
      blocks: [
        {
          type: 'p',
          text: `If anything here is unclear, I am happy to explain. Email me at ${emailLink} or [get in touch](/contact).`,
        },
      ],
    },
  ],
};

export const termsDoc: LegalDocument = {
  title: 'Terms of Service',
  subtitle: 'The ground rules for using this site.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'The short version',
      blocks: [
        {
          type: 'p',
          text: 'This site is my portfolio and a way to start a conversation about working together. By using it, you agree to the terms below. They are meant to be fair and clear, not to trip you up.',
        },
      ],
    },
    {
      heading: 'About this site',
      blocks: [
        {
          type: 'p',
          text: `This site is owned and operated by ${siteConfig.name}, an independent product engineer. It exists to share my work, explain what I do, and let you get in touch. You can reach me at ${emailLink}.`,
        },
      ],
    },
    {
      heading: 'Using the site',
      blocks: [
        { type: 'p', text: 'You are welcome to browse, read, and share this site. Please do not:' },
        {
          type: 'ul',
          items: [
            'Use it for anything unlawful or harmful.',
            'Try to break, overload, or gain unauthorized access to the site or its systems.',
            'Copy or reuse my content as your own without permission.',
            'Collect data from the site in a way that disrupts it or others.',
          ],
        },
      ],
    },
    {
      heading: 'Content and ownership',
      blocks: [
        {
          type: 'p',
          text: 'Unless noted otherwise, the writing, design, code, and visuals on this site belong to me. Client work shown here is displayed with permission, and the brands and products featured remain the property of their respective owners. Please do not reuse my content for commercial purposes without my written consent.',
        },
      ],
    },
    {
      heading: 'Inquiries are not a contract',
      blocks: [
        {
          type: 'p',
          text: 'Sending a brief, booking a call, or messaging me does not create a binding agreement to work together, and nothing on this site is a formal offer. Any project we take on will be governed by a separate written agreement that we both approve, setting out scope, timeline, and payment.',
        },
      ],
    },
    {
      heading: 'No guarantees',
      blocks: [
        {
          type: 'p',
          text: 'I share examples of past work and outcomes to give you a sense of what I do. They are not a promise of specific results for your project. The site is provided as it is, and while I work hard to keep it accurate and available, I cannot guarantee it will always be error-free or uninterrupted.',
        },
      ],
    },
    {
      heading: 'Limitation of liability',
      blocks: [
        {
          type: 'p',
          text: 'To the extent allowed by law, I am not liable for any indirect or consequential loss arising from your use of this site. Your use of the site is at your own risk.',
        },
      ],
    },
    {
      heading: 'Links to other sites',
      blocks: [
        {
          type: 'p',
          text: 'This site may link to other websites, such as a live client project or my LinkedIn. I am not responsible for the content or privacy practices of sites I do not control, so visiting them is at your own discretion.',
        },
      ],
    },
    {
      heading: 'Privacy',
      blocks: [
        {
          type: 'p',
          text: 'Your privacy matters. Please read the [Privacy Policy](/privacy) to understand how I handle the information you share.',
        },
      ],
    },
    {
      heading: 'Governing law',
      blocks: [
        {
          type: 'p',
          text: 'These terms are governed by the laws of India. Any disputes will be subject to the courts located in India.',
        },
      ],
    },
    {
      heading: 'Changes to these terms',
      blocks: [
        {
          type: 'p',
          text: 'I may update these terms from time to time. When I do, I will change the date at the top of this page. Continuing to use the site after a change means you accept the updated terms.',
        },
      ],
    },
    {
      heading: 'Questions',
      blocks: [
        {
          type: 'p',
          text: `If you have any questions about these terms, email me at ${emailLink} or [get in touch](/contact).`,
        },
      ],
    },
  ],
};
