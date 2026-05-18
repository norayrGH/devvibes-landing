// Admin-only Supabase SDK client. Imported only by /admin code so the
// public site bundle stays lean (public reads use plain fetch — see content.ts).

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

export async function saveSection<T extends object>(
  section: string,
  value: T,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase not configured' };
  const { error } = await supabase
    .from('site_content')
    .upsert({ section, data: value as Record<string, unknown> });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
