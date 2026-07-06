import { FiFeather, FiShield, FiStar } from 'react-icons/fi';

const principles = [
  {
    title: 'Mission',
    description:
      'Create cakes that feel personal, polished, and deeply considered from first slice to last.',
    icon: FiStar,
  },
  {
    title: 'Vision',
    description:
      "Become the region's quiet reference for premium celebration cakes and refined gifting.",
    icon: FiFeather,
  },
  {
    title: 'Standard',
    description:
      'Use careful sourcing, safe handling, and precise finishing as the baseline for every order.',
    icon: FiShield,
  },
] as const;

export const Mission = () => (
  <section data-nav-theme="light" className="section-padding bg-warm-white">
    <div className="container-luxury grid gap-5 md:grid-cols-3">
      {principles.map(({ description, icon: Icon, title }) => (
        <article
          className="rounded-[1.5rem] border border-coffee/10 bg-ivory p-7 shadow-[0_18px_55px_rgb(43_23_18_/_0.07)]"
          key={title}
        >
          <div className="grid size-12 place-items-center rounded-full bg-gold/22 text-fig">
            <Icon aria-hidden="true" className="size-5" />
          </div>
          <h2 className="mt-7 font-display text-3xl text-cocoa">{title}</h2>
          <p className="mt-4 text-sm text-coffee/74">{description}</p>
        </article>
      ))}
    </div>
  </section>
);
