// Public content reads — uses plain fetch against Supabase's REST endpoint
// so we don't have to ship @supabase/supabase-js on the public site bundle.
// The admin dashboard uses the full SDK (lazy-loaded).

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON);

export type HeroContent = {
  tagline: string;
  badge: string;
  subtitle: string;
  stats: { value: string; label: string }[];
};

export type ContactContent = {
  email: string;
  phone: string;
  studios: string;
  hours: string;
};

export type SiteContent = {
  hero: HeroContent;
  contact: ContactContent;
};

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    tagline: 'PREMIUM SOFTWARE STUDIO',
    badge: 'EST. 2017',
    subtitle:
      'A senior engineering studio designing and shipping AI, fintech, SaaS, and enterprise platforms for ambitious teams across four continents.',
    stats: [
      { value: '200+', label: 'Products shipped' },
      { value: '44', label: 'Countries served' },
      { value: '99.99%', label: 'Avg. uptime' },
      { value: '8 yrs', label: 'In production' },
    ],
  },
  contact: {
    email: 'hello@devvibes.studio',
    phone: '+1 (415) 555 0142',
    studios: 'Yerevan · Berlin',
    hours: 'Mon — Fri 09:00–19:00',
  },
};

type SectionKey = keyof SiteContent;

export async function fetchSection<K extends SectionKey>(
  section: K,
): Promise<SiteContent[K]> {
  if (!isSupabaseConfigured) return DEFAULT_CONTENT[section];

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/site_content?section=eq.${encodeURIComponent(section)}&select=data`,
      {
        headers: {
          apikey: SUPABASE_ANON!,
          Authorization: `Bearer ${SUPABASE_ANON}`,
          Accept: 'application/json',
        },
      },
    );
    if (!res.ok) return DEFAULT_CONTENT[section];
    const rows = (await res.json()) as { data: Partial<SiteContent[K]> }[];
    if (!rows.length) return DEFAULT_CONTENT[section];
    return { ...DEFAULT_CONTENT[section], ...rows[0].data } as SiteContent[K];
  } catch {
    return DEFAULT_CONTENT[section];
  }
}
