import { motion } from 'framer-motion';

import { GoldenWheat } from '@/components/common/GoldenWheat';
import { HeroCakeVisual } from '@/components/hero/HeroCakeVisual';
import { HeroContent } from '@/components/hero/HeroContent';

export const Hero = () => (
  <section data-nav-theme="blue" className="relative overflow-hidden pb-14 pt-8 sm:pb-20">
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(115deg,#FFF7E6_0%,#FFFCF5_58%,#EEF9FE_100%)]" />
    <div className="absolute -right-[18rem] top-[5%] -z-10 size-[48rem] rounded-full bg-[radial-gradient(circle,#0B2D55_0%,#071F3D_58%,transparent_59%)] opacity-95" />
    <div className="absolute left-[42%] top-[16%] -z-10 size-64 rounded-full bg-primary/15 blur-3xl" />
    <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,transparent,#FFF7E6)]" />
    <GoldenWheat className="absolute -left-10 bottom-4 hidden h-72 w-44 -rotate-12 opacity-20 md:block" />
    <GoldenWheat className="absolute right-4 top-24 hidden h-52 w-32 rotate-[18deg] opacity-35 lg:block" />
    <div className="container-luxury grid min-h-[calc(100svh-2rem)] items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 28 }}
        transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroContent />
      </motion.div>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.96 }}
        transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroCakeVisual />
      </motion.div>
    </div>
  </section>
);
