import { motion } from 'motion/react';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const LOGOS = [
  'NEXARION',
  'AETHER LABS',
  'KAIROS',
  'OBSIDIAN',
  'HELIOS PAY',
  'QUANTLEAF',
  'NORTHWIND',
  'PRISMA AI',
  'ARGON',
  'BOREALIS',
  'OCULUS BANK',
  'VANTA TECH',
];

const STATS = [
  { label: 'Projects delivered', value: 280, suffix: '+' },
  { label: 'Countries served', value: 44, suffix: '' },
  { label: 'Revenue generated', value: 1.4, prefix: '$', suffix: 'B', decimals: 1 },
  { label: 'Active products', value: 92, suffix: '' },
];

export default function Trust() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dv-night/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-14">
          <span className="eyebrow">TRUSTED BY ENTERPRISE TEAMS WORLDWIDE</span>
        </div>

        {/* Marquee logos */}
        <div className="relative">
          <div className="overflow-hidden mask-fade">
            <div className="flex gap-16 animate-scroll-x w-max">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <div
                  key={i}
                  className="display text-2xl md:text-3xl text-dv-mute hover:text-white transition-colors duration-300 whitespace-nowrap tracking-[0.04em]"
                >
                  {logo}
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

        {/* Counters */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-6 group"
            >
              <span className="absolute left-0 top-0 h-px w-12 bg-dv-gold transition-all duration-500 group-hover:w-24" />
              <div className="display text-4xl md:text-5xl lg:text-6xl grad-text">
                <AnimatedCounter
                  to={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </div>
              <div className="mono text-[10px] tracking-[0.28em] text-dv-mute mt-4 uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
