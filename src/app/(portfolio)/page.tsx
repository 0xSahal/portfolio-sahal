import Hero from '@/components/sections/Hero';
import SocialProof from '@/components/sections/SocialProof';
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
      <SocialProof />
      <Problem />
      <Services />
      <FeaturedWork />
      <VideoTestimonials />
      <Process />
      <WhyMe />
      <AboutTeaser />
      <Faq />
      <LatestPosts />
      <FinalCta />
    </>
  );
}
