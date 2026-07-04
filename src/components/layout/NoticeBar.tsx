'use client';

import { Mail, Phone } from 'lucide-react';
import Container from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { OPEN_NEWSLETTER_EVENT } from '@/components/features/NewsletterModal';

// Slim contact strip above the navbar: direct lines on the left, and a link to
// reopen the newsletter modal on the right (for anyone who dismissed the timed
// popup but wants in later).
export default function NoticeBar() {
  return (
    <div className="border-border bg-bg-secondary/60 border-b">
      <Container className="flex h-9 items-center justify-between gap-4 text-xs">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-text-secondary hover:text-text-primary flex min-w-0 items-center gap-1.5 transition-colors"
          >
            <Mail size={12} className="text-text-muted shrink-0" aria-hidden />
            <span className="truncate">{siteConfig.contact.email}</span>
          </a>
          <a
            href={`tel:${siteConfig.contact.phone.tel}`}
            className="text-text-secondary hover:text-text-primary hidden items-center gap-1.5 transition-colors sm:flex"
          >
            <Phone size={12} className="text-text-muted shrink-0" aria-hidden />
            {siteConfig.contact.phone.display}
          </a>
        </div>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_NEWSLETTER_EVENT))}
          className="text-accent hover:text-accent-strong shrink-0 cursor-pointer font-medium transition-colors"
        >
          Get updates
        </button>
      </Container>
    </div>
  );
}
