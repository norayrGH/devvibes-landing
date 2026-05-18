import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 1;
      setProgress((p) => {
        const next = p + (100 - p) * 0.18 + 1;
        return Math.min(next, 100);
      });
      if (t > 14) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 280);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-dv-ink flex items-center justify-center"
        >
          <motion.div
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <motion.span
                className="relative w-8 h-8 rounded-md bg-gradient-to-br from-dv-cobalt to-dv-deep flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <span className="font-display text-sm font-bold text-white">D</span>
              </motion.span>
              <span className="display text-xl tracking-[0.02em]">
                DEV<span className="text-dv-gold">VIBES</span>
              </span>
            </div>
            <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-dv-cobalt via-dv-sky to-dv-gold"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="mono text-[10px] tracking-[0.3em] text-dv-mute">
              {Math.round(progress).toString().padStart(3, '0')} / 100
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
