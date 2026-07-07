import { GoldenWheat } from '@/components/common/GoldenWheat';
import { LazyImage } from '@/components/common/LazyImage';
import { bakeryImages } from '@/data/productImages';

export const HeroCakeVisual = () => (
  <div className="relative min-h-[34rem] overflow-hidden rounded-3xl border border-gold/45 bg-navy/35 p-4 shadow-[0_32px_90px_rgb(7_31_61_/_0.28)] backdrop-blur lg:min-h-[42rem]">
    <div className="absolute inset-4 overflow-hidden rounded-[1.35rem] border border-gold/35 bg-[linear-gradient(145deg,#071F3D_0%,#0B2D55_58%,#FFF7E6_160%)]">
      <LazyImage
        alt="Azaan Bakers Three Milk Classical Cake"
        className="absolute inset-0"
        eager
        sizes="(min-width: 1024px) 48vw, 100vw"
        src={bakeryImages.classicalThreeMilkCake}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(7_31_61_/_0.02)_0%,rgb(7_31_61_/_0.18)_45%,rgb(7_31_61_/_0.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-center sm:p-9">
        <div className="mx-auto max-w-md">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Signature cake preview
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Three Milk Classical Cake
          </h2>
          <p className="mt-3 text-sm font-semibold text-white/80 sm:text-base">
            Classic three milk softness with Azaan Bakers' signature finish.
          </p>
        </div>
      </div>
    </div>
    <GoldenWheat className="absolute -right-5 -top-8 hidden h-44 w-28 rotate-12 opacity-80 sm:block" />
  </div>
);
