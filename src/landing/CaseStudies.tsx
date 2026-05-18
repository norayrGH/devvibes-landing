import { motion } from 'motion/react';
import SectionHeader from '../components/ui/SectionHeader';

type Study = {
  id: string;
  tag: string;
  client: string;
  title: string;
  body: string;
  metrics: { value: string; label: string }[];
  accent: 'blue' | 'gold' | 'mixed';
};

const STUDIES: Study[] = [
  {
    id: '01',
    tag: 'FINTECH',
    client: 'HELIOS PAY',
    title: 'Cross-border payments at sub-second latency.',
    body: 'Replatformed legacy ledger into an event-sourced core that now clears 1.6M transactions per day across 14 currencies.',
    metrics: [
      { value: '+312%', label: 'Volume growth' },
      { value: '0.4s', label: 'Median latency' },
      { value: '99.99%', label: 'Settlement uptime' },
    ],
    accent: 'blue',
  },
  {
    id: '02',
    tag: 'AI',
    client: 'PRISMA AI',
    title: 'Agent platform for enterprise knowledge ops.',
    body: 'Built a multi-tenant RAG platform with custom evals, audit trails, and tool use. Now serving 240k internal users.',
    metrics: [
      { value: '2.4M', label: 'Queries / day' },
      { value: '92%', label: 'Eval pass rate' },
      { value: '11×', label: 'Faster onboarding' },
    ],
    accent: 'gold',
  },
  {
    id: '03',
    tag: 'SAAS',
    client: 'KAIROS',
    title: 'Sales workflow OS for distributed teams.',
    body: 'Designed and shipped a calendar-native CRM in 22 weeks. Acquired 60k seats and a Series B inside the first year.',
    metrics: [
      { value: '60k', label: 'Active seats' },
      { value: '$28M', label: 'Series B raise' },
      { value: '4.9', label: 'App store rating' },
    ],
    accent: 'mixed',
  },
  {
    id: '04',
    tag: 'ENTERPRISE',
    client: 'NORTHWIND',
    title: 'Global logistics control plane.',
    body: 'Unified 18 regional systems into a single operating surface. Now coordinating 12k vehicles across 4 continents.',
    metrics: [
      { value: '+38%', label: 'Throughput' },
      { value: '−22%', label: 'Fuel cost' },
      { value: '12k', label: 'Vehicles' },
    ],
    accent: 'blue',
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px divider-line" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="SELECTED CASES"
              index="04 ━━ WORK"
              title={
                <>
                  Software that shipped<br />
                  <span className="text-outline">and stayed shipped.</span>
                </>
              }
            />
          </div>
          <div className="lg:col-span-5">
            <p className="text-dv-fog text-base md:text-lg leading-relaxed">
              A small sample of platforms we have designed, built, and now operate alongside our partners.
              Numbers are independently verified.
            </p>
          </div>
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-6">
          {STUDIES.map((study, i) => (
            <StudyCard key={study.id} study={study} index={i} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a href="#contact" className="btn-ghost">
            VIEW THE FULL CASE BOOK
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8m0 0L6 2m4 4L6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function StudyCard({ study, index }: { study: Study; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative glass-card p-8 md:p-10 overflow-hidden"
    >
      <StudyVisual accent={study.accent} />

      <div className="relative flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="tag tag-gold">{study.tag}</span>
          <span className="mono text-[10px] tracking-[0.28em] text-dv-mute">/ CASE {study.id}</span>
        </div>
        <div className="display text-xs tracking-[0.18em] text-dv-fog">{study.client}</div>
      </div>

      <div className="relative">
        <h3 className="display text-2xl md:text-3xl lg:text-[34px] leading-[0.95] mb-5">
          {study.title}
        </h3>
        <p className="text-dv-fog text-sm md:text-base leading-relaxed max-w-lg">{study.body}</p>

        <div className="mt-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <div className="display text-xl md:text-2xl grad-text-gold">{m.value}</div>
              <div className="mono text-[9px] tracking-[0.2em] text-dv-mute mt-1.5 uppercase">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 9 L9 3 M9 3 H4 M9 3 V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    </motion.article>
  );
}

function StudyVisual({ accent }: { accent: Study['accent'] }) {
  const colors =
    accent === 'gold'
      ? ['rgba(255,214,10,0.18)', 'rgba(255,214,10,0)']
      : accent === 'blue'
        ? ['rgba(59,107,228,0.22)', 'rgba(59,107,228,0)']
        : ['rgba(59,107,228,0.16)', 'rgba(255,214,10,0.12)'];

  return (
    <div className="absolute -top-20 -right-20 w-[360px] h-[360px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div
        className="w-full h-full rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 70%)`,
        }}
      />
    </div>
  );
}
