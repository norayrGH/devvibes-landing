import { motion } from 'motion/react';
import SectionHeader from '../components/ui/SectionHeader';

const TECH = [
  { name: 'React', tier: 'frontend' },
  { name: 'Next.js', tier: 'frontend' },
  { name: 'TypeScript', tier: 'frontend' },
  { name: 'SwiftUI', tier: 'mobile' },
  { name: 'Kotlin', tier: 'mobile' },
  { name: 'React Native', tier: 'mobile' },
  { name: 'Spring Boot', tier: 'backend' },
  { name: 'Node.js', tier: 'backend' },
  { name: 'Go', tier: 'backend' },
  { name: 'Python', tier: 'backend' },
  { name: 'PostgreSQL', tier: 'data' },
  { name: 'Redis', tier: 'data' },
  { name: 'Kafka', tier: 'data' },
  { name: 'AWS', tier: 'cloud' },
  { name: 'GCP', tier: 'cloud' },
  { name: 'Docker', tier: 'cloud' },
  { name: 'Kubernetes', tier: 'cloud' },
  { name: 'Terraform', tier: 'cloud' },
  { name: 'OpenAI', tier: 'ai' },
  { name: 'Anthropic', tier: 'ai' },
  { name: 'PyTorch', tier: 'ai' },
  { name: 'LangGraph', tier: 'ai' },
];

const TIER_LABEL: Record<string, string> = {
  frontend: 'Frontend',
  mobile: 'Mobile',
  backend: 'Backend',
  data: 'Data',
  cloud: 'Cloud / Infra',
  ai: 'AI / ML',
};

export default function TechStack() {
  return (
    <section id="stack" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto w-[600px] h-[600px] bg-dv-azure rounded-full orb opacity-10" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="THE TOOLBOX"
              index="05 ━━ STACK"
              title={
                <>
                  Modern engineering.<br />
                  <span className="text-outline">Battle-tested choices.</span>
                </>
              }
            />
          </div>
          <div className="lg:col-span-5">
            <p className="text-dv-fog text-base md:text-lg leading-relaxed">
              We pick boring where it matters and bleeding-edge where it pays off.
              Every stack decision is owned by senior engineers and reviewed against your operating reality.
            </p>
          </div>
        </div>

        <div className="mt-20 relative">
          <FloatingMarquee row={TECH.slice(0, 11)} direction="left" />
          <div className="h-3" />
          <FloatingMarquee row={TECH.slice(11)} direction="right" />
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.04] border border-white/[0.06] rounded-3xl overflow-hidden">
          {Object.entries(TIER_LABEL).map(([key, label], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-dv-ink p-6 group hover:bg-white/[0.02] transition-colors"
            >
              <div className="mono text-[10px] tracking-[0.28em] text-dv-gold uppercase">{label}</div>
              <div className="mt-4 display text-2xl md:text-3xl">
                {TECH.filter((t) => t.tier === key).length}
                <span className="text-dv-mute text-base ml-1">tools</span>
              </div>
              <div className="mt-3 text-[12px] text-dv-fog leading-relaxed">
                {TECH.filter((t) => t.tier === key).map((t) => t.name).join(' · ')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingMarquee({
  row,
  direction,
}: {
  row: { name: string; tier: string }[];
  direction: 'left' | 'right';
}) {
  const items = [...row, ...row];
  return (
    <div className="overflow-hidden relative" style={{
      maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
    }}>
      <div className={`flex gap-3 w-max ${direction === 'left' ? 'animate-scroll-x' : 'animate-scroll-x-rev'}`}>
        {items.map((tech, i) => (
          <motion.div
            key={`${tech.name}-${i}`}
            whileHover={{ y: -4, scale: 1.05 }}
            className="glass px-6 py-4 rounded-2xl flex items-center gap-3 group hover:border-dv-gold/40 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-dv-cobalt group-hover:bg-dv-gold transition-colors" />
            <span className="display text-lg md:text-xl tracking-[0.02em]">{tech.name}</span>
            <span className="mono text-[9px] tracking-[0.22em] text-dv-mute uppercase">{tech.tier}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
