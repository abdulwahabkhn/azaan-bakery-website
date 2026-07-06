import { GoldenWheat } from '@/components/common/GoldenWheat';

export const HeroCakeVisual = () => (
  <div className="relative min-h-[34rem] overflow-hidden rounded-3xl border border-gold/45 bg-navy/35 p-4 shadow-[0_32px_90px_rgb(7_31_61_/_0.28)] backdrop-blur lg:min-h-[42rem]">
    <div className="absolute inset-4 overflow-hidden rounded-[1.35rem] border border-gold/35 bg-[linear-gradient(145deg,#071F3D_0%,#0B2D55_58%,#FFF7E6_160%)]">
      <div className="absolute -right-20 -top-20 size-64 rounded-full border border-primary/20 bg-primary/10 blur-2xl" />
      <div className="absolute -bottom-24 -left-20 size-72 rounded-full bg-gold/12 blur-3xl" />
      <div className="absolute inset-0 grid place-items-center p-8 text-center">
        <div className="max-w-md rounded-3xl border border-gold/30 bg-navy/55 px-7 py-10 shadow-[0_24px_70px_rgb(7_31_61_/_0.3)] backdrop-blur-xl sm:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-soft-gold">
            Signature cake preview
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Three Milk Classical Cake
          </h2>
          <p className="mt-4 text-sm font-semibold text-white/70 sm:text-base">
            Three Milk Classical Cake image coming soon
          </p>
          <span className="mx-auto mt-7 block h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </div>
    <GoldenWheat className="absolute -right-5 -top-8 hidden h-44 w-28 rotate-12 opacity-80 sm:block" />
  </div>
);
