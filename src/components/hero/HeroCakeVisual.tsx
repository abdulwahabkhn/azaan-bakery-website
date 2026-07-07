import { GoldenWheat } from '@/components/common/GoldenWheat';
import { LazyImage } from '@/components/common/LazyImage';
import { bakeryImages } from '@/data/productImages';

export const HeroCakeVisual = () => (
  <div className="relative h-[clamp(260px,58vw,390px)] overflow-hidden rounded-3xl border border-gold/45 bg-navy/35 p-2.5 shadow-[0_24px_70px_rgb(7_31_61_/_0.24)] backdrop-blur sm:h-[clamp(320px,48vw,460px)] sm:p-4 lg:h-[clamp(380px,38vw,500px)]">
    <div className="absolute inset-2.5 overflow-hidden rounded-[1.35rem] border border-gold/35 bg-[linear-gradient(145deg,#071F3D_0%,#0B2D55_58%,#FFF7E6_160%)] sm:inset-4">
      <LazyImage
        alt="Azaan Bakers Three Milk Classical Cake"
        className="absolute inset-0"
        eager
        sizes="(min-width: 1024px) 48vw, 100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center 42%',
        }}
        src={bakeryImages.classicalThreeMilkCake}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(3_18_38_/_0.94)_0%,rgb(3_18_38_/_0.72)_34%,rgb(3_18_38_/_0.28)_64%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-3 text-center min-[360px]:p-4 sm:p-7">
        <div className="mx-auto max-w-md rounded-2xl border border-white/12 bg-navy/20 px-3 py-3 shadow-[0_18px_50px_rgb(3_18_38_/_0.36)] backdrop-blur-[2px] min-[360px]:px-4 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-0">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-gold sm:text-xs sm:tracking-[0.2em]">
            Signature cake preview
          </p>
          <h2 className="mt-2 break-words font-display text-[clamp(1.2rem,5vw,2.25rem)] font-bold leading-[1.08] text-white [overflow-wrap:anywhere] sm:mt-3">
            Three Milk Classical Cake
          </h2>
          <p className="mt-2 text-[0.74rem] font-semibold leading-relaxed text-white/86 min-[360px]:text-sm sm:text-base">
            Classic three milk softness with Azaan Bakers' signature finish.
          </p>
        </div>
      </div>
    </div>
    <GoldenWheat className="absolute -right-5 -top-8 hidden h-44 w-28 rotate-12 opacity-80 sm:block" />
  </div>
);
