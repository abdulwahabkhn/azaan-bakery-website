import { Outlet } from 'react-router-dom';

import { CartDrawer } from '@/components/cart/CartDrawer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { SkipLink } from '@/components/common/SkipLink';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { useLenis } from '@/hooks/useLenis';

export const RootLayout = () => {
  useLenis();

  return (
    <>
      <SkipLink />
      <Navbar />
      <CartDrawer />
      <ScrollToTop />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
