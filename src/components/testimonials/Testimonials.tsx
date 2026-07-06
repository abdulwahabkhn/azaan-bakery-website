import { FiStar } from 'react-icons/fi';

import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { testimonials } from '@/data/testimonials';

export const Testimonials = () => (
  <section data-nav-theme="light" className="section-padding bg-page">
    <div className="container-luxury">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Customer testimonials"
          title="Celebrations remembered for the right reasons."
          description="Client notes from intimate dinners, weddings, gifting orders, and family milestones."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal delay={index * 0.06} key={testimonial.id}>
            <figure className="h-full rounded-2xl border border-border bg-surface p-7 shadow-[0_18px_50px_rgb(30_41_59_/_0.07)]">
              <div className="flex gap-1 text-gold" aria-label="Five star review">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <FiStar aria-hidden="true" className="size-4 fill-current" key={starIndex} />
                ))}
              </div>
              <blockquote className="mt-6 text-muted">"{testimonial.quote}"</blockquote>
              <figcaption className="mt-7">
                <p className="font-semibold text-ink">{testimonial.author}</p>
                <p className="mt-1 text-sm text-muted">{testimonial.occasion}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
