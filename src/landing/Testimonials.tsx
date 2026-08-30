import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeader from '../components/ui/SectionHeader';

type Quote = {
  body: string;
  author: string;
  role: string;
  company: string;
};

/**
 * Real client quotes only.
 *
 * This previously held four invented testimonials attributed to named people at
 * companies that do not exist — the one thing on the page with genuine legal
 * exposure, not just a credibility cost. The section renders nothing while this
 * is empty, so the page stays honest until there is something real to put here.
 *
 * To turn it back on: get a written quote from the client (email is enough),
 * confirm they're happy to be named with their role, and add one entry.
 */
const QUOTES: Quote[] = [];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || QUOTES.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % QUOTES.length), 5800);
    return () => clearInterval(t);
  }, [paused]);

  if (QUOTES.length === 0) return null;

  const q = QUOTES[idx];

  return (
    <section className="relative py-28 md:py-40 overflow-hidden" id="testimonials">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-dv-deep rounded-full orb opacity-30" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          align="center"
          eyebrow="WHAT OUR PARTNERS SAY"
          index="06 ━━ VOICES"
          title={<>On the record.</>}
        />

        <div
          className="mt-20 max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative glass-card p-10 md:p-14">
            <svg
              className="absolute top-8 left-8 text-dv-gold/30"
              width="48"
              height="36"
              viewBox="0 0 48 36"
              fill="currentColor"
              aria-hidden
            >
              <path d="M0 36V20.4C0 14.4 1.6 9.2 4.8 4.8C8 1.6 12 0 16.8 0v8.4c-2.4 0-4.4 0.8-6 2.4C9.2 12.4 8.4 14.4 8 17.2H18V36H0zm26 0V20.4c0-6 1.6-11.2 4.8-15.6C34 1.6 38 0 42.8 0v8.4c-2.4 0-4.4 0.8-6 2.4-1.6 1.6-2.4 3.6-2.8 6.4H44V36H26z" />
            </svg>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-center"
              >
                <p className="display text-2xl md:text-4xl leading-[1.15] tracking-[-0.02em] grad-text">
                  &ldquo;{q.body}&rdquo;
                </p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-dv-cobalt to-dv-deep border border-white/10 flex items-center justify-center">
                    <span className="display text-sm">
                      {q.author
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="display text-sm tracking-[0.04em]">{q.author}</div>
                    <div className="mono text-[10px] tracking-[0.22em] text-dv-mute uppercase">
                      {q.role} · {q.company}
                    </div>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>

            {QUOTES.length > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {QUOTES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`h-1 rounded-full transition-all ${i === idx ? 'w-10 bg-dv-gold' : 'w-2 bg-white/15 hover:bg-white/30'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
