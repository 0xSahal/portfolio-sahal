import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Bricolage_Grotesque } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/config/site';
import { rootJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import CookieYesBanner from '@/components/features/CookieYesBanner';
import { ReCaptchaProvider } from '@/components/features/ReCaptchaProvider';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/app/globals.css';

// Display face: Bricolage Grotesque — a distinctive, contemporary grotesque that
// reads as "designed by a person", not the Fraunces/serif AI default. Variable
// weights cover the full hierarchy. Loaded into --font-display (mapped to the
// `font-serif` token in globals so existing markup picks it up site-wide).
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Homepage title — includes role + audience so search results and social
// previews say what Sahal does, not just the brand tagline. Inner pages keep
// the brand-only template via `template` below.
const HEADLINE = `${siteConfig.name} | Product Engineer for Founders & Small Teams`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7f2' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1814' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: HEADLINE,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  generator: 'Next.js',
  category: 'technology',
  keywords: [
    'Sahal Shaikh',
    'product engineer',
    'independent engineer',
    'freelance developer',
    'Next.js developer',
    'web development',
    'web application development',
    'product engineering',
    'website consulting',
    'conversion-focused websites',
  ],
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: siteConfig.name,
    title: HEADLINE,
    description: siteConfig.description,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: HEADLINE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HEADLINE,
    description: siteConfig.description,
    images: ['/images/og-image.jpg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body>
        <CookieYesBanner />
        <JsonLd data={rootJsonLd()} />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReCaptchaProvider>{children}</ReCaptchaProvider>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
