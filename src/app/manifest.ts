import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    scope: '/',
    // 'browser' (vs 'standalone') tells Edge/Chrome this is a regular website,
    // not an installable app, so they stop prompting visitors to install it.
    // Manifest is kept for proper bookmark icons, theme colors, and iOS home-screen.
    display: 'browser',
    background_color: '#faf7f2',
    theme_color: '#1a1814',
    orientation: 'portrait',
    categories: ['business', 'productivity'],
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
