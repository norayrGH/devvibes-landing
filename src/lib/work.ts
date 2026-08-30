// Real, shipped client work.
//
// Everything in this file must be verifiable by clicking through to the live
// site. No invented metrics: with one flagship engagement, a claim a prospect
// can check is worth more than a number they can't. If you don't have a
// measured result yet, describe scope instead of impact.

export type Workstream = {
  kind: string;
  title: string;
  points: string[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  clientLocal: string;
  sector: string;
  location: string;
  year: string;
  liveUrl: string;
  liveLabel: string;
  /** One-line positioning of the engagement. */
  summary: string;
  brief: string;
  workstreams: Workstream[];
  /** Scope facts — each one checkable on the live site. */
  facts: { value: string; label: string }[];
  shots: { desktop: string; mobile: string };
};

export const TOGHRAMAJYAN: CaseStudy = {
  slug: 'toghramajyan-clinic',
  client: 'Toghramajyan Clinic',
  clientLocal: 'Տողրամաջյան կլինիկա',
  sector: 'Healthcare',
  location: 'Yerevan, Armenia',
  year: '2026',
  liveUrl: 'https://toghramajyanclinic.am',
  liveLabel: 'toghramajyanclinic.am',
  summary:
    'A trilingual clinic platform and an automated intake layer behind it.',
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
  shots: {
    desktop: '/work/toghramajyan-desktop.png',
    mobile: '/work/toghramajyan-mobile.png',
  },
};

export const CASE_STUDIES: CaseStudy[] = [TOGHRAMAJYAN];
