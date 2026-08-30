import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import ParticleField from '../components/ui/ParticleField';
import MagneticButton from '../components/ui/MagneticButton';
import { useContent } from '../lib/useContent';
import { isTouch, skipLoopingAnimation } from '../lib/device';

const pulse = !skipLoopingAnimation;

export default function Hero() {
  const hero = useContent('hero');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.5 });
  const smy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.5 });
  const px = useTransform(smx, (v) => v * 14);
  const py = useTransform(smy, (v) => v * 10);
  const px2 = useTransform(smx, (v) => v * -22);
  const py2 = useTransform(smy, (v) => v * -16);

  useEffect(() => {
    // Pointer parallax can never fire on touch, but the listener still runs on
    // every synthesised move event.
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx);
      my.set((e.clientY - cy) / cy);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden grain"
    >
      {/* Grid background */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 grid-bg grid-bg-fade opacity-60" />

      {/* Radial glow. The breathing `scale` loop is desktop-only: scaling a node
          that contains a large blur forces the compositor to re-rasterize that
          blur on every frame, which alone can halve the frame rate on a phone. */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ x: px2, y: py2 }}
          className="absolute top-1/4 -left-40 w-[700px] h-[700px] rounded-full opacity-30"
          animate={pulse ? { scale: [1, 1.08, 1] } : undefined}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-full h-full bg-dv-azure rounded-full orb" />
        </motion.div>
        <motion.div
          style={{ x: px, y: py }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          animate={pulse ? { scale: [1, 1.12, 1] } : undefined}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="w-full h-full bg-dv-cobalt rounded-full orb" />
        </motion.div>
        <motion.div
          className="absolute top-10 right-20 w-[280px] h-[280px] rounded-full opacity-15"
          animate={pulse ? { scale: [1, 1.1, 1] } : undefined}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div className="w-full h-full bg-dv-gold rounded-full orb" />
        </motion.div>
      </div>

      {/* Particle field */}
      <ParticleField density={70} />

      {/* Animated light streaks */}
      <Streaks />

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y: y2 }}
        className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-20 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="tag tag-gold">{hero.tagline}</span>
          <span className="hidden md:inline-flex tag mono">{hero.badge}</span>
        </motion.div>

        <h1 className="display-tight text-[clamp(2.6rem,8.6vw,8rem)] leading-[0.86] max-w-[1200px]">
          <Word delay={0.2}>We build</Word>{' '}
          <Word delay={0.34}>software</Word>{' '}
          <Word delay={0.48} className="grad-text-gold">
            that moves
          </Word>
          <br />
          <Word delay={0.62}>business</Word>{' '}
          <Word delay={0.76} className="grad-text-blue">
            forward.
          </Word>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
          className="mt-10 max-w-xl text-dv-fog text-base md:text-lg leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#contact" variant="primary">
            START PROJECT
            <ArrowIcon />
          </MagneticButton>
          <MagneticButton href="#work" variant="ghost">
            VIEW CASES
            <PlayIcon />
          </MagneticButton>
        </motion.div>

        {/* Hero foot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-3xl"
        >
          {hero.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="display text-2xl md:text-3xl">{s.value}</div>
              <div className="mono text-[10px] tracking-[0.25em] text-dv-mute mt-2 uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="mono text-[10px] tracking-[0.3em] text-dv-mute">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-dv-mute to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 inset-x-0 h-3 bg-dv-gold"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-dv-ink pointer-events-none" />
    </section>
  );
}

function Word({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden align-top">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Streaks() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px w-[40%]"
          style={{
            top: `${20 + i * 25}%`,
            background: 'linear-gradient(90deg, transparent, rgba(110,163,255,0.7), transparent)',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '250%' }}
          transition={{
            duration: 7 + i * 1.4,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 1.6,
          }}
        />
      ))}
      <motion.div
        className="absolute h-px w-[30%] top-[70%]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,214,10,0.5), transparent)' }}
        initial={{ x: '-100%' }}
        animate={{ x: '250%' }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 3 }}
      />
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8m0 0L6 2m4 4L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      <path d="M2 1.5v7l6-3.5z" />
    </svg>
  );
}
