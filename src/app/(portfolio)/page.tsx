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

export default function PortfolioPage() {
  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <FeaturedWork />
      <VideoTestimonials />
      <Process index="04" />
      <WhyMe />
      <AboutTeaser />
      <Faq index="07" />
      <LatestPosts />
      <FinalCta />
    </>
  );
}
