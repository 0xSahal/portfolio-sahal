import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { sendLeadNotification } from '@/lib/email';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Please check the form and try again.' },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot — silently accept bots without doing anything.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  // Persist the lead (best-effort — needs MONGODB_URI).
  if (process.env.MONGODB_URI) {
    try {
      const [{ connectDB }, { ContactSubmission }] = await Promise.all([
        import('@/lib/db'),
        import('@/models/ContactSubmission'),
      ]);
      await connectDB();
      await ContactSubmission.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        budget: data.budget,
        timeline: data.timeline,
        message: data.message,
        ip,
        userAgent: request.headers.get('user-agent') ?? '',
      });
    } catch (err) {
      console.error('[contact] failed to persist lead:', err);
    }
  }

  // Notify (best-effort — needs RESEND_API_KEY).
  try {
    await sendLeadNotification(data);
  } catch (err) {
    console.error('[contact] failed to send notification:', err);
  }

  return NextResponse.json({ ok: true });
}
