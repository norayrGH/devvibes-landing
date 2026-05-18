import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  index?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  index,
}: Props) {
  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start'} max-w-4xl ${align === 'center' ? 'mx-auto' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3"
      >
        {index && <span className="eyebrow-gold">{index}</span>}
        <span className="eyebrow">{eyebrow}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        className="display mt-5 text-[clamp(2.4rem,5vw,4.6rem)] grad-text"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-6 text-dv-fog text-base md:text-lg leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
