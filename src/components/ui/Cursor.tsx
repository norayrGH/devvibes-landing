import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 32, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    setVisible(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, [data-cursor]');
      setHovering(!!interactive);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', checkHover);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkHover);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 12,
            height: hovering ? 56 : 12,
            opacity: hovering ? 0.4 : 1,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          style={{
            background: '#FFFFFF',
            borderRadius: 999,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>
    </>
  );
}
