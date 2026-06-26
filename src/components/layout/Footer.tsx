import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
import { siteConfig } from '@/config/site';
import { footerLinks, primaryCta } from '@/config/navigation';
import Container from '@/components/ui/Container';
import Logo from '@/components/layout/Logo';

export default function Footer() {
  return (
    <footer className="border-border bg-bg-secondary border-t">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Sahal, home" className="inline-block">
              <Logo className="text-[1.75rem]" />
            </Link>
            <p className="text-text-secondary mt-3 max-w-xs text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <Link
              href={primaryCta.href}
              className="text-accent hover:text-accent-strong mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors"
            >
              {primaryCta.label} <ArrowRight size={15} />
            </Link>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="text-text-muted text-xs font-medium tracking-wide uppercase">Site</p>
            {footerLinks.site.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-text-muted text-xs font-medium tracking-wide uppercase">Connect</p>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary inline-flex items-center gap-2 text-sm transition-colors"
            >
              <LinkedInIcon size={15} /> LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-text-secondary hover:text-text-primary text-sm transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

        <div className="border-border text-text-muted mt-14 flex flex-col gap-4 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
