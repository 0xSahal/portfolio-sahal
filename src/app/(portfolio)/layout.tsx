import Navbar from '@/components/layout/Navbar';
import NoticeBar from '@/components/layout/NoticeBar';
import Footer from '@/components/layout/Footer';
import MobileCtaBar from '@/components/layout/MobileCtaBar';
import WhatsAppButton from '@/components/features/WhatsAppButton';
import NewsletterModal from '@/components/features/NewsletterModal';

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoticeBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileCtaBar />
      <WhatsAppButton />
      <NewsletterModal />
    </>
  );
}
