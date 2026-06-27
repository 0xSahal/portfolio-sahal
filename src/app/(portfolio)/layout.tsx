import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileCtaBar from '@/components/layout/MobileCtaBar';
import WhatsAppButton from '@/components/features/WhatsAppButton';

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileCtaBar />
      <WhatsAppButton />
    </>
  );
}
