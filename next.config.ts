import type { NextConfig } from 'next';

const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://assets.calendly.com https://www.googletagmanager.com https://cdn-cookieyes.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://cdn-cookieyes.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob:",
  "font-src 'self'",
  "connect-src 'self' https://api.resend.com https://*.mongodb.net https://*.sanity.io https://*.api.sanity.io https://*.apicdn.sanity.io wss://*.api.sanity.io https://calendly.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://log.cookieyes.com https://cdn-cookieyes.com",
  'frame-src https://calendly.com https://cdn-cookieyes.com',
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Sanity-hosted blog images (cover + inline) served via the image CDN.
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
