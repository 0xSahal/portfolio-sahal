import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileCtaBar from '@/components/layout/MobileCtaBar';
import WhatsAppButton from '@/components/features/WhatsAppButton';
import { SanityLive } from '@/sanity/lib/live';

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileCtaBar />
      <WhatsAppButton />
      {/* Enables real-time updates for content fetched via sanityFetch. */}
      <SanityLive />
    </>
  );
}
