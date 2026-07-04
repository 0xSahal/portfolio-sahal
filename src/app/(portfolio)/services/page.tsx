import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import ServicesDetail from '@/components/sections/ServicesDetail';
import Showcase from '@/components/sections/Showcase';
import EngagementModel from '@/components/sections/EngagementModel';
import WhoFor from '@/components/sections/WhoFor';
import Process from '@/components/sections/Process';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import JsonLd from '@/components/seo/JsonLd';
import { servicesShowcase } from '@/data/showcase';
import { faqs } from '@/data/faq';
import { pageMetadata, breadcrumbJsonLd, professionalServiceJsonLd, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Services',
  description:
    'How I help: websites that convert, applications shipped end to end, and a partner who owns the whole thing. Priced on value, not hours.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          professionalServiceJsonLd(),
          faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
        ]}
      />
      <PageHeader
        eyebrow="Services"
        title="What you get, and how we'll work."
        subtitle="One person accountable from the first call to the final deploy, pointed at results, not just delivery."
        media={
          <ImagePlaceholder
            label="Hero visual"
            aspectClassName="aspect-[4/3]"
            roundedClassName="rounded-2xl"
            className="border-border border shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)]"
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
            src="/images/portraits/sahal-services.png"
            alt="Sahal Shaikh walking through how a project works."
            objectClassName="object-cover object-center"
            prompt="An overhead shot of a planning session: a laptop, a notebook with a product roadmap, and a coffee on a warm-toned desk, soft daylight, premium and minimal."
          />
        }
      />
      <ServicesDetail />
      <Showcase
        eyebrow="How the work runs"
        title="From first call to final deploy."
        intro="Three phases, one person accountable throughout. Visuals drop in here as the brand library grows."
        items={servicesShowcase}
        className="border-border border-t"
      />
      <EngagementModel />
      <WhoFor />
      <Process />
      <Faq />
      <FinalCta />
    </>
  );
}
