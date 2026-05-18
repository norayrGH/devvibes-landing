import { motion } from 'motion/react';
import SectionHeader from '../components/ui/SectionHeader';

type Problem = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  metric: string;
  metricLabel: string;
  visual: 'automation' | 'transformation' | 'data' | 'cx' | 'scale';
};

const PROBLEMS: Problem[] = [
  {
    id: '01',
    title: 'BUSINESS AUTOMATION',
    subtitle: 'Manual operations bleed margin.',
    body: 'Most enterprises lose 20–30% of operating capacity to repetitive work and disconnected tools. We design event-driven systems and AI agents that compress workflows from days to minutes.',
    metric: '37%',
    metricLabel: 'Avg. ops cost reduction',
    visual: 'automation',
  },
  {
    id: '02',
    title: 'SLOW DIGITAL TRANSFORMATION',
    subtitle: 'Legacy systems cap growth.',
    body: 'Monolithic stacks block expansion and innovation. We replatform without ripping out — strangler migrations, modular services, and modern interfaces that ship in quarters, not years.',
    metric: '6×',
    metricLabel: 'Faster release cadence',
    visual: 'transformation',
  },
  {
    id: '03',
    title: 'DATA CHAOS',
    subtitle: 'Information that nobody trusts.',
    body: 'When data lives in silos, decisions get slower and riskier. We build governed data platforms with AI-grade pipelines, semantic layers, and dashboards leaders actually use.',
    metric: '12 PB',
    metricLabel: 'Data under management',
    visual: 'data',
  },
  {
    id: '04',
    title: 'CUSTOMER EXPERIENCE ISSUES',
    subtitle: 'Slow, ugly products lose revenue.',
    body: 'Users churn out of friction. We design and engineer products with sub-second response times, considered motion, and the kind of detail you feel before you can name it.',
    metric: '+62%',
    metricLabel: 'Avg. retention lift',
    visual: 'cx',
  },
  {
    id: '05',
    title: 'SCALABILITY & PERFORMANCE',
    subtitle: 'Systems that break under success.',
    body: 'When traffic spikes you cannot afford to be the bottleneck. We architect for elasticity from day one — multi-region, observable, and ready for ten times the load.',
    metric: '99.99%',
    metricLabel: 'Uptime across fleet',
    visual: 'scale',
  },
];

export default function Problems() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden" id="problems">
      <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-dv-azure rounded-full blur-[180px] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="WHAT WE SOLVE"
          index="01 ━━ PROBLEMS"
          title={
            <>
              Five problems software<br />
              <span className="text-outline">should be solving.</span>
            </>
          }
          description="The cost of doing nothing compounds every quarter. These are the recurring patterns we see across our portfolio — and the ones we build for."
        />

        <div className="mt-20 grid gap-5 md:gap-6 lg:grid-cols-12">
          {/* First (large) card */}
          <ProblemCard problem={PROBLEMS[0]} className="lg:col-span-7 lg:row-span-2" featured />
          <ProblemCard problem={PROBLEMS[1]} className="lg:col-span-5" />
          <ProblemCard problem={PROBLEMS[2]} className="lg:col-span-5" />
          <ProblemCard problem={PROBLEMS[3]} className="lg:col-span-6" />
          <ProblemCard problem={PROBLEMS[4]} className="lg:col-span-6" />
        </div>
      </div>
    </section>
  );
}

function ProblemCard({
  problem,
  className = '',
  featured = false,
}: {
  problem: Problem;
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
        <span className="mono text-[10px] tracking-[0.3em] text-dv-mute">PROBLEM {problem.id}</span>
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
          <div className="display text-2xl md:text-3xl grad-text-gold">{problem.metric}</div>
          <div className="mono text-[10px] tracking-[0.25em] text-dv-mute mt-1.5 uppercase">{problem.metricLabel}</div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-400 mono text-[10px] tracking-[0.25em] text-dv-gold flex items-center gap-2">
          EXPLORE
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
  return (
    <div className={`${size} relative flex items-center justify-center rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-dv-cobalt/10 to-transparent" />
      {kind === 'automation' && <AutomationGlyph />}
      {kind === 'transformation' && <TransformationGlyph />}
      {kind === 'data' && <DataGlyph />}
      {kind === 'cx' && <CXGlyph />}
      {kind === 'scale' && <ScaleGlyph />}
    </div>
  );
}

function AutomationGlyph() {
  return (
    <motion.svg viewBox="0 0 60 60" className="w-full h-full p-3" fill="none">
      <motion.circle cx="30" cy="30" r="18" stroke="rgba(110,163,255,0.5)" strokeWidth="0.7" strokeDasharray="2 3" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '30px 30px' }} />
      <motion.circle cx="30" cy="30" r="11" stroke="rgba(255,214,10,0.45)" strokeWidth="0.7" animate={{ rotate: -360 }} transition={{ duration: 11, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '30px 30px' }} />
      <circle cx="30" cy="30" r="3" fill="#FFD60A" />
      <circle cx="48" cy="30" r="1.5" fill="#6EA3FF" />
      <circle cx="30" cy="12" r="1.5" fill="#6EA3FF" />
      <circle cx="12" cy="30" r="1.5" fill="#6EA3FF" />
      <circle cx="30" cy="48" r="1.5" fill="#6EA3FF" />
    </motion.svg>
  );
}

function TransformationGlyph() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full p-3" fill="none">
      <rect x="8" y="8" width="20" height="20" rx="2" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" />
      <motion.rect x="32" y="32" width="20" height="20" rx="4" stroke="rgba(110,163,255,0.8)" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} />
      <motion.path d="M22 22 L40 40" stroke="#FFD60A" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 3" animate={{ pathLength: [0, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
    </svg>
  );
}

function DataGlyph() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full p-3" fill="none">
      {[10, 22, 34, 46].map((y, i) => (
        <motion.line
          key={y}
          x1="8" y1={y} x2="52" y2={y}
          stroke="rgba(110,163,255,0.5)"
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0.2, 1, 0.2] }}
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
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </svg>
  );
}

function CXGlyph() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full p-3" fill="none">
      <rect x="14" y="8" width="32" height="44" rx="4" stroke="rgba(255,255,255,0.4)" />
      <motion.rect x="14" y="8" width="32" height="44" rx="4" stroke="#6EA3FF" strokeWidth="0.6" strokeDasharray="4 88" animate={{ strokeDashoffset: [0, -92] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
      <rect x="18" y="14" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
      <rect x="18" y="22" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
      <motion.rect x="18" y="30" width="24" height="12" rx="2" fill="rgba(255,214,10,0.15)" stroke="rgba(255,214,10,0.6)" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: 'center' }} />
    </svg>
  );
}

function ScaleGlyph() {
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
          animate={{ height: [(i + 1) * 8, (i + 1) * 10, (i + 1) * 8] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
        />
      ))}
      <motion.path d="M 8 24 L 52 12" stroke="#FFD60A" strokeWidth="1" strokeDasharray="2 2" animate={{ pathLength: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <circle cx="52" cy="12" r="2" fill="#FFD60A" />
    </svg>
  );
}
