import { motion } from 'motion/react';
import { TOGHRAMAJYAN } from '../lib/work';

// Capabilities, not client logos. A logo marquee is social proof by volume, and
// inventing it is exactly what this page is being cleaned up for — the ticker
// keeps the motion while saying something true. Mirrors the Services section.
const CAPABILITIES = [
  'AI SOLUTIONS',
  'SAAS PLATFORMS',
  'MOBILE APPS',
  'CLOUD ARCHITECTURE',
  'ENTERPRISE SYSTEMS',
  'UI / UX DESIGN',
  'DEVOPS & INFRASTRUCTURE',
  'WEB APPLICATIONS',
];

export default function Trust() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dv-night/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <span className="eyebrow">CURRENTLY BUILDING FOR</span>
        </div>

        {/* One real client, presented as the proof it is. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <a
            href={TOGHRAMAJYAN.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card px-7 py-6 md:px-10 md:py-7 flex items-center gap-6 md:gap-9 hover:border-white/15 transition-colors"
          >
            <div>
              <div className="display text-xl md:text-2xl tracking-[0.01em]">
                {TOGHRAMAJYAN.client}
              </div>
              <div className="mono text-[10px] tracking-[0.2em] text-dv-mute mt-2 uppercase">
                {TOGHRAMAJYAN.sector} · {TOGHRAMAJYAN.location}
              </div>
            </div>
            <span className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0 group-hover:bg-dv-gold group-hover:text-black transition-colors duration-300">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M3 9 L9 3 M9 3 H4 M9 3 V8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </a>
        </motion.div>

        <div className="text-center mt-16 mb-10">
          <span className="eyebrow">WHAT WE BUILD</span>
        </div>

        <div className="relative">
          <div className="overflow-hidden mask-fade">
            <div className="flex gap-16 animate-scroll-x w-max">
              {[...CAPABILITIES, ...CAPABILITIES].map((item, i) => (
                <div
                  key={i}
                  className="display text-xl md:text-2xl text-dv-mute whitespace-nowrap tracking-[0.04em]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <style>{`
            .mask-fade {
              -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
              mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
