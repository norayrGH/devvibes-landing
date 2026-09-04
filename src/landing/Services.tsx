import { motion } from 'motion/react';
import SectionHeader from '../components/ui/SectionHeader';
import { useCopy } from '../lib/i18n';

type Service = {
  id: string;
  title: string;
  body: string;
  tags: string[];
};

// Tags stay untranslated on purpose: they are product and protocol names, and
// transliterating "RAG" or "CI/CD" makes them harder to recognise, not easier.
const SERVICE_TAGS: string[][] = [
  ['LLMS', 'AGENTS', 'RAG', 'EVALS'],
  ['MULTI-TENANT', 'BILLING', 'RBAC'],
  ['SWIFTUI', 'KOTLIN', 'RN'],
  ['AWS', 'GCP', 'TERRAFORM'],
  ['INTEGRATIONS', 'WORKFLOWS', 'API'],
  ['SYSTEMS', 'MOTION', 'RESEARCH'],
  ['CI/CD', 'OBSERVABILITY', 'SRE'],
  ['NEXT.JS', 'REACT', 'PERF'],
];

export default function Services() {
  const t = useCopy();
  const services: Service[] = t.services.items.map((item, i) => ({
    id: String(i + 1).padStart(2, '0'),
    title: item.title,
    body: item.body,
    tags: SERVICE_TAGS[i] ?? [],
  }));
  return (
    <section id="services" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-dv-deep rounded-full orb opacity-20" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow={t.services.eyebrow}
              index={t.services.index}
              title={
                <>
                  {t.services.titleA}<br />
                  <span className="text-outline">{t.services.titleB}</span>
                </>
              }
            />
          </div>
          <div className="lg:col-span-5">
            <p className="text-dv-fog text-base md:text-lg leading-relaxed">
              {t.services.lead}
            </p>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-3xl overflow-hidden border border-white/[0.06]">
          {services.map((s, i) => (
            <ServiceCell key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCell({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-dv-ink p-7 md:p-8 h-[280px] flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-dv-azure/0 via-dv-cobalt/0 to-dv-deep/0 group-hover:from-dv-azure/15 group-hover:via-dv-cobalt/10 group-hover:to-transparent transition-all duration-700" />

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-dv-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

      <div className="relative flex items-start justify-between">
        <span className="mono text-[10px] tracking-[0.3em] text-dv-mute">{service.id}</span>
        <motion.div
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-dv-gold group-hover:border-dv-gold group-hover:text-black transition-colors duration-400"
          whileHover={{ rotate: 45 }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M2 5.5h7m0 0L5.5 2m3.5 3.5L5.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      <div className="relative">
        <h3 className="display text-2xl md:text-[26px] leading-[0.95] mb-3">{service.title}</h3>
        <p className="text-dv-mute text-[13px] leading-relaxed mb-5">{service.body}</p>
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((t) => (
            <span
              key={t}
              className="mono text-[9px] tracking-[0.2em] text-dv-fog/80 border border-white/[0.06] px-2 py-1 rounded-md bg-white/[0.02]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
