import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/device';

// Minimum on-screen time, so the loader never flashes on a warm cache.
const MIN_MS = 300;
// Hard ceiling — a slow or unreachable font CDN must never hold the page.
const MAX_MS = 900;
// Must match the CSS transition duration below.
const FADE_MS = 400;

const SEEN_KEY = 'dv:loaded';

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    // Private mode / blocked storage — just show the loader.
    return false;
  }
}

type Phase = 'visible' | 'fading' | 'gone';

/**
 * Deliberately not driven by AnimatePresence. This overlay covers the whole
 * viewport, so if its exit animation is ever interrupted it strands a
 * transparent element with `pointer-events: auto` over the page and nothing is
 * clickable. A CSS transition plus an unconditional unmount timer cannot get
 * stuck that way.
 */
export default function Loader() {
  const [phase, setPhase] = useState<Phase>(() =>
    prefersReducedMotion || alreadySeen() ? 'gone' : 'visible',
  );
  const startedVisible = useRef(phase === 'visible');

  // Mount-only: decide when the page is ready enough to start fading out.
  // This must not depend on `phase`, or flipping the phase would tear down its
  // own pending timers.
  useEffect(() => {
    if (!startedVisible.current) return;

    const start = performance.now();
    let settled = false;
    let fadeTimer: number | undefined;

    const finish = () => {
      if (settled) return;
      settled = true;
      const remaining = Math.max(0, MIN_MS - (performance.now() - start));
      fadeTimer = window.setTimeout(() => {
        setPhase('fading');
        try {
          sessionStorage.setItem(SEEN_KEY, '1');
        } catch {
          // Non-fatal: the loader just shows again next time.
        }
      }, remaining);
    };

    const cap = window.setTimeout(finish, MAX_MS);

    // Wait on real readiness rather than a scripted delay — the previous
    // version burned roughly two seconds of dead time on every visit.
    if (document.fonts) {
      document.fonts.ready.then(finish, finish);
    } else {
      finish();
    }

    return () => {
      settled = true;
      window.clearTimeout(cap);
      window.clearTimeout(fadeTimer);
    };
  }, []);

  // Unmount once the fade has run. Separate effect so the timer it owns is the
  // only thing its cleanup can cancel.
  useEffect(() => {
    if (phase !== 'fading') return;
    const t = window.setTimeout(() => setPhase('gone'), FADE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] bg-dv-ink flex items-center justify-center transition-opacity duration-[400ms] ease-out ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="relative w-8 h-8 rounded-md bg-gradient-to-br from-dv-cobalt to-dv-deep flex items-center justify-center">
            <span className="font-display text-sm font-bold text-white">D</span>
          </span>
          <span className="display text-xl tracking-[0.02em]">
            DEV<span className="text-dv-gold">VIBES</span>
          </span>
        </div>
        {/* Indeterminate CSS bar — the old numeric readout re-rendered the tree
            on a timer for no visual benefit. */}
        <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden">
          <div className="loader-bar h-full w-1/3 bg-gradient-to-r from-dv-cobalt via-dv-sky to-dv-gold" />
        </div>
      </div>
    </div>
  );
}
