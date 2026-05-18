import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'motion/react';

type Props = {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export default function AnimatedCounter({
  to,
  duration = 2.2,
  prefix = '',
  suffix = '',
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const n = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
        setDisplay(formatNumber(n));
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, decimals, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function formatNumber(n: string) {
  const [whole, frac] = n.split('.');
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return frac ? `${withCommas}.${frac}` : withCommas;
}
