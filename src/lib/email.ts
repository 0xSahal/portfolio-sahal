import type { ContactFormData } from '@/lib/validations';
import { budgetOptions, timelineOptions } from '@/lib/validations';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sahalshaikh.com';
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '';

const SITE_HOST = (() => {
  try {
    return new URL(SITE_URL).host;
  } catch {
    return 'sahalshaikh.com';
  }
})();

const label = (opts: { value: string; label: string }[], value: string) =>
  opts.find((o) => o.value === value)?.label ?? value;

const firstName = (full: string): string => (full.trim().split(/\s+/)[0] ?? full).trim();

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Brand colors inlined as hex; email clients ignore CSS variables and most <style> blocks.
const C = {
  bg: '#FAF7F2',
  surface: '#FFFFFF',
  ink: '#1A1814',
  stone: '#5C5751',
  muted: '#8B8580',
  border: '#E8E2D8',
  accent: '#B8862E',
  accentSoft: '#F7EDD9',
} as const;

const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const SERIF = "'Fraunces',Georgia,'Times New Roman',serif";

function notificationHtml(data: ContactFormData): string {
  const budget = label(budgetOptions, data.budget);
  const timeline = label(timelineOptions, data.timeline);
  const fn = escapeHtml(firstName(data.name));

  const row = (k: string, v: string) => `
    <tr>
      <td width="110" style="padding:8px 0;color:${C.muted};font-size:11px;letter-spacing:0.06em;text-transform:uppercase;vertical-align:top;">${k}</td>
      <td style="padding:8px 0;color:${C.ink};font-size:14px;line-height:1.5;">${v}</td>
    </tr>`;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>New brief</title></head>
<body style="margin:0;padding:0;background:${C.bg};font-family:${SANS};color:${C.ink};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" style="max-width:560px;background:${C.surface};border:1px solid ${C.border};border-radius:12px;overflow:hidden;" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="padding:32px 32px 4px;">
          <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.accent};font-weight:600;">
            <span style="display:inline-block;vertical-align:middle;width:22px;height:1px;background:${C.accent};margin-right:8px;"></span>New brief
          </div>
          <h1 style="margin:12px 0 0;font-family:${SERIF};font-weight:500;font-size:26px;line-height:1.2;color:${C.ink};letter-spacing:-0.01em;">${fn} wants to talk.</h1>
        </td></tr>

        <tr><td style="padding:20px 32px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${row('Name', escapeHtml(data.name))}
            ${row('Email', `<a href="mailto:${escapeHtml(data.email)}" style="color:${C.ink};text-decoration:underline;text-decoration-color:${C.border};text-underline-offset:2px;">${escapeHtml(data.email)}</a>`)}
            ${data.phone ? row('Mobile', escapeHtml(data.phone)) : ''}
            ${row('Budget', escapeHtml(budget))}
            ${row('Timeline', escapeHtml(timeline))}
          </table>
        </td></tr>

        <tr><td style="padding:22px 32px 0;">
          <div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${C.muted};margin-bottom:8px;">What they are building</div>
          <div style="border-left:3px solid ${C.accentSoft};padding:2px 0 2px 14px;font-size:15px;line-height:1.65;color:${C.ink};white-space:pre-wrap;">${escapeHtml(data.projectType)}</div>
        </td></tr>

        ${
          data.message
            ? `<tr><td style="padding:18px 32px 0;">
          <div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${C.muted};margin-bottom:8px;">More from them</div>
          <div style="font-size:14px;line-height:1.65;color:${C.stone};white-space:pre-wrap;">${escapeHtml(data.message)}</div>
        </td></tr>`
            : ''
        }

        <tr><td style="padding:24px 32px 28px;">
          <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:${C.ink};color:${C.bg};padding:12px 20px;border-radius:9999px;text-decoration:none;font-size:14px;font-weight:500;">Reply to ${fn}</a>
        </td></tr>

        <tr><td style="padding:14px 32px;border-top:1px solid ${C.border};background:${C.bg};color:${C.muted};font-size:12px;line-height:1.5;">
          Sent via ${escapeHtml(SITE_HOST)} &middot; ${escapeHtml(new Date().toUTCString())}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function notificationText(data: ContactFormData): string {
  const budget = label(budgetOptions, data.budget);
  const timeline = label(timelineOptions, data.timeline);
  return [
    'NEW BRIEF',
    `${firstName(data.name)} wants to talk.`,
    '',
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    ...(data.phone ? [`Mobile:   ${data.phone}`] : []),
    `Budget:   ${budget}`,
    `Timeline: ${timeline}`,
    '',
    'What they are building',
    '----------------------',
    data.projectType,
    ...(data.message ? ['', 'More from them', '--------------', data.message] : []),
    '',
    `Reply: ${data.email}`,
    `Sent via ${SITE_HOST}`,
  ].join('\n');
}

function autoresponderHtml(data: ContactFormData): string {
  const fn = escapeHtml(firstName(data.name));
  const ctaButton = CALENDLY
    ? `<p style="margin:0 0 18px;"><a href="${escapeHtml(CALENDLY)}" style="display:inline-block;background:${C.ink};color:${C.bg};padding:12px 20px;border-radius:9999px;text-decoration:none;font-size:14px;font-weight:500;">Pick a time</a></p>`
    : '';
  const ctaLine = CALENDLY
    ? `<p style="margin:0 0 14px;">If you already know which day works, you can grab a time here:</p>${ctaButton}`
    : '';

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Got your brief</title></head>
<body style="margin:0;padding:0;background:${C.bg};font-family:${SANS};color:${C.ink};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" style="max-width:560px;background:${C.surface};border:1px solid ${C.border};border-radius:12px;overflow:hidden;" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="padding:36px 32px 8px;">
          <div style="font-family:${SERIF};font-weight:500;font-size:20px;color:${C.ink};letter-spacing:-0.01em;">
            Sahal Shaikh<span style="color:${C.accent};">_</span>
          </div>
        </td></tr>

        <tr><td style="padding:14px 32px 0;">
          <h1 style="margin:0;font-family:${SERIF};font-weight:500;font-size:26px;line-height:1.25;color:${C.ink};letter-spacing:-0.01em;">Got your brief, ${fn}.</h1>
        </td></tr>

        <tr><td style="padding:18px 32px 0;font-size:16px;line-height:1.7;color:${C.ink};">
          <p style="margin:0 0 14px;">Thanks for taking the time to write it up. I read these myself, and I will get back to you within one business day.</p>
          <p style="margin:0 0 14px;">If we are a fit, we will pick a 30-minute call so I can ask the few questions that are not in the form. If we are not, I will say so and try to point you somewhere better.</p>
          ${ctaLine}
          <p style="margin:0 0 4px;">Speak soon,</p>
          <p style="margin:0;font-family:${SERIF};font-style:italic;font-size:18px;color:${C.ink};">Sahal</p>
        </td></tr>

        <tr><td style="padding:28px 32px 28px;">
          <div style="border-top:1px solid ${C.border};padding-top:16px;font-size:12px;color:${C.muted};line-height:1.6;">
            You are receiving this because you sent a project brief through <a href="${escapeHtml(SITE_URL)}" style="color:${C.stone};text-decoration:underline;text-decoration-color:${C.border};text-underline-offset:2px;">${escapeHtml(SITE_HOST)}</a>. Just reply to this email to reach me directly.
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function autoresponderText(data: ContactFormData): string {
  return [
    `Got your brief, ${firstName(data.name)}.`,
    '',
    'Thanks for taking the time to write it up. I read these myself, and I will get back to you within one business day.',
    '',
    'If we are a fit, we will pick a 30-minute call so I can ask the few questions that are not in the form. If we are not, I will say so and try to point you somewhere better.',
    '',
    ...(CALENDLY
      ? ['If you already know which day works, you can grab a time here:', CALENDLY, '']
      : []),
    'Speak soon,',
    'Sahal',
    '',
    `You received this because you sent a project brief through ${SITE_HOST}. Just reply to this email to reach me directly.`,
  ].join('\n');
}

// Sends the notification to the site owner, and (when a verified `RESEND_FROM`
// is configured) an autoresponder back to the lead. No-ops with a warning when
// Resend env is missing, so local dev still works.
export async function sendLeadNotification(data: ContactFormData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !to) {
    console.warn('[email] RESEND_API_KEY/CONTACT_EMAIL not set, skipping lead email.');
    return;
  }

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);

  // Notification to the owner. Falls back to Resend's sandbox sender if the
  // verified domain has not been wired up yet; sandbox can only deliver to the
  // account owner, which is exactly who `to` is.
  const sender = from ?? 'Sahal Portfolio <onboarding@resend.dev>';
  const budget = label(budgetOptions, data.budget);
  const timeline = label(timelineOptions, data.timeline);

  await resend.emails.send({
    from: sender,
    to,
    replyTo: data.email,
    subject: `New brief: ${data.name} (${budget}, ${timeline})`,
    html: notificationHtml(data),
    text: notificationText(data),
  });

  // Autoresponder to the lead, gated on `RESEND_FROM` because the Resend
  // sandbox sender cannot deliver to arbitrary recipients.
  if (from) {
    try {
      await resend.emails.send({
        from,
        to: data.email,
        replyTo: to,
        subject: `Got your brief, ${firstName(data.name)}.`,
        html: autoresponderHtml(data),
        text: autoresponderText(data),
      });
    } catch (err) {
      console.error('[email] autoresponder failed:', err);
    }
  }
}
