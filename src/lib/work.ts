// Real work. Two kinds, deliberately labelled differently:
//
//   'client'  — an engagement delivered for someone else.
//   'product' — something DEVVIBES owns and builds itself.
//
// Keeping them distinct matters: a prospect who mistakes an in-house product
// for a client reference has been misled, even accidentally. Own products earn
// their place by showing capability, not by borrowing a client's credibility.
//
// Everything here must be verifiable — by clicking through to a live URL, or by
// pointing at the codebase. No invented metrics: with a young portfolio, a claim
// someone can check beats a number they can't. Where there's no measured result
// yet, describe scope instead of impact.

export type Workstream = {
  kind: string;
  title: string;
  points: string[];
};

export type CaseStudy = {
  slug: string;
  kind: 'client' | 'product';
  name: string;
  /** Native-script name, where the audience uses one. */
  nameLocal?: string;
  sector: string;
  location: string;
  year: string;
  /** Say plainly where it stands. Never imply "launched" when it isn't. */
  status: string;
  /** Omitted when there is nothing public to link — never link a dead host. */
  live?: { url: string; label: string };
  /** One-line positioning of the engagement. */
  summary: string;
  brief: string;
  workstreams: Workstream[];
  /** Scope facts — each one checkable on the live site or in the repo. */
  facts: { value: string; label: string }[];
  shots?: { desktop: string };
};

export const TOGHRAMAJYAN: CaseStudy = {
  slug: 'toghramajyan-clinic',
  kind: 'client',
  name: 'Toghramajyan Clinic',
  nameLocal: 'Տողրամաջյան կլինիկա',
  sector: 'Healthcare',
  location: 'Yerevan, Armenia',
  year: '2026',
  status: 'Pre-launch preview',
  // The bare domain still serves a "Coming soon" holding page — the built site
  // lives at /preview until the clinic launches it. Link the preview, or the
  // CTA sends prospects to a placeholder.
  live: {
    url: 'https://toghramajyanclinic.am/preview',
    label: 'toghramajyanclinic.am/preview',
  },
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
  shots: {
    desktop: '/work/toghramajyan-desktop.png',
  },
};

export const HOSPITY: CaseStudy = {
  slug: 'hospity',
  kind: 'product',
  name: 'Hospity',
  sector: 'Hospitality',
  location: 'Built in-house',
  year: '2026',
  status: 'In development',
  // No `live`: hospity.devvibes.dev does not resolve, and hospity.com is a
  // parked domain owned by someone else. Add a link only once there is a real
  // host to point at.
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
};

export const CASE_STUDIES: CaseStudy[] = [TOGHRAMAJYAN, HOSPITY];
