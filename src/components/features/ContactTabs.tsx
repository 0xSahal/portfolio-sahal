'use client';

import { useState } from 'react';
import { FileText, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import ContactForm from './ContactForm';
import CalendlyWidget from './CalendlyWidget';

type TabId = 'form' | 'call';

export default function ContactTabs() {
  const calendly = siteConfig.contact.calendly;
  const [active, setActive] = useState<TabId>('form');
  // Mount-on-first-visit keep-alive: Calendly needs a visible container to size
  // itself, so we wait to mount it until the user actually opens the call tab.
  // The form is mounted from the start so its state survives tab switches.
  const [seen, setSeen] = useState<Set<TabId>>(() => new Set<TabId>(['form']));

  // No Calendly URL configured? Show the form alone, no tabs.
  if (!calendly) {
    return (
      <div className="rounded-card border-border bg-surface overflow-hidden border">
        <ContactForm />
      </div>
    );
  }

  const select = (id: TabId) => {
    setActive(id);
    setSeen((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  };

  const tabs = [
    { id: 'form' as const, label: 'Send a brief', icon: FileText },
    { id: 'call' as const, label: 'Book a call', icon: CalendarCheck },
  ];

  return (
    <div className="rounded-card border-border bg-surface overflow-hidden border">
      <div
        role="tablist"
        aria-label="Get in touch"
        className="border-border bg-bg-secondary/40 grid grid-cols-2 border-b"
      >
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              id={`contact-tab-${t.id}`}
              type="button"
              aria-selected={isActive}
              aria-controls={`contact-panel-${t.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(t.id)}
              className={cn(
                'group focus-visible:ring-accent/40 relative flex items-center justify-center gap-2.5 px-4 py-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2',
                isActive
                  ? 'text-text-primary'
                  : 'text-text-muted hover:bg-surface hover:text-text-secondary',
              )}
            >
              <Icon
                size={15}
                className={cn('transition-colors', isActive ? 'text-accent' : 'text-current')}
              />
              <span>{t.label}</span>
              <span
                aria-hidden
                className={cn(
                  'bg-accent pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] transition-opacity duration-200',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
              />
            </button>
          );
        })}
      </div>

      {seen.has('form') && (
        <div
          role="tabpanel"
          id="contact-panel-form"
          aria-labelledby="contact-tab-form"
          hidden={active !== 'form'}
        >
          <ContactForm onPreferCall={() => select('call')} />
        </div>
      )}

      {seen.has('call') && (
        <div
          role="tabpanel"
          id="contact-panel-call"
          aria-labelledby="contact-tab-call"
          hidden={active !== 'call'}
          className="p-4 sm:p-6"
        >
          <CalendlyWidget url={calendly} />
        </div>
      )}
    </div>
  );
}
