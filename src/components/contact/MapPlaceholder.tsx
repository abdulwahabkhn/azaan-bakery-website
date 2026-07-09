export const MapPlaceholder = () => (
  <section data-nav-theme="light" className="section-padding bg-ivory">
    <div className="container-luxury">
      <div className="relative min-h-[24rem] overflow-hidden rounded-[1.8rem] border border-border bg-[linear-gradient(135deg,#FFF7E6,#ffffff_46%,#7DD3FC)] shadow-luxury">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(29,78,216,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(29,78,216,0.14)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute left-[20%] top-[26%] h-px w-[64%] rotate-[-12deg] bg-coffee/20" />
        <div className="absolute left-[18%] top-[58%] h-px w-[70%] rotate-[8deg] bg-coffee/18" />
        <div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold bg-navy text-gold shadow-lift">
          <span className="font-display text-3xl">A</span>
        </div>
        <div className="absolute bottom-6 left-6 right-6 rounded-[1.2rem] border border-white/70 bg-warm-white/78 p-5 backdrop-blur-xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-fig">
            Azaan Bakers | Jaranwala
          </p>
          <p className="mt-2 text-sm text-coffee/72">
            Exact pickup and delivery details are confirmed with each order.
          </p>
        </div>
      </div>
    </div>
  </section>
);
