import { faqs } from '@/data/faqs';

export const FAQ = () => (
  <section data-nav-theme="light" className="section-padding bg-warm-white">
    <div className="container-luxury">
      <p className="eyebrow">FAQ</p>
      <h2 className="mt-5 max-w-2xl font-display text-4xl text-cocoa md:text-6xl">
        Common order questions.
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {faqs.map((item) => (
          <article
            className="rounded-[1.5rem] border border-coffee/10 bg-ivory p-6 shadow-luxury"
            key={item.question}
          >
            <h3 className="font-display text-2xl text-cocoa">{item.question}</h3>
            <p className="mt-4 text-sm text-coffee/72">{item.answer}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
