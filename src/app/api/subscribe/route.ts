import { NextResponse } from 'next/server';
import { subscribeSchema } from '@/lib/validations';
import { sendSubscriberNotification } from '@/lib/email';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { isRecaptchaEnabled, verifyRecaptchaToken } from '@/lib/recaptcha';

const SUBSCRIBE_RECAPTCHA_ACTION = 'newsletter_subscribe';

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = rateLimit(ip, { maxRequests: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 422 },
    );
  }

  const { recaptchaToken, website, email } = parsed.data;

  // Honeypot — silently accept bots without doing anything.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (isRecaptchaEnabled()) {
    if (!recaptchaToken) {
      return NextResponse.json(
        { ok: false, error: 'Verification failed. Please try again.' },
        { status: 422 },
      );
    }

    const verification = await verifyRecaptchaToken(recaptchaToken, SUBSCRIBE_RECAPTCHA_ACTION);
    if (!verification.ok) {
      return NextResponse.json(
        { ok: false, error: 'Verification failed. Please try again.' },
        { status: 403 },
      );
    }
  }

  // Persist the subscriber (best-effort — needs MONGODB_URI). A duplicate email
  // (unique index) means they're already on the list, not an error, and we skip
  // re-sending the notification/welcome emails for it.
  let isNewSubscriber = true;
  if (process.env.MONGODB_URI) {
    try {
      const [{ connectDB }, { Subscriber }] = await Promise.all([
        import('@/lib/db'),
        import('@/models/Subscriber'),
      ]);
      await connectDB();
      await Subscriber.create({
        email,
        source: 'timed-modal',
        ip,
        userAgent: request.headers.get('user-agent') ?? '',
      });
    } catch (err: unknown) {
      const isDuplicate =
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code?: number }).code === 11000;
      if (isDuplicate) {
        isNewSubscriber = false;
      } else {
        console.error('[subscribe] failed to persist subscriber:', err);
      }
    }
  }

  // Notify (best-effort — needs RESEND_API_KEY).
  if (isNewSubscriber) {
    try {
      await sendSubscriberNotification(email);
    } catch (err) {
      console.error('[subscribe] failed to send notification:', err);
    }
  }

  return NextResponse.json({ ok: true });
}
