import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import SectionHeader from '../components/ui/SectionHeader';
import { skipLoopingAnimation } from '../lib/device';
import { useCopy, type Copy } from '../lib/i18n';

const GLYPHS_ANIMATE = !skipLoopingAnimation;

type Problem = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  metric: string;
  metricLabel: string;
  visual: 'automation' | 'transformation' | 'data' | 'cx' | 'scale';
};

// Only the structural fields live here; all prose comes from the dictionary.
const PROBLEM_VISUALS: Problem['visual'][] = [
  'automation',
  'transformation',
  'data',
  'cx',
  'scale',
];

export default function Problems() {
  const t = useCopy();
  const problems: Problem[] = t.problems.items.map((item, i) => ({
    id: String(i + 1).padStart(2, '0'),
    ...item,
    visual: PROBLEM_VISUALS[i],
  }));
  return (
    <section className="relative py-28 md:py-40 overflow-hidden" id="problems">
      <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-dv-azure rounded-full orb opacity-10" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow={t.problems.eyebrow}
          index={t.problems.index}
          title={
            <>
              {t.problems.titleA}<br />
              <span className="text-outline">{t.problems.titleB}</span>
            </>
          }
          description={t.problems.description}
        />

        <div className="mt-20 grid gap-5 md:gap-6 lg:grid-cols-12">
          {/* First (large) card */}
          <ProblemCard copy={t.problems} problem={problems[0]} className="lg:col-span-7 lg:row-span-2" featured />
          <ProblemCard copy={t.problems} problem={problems[1]} className="lg:col-span-5" />
          <ProblemCard copy={t.problems} problem={problems[2]} className="lg:col-span-5" />
          <ProblemCard copy={t.problems} problem={problems[3]} className="lg:col-span-6" />
          <ProblemCard copy={t.problems} problem={problems[4]} className="lg:col-span-6" />
        </div>
      </div>
    </section>
  );
}

function ProblemCard({
  problem,
  copy,
  className = '',
  featured = false,
}: {
  problem: Problem;
  copy: Copy['problems'];
  className?: string;
  featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`group glass-card p-7 md:p-9 min-h-[280px] flex flex-col justify-between relative ${className}`}
    >
      <div className="beam-line opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="flex items-start justify-between mb-8">
        <span className="mono text-[10px] tracking-[0.3em] text-dv-mute">{copy.itemLabel} {problem.id}</span>
        <ProblemVisual kind={problem.visual} featured={featured} />
      </div>

      <div>
        <h3 className={`display ${featured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'} leading-[0.95]`}>
          {problem.title}
        </h3>
        <p className="mt-3 text-dv-fog font-medium text-sm md:text-base">{problem.subtitle}</p>
        <p className={`mt-4 text-dv-mute text-sm leading-relaxed ${featured ? 'max-w-xl' : ''}`}>
          {problem.body}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-end justify-between">
        <div>
          <div className="display text-lg md:text-xl grad-text-gold">{problem.metric}</div>
          <div className="mono text-[10px] tracking-[0.25em] text-dv-mute mt-1.5 uppercase">{problem.metricLabel}</div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-400 mono text-[10px] tracking-[0.25em] text-dv-gold flex items-center gap-2">
          {copy.explore}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8m0 0L6 2m4 4L6 10" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}

function ProblemVisual({ kind, featured }: { kind: Problem['visual']; featured?: boolean }) {
  const size = featured ? 'w-32 h-32' : 'w-20 h-20';
  const ref = useRef<HTMLDivElement>(null);
  // These glyphs hold ~24 infinite loops between them. Without this gate they
  // animate for the whole session, including while the section is nowhere near
  // the viewport. When `play` is false the motion elements fall back to their
  // static SVG attributes, so the artwork still reads correctly.
  const inView = useInView(ref, { amount: 0.2 });
  const play = GLYPHS_ANIMATE && inView;

  return (
    <div
      ref={ref}
      className={`${size} relative flex items-center justify-center rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-dv-cobalt/10 to-transparent" />
      {kind === 'automation' && <AutomationGlyph play={play} />}
      {kind === 'transformation' && <TransformationGlyph play={play} />}
      {kind === 'data' && <DataGlyph play={play} />}
      {kind === 'cx' && <CXGlyph play={play} />}
      {kind === 'scale' && <ScaleGlyph play={play} />}
    </div>
  );
}

type GlyphProps = { play: boolean };

function AutomationGlyph({ play }: GlyphProps) {
  return (
    <motion.svg viewBox="0 0 60 60" className="w-full h-full p-3" fill="none">
      <motion.circle cx="30" cy="30" r="18" stroke="rgba(110,163,255,0.5)" strokeWidth="0.7" strokeDasharray="2 3" animate={play ? { rotate: 360 } : undefined} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '30px 30px' }} />
      <motion.circle cx="30" cy="30" r="11" stroke="rgba(255,214,10,0.45)" strokeWidth="0.7" animate={play ? { rotate: -360 } : undefined} transition={{ duration: 11, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '30px 30px' }} />
      <circle cx="30" cy="30" r="3" fill="#FFD60A" />
      <circle cx="48" cy="30" r="1.5" fill="#6EA3FF" />
      <circle cx="30" cy="12" r="1.5" fill="#6EA3FF" />
      <circle cx="12" cy="30" r="1.5" fill="#6EA3FF" />
      <circle cx="30" cy="48" r="1.5" fill="#6EA3FF" />
    </motion.svg>
  );
}

function TransformationGlyph({ play }: GlyphProps) {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full p-3" fill="none">
      <rect x="8" y="8" width="20" height="20" rx="2" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" />
      <motion.rect x="32" y="32" width="20" height="20" rx="4" stroke="rgba(110,163,255,0.8)" animate={play ? { opacity: [0.5, 1, 0.5] } : undefined} transition={{ duration: 2.5, repeat: Infinity }} />
      <motion.path d="M22 22 L40 40" stroke="#FFD60A" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 3" animate={play ? { pathLength: [0, 1] } : undefined} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
    </svg>
  );
}

function DataGlyph({ play }: GlyphProps) {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full p-3" fill="none">
      {[10, 22, 34, 46].map((y, i) => (
        <motion.line
          key={y}
          x1="8" y1={y} x2="52" y2={y}
          stroke="rgba(110,163,255,0.5)"
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: [0.2, 1, 0.2] } : { pathLength: 1 }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      {[16, 28, 40, 18, 36, 44, 24].map((y, i) => (
        <motion.circle
          key={i}
          cx={12 + i * 6}
          cy={y}
          r="1.5"
          fill={i === 2 || i === 5 ? '#FFD60A' : '#6EA3FF'}
          animate={play ? { opacity: [0.4, 1, 0.4] } : undefined}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </svg>
  );
}

function CXGlyph({ play }: GlyphProps) {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full p-3" fill="none">
      <rect x="14" y="8" width="32" height="44" rx="4" stroke="rgba(255,255,255,0.4)" />
      <motion.rect x="14" y="8" width="32" height="44" rx="4" stroke="#6EA3FF" strokeWidth="0.6" strokeDasharray="4 88" animate={play ? { strokeDashoffset: [0, -92] } : undefined} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
      <rect x="18" y="14" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
      <rect x="18" y="22" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
      <motion.rect x="18" y="30" width="24" height="12" rx="2" fill="rgba(255,214,10,0.15)" stroke="rgba(255,214,10,0.6)" animate={play ? { scale: [1, 1.02, 1] } : undefined} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: 'center' }} />
    </svg>
  );
}

function ScaleGlyph({ play }: GlyphProps) {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full p-3" fill="none">
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={10 + i * 4}
          y={50 - (i + 1) * 8}
          width="5"
          height={(i + 1) * 8}
          rx="1"
          fill="rgba(110,163,255,0.3)"
          stroke="rgba(110,163,255,0.6)"
          strokeWidth="0.4"
          // scaleY rather than the `height` attribute: animating height relayouts
          // the SVG every frame, while a transform stays on the compositor. The
          // 1.25 factor reproduces the original 8→10 unit growth.
          animate={play ? { scaleY: [1, 1.25, 1] } : undefined}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
          style={{ transformOrigin: `${12.5 + i * 4}px ${50 - (i + 1) * 8}px` }}
        />
      ))}
      <motion.path d="M 8 24 L 52 12" stroke="#FFD60A" strokeWidth="1" strokeDasharray="2 2" animate={play ? { pathLength: [0.3, 1, 0.3] } : undefined} transition={{ duration: 3, repeat: Infinity }} />
      <circle cx="52" cy="12" r="2" fill="#FFD60A" />
    </svg>
  );
}
