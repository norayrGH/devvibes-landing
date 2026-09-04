import { useState } from 'react';
import { motion } from 'motion/react';
import SectionHeader from '../components/ui/SectionHeader';
import { HOSPITY, TOGHRAMAJYAN, type CaseStudy } from '../lib/work';
import { useCopy, type Copy } from '../lib/i18n';

type CaseCopy = Copy['work']['cases'][number];

/** Structure (slug, links, screenshots) stays in work.ts; prose comes from the
 *  dictionary. Merging here keeps one source for each concern. */
function merge(base: CaseStudy, copy: CaseCopy): CaseStudy {
  return { ...base, ...copy };
}

export default function CaseStudies() {
  const t = useCopy();
  const client = merge(TOGHRAMAJYAN, t.work.cases[0]);
  const product = merge(HOSPITY, t.work.cases[1]);

  return (
    <section id="work" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px divider-line" />
      <div className="absolute top-1/4 -right-40 w-[520px] h-[520px] bg-dv-azure rounded-full orb opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow={t.work.eyebrow}
              index={t.work.index}
              title={
                <>
                  {t.work.titleA}<br />
                  <span className="text-outline">{t.work.titleB}</span>
                </>
              }
            />
          </div>
          <div className="lg:col-span-5">
            <p className="text-dv-fog text-base md:text-lg leading-relaxed">
              {t.work.lead}
            </p>
          </div>
        </div>

        <FeaturedCase study={client} copy={t.work} />
        <ProductCase study={product} copy={t.work} />
      </div>
    </section>
  );
}

/* ============ Client engagement — screenshot-led ============ */

function FeaturedCase({ study, copy }: { study: CaseStudy; copy: Copy['work'] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-16 md:mt-20 glass-card overflow-hidden"
    >
      <div className="grid lg:grid-cols-2">
        <div className="p-7 sm:p-10 md:p-14 order-2 lg:order-1">
          <CaseMeta study={study} copy={copy} />

          <h3 className="display text-3xl md:text-4xl lg:text-5xl leading-[0.95] mt-7">
            {study.name}
          </h3>
          {study.nameLocal && (
            <p className="mono text-[11px] tracking-[0.18em] text-dv-mute mt-3">
              {study.nameLocal}
            </p>
          )}

          <p className="mt-7 text-dv-fog text-base md:text-lg leading-relaxed">{study.summary}</p>

          <Brief study={study} label={copy.briefLabel} />
          <Workstreams study={study} />
          <Facts study={study} />
          <LiveLink study={study} label={copy.ctaClient} noLink={copy.noLink} />
        </div>

        <div className="relative order-1 lg:order-2 min-h-[280px] lg:min-h-full bg-gradient-to-br from-dv-deep/40 to-transparent border-b lg:border-b-0 lg:border-l border-white/[0.06] flex items-center justify-center p-7 sm:p-10 md:p-12">
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
          <BrowserFrame study={study} />
        </div>
      </div>
    </motion.article>
  );
}

/* ============ Own product — same shape, labelled as ours ============ */

function ProductCase({ study, copy }: { study: CaseStudy; copy: Copy['work'] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-6 glass-card overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />

      {/* Same shape as the client case — narrative left, live screenshot right. */}
      <div className="relative grid lg:grid-cols-2">
        <div className="p-7 sm:p-10 md:p-14 order-2 lg:order-1">
          <CaseMeta study={study} copy={copy} />
          <h3 className="display text-3xl md:text-4xl lg:text-5xl leading-[0.95] mt-7">
            {study.name}
          </h3>
          <p className="mt-7 text-dv-fog text-base md:text-lg leading-relaxed">{study.summary}</p>
          <Brief study={study} label={copy.problemLabel} />
          <Facts study={study} />
          <LiveLink study={study} label={copy.ctaProduct} noLink={copy.noLink} />
        </div>

        <div className="relative order-1 lg:order-2 min-h-[280px] lg:min-h-full bg-gradient-to-bl from-dv-deep/40 to-transparent border-b lg:border-b-0 lg:border-l border-white/[0.06] flex items-center justify-center p-7 sm:p-10 md:p-12">
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
          <BrowserFrame study={study} />
        </div>
      </div>

      {/* Full card width: three columns squeezed beside the screenshot wrapped
          every heading onto two lines. */}
      <div className="relative px-7 sm:px-10 md:px-14 pb-10 md:pb-14 pt-10 border-t border-white/[0.07] grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {study.workstreams.map((ws) => (
          <div key={ws.kind} className="flex flex-col">
            <span className="tag tag-gold self-start">{ws.kind}</span>
            <h4 className="display text-lg mt-4 tracking-[0.02em] leading-snug">{ws.title}</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {ws.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-dv-fog text-[13px] leading-relaxed">
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-dv-sky shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

/* ============ Shared pieces ============ */

function CaseMeta({ study, copy }: { study: CaseStudy; copy: Copy['work'] }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="tag tag-gold">{study.sector}</span>
      {/* Own products are marked as such, so they can't read as a client win. */}
      {study.kind === 'product' && <span className="tag">{copy.ownProduct}</span>}
      <span className="tag">{study.status}</span>
      <span className="mono text-[10px] tracking-[0.24em] text-dv-mute uppercase">
        {study.location} · {study.year}
      </span>
    </div>
  );
}

function Brief({ study, label }: { study: CaseStudy; label: string }) {
  return (
    <div className="mt-8 pt-8 border-t border-white/[0.07]">
      <span className="mono text-[10px] tracking-[0.24em] text-dv-gold uppercase">{label}</span>
      <p className="mt-3 text-dv-fog text-sm md:text-base leading-relaxed">{study.brief}</p>
    </div>
  );
}

function Workstreams({ study }: { study: CaseStudy }) {
  return (
    <div className="mt-9 grid sm:grid-cols-2 gap-6">
      {study.workstreams.map((ws) => (
        <div key={ws.kind}>
          <span className="tag">{ws.kind}</span>
          <h4 className="display text-base mt-3.5 tracking-[0.02em]">{ws.title}</h4>
          <ul className="mt-3 flex flex-col gap-2">
            {ws.points.map((p) => (
              <li key={p} className="flex gap-2.5 text-dv-fog text-[13px] leading-relaxed">
                <span className="mt-[7px] w-1 h-1 rounded-full bg-dv-gold shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Facts({ study }: { study: CaseStudy }) {
  // Two-up on phones: four columns puts the longer labels ("Booking channels")
  // straight into each other.
  return (
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 pt-7 border-t border-white/[0.07]">
      {study.facts.map((f) => (
        <div key={f.label}>
          <div className="display text-xl md:text-2xl grad-text-gold">{f.value}</div>
          <div className="mono text-[9px] tracking-[0.16em] text-dv-mute mt-1.5 uppercase leading-tight">
            {f.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Renders nothing when there is no public URL, rather than linking a dead host. */
function LiveLink({ study, label, noLink }: { study: CaseStudy; label: string; noLink: string }) {
  if (!study.live) {
    return (
      <p className="mt-10 mono text-[10px] tracking-[0.2em] text-dv-mute uppercase">
        {noLink}
      </p>
    );
  }

  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <a href={study.live.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M3 9 L9 3 M9 3 H4 M9 3 V8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </a>
      <span className="mono text-[10px] tracking-[0.2em] text-dv-mute">{study.live.label}</span>
    </div>
  );
}

/**
 * Live-site preview. Falls back to a structural rendering of the real page when
 * no screenshot has been dropped in yet, so the section never shows a broken
 * image and never implies a screenshot exists when it doesn't.
 */
function BrowserFrame({ study }: { study: CaseStudy }) {
  const [failed, setFailed] = useState(false);
  const shot = study.shots?.desktop;

  return (
    <div className="relative w-full max-w-[460px]">
      <div className="rounded-xl overflow-hidden border border-white/10 bg-dv-night shadow-card">
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white/[0.04] border-b border-white/[0.06]">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="ml-2 mono text-[9px] tracking-[0.12em] text-dv-mute truncate">
            {study.live?.label ?? study.name}
          </span>
        </div>

        {!shot || failed ? (
          <SitePlaceholder shot={shot} />
        ) : (
          <img
            src={shot}
            alt={`${study.name} website`}
            loading="lazy"
            decoding="async"
            width={920}
            height={620}
            onError={() => setFailed(true)}
            className="block w-full h-auto"
          />
        )}
      </div>
    </div>
  );
}

function SitePlaceholder({ shot }: { shot?: string }) {
  return (
    <div className="p-6 aspect-[4/3] flex flex-col justify-center gap-4">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-20 rounded-full bg-white/15" />
        <div className="flex gap-1.5">
          {['ՀԱՅ', 'РУС', 'EN'].map((l) => (
            <span
              key={l}
              className="mono text-[8px] tracking-[0.1em] text-dv-mute border border-white/10 rounded px-1.5 py-0.5"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      <div className="h-5 w-4/5 rounded bg-white/10" />
      <div className="h-2 w-3/5 rounded-full bg-white/[0.07]" />
      <div className="grid grid-cols-4 gap-1.5 mt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-8 rounded bg-white/[0.05] border border-white/[0.06]" />
        ))}
      </div>
      <div className="mt-1 h-7 w-28 rounded-full bg-dv-gold/20 border border-dv-gold/30" />
      {shot && (
        <p className="mono text-[8px] tracking-[0.16em] text-dv-mute uppercase mt-1">
          Add {shot} for the real screenshot
        </p>
      )}
    </div>
  );
}
