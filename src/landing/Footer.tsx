import { motion } from 'motion/react';

const NAV = {
  Studio: ['About', 'Process', 'Careers', 'Press'],
  Services: ['AI Solutions', 'SaaS Platforms', 'Mobile Apps', 'Enterprise Systems'],
  Work: ['Case studies', 'Testimonials', 'Partners', 'Awards'],
};

const SOCIAL = [
  { label: 'X', href: '#' },
  { label: 'LINKEDIN', href: '#' },
  { label: 'GITHUB', href: '#' },
  { label: 'DRIBBBLE', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/[0.05]">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-dv-deep rounded-full blur-[180px] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Giant wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="display text-[clamp(4rem,18vw,16rem)] leading-[0.85] tracking-[-0.05em] text-outline mb-14 text-center"
        >
          DEV<span className="grad-text-gold" style={{ WebkitTextStroke: '0' }}>VIBES</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 pb-14 border-b border-white/[0.06]">
          <div className="lg:col-span-5">
            <div className="display text-2xl md:text-3xl tracking-[0.02em]">
              Premium software<br />for ambitious teams.
            </div>
            <p className="mt-6 text-dv-fog text-sm leading-relaxed max-w-md">
              A studio of senior engineers, designers, and product leaders building
              software that ships and stays shipped.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="group glass rounded-full px-4 py-2 mono text-[10px] tracking-[0.22em] text-dv-fog hover:text-dv-gold hover:border-dv-gold/40 transition-colors"
                >
                  {s.label}
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-3 gap-8">
            {Object.entries(NAV).map(([heading, items]) => (
              <div key={heading}>
                <div className="mono text-[10px] tracking-[0.28em] text-dv-gold uppercase mb-5">
                  {heading}
                </div>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-dv-fog hover:text-white transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-3 h-px bg-dv-gold transition-all duration-300" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="mono text-[10px] tracking-[0.25em] text-dv-mute uppercase">
            © 2026 DEVVIBES STUDIO · ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-6 mono text-[10px] tracking-[0.25em] text-dv-mute uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-dv-gold animate-pulse" />
              ALL SYSTEMS NOMINAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
