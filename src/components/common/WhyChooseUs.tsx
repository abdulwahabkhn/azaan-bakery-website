import { FiAward, FiClock, FiGift, FiShield } from 'react-icons/fi';

import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';

const reasons = [
  {
    title: 'Balanced sweetness',
    description: 'Creams, soaks, and glazes are tuned for flavor clarity instead of sugar weight.',
    icon: FiAward,
  },
  {
    title: 'Made to schedule',
    description: 'Orders are timed around freshness, finishing, and careful handoff.',
    icon: FiClock,
  },
  {
    title: 'Gift presentation',
    description: 'Packaging is prepared to feel refined before the first slice is served.',
    icon: FiGift,
  },
  {
    title: 'Safe handling',
    description:
      'Production flow is built around clean prep, controlled storage, and traceable orders.',
    icon: FiShield,
  },
] as const;

export const WhyChooseUs = () => (
  <section data-nav-theme="light" className="section-padding bg-light-blue">
    <div className="container-luxury">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Why choose us"
          title="Craft that feels calm, precise, and personal."
          description="A premium cake is more than decoration. It is texture, timing, packaging, and the confidence that every detail has been handled."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {reasons.map(({ description, icon: Icon, title }, index) => (
          <Reveal delay={index * 0.05} key={title}>
            <article className="h-full rounded-2xl border border-border bg-surface p-6 shadow-[0_18px_50px_rgb(30_41_59_/_0.07)]">
              <div className="grid size-12 place-items-center rounded-full bg-light-blue text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <h3 className="mt-7 font-display text-2xl text-ink">{title}</h3>
              <p className="mt-4 text-sm text-muted">{description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
