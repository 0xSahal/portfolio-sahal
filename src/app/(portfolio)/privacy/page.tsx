import type { Metadata } from 'next';
import LegalDoc from '@/components/sections/LegalDoc';
import JsonLd from '@/components/seo/JsonLd';
import { privacyDoc } from '@/data/legal';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Sahal Shaikh collects, uses, and protects the information you share through this site.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />
      <LegalDoc doc={privacyDoc} />
    </>
  );
}
