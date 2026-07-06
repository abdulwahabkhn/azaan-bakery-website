import { timelineEvents } from '@/data/about';

export const Timeline = () => (
  <section data-nav-theme="blue" className="section-padding bg-cocoa text-ivory">
    <div className="container-luxury">
      <p className="eyebrow text-gold before:bg-gold">Timeline</p>
      <h2 className="mt-5 max-w-3xl font-display text-4xl md:text-6xl">
        A slow rise, shaped by craft.
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {timelineEvents.map((event) => (
          <article className="rounded-[1.4rem] border border-ivory/12 p-6" key={event.year}>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">{event.year}</p>
            <h3 className="mt-5 font-display text-2xl">{event.title}</h3>
            <p className="mt-4 text-sm text-ivory/70">{event.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
