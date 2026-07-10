import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Services from '@/components/sections/Services';
import FeaturedWork from '@/components/sections/FeaturedWork';
import VideoTestimonials from '@/components/sections/VideoTestimonials';
import Process from '@/components/sections/Process';
import WhyMe from '@/components/sections/WhyMe';
import AboutTeaser from '@/components/sections/AboutTeaser';
import Faq from '@/components/sections/Faq';
import LatestPosts from '@/components/sections/LatestPosts';
import FinalCta from '@/components/sections/FinalCta';

// Hourly fallback so the LatestPosts strip is never frozen; the Sanity webhook
// at /api/revalidate purges the 'post' tag on publish for near-instant updates.
// Keep in sync with BLOG_REVALIDATE in sanity/lib/client.ts.
export const revalidate = 3600;

export default function PortfolioPage() {
  return (
    <>
      <Hero />
      <VideoTestimonials index="01" />
      <Problem />
      <Services />
      <FeaturedWork />
      <Process index="05" />
      <WhyMe />
      <AboutTeaser />
      <Faq index="08" />
      <LatestPosts />
      <FinalCta />
    </>
  );
}
