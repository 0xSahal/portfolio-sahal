'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ArrowRight } from 'lucide-react';
import {
  contactSchema,
  budgetOptions,
  timelineOptions,
  type ContactFormData,
} from '@/lib/validations';
import { siteConfig } from '@/config/site';

const field =
  'w-full rounded-input border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors';
const label = 'mb-1.5 block text-sm font-medium text-text-primary';
const err = 'mt-1.5 text-xs text-red-500';

function Req() {
  return (
    <span className="text-accent ml-0.5" aria-label="required">
      *
    </span>
  );
}

interface ContactFormProps {
  // Provided by ContactTabs to switch the user over to the calendar tab from the
  // success state. Omitted when the form is rendered standalone.
  onPreferCall?: () => void;
}

export default function ContactForm({ onPreferCall }: ContactFormProps = {}) {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { budget: undefined, timeline: undefined, phone: '' },
  });

  const { onChange: onPhoneChange, ...phoneReg } = register('phone');

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setServerError(json?.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setDone(true);
    } catch {
      setServerError('Network error. Please try again.');
    }
  };

  if (done) {
    return (
      <div className="p-8 text-center md:p-10">
        <span className="bg-accent-soft text-accent mx-auto flex h-14 w-14 items-center justify-center rounded-full">
          <Check size={24} />
        </span>
        <h3 className="text-text-primary mt-6 font-serif text-2xl font-medium">Brief received.</h3>
        <p className="text-text-secondary mx-auto mt-3 max-w-sm text-sm leading-relaxed">
          I read every one of these personally and will reach out within one business day.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
          {onPreferCall && (
            <button
              type="button"
              onClick={onPreferCall}
              className="group text-accent inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
            >
              Or pick a time now
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          )}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
          >
            Or email me directly
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 md:p-8">
      <div
        aria-hidden
        className="absolute left-[-9999px]"
        style={{ height: 0, overflow: 'hidden' }}
      >
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <p className="text-text-muted mb-6 text-xs">
        Fields marked <span className="text-accent">*</span> are required.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            Your name <Req />
          </label>
          <input id="cf-name" autoComplete="name" className={field} {...register('name')} />
          {errors.name && <p className={err}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            Email <Req />
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            className={field}
            {...register('email')}
          />
          {errors.email && <p className={err}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-phone" className={label}>
          Mobile <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <input
          id="cf-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
          placeholder="10-digit number"
          className={field}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
            onPhoneChange(e);
          }}
          {...phoneReg}
        />
        {errors.phone && <p className={err}>{errors.phone.message}</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="cf-project" className={label}>
          What are you building? <Req />
        </label>
        <textarea
          id="cf-project"
          rows={4}
          placeholder="A sentence or two is plenty."
          className={field}
          {...register('projectType')}
        />
        {errors.projectType && <p className={err}>{errors.projectType.message}</p>}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-budget" className={label}>
            Budget range <Req />
          </label>
          <select id="cf-budget" className={field} defaultValue="" {...register('budget')}>
            <option value="" disabled>
              Select a range
            </option>
            {budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.budget && <p className={err}>{errors.budget.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-timeline" className={label}>
            Timeline <Req />
          </label>
          <select id="cf-timeline" className={field} defaultValue="" {...register('timeline')}>
            <option value="" disabled>
              Select a timeline
            </option>
            {timelineOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.timeline && <p className={err}>{errors.timeline.message}</p>}
        </div>
      </div>

      {serverError && (
        <p className="rounded-input mt-4 border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm text-red-500">
          {serverError}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group rounded-input bg-text-primary text-bg inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-12px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_14px_32px_-12px_rgba(0,0,0,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <>
              Send brief
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
        <p className="text-text-muted text-xs leading-relaxed">
          I personally read every brief and reply within 24 hours.
        </p>
      </div>
    </form>
  );
}
