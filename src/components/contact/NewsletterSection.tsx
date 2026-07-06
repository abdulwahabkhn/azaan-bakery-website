import { NewsletterForm } from '@/components/contact/NewsletterForm';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';

export const NewsletterSection = () => (
  <section data-nav-theme="light" className="section-padding bg-cream">
    <div className="container-luxury text-center">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Newsletter"
          title="Seasonal notes from the bakery."
          description="Join for limited cake releases, custom order windows, and refined gifting ideas."
        />
      </Reveal>
      <div className="mt-9">
        <NewsletterForm />
      </div>
    </div>
  </section>
);
