'use client';

import Script from 'next/script';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

type ReCaptchaContextValue = {
  ready: boolean;
  executeRecaptcha: (action: string) => Promise<string | null>;
};

const ReCaptchaContext = createContext<ReCaptchaContextValue | null>(null);

const noopRecaptcha: ReCaptchaContextValue = {
  ready: true,
  executeRecaptcha: async () => null,
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  const executeRecaptcha = useCallback(
    async (action: string) => {
      if (!SITE_KEY || !ready || !window.grecaptcha) return null;
      try {
        return await window.grecaptcha.execute(SITE_KEY, { action });
      } catch (err) {
        console.error('[recaptcha] execute failed:', err);
        return null;
      }
    },
    [ready],
  );

  const value = useMemo(
    () => ({
      ready: SITE_KEY ? ready : true,
      executeRecaptcha,
    }),
    [ready, executeRecaptcha],
  );

  if (!SITE_KEY) {
    return <>{children}</>;
  }

  return (
    <ReCaptchaContext.Provider value={value}>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
        strategy="afterInteractive"
        onLoad={() => {
          window.grecaptcha?.ready(() => setReady(true));
        }}
      />
      {children}
    </ReCaptchaContext.Provider>
  );
}

export function useReCaptcha(): ReCaptchaContextValue {
  const ctx = useContext(ReCaptchaContext);
  if (!SITE_KEY) return noopRecaptcha;
  if (!ctx) {
    throw new Error('useReCaptcha must be used within ReCaptchaProvider');
  }
  return ctx;
}
