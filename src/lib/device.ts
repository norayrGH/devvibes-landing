// Device capability detection, resolved once at module load.
//
// Used to gate the expensive decorative effects — canvas particles, large CSS
// blurs, infinite scale animations — that make low-end mobile devices drop
// frames. These are deliberately static rather than reactive: re-evaluating
// them on resize would remount the canvas mid-scroll, which costs more than it
// saves. A phone does not stop being a phone halfway down the page.

const matches = (q: string) =>
  typeof window !== 'undefined' && window.matchMedia(q).matches;

export const prefersReducedMotion = matches('(prefers-reduced-motion: reduce)');
export const isTouch = matches('(hover: none)');
export const isNarrow = matches('(max-width: 767px)');

// deviceMemory and hardwareConcurrency are non-standard, but they're supported
// on Chrome/Android — which is exactly the population that struggles here.
// Assume a capable machine when they're missing (Safari, Firefox).
type ExtendedNavigator = Navigator & { deviceMemory?: number };
const nav =
  typeof navigator !== 'undefined' ? (navigator as ExtendedNavigator) : undefined;

const cores = nav?.hardwareConcurrency ?? 8;
const memoryGb = nav?.deviceMemory ?? 8;

export const isLowPower = cores <= 4 || memoryGb <= 4;

/** Skip decorative effects that cost per-frame GPU work (canvas fields). */
export const skipHeavyEffects = prefersReducedMotion || isNarrow || isLowPower;

/**
 * Skip infinite looping animation. Animating `scale` on a node that contains a
 * 160px blur forces the compositor to re-rasterize the blur every single frame,
 * which is the most expensive thing on this page.
 */
export const skipLoopingAnimation = prefersReducedMotion || isTouch || isLowPower;
