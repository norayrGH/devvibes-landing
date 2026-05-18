import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, saveSection } from '../lib/supabase';
import {
  DEFAULT_CONTENT,
  fetchSection,
  type HeroContent,
  type ContactContent,
} from '../lib/content';
import { invalidateCache } from '../lib/useContent';

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-dv-ink text-white grain relative">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dv-azure/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <header className="flex items-center justify-between mb-12">
          <a href="#/" className="flex items-center gap-3 group">
            <span className="relative w-9 h-9 rounded-md bg-gradient-to-br from-dv-cobalt to-dv-deep flex items-center justify-center">
              <span className="font-display text-base font-bold text-white">D</span>
            </span>
            <div>
              <div className="display text-base tracking-[0.02em]">
                DEV<span className="text-dv-gold">VIBES</span>
                <span className="text-dv-mute ml-2 mono text-[10px] tracking-[0.25em]">/ ADMIN</span>
              </div>
            </div>
          </a>
          <div className="flex items-center gap-3">
            {session && (
              <>
                <span className="mono text-[10px] tracking-[0.22em] text-dv-mute hidden md:inline">
                  {session.user.email}
                </span>
                <button
                  onClick={() => supabase?.auth.signOut()}
                  className="btn-ghost !py-2 !px-3 !text-[10px]"
                >
                  SIGN OUT
                </button>
              </>
            )}
            <a href="#/" className="btn-ghost !py-2 !px-3 !text-[10px]">
              ← VIEW SITE
            </a>
          </div>
        </header>

        {!isSupabaseConfigured ? (
          <NotConfigured />
        ) : loading ? (
          <Loading />
        ) : !session ? (
          <Login />
        ) : (
          <Editor />
        )}
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="glass-card p-10 flex items-center gap-4">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-4 h-4 rounded-full border-2 border-dv-gold border-t-transparent"
      />
      <span className="mono text-xs tracking-[0.22em] text-dv-mute">CONNECTING…</span>
    </div>
  );
}

function NotConfigured() {
  return (
    <div className="glass-card p-10 md:p-14">
      <span className="eyebrow-gold">SETUP REQUIRED</span>
      <h1 className="display text-3xl md:text-4xl mt-4 grad-text">Supabase not configured.</h1>
      <p className="mt-5 text-dv-fog text-sm md:text-base leading-relaxed max-w-xl">
        Add <code className="mono text-dv-gold">VITE_SUPABASE_URL</code> and{' '}
        <code className="mono text-dv-gold">VITE_SUPABASE_ANON_KEY</code> to a{' '}
        <code className="mono text-dv-gold">.env.local</code> file at the project root, then restart{' '}
        <code className="mono text-dv-gold">npm run dev</code>.
      </p>
      <p className="mt-3 text-dv-mute text-sm">
        See <code className="mono">.env.example</code> for the format. Run{' '}
        <code className="mono">supabase/migrations/0001_content.sql</code> in your Supabase SQL editor to
        create the schema.
      </p>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-md mx-auto"
    >
      <div className="glass-card p-8 md:p-10">
        <span className="eyebrow-gold">RESTRICTED</span>
        <h1 className="display text-3xl md:text-4xl mt-4 grad-text">Admin sign-in.</h1>
        <p className="mt-3 text-dv-mute text-sm">Authorized editors only.</p>

        <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@devvibes.studio"
            required
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />

          {error && (
            <div className="mono text-[11px] tracking-[0.1em] text-red-400 bg-red-500/10 border border-red-400/30 rounded-lg px-3 py-2">
              {error.toUpperCase()}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full justify-center !mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? 'SIGNING IN…' : 'SIGN IN'}
          </button>
        </form>

        <p className="mt-6 mono text-[10px] tracking-[0.2em] text-dv-mute uppercase">
          Create an account in Supabase → Authentication → Users
        </p>
      </div>
    </motion.div>
  );
}

function Editor() {
  return (
    <div className="space-y-8">
      <HeroEditor />
      <ContactEditor />
    </div>
  );
}

function HeroEditor() {
  const [content, setContent] = useState<HeroContent>(DEFAULT_CONTENT.hero);
  const [initial, setInitial] = useState<HeroContent>(DEFAULT_CONTENT.hero);
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    fetchSection('hero').then((c) => {
      setContent(c);
      setInitial(c);
    });
  }, []);

  const dirty = JSON.stringify(content) !== JSON.stringify(initial);

  const save = async () => {
    setStatus('saving');
    const res = await saveSection('hero', content);
    if (res.ok) {
      invalidateCache('hero');
      setInitial(content);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 1800);
    } else {
      setStatus('error');
    }
  };

  return (
    <EditorCard
      title="Hero Section"
      eyebrow="01 — TOP OF PAGE"
      description="Tagline, badge, subtitle paragraph, and the four stats."
      dirty={dirty}
      status={status}
      onSave={save}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="Tagline"
          value={content.tagline}
          onChange={(v) => setContent({ ...content, tagline: v })}
          hint="Top-left pill, uppercase"
        />
        <Field
          label="Badge"
          value={content.badge}
          onChange={(v) => setContent({ ...content, badge: v })}
          hint='e.g. "EST. 2017"'
        />
      </div>
      <Field
        label="Subtitle paragraph"
        value={content.subtitle}
        onChange={(v) => setContent({ ...content, subtitle: v })}
        multiline
        hint="Shown under the headline"
      />

      <div className="mt-2">
        <div className="mono text-[10px] tracking-[0.22em] text-dv-gold uppercase mb-3">Stats (4)</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {content.stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 flex flex-col gap-2"
            >
              <div className="mono text-[10px] tracking-[0.2em] text-dv-mute uppercase">
                Stat {i + 1}
              </div>
              <Field
                label="Value"
                value={stat.value}
                onChange={(v) => {
                  const next = [...content.stats];
                  next[i] = { ...next[i], value: v };
                  setContent({ ...content, stats: next });
                }}
                compact
              />
              <Field
                label="Label"
                value={stat.label}
                onChange={(v) => {
                  const next = [...content.stats];
                  next[i] = { ...next[i], label: v };
                  setContent({ ...content, stats: next });
                }}
                compact
              />
            </div>
          ))}
        </div>
      </div>
    </EditorCard>
  );
}

function ContactEditor() {
  const [content, setContent] = useState<ContactContent>(DEFAULT_CONTENT.contact);
  const [initial, setInitial] = useState<ContactContent>(DEFAULT_CONTENT.contact);
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    fetchSection('contact').then((c) => {
      setContent(c);
      setInitial(c);
    });
  }, []);

  const dirty = JSON.stringify(content) !== JSON.stringify(initial);

  const save = async () => {
    setStatus('saving');
    const res = await saveSection('contact', content);
    if (res.ok) {
      invalidateCache('contact');
      setInitial(content);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 1800);
    } else {
      setStatus('error');
    }
  };

  return (
    <EditorCard
      title="Contact Rail"
      eyebrow="02 — FINAL CTA"
      description="Used for the contact row at the bottom of the page and the mailto: link."
      dirty={dirty}
      status={status}
      onSave={save}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="Email"
          type="email"
          value={content.email}
          onChange={(v) => setContent({ ...content, email: v })}
        />
        <Field
          label="Phone"
          value={content.phone}
          onChange={(v) => setContent({ ...content, phone: v })}
        />
        <Field
          label="Studios"
          value={content.studios}
          onChange={(v) => setContent({ ...content, studios: v })}
          hint="Comma- or middot-separated"
        />
        <Field
          label="Hours"
          value={content.hours}
          onChange={(v) => setContent({ ...content, hours: v })}
        />
      </div>
    </EditorCard>
  );
}

/* ============ Shared primitives ============ */

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

function EditorCard({
  title,
  eyebrow,
  description,
  dirty,
  status,
  onSave,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  dirty: boolean;
  status: SaveStatus;
  onSave: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-7 md:p-9"
    >
      <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
        <div>
          <span className="eyebrow-gold">{eyebrow}</span>
          <h2 className="display text-2xl md:text-3xl mt-2 grad-text">{title}</h2>
          <p className="mt-2 text-dv-mute text-sm max-w-md">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {status !== 'idle' && (
              <motion.span
                key={status}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={`mono text-[10px] tracking-[0.22em] uppercase ${
                  status === 'saved'
                    ? 'text-dv-gold'
                    : status === 'error'
                      ? 'text-red-400'
                      : 'text-dv-mute'
                }`}
              >
                {status === 'saving' && '· · ·  SAVING'}
                {status === 'saved' && '✓ SAVED'}
                {status === 'error' && '✕ ERROR'}
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={onSave}
            disabled={!dirty || status === 'saving'}
            className="btn-primary !py-2.5 !px-4 !text-[10px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </motion.section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
  required = false,
  placeholder,
  hint,
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  compact?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={`mono text-[10px] tracking-[0.22em] uppercase ${compact ? 'text-dv-mute' : 'text-dv-fog'}`}>
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={3}
          className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-dv-mute focus:outline-none focus:border-dv-gold/60 focus:bg-white/[0.05] transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={`bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 ${compact ? 'py-2 text-[13px]' : 'py-3 text-sm'} text-white placeholder:text-dv-mute focus:outline-none focus:border-dv-gold/60 focus:bg-white/[0.05] transition-colors`}
        />
      )}
      {hint && <span className="mono text-[10px] tracking-[0.15em] text-dv-mute">{hint}</span>}
    </label>
  );
}
