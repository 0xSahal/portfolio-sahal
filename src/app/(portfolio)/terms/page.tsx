import type { Metadata } from 'next';
import LegalDoc from '@/components/sections/LegalDoc';
import JsonLd from '@/components/seo/JsonLd';
import { termsDoc } from '@/data/legal';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'The terms for using this site, including content ownership, inquiries, and liability.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms' },
        ])}
      />
      <LegalDoc doc={termsDoc} />
    </>
  );
}
