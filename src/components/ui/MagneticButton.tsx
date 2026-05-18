import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  strength?: number;
};

export default function MagneticButton({
  children,
  href,
  className = '',
  variant = 'primary',
  onClick,
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.5 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const innerX = useTransform(sx, (v) => v * 0.35);
  const innerY = useTransform(sy, (v) => v * 0.35);

  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost';

  const Tag: any = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref as any}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={`${baseClass} ${className}`}
    >
      <motion.span style={{ x: innerX, y: innerY }} className="flex items-center gap-2">
        {children}
      </motion.span>
    </Tag>
  );
}
