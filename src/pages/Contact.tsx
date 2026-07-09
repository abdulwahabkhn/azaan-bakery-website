import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { ContactDetails } from '@/components/contact/ContactDetails';
import { ContactForm } from '@/components/contact/ContactForm';
import { FAQ } from '@/components/contact/FAQ';
import { MapPlaceholder } from '@/components/contact/MapPlaceholder';
import { SEO } from '@/components/common/SEO';
import { SectionHeading } from '@/components/common/SectionHeading';
import { useCart } from '@/hooks/useCart';
import { formatCartSummary } from '@/utils/cart';
import { isRemovedProductName } from '@/utils/removedProducts';

import type { CartCheckoutState } from '@/types/cart';

const Contact = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const checkoutState = location.state as CartCheckoutState | null;
  const checkoutItems = (
    Array.isArray(checkoutState?.cartItems) ? checkoutState.cartItems : cartItems
  ).filter((item) => !isRemovedProductName(item.name));
  const checkoutTotal = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const orderDetails = useMemo(
    () => (checkoutItems.length > 0 ? formatCartSummary(checkoutItems, checkoutTotal) : ''),
    [checkoutItems, checkoutTotal],
  );

  return (
    <>
      <SEO
        title="Contact Azaan Bakers | Bakery in Jaranwala"
        description="Contact Azaan Bakers in Jaranwala. Email azaanbakers@gmail.com. Opening hours are 6:00 AM to 1:00 AM."
        canonicalPath="/contact"
      />
      <section
        data-nav-theme="blue"
        className="bg-[linear-gradient(135deg,#071F3D_0%,#0B2D55_72%,#22B8F0_160%)] pb-16 pt-36 md:pt-44"
      >
        <div className="container-luxury">
          <SectionHeading
            className="[&_.eyebrow]:text-gold [&_h1]:text-white [&_h1~p]:text-slate-300"
            eyebrow="Contact"
            headingLevel="h1"
            title="Plan a cake with the studio."
            description="Share the occasion, date, flavor direction, and guest count. The team will guide the next step with care."
          />
        </div>
      </section>

      <section data-nav-theme="light" className="section-padding bg-warm-white pt-0">
        <div className="container-luxury grid gap-8 lg:grid-cols-[1fr_0.42fr]">
          <ContactForm cartTotal={checkoutTotal} initialOrderDetails={orderDetails} />
          <ContactDetails />
        </div>
      </section>

      <MapPlaceholder />
      <FAQ />
    </>
  );
};

export default Contact;
