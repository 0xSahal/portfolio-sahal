const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

/** Minimum v3 score (0–1). Tune in production if needed. */
const MIN_SCORE = 0.5;

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

export function isRecaptchaEnabled(): boolean {
  return Boolean(RECAPTCHA_SITE_KEY && process.env.RECAPTCHA_SECRET_KEY);
}

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
};

export async function verifyRecaptchaToken(
  token: string,
  expectedAction: string,
): Promise<{ ok: true; score: number } | { ok: false }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { ok: true, score: 1 };
  }

  let data: RecaptchaVerifyResponse;
  try {
    const res = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    data = (await res.json()) as RecaptchaVerifyResponse;
  } catch (err) {
    console.error('[recaptcha] verification request failed:', err);
    return { ok: false };
  }

  if (!data.success) {
    console.error('[recaptcha] verification rejected:', data['error-codes']);
    return { ok: false };
  }

  if (data.action !== expectedAction) {
    console.error('[recaptcha] action mismatch:', data.action, 'expected', expectedAction);
    return { ok: false };
  }

  const score = data.score ?? 0;
  if (score < MIN_SCORE) {
    console.error('[recaptcha] score below threshold:', score);
    return { ok: false };
  }

  return { ok: true, score };
}
