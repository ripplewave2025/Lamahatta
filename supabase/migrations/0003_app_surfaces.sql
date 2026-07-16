-- Forms, hub, portfolios, and tighter household read access
-- Aligns app inserts with committed schema + RLS.

-- ============================================================
-- 1. Contact / partner / service / investor enquiries
-- ============================================================
create table if not exists public.contact_requests (
  id          uuid primary key default gen_random_uuid(),
  phone       text not null,
  message     text,
  type        text not null default 'general',
  status      text not null default 'new'
                check (status in ('new', 'read', 'replied', 'archived')),
  created_at  timestamptz not null default now()
);

create index if not exists idx_contact_requests_created
  on public.contact_requests (created_at desc);
create index if not exists idx_contact_requests_status
  on public.contact_requests (status);

alter table public.contact_requests enable row level security;

drop policy if exists contact_insert_public on public.contact_requests;
drop policy if exists contact_admin_read on public.contact_requests;
drop policy if exists contact_admin_write on public.contact_requests;

-- Anyone (including anon) can submit an enquiry
create policy contact_insert_public on public.contact_requests
  for insert to anon, authenticated
  with check (true);

-- Only admins can read / update the inbox
create policy contact_admin_read on public.contact_requests
  for select to authenticated
  using (public.is_admin());

create policy contact_admin_write on public.contact_requests
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- 2. Newsletter
-- ============================================================
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  created_at  timestamptz not null default now(),
  constraint newsletter_subscribers_email_key unique (email)
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists newsletter_insert_public on public.newsletter_subscribers;
drop policy if exists newsletter_admin_read on public.newsletter_subscribers;

create policy newsletter_insert_public on public.newsletter_subscribers
  for insert to anon, authenticated
  with check (true);

create policy newsletter_admin_read on public.newsletter_subscribers
  for select to authenticated
  using (public.is_admin());

-- ============================================================
-- 3. Survey responses
-- ============================================================
create table if not exists public.survey_responses (
  id          uuid primary key default gen_random_uuid(),
  session_id  text not null,
  answers     jsonb not null default '{}'::jsonb,
  user_agent  text,
  language    text,
  created_at  timestamptz not null default now()
);

alter table public.survey_responses enable row level security;

drop policy if exists survey_insert_public on public.survey_responses;
drop policy if exists survey_admin_read on public.survey_responses;

create policy survey_insert_public on public.survey_responses
  for insert to anon, authenticated
  with check (true);

create policy survey_admin_read on public.survey_responses
  for select to authenticated
  using (public.is_admin());

-- ============================================================
-- 4. Hub posts
-- ============================================================
create table if not exists public.hub_posts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  category    text not null,
  title       text not null default 'Update',
  content     text not null,
  media_url   text,
  media_type  text default 'none',
  created_at  timestamptz not null default now()
);

create index if not exists idx_hub_posts_category
  on public.hub_posts (category, created_at desc);

alter table public.hub_posts enable row level security;

drop policy if exists hub_read_auth on public.hub_posts;
drop policy if exists hub_insert_own on public.hub_posts;
drop policy if exists hub_admin_all on public.hub_posts;

create policy hub_read_auth on public.hub_posts
  for select to authenticated
  using (true);

create policy hub_insert_own on public.hub_posts
  for insert to authenticated
  with check (user_id = auth.uid());

create policy hub_admin_all on public.hub_posts
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- 5. Talent portfolios (optional surface; not main nav)
-- ============================================================
create table if not exists public.portfolios (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  title         text,
  bio           text,
  slug          text unique,
  contact_info  text,
  skills        text[] default '{}',
  updated_at    timestamptz default now(),
  constraint portfolios_user_id_key unique (user_id)
);

alter table public.portfolios enable row level security;

drop policy if exists portfolios_read_public on public.portfolios;
drop policy if exists portfolios_upsert_own on public.portfolios;
drop policy if exists portfolios_update_own on public.portfolios;
drop policy if exists portfolios_admin on public.portfolios;

-- Public can browse talent cards if the route is used
create policy portfolios_read_public on public.portfolios
  for select to anon, authenticated
  using (true);

create policy portfolios_insert_own on public.portfolios
  for insert to authenticated
  with check (user_id = auth.uid());

create policy portfolios_update_own on public.portfolios
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy portfolios_admin on public.portfolios
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- 6. Tighter household RLS — own row or admin (not every villager)
-- ============================================================
drop policy if exists hh_read_all on public.households;
drop policy if exists hh_read_own_or_admin on public.households;

create policy hh_read_own_or_admin on public.households
  for select to authenticated
  using (
    public.is_admin()
    or id = (select household_id from public.profiles where id = auth.uid())
  );

-- admin write policy already exists (hh_admin_write)
