import { motion } from 'framer-motion';

export const Hero3DPlaceholder = () => (
  <div
    className="relative min-h-[34rem] lg:min-h-[42rem]"
    aria-label="Three milk cake visual space"
  >
    <motion.div
      animate={{ y: [0, -12, 0] }}
      className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgb(7_31_61_/_0.98),rgb(11_45_85_/_0.92)_58%,rgb(212_175_55_/_0.32))] shadow-luxury"
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="absolute inset-4 overflow-hidden rounded-[1.65rem] border border-gold/20 bg-navy/55 backdrop-blur-2xl">
      <motion.div
        animate={{ x: ['-40%', '120%'] }}
        className="absolute top-0 h-full w-1/2 rotate-12 bg-[linear-gradient(90deg,transparent,rgb(255_255_255_/_0.56),transparent)]"
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        className="absolute right-[18%] top-[14%] size-24 rounded-full border border-primary-hover/30"
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        animate={{ y: [0, 16, 0], rotate: [0, -10, 0] }}
        className="absolute bottom-[18%] left-[10%] size-16 rounded-full border border-gold/28"
        transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Future React Three Fiber integration point:
          Replace the stage below with:
          <Canvas camera={{ position: [0, 1.2, 5], fov: 38 }}>
            <Suspense fallback={<CakeSceneLoader />}>
              <ThreeMilkCakeScene />
            </Suspense>
          </Canvas>

          Integration map:
          - Canvas: mounts inside this exact rounded container.
          - Camera: framed to preserve the current split hero composition.
          - Lights: key, rim, and warm studio fill lights sit inside ThreeMilkCakeScene.
          - Controls: disabled by default for cinematic homepage playback.
          - GSAP timeline: coordinates milk pour, mango syrup drip, floating mango cubes, and camera movement.
          - Loading manager: swaps the visual loader below once models and textures are ready.
      */}
      <div className="absolute inset-0 grid place-items-center p-8">
        <div className="relative aspect-square w-[min(78%,26rem)] rounded-full bg-[radial-gradient(circle_at_50%_38%,#ffffff_0_12%,#FFFCF5_13%_27%,#D4AF37_28%_31%,#FFF7E6_32%_58%,#22B8F0_59%_64%,#071F3D_65%_100%)] shadow-[0_34px_90px_rgb(7_31_61_/_0.28)]">
          <div className="absolute inset-[13%] rounded-full border border-white/75" />
          <div className="absolute left-1/2 top-[22%] h-[42%] w-[12%] -translate-x-1/2 rounded-full bg-surface/80 blur-[1px]" />
          <div className="absolute bottom-[18%] left-1/2 h-2 w-32 -translate-x-1/2 rounded-full bg-ink/18 blur-md" />
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/60 bg-surface/78 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink shadow-luxury">
        <span className="size-2 rounded-full bg-primary-hover" />
        Signature Three Milk Cake
      </div>
    </div>
  </div>
);
