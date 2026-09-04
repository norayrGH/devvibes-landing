import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import SectionHeader from '../components/ui/SectionHeader';
import { useCopy, type Copy } from '../lib/i18n';


export default function Process() {
  const t = useCopy();
  const steps = t.process.steps.map((step, i) => ({
    id: String(i + 1).padStart(2, '0'),
    ...step,
  }));
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.05, 0.85], ['0%', '100%']);

  return (
    <section id="process" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow={t.process.eyebrow}
          index={t.process.index}
          title={
            <>
              {t.process.titleA}<br />
              <span className="text-outline">{t.process.titleB}</span>
            </>
          }
        />

        <div ref={ref} className="relative mt-24">
          {/* Vertical track (mobile + desktop left rail) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/8 -translate-x-1/2 hidden md:block" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-px bg-gradient-to-b from-dv-cobalt via-dv-sky to-dv-gold -translate-x-1/2 hidden md:block"
          />

          <div className="grid md:grid-cols-2 gap-y-20">
            {steps.map((step, i) => (
              <StepRow key={step.id} step={step} index={i} stepLabel={t.process.stepLabel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Step = Copy['process']['steps'][number] & { id: string };

function StepRow({ step, index, stepLabel }: { step: Step; index: number; stepLabel: string }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${isLeft ? 'md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16'}`}
    >
      {/* Dot on track */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`hidden md:block absolute top-2 ${isLeft ? '-right-2' : '-left-2'} translate-x-1/2 ${!isLeft ? '-translate-x-1/2' : ''} w-4 h-4 rounded-full bg-dv-ink border-2 border-dv-gold`}
        style={{ [isLeft ? 'right' : 'left']: '-8px' } as React.CSSProperties}
      >
        <span className="absolute inset-1 rounded-full bg-dv-gold animate-pulse-slow" />
      </motion.span>

      <div className="glass-card p-7 md:p-9 inline-block w-full">
        <div className={`flex items-center gap-3 ${isLeft ? 'md:justify-end' : ''}`}>
          <span className="eyebrow-gold">{stepLabel} {step.id}</span>
          <span className="h-px w-8 bg-dv-gold/40" />
          <span className="mono text-[10px] tracking-[0.28em] text-dv-mute">{step.label}</span>
        </div>
        <h3 className="display text-3xl md:text-4xl mt-5 grad-text">{step.title}</h3>
        <p className="mt-4 text-dv-fog text-sm md:text-base leading-relaxed">{step.body}</p>
        <ul className={`mt-6 grid grid-cols-2 gap-x-4 gap-y-2 ${isLeft ? 'md:justify-items-end' : ''}`}>
          {step.bullets.map((b) => (
            <li key={b} className={`mono text-[10px] tracking-[0.18em] text-dv-mute flex items-center gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
              <span className="w-1 h-1 bg-dv-gold rounded-full" />
              <span className="uppercase">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
