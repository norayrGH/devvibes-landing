import { useSyncExternalStore } from 'react';

// Two-locale copy store. Deliberately not an i18n library: the whole site is
// one page of marketing copy, so a typed dictionary plus a 20-line store beats
// shipping a runtime and a plural-rules table on the critical path.
//
// Armenian needs more than a string swap — Space Grotesk and JetBrains Mono
// carry no Armenian glyphs, so index.css re-points the display and mono faces
// off `html[lang="hy"]`. Keep that in sync if you add a locale.

export type Lang = 'en' | 'hy';

const STORAGE_KEY = 'dv:lang';
export const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'hy', label: 'ՀԱՅ' },
];

function detect(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'hy') return saved;
  } catch {
    // Blocked storage — fall through to the browser's preference.
  }
  return navigator.language?.toLowerCase().startsWith('hy') ? 'hy' : 'en';
}

let current: Lang = detect();
const listeners = new Set<() => void>();

/** Mirrors the language onto <html> so CSS can swap font stacks. */
function syncDocument(lang: Lang) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
}
syncDocument(current);

function applyMeta(lang: Lang) {
  if (typeof document === 'undefined') return;
  const meta = DICT[lang].meta;
  document.title = meta.title;
  const tag = document.querySelector('meta[name="description"]');
  if (tag) tag.setAttribute('content', meta.description);
}

export function setLang(lang: Lang) {
  if (lang === current) return;
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Non-fatal: the choice just won't survive a reload.
  }
  syncDocument(lang);
  applyMeta(lang);
  listeners.forEach((l) => l());
}

export function useLang(): Lang {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      return () => listeners.delete(onChange);
    },
    () => current,
    () => 'en',
  );
}

export function useCopy(): Copy {
  return DICT[useLang()];
}

/* ============================ Shape ============================ */

type Section = { eyebrow: string; index: string; titleA: string; titleB: string };

export type Copy = {
  meta: { title: string; description: string };
  nav: { work: string; services: string; process: string; stack: string; contact: string };
  header: { availability: string; cta: string; menu: string; close: string };
  hero: {
    tagline: string;
    badge: string;
    words: [string, string, string, string, string];
    subtitle: string;
    ctaPrimary: string;
    ctaGhost: string;
    scroll: string;
    stats: { value: string; label: string }[];
  };
  trust: { building: string; whatWeBuild: string; capabilities: string[] };
  problems: Section & {
    description: string;
    itemLabel: string;
    explore: string;
    items: {
      title: string;
      subtitle: string;
      body: string;
      metric: string;
      metricLabel: string;
    }[];
  };
  services: Section & {
    lead: string;
    items: { title: string; body: string }[];
  };
  process: Section & {
    stepLabel: string;
    steps: { label: string; title: string; body: string; bullets: string[] }[];
  };
  work: Section & {
    lead: string;
    briefLabel: string;
    problemLabel: string;
    ownProduct: string;
    ctaClient: string;
    ctaProduct: string;
    noLink: string;
    cases: {
      status: string;
      location: string;
      sector: string;
      summary: string;
      brief: string;
      workstreams: { kind: string; title: string; points: string[] }[];
      facts: { value: string; label: string }[];
    }[];
  };
  stack: Section & { lead: string; tiers: Record<string, string>; toolsLabel: string };
  cta: {
    eyebrow: string;
    headA: string;
    headB: string;
    body: string;
    primary: string;
    ghost: string;
    labels: { mail: string; voice: string; studios: string; hours: string };
  };
  footer: {
    tagA: string;
    tagB: string;
    body: string;
    groups: { title: string; items: string[] }[];
    rights: string;
    legal: string[];
    status: string;
  };
};

/* ============================ English ============================ */

const en: Copy = {
  meta: {
    title: 'DEVVIBES — We Build Software That Moves Business Forward',
    description:
      'DEVVIBES — a senior engineering studio designing and shipping AI, web, and mobile platforms, from first architecture to production.',
  },
  nav: {
    work: 'WORK',
    services: 'SERVICES',
    process: 'PROCESS',
    stack: 'STACK',
    contact: 'CONTACT',
  },
  header: {
    availability: 'ACCEPTING Q3',
    cta: 'START PROJECT',
    menu: 'Open menu',
    close: 'Close menu',
  },
  hero: {
    tagline: 'PREMIUM SOFTWARE STUDIO',
    badge: 'EST. 2017',
    words: ['We build', 'software', 'that moves', 'business', 'forward.'],
    subtitle:
      'A senior engineering studio designing and shipping AI, web, and mobile platforms — from first architecture through to the system running in production.',
    ctaPrimary: 'START PROJECT',
    ctaGhost: 'VIEW CASES',
    scroll: 'SCROLL',
    stats: [
      { value: 'AI', label: 'Agents & automation' },
      { value: 'Web', label: 'Platforms & apps' },
      { value: 'Mobile', label: 'iOS & Android' },
      { value: 'Design', label: 'UI/UX in-house' },
    ],
  },
  trust: {
    building: 'CURRENTLY BUILDING FOR',
    whatWeBuild: 'WHAT WE BUILD',
    capabilities: [
      'AI SOLUTIONS',
      'SAAS PLATFORMS',
      'MOBILE APPS',
      'CLOUD ARCHITECTURE',
      'ENTERPRISE SYSTEMS',
      'UI / UX DESIGN',
      'DEVOPS & INFRASTRUCTURE',
      'WEB APPLICATIONS',
    ],
  },
  problems: {
    eyebrow: 'WHAT WE SOLVE',
    index: '01 ━━ PROBLEMS',
    titleA: 'Five problems software',
    titleB: 'should be solving.',
    description:
      'The cost of doing nothing compounds every quarter. These are the recurring patterns we build for.',
    itemLabel: 'PROBLEM',
    explore: 'EXPLORE',
    items: [
      {
        title: 'BUSINESS AUTOMATION',
        subtitle: 'Manual operations bleed margin.',
        body: 'Most enterprises lose 20–30% of operating capacity to repetitive work and disconnected tools. We design event-driven systems and AI agents that compress workflows from days to minutes.',
        metric: 'Event-driven',
        metricLabel: 'Systems & AI agents',
      },
      {
        title: 'SLOW DIGITAL TRANSFORMATION',
        subtitle: 'Legacy systems cap growth.',
        body: 'Monolithic stacks block expansion and innovation. We replatform without ripping out — strangler migrations, modular services, and modern interfaces that ship in quarters, not years.',
        metric: 'Strangler',
        metricLabel: 'Migration, no big bang',
      },
      {
        title: 'DATA CHAOS',
        subtitle: 'Information that nobody trusts.',
        body: 'When data lives in silos, decisions get slower and riskier. We build governed data platforms with AI-grade pipelines, semantic layers, and dashboards leaders actually use.',
        metric: 'Governed',
        metricLabel: 'Pipelines & semantic layer',
      },
      {
        title: 'CUSTOMER EXPERIENCE ISSUES',
        subtitle: 'Slow, ugly products lose revenue.',
        body: 'Users churn out of friction. We design and engineer products with sub-second response times, considered motion, and the kind of detail you feel before you can name it.',
        metric: 'Sub-second',
        metricLabel: 'Response budget',
      },
      {
        title: 'SCALABILITY & PERFORMANCE',
        subtitle: 'Systems that break under success.',
        body: 'When traffic spikes you cannot afford to be the bottleneck. We architect for elasticity from day one — multi-region, observable, and ready for ten times the load.',
        metric: 'Multi-region',
        metricLabel: 'Elastic by design',
      },
    ],
  },
  services: {
    eyebrow: 'HOW WE HELP',
    index: '02 ━━ SERVICES',
    titleA: 'An engineering studio',
    titleB: 'that ships.',
    lead: 'Eight tightly integrated practices. One operating standard. We work as a single accountable team — design, engineering, and delivery — for the full lifetime of your product.',
    items: [
      {
        title: 'AI SOLUTIONS',
        body: 'Production-grade AI agents, retrieval pipelines, and inference platforms with measurable ROI.',
      },
      {
        title: 'SAAS PLATFORMS',
        body: 'Multi-tenant SaaS with auth, billing, role-based access, and onboarding done right.',
      },
      {
        title: 'MOBILE APPS',
        body: 'Native iOS & Android, plus React Native, engineered for performance and design quality.',
      },
      {
        title: 'CLOUD ARCHITECTURE',
        body: 'Cloud-native foundations on AWS and GCP — resilient, observable, and built for scale.',
      },
      {
        title: 'ENTERPRISE SYSTEMS',
        body: 'Internal platforms, ERPs, and integrations that connect across your business surface.',
      },
      {
        title: 'UI / UX DESIGN',
        body: 'Design systems, motion, and product UX that make complex software feel obvious.',
      },
      {
        title: 'DEVOPS & INFRASTRUCTURE',
        body: 'CI/CD, observability, security baselines, and runbooks your team can rely on.',
      },
      {
        title: 'WEB APPLICATIONS',
        body: 'Performant, accessible web apps with cinematic motion and best-in-class delivery.',
      },
    ],
  },
  process: {
    eyebrow: 'HOW WE WORK',
    index: '03 ━━ PROCESS',
    titleA: 'From signal to scale.',
    titleB: 'Four disciplined steps.',
    stepLabel: 'STEP',
    steps: [
      {
        label: 'DISCOVER',
        title: 'Frame the problem.',
        body: 'Workshops, technical audits, and customer research that turn ambition into a concrete plan with measurable outcomes.',
        bullets: ['Stakeholder mapping', 'Technical audit', 'Product strategy', 'KPI definition'],
      },
      {
        label: 'DESIGN',
        title: 'Shape the experience.',
        body: 'Senior design partners craft systems, flows, and motion. We prototype in fidelity so engineering ships from real artifacts.',
        bullets: [
          'Design systems',
          'Interaction & motion',
          'High-fidelity prototypes',
          'Accessibility',
        ],
      },
      {
        label: 'DEVELOP',
        title: 'Engineer for production.',
        body: 'Senior engineers ship in two-week increments against a live staging environment with automated quality gates.',
        bullets: ['Type-safe codebases', 'CI/CD pipelines', 'Test automation', 'Security baselines'],
      },
      {
        label: 'SCALE',
        title: 'Run and grow.',
        body: 'Observability, on-call, and continuous delivery. We stay long enough to make growth a non-event.',
        bullets: [
          'Observability stack',
          'Performance tuning',
          'Cost optimization',
          'Roadmap evolution',
        ],
      },
    ],
  },
  work: {
    eyebrow: 'SELECTED WORK',
    index: '04 ━━ WORK',
    titleA: 'Shipped, live,',
    titleB: 'and open to inspection.',
    lead: 'We would rather show you one platform you can open right now than a page of logos you cannot verify.',
    briefLabel: 'The brief',
    problemLabel: 'The problem',
    ownProduct: 'Own product',
    ctaClient: 'VIEW LIVE PREVIEW',
    ctaProduct: 'VIEW LIVE SITE',
    noLink: 'Private beta — ask us for a walkthrough',
    cases: [
      {
        status: 'Pre-launch preview',
        location: 'Yerevan, Armenia',
        sector: 'Healthcare',
        summary: 'A trilingual clinic platform and an automated intake layer behind it.',
        brief:
          'A private medical centre in Yerevan needed a public presence that worked for Armenian, Russian, and English-speaking patients, and a way to stop losing appointment requests to manual follow-up.',
        workstreams: [
          {
            kind: 'PLATFORM',
            title: 'Clinic website',
            points: [
              'Trilingual across Armenian, Russian, and English',
              'Eight specialties, each with its own service detail',
              'Team, about, blog, and patient review sections',
              'Appointment request form with service and date selection',
            ],
          },
          {
            kind: 'AI',
            title: 'Intake automation',
            points: [
              'Appointment requests captured, routed, and confirmed automatically',
              'Reminders sent ahead of the visit',
              'Patient assistant answering common questions before staff pick up',
              'Hand-off to a person whenever the request needs one',
            ],
          },
        ],
        facts: [
          { value: '3', label: 'Languages' },
          { value: '8', label: 'Specialties' },
          { value: '3', label: 'Booking channels' },
          { value: '24/7', label: 'Request intake' },
        ],
      },
      {
        status: 'Private beta',
        location: 'Built in-house',
        sector: 'Hospitality',
        summary:
          'The guest already carries the best interface a hotel could ask for. Hospity turns a check-in QR into a front desk that never closes.',
        brief:
          'The moment a guest wants something — room service, the spa, housekeeping, an excursion — they hit friction: a front desk that does not pick up, a queue in the lobby, a laminated menu in a language they do not read. So they do not bother. Every request never made is revenue that walked past reception, and the ones that do land arrive by phone call and sticky note, with no record of who owns them.',
        workstreams: [
          {
            kind: 'GUEST',
            title: 'Two taps, own language',
            points: [
              'Room service, spa, activities and housekeeping from the phone already in hand',
              'Card payment at the point of request',
              'No phone calls, no lobby queue, no reception hours',
            ],
          },
          {
            kind: 'STAFF',
            title: 'Nothing gets dropped',
            points: [
              'Every request routed instantly to the right role — kitchen, spa, cleaning, reception',
              'Tracked from requested through to done',
              'Realtime push and websocket delivery, so nobody waits on a refresh',
            ],
          },
          {
            kind: 'OWNERS',
            title: 'An operation you can read',
            points: [
              'What guests actually ask for, and what it earns',
              'Whether the team is keeping up, by department',
              'Per-hotel isolation, so a group can run many properties on one platform',
            ],
          },
        ],
        facts: [
          { value: '2', label: 'Native apps' },
          { value: '8', label: 'Staff roles' },
          { value: '4', label: 'Service domains' },
          { value: 'Realtime', label: 'Request routing' },
        ],
      },
    ],
  },
  stack: {
    eyebrow: 'THE TOOLBOX',
    index: '05 ━━ STACK',
    titleA: 'Modern engineering.',
    titleB: 'Battle-tested choices.',
    lead: 'We pick boring where it matters and bleeding-edge where it pays off. Every stack decision is owned by senior engineers and reviewed against your operating reality.',
    toolsLabel: 'tools',
    tiers: {
      frontend: 'Frontend',
      mobile: 'Mobile',
      backend: 'Backend',
      data: 'Data',
      cloud: 'Cloud / Infra',
      ai: 'AI / ML',
    },
  },
  cta: {
    eyebrow: '07 ━━ READY?',
    headA: "LET'S BUILD",
    headB: 'THE FUTURE.',
    body: "Tell us about the platform you want to build, replace, or scale. We'll respond within one business day with a senior partner attached.",
    primary: 'START A PROJECT',
    ghost: 'BOOK A CALL',
    labels: { mail: 'Mail', voice: 'Voice', studios: 'Studios', hours: 'Hours' },
  },
  footer: {
    tagA: 'Premium software',
    tagB: 'for ambitious teams.',
    body: 'A studio of senior engineers, designers, and product leaders building software that ships and stays shipped.',
    groups: [
      { title: 'Studio', items: ['About', 'Process', 'Careers', 'Press'] },
      {
        title: 'Services',
        items: ['AI Solutions', 'SaaS Platforms', 'Mobile Apps', 'Enterprise Systems'],
      },
      { title: 'Work', items: ['Case studies', 'Testimonials', 'Partners', 'Awards'] },
    ],
    rights: '© 2026 DEVVIBES STUDIO · ALL RIGHTS RESERVED',
    legal: ['Privacy', 'Terms', 'Cookies'],
    status: 'ALL SYSTEMS NOMINAL',
  },
};

/* ============================ Armenian ============================ */

const hy: Copy = {
  meta: {
    title: 'DEVVIBES — Ծրագրեր, որոնք առաջ են մղում բիզնեսը',
    description:
      'DEVVIBES — ավագ ինժեներների ստուդիա, որը նախագծում և գործարկում է AI, վեբ և մոբայլ հարթակներ՝ ճարտարապետությունից մինչև արտադրություն։',
  },
  nav: {
    work: 'ԱՇԽԱՏԱՆՔՆԵՐ',
    services: 'ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ',
    process: 'ԳՈՐԾԸՆԹԱՑ',
    stack: 'ՏԵԽՆՈԼՈԳԻԱՆԵՐ',
    contact: 'ԿԱՊ',
  },
  header: {
    availability: 'ԸՆԴՈՒՆՈՒՄ ԵՆՔ Q3',
    cta: 'ՍԿՍԵԼ ՆԱԽԱԳԻԾ',
    menu: 'Բացել ընտրացանկը',
    close: 'Փակել ընտրացանկը',
  },
  hero: {
    tagline: 'ՊՐԵՄԻՈՒՄ ԾՐԱԳՐԱՅԻՆ ՍՏՈՒԴԻԱ',
    badge: 'ՀԻՄՆ. 2017',
    words: ['Ստեղծում ենք', 'ծրագրեր,', 'որոնք առաջ են մղում', 'ձեր', 'բիզնեսը։'],
    subtitle:
      'Ավագ ինժեներների ստուդիա, որը նախագծում և գործարկում է AI, վեբ և մոբայլ հարթակներ՝ առաջին ճարտարապետությունից մինչև արտադրության մեջ աշխատող համակարգը։',
    ctaPrimary: 'ՍԿՍԵԼ ՆԱԽԱԳԻԾ',
    ctaGhost: 'ԴԻՏԵԼ ԳՈՐԾԵՐԸ',
    scroll: 'ՈԼՈՐԵԼ',
    stats: [
      { value: 'AI', label: 'Ագենտներ և ավտոմատացում' },
      { value: 'Վեբ', label: 'Հարթակներ և հավելվածներ' },
      { value: 'Մոբայլ', label: 'iOS և Android' },
      { value: 'Դիզայն', label: 'Սեփական UI/UX թիմ' },
    ],
  },
  trust: {
    building: 'ՆԵՐԿԱՅՈՒՄՍ ԿԱՌՈՒՑՈՒՄ ԵՆՔ',
    whatWeBuild: 'ԻՆՉ ԵՆՔ ԿԱՌՈՒՑՈՒՄ',
    capabilities: [
      'AI ԼՈՒԾՈՒՄՆԵՐ',
      'SAAS ՀԱՐԹԱԿՆԵՐ',
      'ՄՈԲԱՅԼ ՀԱՎԵԼՎԱԾՆԵՐ',
      'ԱՄՊԱՅԻՆ ՃԱՐՏԱՐԱՊԵՏՈՒԹՅՈՒՆ',
      'ԿՈՐՊՈՐԱՏԻՎ ՀԱՄԱԿԱՐԳԵՐ',
      'UI / UX ԴԻԶԱՅՆ',
      'DEVOPS ԵՎ ԵՆԹԱԿԱՌՈՒՑՎԱԾՔ',
      'ՎԵԲ ՀԱՎԵԼՎԱԾՆԵՐ',
    ],
  },
  problems: {
    eyebrow: 'ԻՆՉ ԵՆՔ ԼՈՒԾՈՒՄ',
    index: '01 ━━ ԽՆԴԻՐՆԵՐ',
    titleA: 'Հինգ խնդիր, որ ծրագրերը',
    titleB: 'պետք է լուծեն։',
    description:
      'Ոչինչ չանելու գինը կուտակվում է ամեն եռամսյակ։ Սրանք այն կրկնվող օրինաչափություններն են, որոնց համար կառուցում ենք։',
    itemLabel: 'ԽՆԴԻՐ',
    explore: 'ԴԻՏԵԼ',
    items: [
      {
        title: 'ԲԻԶՆԵՍԻ ԱՎՏՈՄԱՏԱՑՈՒՄ',
        subtitle: 'Ձեռքով աշխատանքը կրծում է շահույթը։',
        body: 'Ընկերությունների մեծ մասը կորցնում է գործառնական հզորության 20–30 տոկոսը կրկնվող աշխատանքի և իրար հետ չկապված գործիքների վրա։ Մենք նախագծում ենք իրադարձություններով կառավարվող համակարգեր և AI ագենտներ, որոնք օրերի աշխատանքը սեղմում են րոպեների։',
        metric: 'Իրադարձային',
        metricLabel: 'Համակարգեր և AI ագենտներ',
      },
      {
        title: 'ԴԱՆԴԱՂ ԹՎԱՅԻՆ ՓՈԽԱԿԵՐՊՈՒՄ',
        subtitle: 'Հին համակարգերը սահմանափակում են աճը։',
        body: 'Մոնոլիտ համակարգերն արգելափակում են ընդլայնումն ու նորարարությունը։ Մենք փոխում ենք հարթակը՝ առանց ամեն ինչ քանդելու․ աստիճանական միգրացիա, մոդուլային ծառայություններ և ժամանակակից ինտերֆեյսներ, որոնք գործարկվում են եռամսյակների, ոչ թե տարիների ընթացքում։',
        metric: 'Աստիճանական',
        metricLabel: 'Միգրացիա՝ առանց ցնցումների',
      },
      {
        title: 'ՏՎՅԱԼՆԵՐԻ ՔԱՈՍ',
        subtitle: 'Տեղեկատվություն, որին ոչ ոք չի վստահում։',
        body: 'Երբ տվյալները ցրված են առանձին կղզիներում, որոշումները դանդաղում են և ռիսկայնանում։ Մենք կառուցում ենք կառավարվող տվյալների հարթակներ՝ AI-ի համար պատրաստ հոսքերով, իմաստային շերտով և վահանակներով, որոնք ղեկավարներն իրականում օգտագործում են։',
        metric: 'Կառավարվող',
        metricLabel: 'Հոսքեր և իմաստային շերտ',
      },
      {
        title: 'ՀԱՃԱԽՈՐԴԻ ՓՈՐՁԱՌՈՒԹՅԱՆ ԽՆԴԻՐՆԵՐ',
        subtitle: 'Դանդաղ ու անհրապույր արտադրանքը եկամուտ է կորցնում։',
        body: 'Օգտատերերը հեռանում են խոչընդոտների պատճառով։ Մենք նախագծում և կառուցում ենք արտադրանք՝ վայրկյանից պակաս արձագանքով, մտածված շարժումով և այն մանրամասնությամբ, որը զգում ես դեռ չբառացիացրած։',
        metric: 'Ենթավայրկյան',
        metricLabel: 'Արձագանքի սահման',
      },
      {
        title: 'ՄԱՍՇՏԱԲԱՎՈՐՈՒՄ ԵՎ ԱՐՏԱԴՐՈՂԱԿԱՆՈՒԹՅՈՒՆ',
        subtitle: 'Համակարգեր, որոնք կոտրվում են հաջողությունից։',
        body: 'Երբ բեռը կտրուկ աճում է, չեք կարող թույլ տալ, որ խցանումը դուք լինեք։ Մենք ճարտարապետությունը կառուցում ենք առաձգական՝ առաջին օրվանից․ բազմատարածաշրջանային, դիտարկելի և տասնապատիկ բեռի պատրաստ։',
        metric: 'Բազմատարածաշրջ.',
        metricLabel: 'Առաձգական ըստ նախագծի',
      },
    ],
  },
  services: {
    eyebrow: 'ԻՆՉՈՎ ԵՆՔ ՕԳՆՈՒՄ',
    index: '02 ━━ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ',
    titleA: 'Ինժենիրինգի ստուդիա,',
    titleB: 'որը գործարկում է։',
    lead: 'Ութ սերտ ինտեգրված ուղղություն։ Մեկ գործառնական չափանիշ։ Աշխատում ենք որպես մեկ պատասխանատու թիմ՝ դիզայն, ինժենիրինգ և մատակարարում, ձեր արտադրանքի ողջ կյանքի ընթացքում։',
    items: [
      {
        title: 'AI ԼՈՒԾՈՒՄՆԵՐ',
        body: 'Արտադրության մակարդակի AI ագենտներ, որոնման հոսքեր և ինֆերենսի հարթակներ՝ չափելի արդյունքով։',
      },
      {
        title: 'SAAS ՀԱՐԹԱԿՆԵՐ',
        body: 'Բազմավարձակալ SaaS՝ նույնականացմամբ, վճարումներով, դերային մատչելիությամբ և ճիշտ կազմակերպված ներգրավմամբ։',
      },
      {
        title: 'ՄՈԲԱՅԼ ՀԱՎԵԼՎԱԾՆԵՐ',
        body: 'Բնիկ iOS և Android, ինչպես նաև React Native՝ կառուցված արագության և դիզայնի որակի համար։',
      },
      {
        title: 'ԱՄՊԱՅԻՆ ՃԱՐՏԱՐԱՊԵՏՈՒԹՅՈՒՆ',
        body: 'Ամպային հիմքեր AWS-ի և GCP-ի վրա՝ կայուն, դիտարկելի և մասշտաբի համար կառուցված։',
      },
      {
        title: 'ԿՈՐՊՈՐԱՏԻՎ ՀԱՄԱԿԱՐԳԵՐ',
        body: 'Ներքին հարթակներ, ERP-ներ և ինտեգրացիաներ, որոնք կապում են ձեր բիզնեսի բոլոր հանգույցները։',
      },
      {
        title: 'UI / UX ԴԻԶԱՅՆ',
        body: 'Դիզայն-համակարգեր, շարժում և արտադրանքի UX, որոնք բարդ ծրագիրը դարձնում են ակնհայտ։',
      },
      {
        title: 'DEVOPS ԵՎ ԵՆԹԱԿԱՌՈՒՑՎԱԾՔ',
        body: 'CI/CD, դիտարկելիություն, անվտանգության հիմքեր և ընթացակարգեր, որոնց ձեր թիմը կարող է վստահել։',
      },
      {
        title: 'ՎԵԲ ՀԱՎԵԼՎԱԾՆԵՐ',
        body: 'Արագ ու հասանելի վեբ հավելվածներ՝ կինեմատոգրաֆիկ շարժումով և բարձրակարգ իրականացմամբ։',
      },
    ],
  },
  process: {
    eyebrow: 'ԻՆՉՊԵՍ ԵՆՔ ԱՇԽԱՏՈՒՄ',
    index: '03 ━━ ԳՈՐԾԸՆԹԱՑ',
    titleA: 'Գաղափարից մինչև մասշտաբ։',
    titleB: 'Չորս կարգապահ քայլ։',
    stepLabel: 'ՔԱՅԼ',
    steps: [
      {
        label: 'ՀԵՏԱԶՈՏԵԼ',
        title: 'Ձևակերպել խնդիրը։',
        body: 'Աշխատաժողովներ, տեխնիկական աուդիտ և հաճախորդների հետազոտություն, որոնք ամբիցիան վերածում են չափելի արդյունքներով կոնկրետ պլանի։',
        bullets: [
          'Շահագրգիռ կողմերի քարտեզ',
          'Տեխնիկական աուդիտ',
          'Արտադրանքի ռազմավարություն',
          'KPI-ների սահմանում',
        ],
      },
      {
        label: 'ՆԱԽԱԳԾԵԼ',
        title: 'Ձևավորել փորձառությունը։',
        body: 'Ավագ դիզայներները ստեղծում են համակարգեր, հոսքեր և շարժում։ Նախատիպերը պատրաստում ենք բարձր մանրամասնությամբ, որպեսզի ինժենիրինգը գործի իրական նյութից։',
        bullets: [
          'Դիզայն-համակարգեր',
          'Փոխազդեցություն և շարժում',
          'Մանրամասն նախատիպեր',
          'Հասանելիություն',
        ],
      },
      {
        label: 'ՄՇԱԿԵԼ',
        title: 'Կառուցել արտադրության համար։',
        body: 'Ավագ ինժեներները գործարկում են երկշաբաթյա փուլերով՝ կենդանի փորձարկման միջավայրում, ավտոմատացված որակի ստուգումներով։',
        bullets: [
          'Տիպապահ կոդ',
          'CI/CD հոսքեր',
          'Թեստերի ավտոմատացում',
          'Անվտանգության հիմքեր',
        ],
      },
      {
        label: 'ՄԱՍՇՏԱԲԵԼ',
        title: 'Շահագործել և աճեցնել։',
        body: 'Դիտարկելիություն, հերթապահություն և շարունակական մատակարարում։ Մնում ենք այնքան, որ աճը դադարի իրադարձություն լինել։',
        bullets: [
          'Դիտարկելիության համակարգ',
          'Արագության կարգավորում',
          'Ծախսերի օպտիմալացում',
          'Ճանապարհային քարտեզի զարգացում',
        ],
      },
    ],
  },
  work: {
    eyebrow: 'ԸՆՏՐՎԱԾ ԱՇԽԱՏԱՆՔՆԵՐ',
    index: '04 ━━ ԱՇԽԱՏԱՆՔՆԵՐ',
    titleA: 'Գործարկված, կենդանի',
    titleB: 'և ստուգման բաց։',
    lead: 'Նախընտրում ենք ցույց տալ մեկ հարթակ, որը կարող եք հենց հիմա բացել, քան լոգոների էջ, որը հնարավոր չէ ստուգել։',
    briefLabel: 'Խնդրի ձևակերպումը',
    problemLabel: 'Խնդիրը',
    ownProduct: 'Սեփական արտադրանք',
    ctaClient: 'ԴԻՏԵԼ ԿԵՆԴԱՆԻ ՏԱՐԲԵՐԱԿԸ',
    ctaProduct: 'ԴԻՏԵԼ ԿԱՅՔԸ',
    noLink: 'Փակ բետա — խնդրեք ցուցադրություն',
    cases: [
      {
        status: 'Մինչմեկնարկային տարբերակ',
        location: 'Երևան, Հայաստան',
        sector: 'Առողջապահություն',
        summary: 'Եռալեզու կլինիկայի հարթակ և դրա հետևում կանգնած ավտոմատացված ընդունարան։',
        brief:
          'Երևանի մասնավոր բժշկական կենտրոնին անհրաժեշտ էր հանրային ներկայություն, որն աշխատի հայերեն, ռուսերեն և անգլերեն խոսող հիվանդների համար, և միջոց՝ դադարեցնելու ձեռքով հետևելու պատճառով կորչող այցի հայտերը։',
        workstreams: [
          {
            kind: 'ՀԱՐԹԱԿ',
            title: 'Կլինիկայի կայք',
            points: [
              'Եռալեզու՝ հայերեն, ռուսերեն և անգլերեն',
              'Ութ մասնագիտություն՝ յուրաքանչյուրն իր առանձին նկարագրությամբ',
              'Թիմ, մեր մասին, բլոգ և հիվանդների կարծիքներ',
              'Այցի հայտի ձև՝ ծառայության և ամսաթվի ընտրությամբ',
            ],
          },
          {
            kind: 'AI',
            title: 'Ընդունարանի ավտոմատացում',
            points: [
              'Այցի հայտերը գրանցվում, ուղղորդվում և հաստատվում են ավտոմատ',
              'Հիշեցումներ՝ այցից առաջ',
              'Օգնական, որը պատասխանում է հաճախակի հարցերին՝ մինչ անձնակազմը միանա',
              'Փոխանցում մարդուն, երբ հայտը դա պահանջում է',
            ],
          },
        ],
        facts: [
          { value: '3', label: 'Լեզու' },
          { value: '8', label: 'Մասնագիտություն' },
          { value: '3', label: 'Գրանցման ուղի' },
          { value: '24/7', label: 'Հայտերի ընդունում' },
        ],
      },
      {
        status: 'Փակ բետա',
        location: 'Կառուցված ներսում',
        sector: 'Հյուրընկալություն',
        summary:
          'Հյուրն արդեն ձեռքին ունի լավագույն ինտերֆեյսը, որ հյուրանոցը կարող էր ցանկանալ։ Hospity-ն գրանցման QR-ը դարձնում է ընդունարան, որը երբեք չի փակվում։',
        brief:
          'Այն պահին, երբ հյուրն ինչ-որ բան է ուզում՝ սենյակային սպասարկում, սպա, մաքրում, էքսկուրսիա, բախվում է խոչընդոտի․ ընդունարան, որը չի պատասխանում, հերթ նախասրահում, լամինացված ցանկ՝ իր չկարդացող լեզվով։ Ու չի էլ փորձում։ Ամեն չարված հայտ եկամուտ է, որն անցել է ընդունարանի կողքով, իսկ հասնողները գալիս են հեռախոսազանգով ու կպչուն թերթիկով՝ առանց հետքի, թե ով է պատասխանատուն։',
        workstreams: [
          {
            kind: 'ՀՅՈՒՐ',
            title: 'Երկու հպում, իր լեզվով',
            points: [
              'Սենյակային սպասարկում, սպա, զբաղմունքներ և մաքրում՝ արդեն ձեռքին եղած հեռախոսից',
              'Քարտով վճարում՝ հենց հայտի պահին',
              'Ոչ հեռախոսազանգ, ոչ հերթ, ոչ ընդունարանի ժամեր',
            ],
          },
          {
            kind: 'ԱՆՁՆԱԿԱԶՄ',
            title: 'Ոչինչ չի կորչում',
            points: [
              'Ամեն հայտ ակնթարթորեն ուղղորդվում է ճիշտ դերին՝ խոհանոց, սպա, մաքրում, ընդունարան',
              'Հետևում ենք հայտից մինչև կատարում',
              'Իրական ժամանակի push և websocket՝ ոչ ոք չի սպասում թարմացմանը',
            ],
          },
          {
            kind: 'ՍԵՓԱԿԱՆԱՏԵՐԵՐ',
            title: 'Գործառնություն, որը կարելի է կարդալ',
            points: [
              'Ինչ են հյուրերն իրականում ուզում և ինչ եկամուտ է դա բերում',
              'Արդյոք թիմը հասցնում է՝ ըստ բաժինների',
              'Յուրաքանչյուր հյուրանոցի մեկուսացում՝ ցանցը կարող է մեկ հարթակով վարել բազում օբյեկտ',
            ],
          },
        ],
        facts: [
          { value: '2', label: 'Բնիկ հավելված' },
          { value: '8', label: 'Անձնակազմի դեր' },
          { value: '4', label: 'Ծառայության ուղղություն' },
          { value: 'Իրական ժամ.', label: 'Հայտերի ուղղորդում' },
        ],
      },
    ],
  },
  stack: {
    eyebrow: 'ԳՈՐԾԻՔԱԿԱԶՄ',
    index: '05 ━━ ՏԵԽՆՈԼՈԳԻԱՆԵՐ',
    titleA: 'Ժամանակակից ինժենիրինգ։',
    titleB: 'Փորձված ընտրություններ։',
    lead: 'Ընտրում ենք ձանձրալին այնտեղ, որտեղ կարևոր է, և ամենաառաջադեմը՝ որտեղ արդյունք է տալիս։ Ամեն տեխնոլոգիական որոշում ավագ ինժեներների պատասխանատվության տակ է և ստուգվում է ձեր իրական պայմանների դեմ։',
    toolsLabel: 'գործիք',
    tiers: {
      frontend: 'Ֆրոնտենդ',
      mobile: 'Մոբայլ',
      backend: 'Բեքենդ',
      data: 'Տվյալներ',
      cloud: 'Ամպ / Ենթակառուցվածք',
      ai: 'AI / ML',
    },
  },
  cta: {
    eyebrow: '07 ━━ ՊԱՏՐԱ՞ՍՏ ԵՔ',
    headA: 'ԿԱՌՈՒՑԵՆՔ',
    headB: 'ԱՊԱԳԱՆ։',
    body: 'Պատմեք այն հարթակի մասին, որը ուզում եք կառուցել, փոխարինել կամ մասշտաբավորել։ Կպատասխանենք մեկ աշխատանքային օրվա ընթացքում՝ ավագ գործընկերով։',
    primary: 'ՍԿՍԵԼ ՆԱԽԱԳԻԾ',
    ghost: 'ԱՄՐԱԳՐԵԼ ԶԱՆԳ',
    labels: { mail: 'Փոստ', voice: 'Հեռախոս', studios: 'Ստուդիաներ', hours: 'Ժամեր' },
  },
  footer: {
    tagA: 'Պրեմիում ծրագրեր',
    tagB: 'ամբիցիոզ թիմերի համար։',
    body: 'Ավագ ինժեներների, դիզայներների և արտադրանքի ղեկավարների ստուդիա, որը կառուցում է ծրագրեր՝ գործարկվող և գործող մնացող։',
    groups: [
      { title: 'Ստուդիա', items: ['Մեր մասին', 'Գործընթաց', 'Կարիերա', 'Մամուլ'] },
      {
        title: 'Ծառայություններ',
        items: ['AI լուծումներ', 'SaaS հարթակներ', 'Մոբայլ հավելվածներ', 'Կորպորատիվ համակարգեր'],
      },
      { title: 'Աշխատանքներ', items: ['Դեպքեր', 'Կարծիքներ', 'Գործընկերներ', 'Մրցանակներ'] },
    ],
    rights: '© 2026 DEVVIBES STUDIO · ԲՈԼՈՐ ԻՐԱՎՈՒՆՔՆԵՐԸ ՊԱՀՊԱՆՎԱԾ ԵՆ',
    legal: ['Գաղտնիություն', 'Պայմաններ', 'Cookie-ներ'],
    status: 'ԲՈԼՈՐ ՀԱՄԱԿԱՐԳԵՐԸ ԿԱՅՈՒՆ ԵՆ',
  },
};

export const DICT: Record<Lang, Copy> = { en, hy };

// Runs after DICT exists, so a visitor arriving with hy saved gets the
// translated title and description on first paint, not just after a toggle.
applyMeta(current);
