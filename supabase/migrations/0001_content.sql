-- DEVVIBES landing — editable content schema
-- Run in Supabase: SQL editor → paste this file → Run

create table if not exists public.site_content (
  section     text primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- Track who last edited (optional but useful in admin)
create table if not exists public.site_content_audit (
  id          bigserial primary key,
  section     text not null,
  data        jsonb not null,
  edited_by   uuid references auth.users(id),
  edited_at   timestamptz not null default now()
);

create index if not exists site_content_audit_section_idx
  on public.site_content_audit (section, edited_at desc);

-- ============ Row Level Security ============
alter table public.site_content        enable row level security;
alter table public.site_content_audit  enable row level security;

-- Public: anyone (anon) can READ content for the landing page
drop policy if exists "site_content public read" on public.site_content;
create policy "site_content public read"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

-- Only authenticated users (your admin) can write
drop policy if exists "site_content admin write" on public.site_content;
create policy "site_content admin write"
  on public.site_content
  for all
  to authenticated
  using (true)
  with check (true);

-- Audit: only authenticated users can read/write audit log
drop policy if exists "site_content_audit admin only" on public.site_content_audit;
create policy "site_content_audit admin only"
  on public.site_content_audit
  for all
  to authenticated
  using (true)
  with check (true);

-- ============ Auto-update updated_at + audit trail ============
create or replace function public.site_content_touch()
returns trigger language plpgsql security definer as $$
begin
  new.updated_at := now();
  insert into public.site_content_audit (section, data, edited_by)
    values (new.section, new.data, auth.uid());
  return new;
end $$;

drop trigger if exists site_content_touch_trg on public.site_content;
create trigger site_content_touch_trg
  before insert or update on public.site_content
  for each row execute function public.site_content_touch();

-- ============ Seed initial content ============
insert into public.site_content (section, data) values
  ('hero', jsonb_build_object(
    'tagline',  'PREMIUM SOFTWARE STUDIO',
    'badge',    'EST. 2017',
    'subtitle', 'A senior engineering studio designing and shipping AI, fintech, SaaS, and enterprise platforms for ambitious teams across four continents.',
    'stats', jsonb_build_array(
      jsonb_build_object('value', '200+',    'label', 'Products shipped'),
      jsonb_build_object('value', '44',      'label', 'Countries served'),
      jsonb_build_object('value', '99.99%',  'label', 'Avg. uptime'),
      jsonb_build_object('value', '8 yrs',   'label', 'In production')
    )
  )),
  ('contact', jsonb_build_object(
    'email',   'hello@devvibes.studio',
    'phone',   '+1 (415) 555 0142',
    'studios', 'Yerevan · Berlin',
    'hours',   'Mon — Fri 09:00–19:00'
  ))
on conflict (section) do nothing;
