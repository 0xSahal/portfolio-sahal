import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import FeaturedWork from '@/components/sections/FeaturedWork';
import Showcase from '@/components/sections/Showcase';
import VideoTestimonials from '@/components/sections/VideoTestimonials';
import WrittenTestimonials from '@/components/sections/WrittenTestimonials';
import Products from '@/components/sections/Products';
import FinalCta from '@/components/sections/FinalCta';
import JsonLd from '@/components/seo/JsonLd';
import { workShowcase } from '@/data/showcase';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Work',
  description:
    "Selected results, client testimonials, and the products I've built and operate myself.",
  path: '/work',
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />
      <PageHeader
        eyebrow="Work"
        title="Proof over promises."
        subtitle="Real results, real clients on camera, and the products I've shipped for myself."
        media={
          <ImagePlaceholder
            label="Hero visual"
            aspectClassName="aspect-[4/3]"
            roundedClassName="rounded-2xl"
            className="border-border border shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)]"
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
            src="/images/portraits/sahal-desk.jpg"
            alt="Sahal Shaikh at his three-monitor workspace, mid-build."
            objectClassName="object-cover object-center"
            prompt="A confident product engineer at a clean desk reviewing a live website on a laptop, warm natural light, premium minimal workspace, candid and approachable."
          />
        }
      />
      <Showcase
        eyebrow="A look at the work"
        title="What shipping looks like."
        intro="Real projects, real businesses, all built end to end. Tap a card to see the live site."
        items={workShowcase}
        variant="cases"
      />
      <FeaturedWork />
      <VideoTestimonials />
      <WrittenTestimonials />
      <Products />
      <FinalCta />
    </>
  );
}
