import { motion } from 'motion/react';
import SectionHeader from '../components/ui/SectionHeader';

type Service = {
  id: string;
  title: string;
  body: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    id: '01',
    title: 'AI SOLUTIONS',
    body: 'Production-grade AI agents, retrieval pipelines, and inference platforms with measurable ROI.',
    tags: ['LLMS', 'AGENTS', 'RAG', 'EVALS'],
  },
  {
    id: '02',
    title: 'SAAS PLATFORMS',
    body: 'Multi-tenant SaaS with auth, billing, role-based access, and onboarding done right.',
    tags: ['MULTI-TENANT', 'BILLING', 'RBAC'],
  },
  {
    id: '03',
    title: 'MOBILE APPS',
    body: 'Native iOS & Android, plus React Native, engineered for performance and design quality.',
    tags: ['SWIFTUI', 'KOTLIN', 'RN'],
  },
  {
    id: '04',
    title: 'CLOUD ARCHITECTURE',
    body: 'Cloud-native foundations on AWS and GCP — resilient, observable, and built for scale.',
    tags: ['AWS', 'GCP', 'TERRAFORM'],
  },
  {
    id: '05',
    title: 'ENTERPRISE SYSTEMS',
    body: 'Internal platforms, ERPs, and integrations that connect across your business surface.',
    tags: ['INTEGRATIONS', 'WORKFLOWS', 'API'],
  },
  {
    id: '06',
    title: 'UI / UX DESIGN',
    body: 'Design systems, motion, and product UX that make complex software feel obvious.',
    tags: ['SYSTEMS', 'MOTION', 'RESEARCH'],
  },
  {
    id: '07',
    title: 'DEVOPS & INFRASTRUCTURE',
    body: 'CI/CD, observability, security baselines, and runbooks your team can rely on.',
    tags: ['CI/CD', 'OBSERVABILITY', 'SRE'],
  },
  {
    id: '08',
    title: 'WEB APPLICATIONS',
    body: 'Performant, accessible web apps with cinematic motion and best-in-class delivery.',
    tags: ['NEXT.JS', 'REACT', 'PERF'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-dv-deep rounded-full blur-[160px] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="HOW WE HELP"
              index="02 ━━ SERVICES"
              title={
                <>
                  An engineering studio<br />
                  <span className="text-outline">that ships.</span>
                </>
              }
            />
          </div>
          <div className="lg:col-span-5">
            <p className="text-dv-fog text-base md:text-lg leading-relaxed">
              Eight tightly integrated practices. One operating standard. We work as a single accountable
              team — design, engineering, and delivery — for the full lifetime of your product.
            </p>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-3xl overflow-hidden border border-white/[0.06]">
          {SERVICES.map((s, i) => (
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
