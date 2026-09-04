import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import MagneticButton from '../components/ui/MagneticButton';
import ParticleField from '../components/ui/ParticleField';
import { useContent } from '../lib/useContent';
import { useCopy } from '../lib/i18n';

export default function FinalCTA() {
  const t = useCopy();
  const contact = useContent('contact');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.02]);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-dv-azure/20 orb" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-dv-gold/10 orb" />
      </motion.div>

      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-30 pointer-events-none" />
      <ParticleField density={50} mouse />

      <motion.div
        style={{ scale }}
        className="relative max-w-7xl mx-auto px-5 md:px-8 text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow-gold inline-block"
        >
          {t.cta.eyebrow}
        </motion.span>

        <h2 className="display mt-8 text-[clamp(2.8rem,11vw,10rem)] leading-[0.86] tracking-[-0.04em]">
          <Reveal delay={0.05}>
            <span className="grad-text-blue">{t.cta.headA}</span>
          </Reveal>
          <br />
          <Reveal delay={0.15}>
            <span className="grad-text-gold">{t.cta.headB}</span>
          </Reveal>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-10 mx-auto max-w-2xl text-dv-fog text-base md:text-lg leading-relaxed"
        >
          {t.cta.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href={`mailto:${contact.email}`} variant="primary">
            {t.cta.primary}
            <ArrowIcon />
          </MagneticButton>
          <MagneticButton href="#work" variant="ghost">
            {t.cta.ghost}
            <CalendarIcon />
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 max-w-3xl mx-auto"
        >
          {[
            [contact.email, t.cta.labels.mail],
            [contact.phone, t.cta.labels.voice],
            [contact.studios, t.cta.labels.studios],
            [contact.hours, t.cta.labels.hours],
          ].map(([v, k]) => (
            <div key={k} className="text-left md:text-center">
              <div className="mono text-[10px] tracking-[0.28em] text-dv-mute uppercase">{k}</div>
              <div className="display text-sm md:text-base mt-2 tracking-[0.02em]">{v}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Observe the mask, not the span inside it.
  //
  // `whileInView` observes the element it sits on. That inner span starts at
  // y:110%, i.e. entirely outside this overflow:hidden box — and
  // IntersectionObserver clips the intersection rect against ancestor overflow,
  // so its visible ratio is pinned at 0. The threshold is never met, the
  // animation that would bring it back into the box never starts, and the text
  // stays invisible forever. It hid itself where the observer cannot see it.
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <span ref={ref} className="inline-block overflow-hidden align-top">
      <motion.span
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : undefined}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8m0 0L6 2m4 4L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <rect x="1.5" y="2" width="8" height="7.5" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M1.5 4.5h8M3.5 1v2M7.5 1v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
