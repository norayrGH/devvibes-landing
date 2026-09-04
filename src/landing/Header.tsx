import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LANGS, setLang, useCopy, useLang } from '../lib/i18n';

const HREFS = ['#work', '#services', '#process', '#stack', '#contact'] as const;

export default function Header() {
  const t = useCopy();
  const lang = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = [
    { label: t.nav.work, href: HREFS[0] },
    { label: t.nav.services, href: HREFS[1] },
    { label: t.nav.process, href: HREFS[2] },
    { label: t.nav.stack, href: HREFS[3] },
    { label: t.nav.contact, href: HREFS[4] },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'rounded-full glass-dark border border-white/8 shadow-card backdrop-blur-2xl'
            : 'border border-transparent'
        }`}
        style={{ padding: scrolled ? '0.6rem 1.2rem' : '0.75rem 1.2rem' }}
      >
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative w-7 h-7 rounded-md bg-gradient-to-br from-dv-cobalt to-dv-deep flex items-center justify-center overflow-hidden">
            <span className="absolute inset-0 bg-dv-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative font-display text-[13px] font-bold text-white group-hover:text-black transition-colors duration-300">D</span>
          </span>
          <span className="display text-base tracking-[0.02em]">
            DEV<span className="text-dv-gold">VIBES</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-[11px] mono tracking-[0.2em] text-dv-fog hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-dv-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <span className="flex items-center gap-2 text-[10px] mono tracking-[0.2em] text-dv-mute">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dv-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-dv-gold" />
            </span>
            {t.header.availability}
          </span>
          <a href="#contact" className="btn-primary !py-2.5 !px-4 !text-[10px]">
            {t.header.cta}
            <ArrowIcon />
          </a>
          <LangSwitch lang={lang} />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t.header.close : t.header.menu}
          className="lg:hidden w-10 h-10 rounded-full glass flex items-center justify-center"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-4 h-px bg-white transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`block w-4 h-px bg-white transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mx-5 mt-2 rounded-2xl glass-dark p-5 flex flex-col gap-2"
          >
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 mono text-xs tracking-[0.22em] text-dv-fog hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary !py-2.5 !px-4 !text-[10px] mt-2 w-full justify-center" onClick={() => setOpen(false)}>
              {t.header.cta}
              <ArrowIcon />
            </a>
            <div className="mt-1 flex justify-center">
              <LangSwitch lang={lang} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LangSwitch({ lang }: { lang: (typeof LANGS)[number]['code'] }) {
  return (
    <div className="flex items-center rounded-full glass p-0.5" role="group">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={l.code === lang}
          className={`px-2.5 py-1 rounded-full mono text-[10px] tracking-[0.16em] transition-colors ${
            l.code === lang ? 'bg-dv-gold text-black' : 'text-dv-mute hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8m0 0L6 2m4 4L6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
