export const LoadingScreen = () => (
  <div className="grid min-h-[60vh] place-items-center bg-warm-white px-6 text-center">
    <div aria-live="polite">
      <div className="mx-auto h-12 w-12 rounded-full border border-gold/30 border-t-cocoa" />
      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">
        Preparing the bakery
      </p>
    </div>
  </div>
);
