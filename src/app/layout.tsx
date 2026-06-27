import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Fraunces } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/config/site';
import { rootJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/app/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

const HEADLINE = `${siteConfig.name} | ${siteConfig.tagline}`;

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
      className={`${GeistSans.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body>
        <JsonLd data={rootJsonLd()} />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
