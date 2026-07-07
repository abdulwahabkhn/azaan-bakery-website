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
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(3_18_38_/_0.22)_0%,transparent_44%,rgb(3_18_38_/_0.18)_100%)]" />
      <div className="absolute left-1/2 top-[clamp(1rem,5vw,2rem)] z-10 w-[min(90%,32rem)] -translate-x-1/2 text-center text-gold [text-shadow:0_2px_12px_rgb(3_18_38_/_0.48)]">
        <p className="text-[clamp(0.62rem,2vw,0.85rem)] font-bold uppercase leading-tight tracking-[0.14em]">
          Signature Cake Preview
        </p>
        <h2 className="mt-1.5 break-words font-display text-[clamp(1rem,4vw,1.8rem)] font-bold leading-[1.1] [overflow-wrap:anywhere]">
          Three Milk Classical Cake
        </h2>
        <p className="mt-1.5 hidden text-[clamp(0.72rem,1.8vw,0.95rem)] font-semibold leading-relaxed text-soft-gold min-[360px]:block">
          Classic three milk softness with Azaan Bakers' signature finish.
        </p>
      </div>
    </div>
    <GoldenWheat className="absolute -right-5 -top-8 hidden h-44 w-28 rotate-12 opacity-80 sm:block" />
  </div>
);
