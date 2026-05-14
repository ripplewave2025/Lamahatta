-- Heart of Gold members & admin portal
-- Tables: households, profiles, household_update_requests, household_audit_log

-- ============================================================
-- 1. Enums
-- ============================================================
do $$ begin
  create type user_role as enum ('villager', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type request_status as enum ('pending', 'approved', 'rejected');
exception when duplicate_object then null; end $$;

-- ============================================================
-- 2. Households (seeded from Core_data_for_members_login/village.html)
-- ============================================================
create table if not exists public.households (
  id            uuid primary key default gen_random_uuid(),
  hh_code       text unique not null,
  head_name     text not null,
  occupation    text,
  family_size   int,
  notes         text,
  status        text check (status in ('Local','Migrant','Mixed')),
  skills        text[] default '{}',
  has_elderly   boolean default false,
  has_youth     boolean default false,
  updated_at    timestamptz default now(),
  updated_by    uuid references auth.users(id)
);

-- ============================================================
-- 3. Profiles — extends auth.users
-- ============================================================
create table if not exists public.profiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  full_name      text,
  phone          text,
  role           user_role not null default 'villager',
  household_id   uuid references public.households(id),
  preferred_lang text check (preferred_lang in ('en','ne','hi','bn')) default 'en',
  created_at     timestamptz default now()
);

-- Auto-create a profile row whenever a new auth user is created
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'villager')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- 4. Update requests
-- ============================================================
create table if not exists public.household_update_requests (
  id            uuid primary key default gen_random_uuid(),
  household_id  uuid not null references public.households(id) on delete cascade,
  requested_by  uuid not null references public.profiles(id),
  field_name    text not null check (field_name in ('occupation','family_size','notes','skills','status','phone')),
  old_value     text,
  new_value     text not null,
  reason        text,
  status        request_status not null default 'pending',
  reviewed_by   uuid references public.profiles(id),
  reviewed_at   timestamptz,
  review_note   text,
  created_at    timestamptz default now()
);

create index if not exists idx_requests_status on public.household_update_requests(status);
create index if not exists idx_requests_household on public.household_update_requests(household_id);

-- ============================================================
-- 5. Audit log (admin direct edits)
-- ============================================================
create table if not exists public.household_audit_log (
  id            uuid primary key default gen_random_uuid(),
  household_id  uuid not null references public.households(id),
  changed_by    uuid not null references public.profiles(id),
  field_name    text not null,
  old_value     text,
  new_value     text,
  changed_at    timestamptz default now()
);

-- ============================================================
-- 6. Helpers
-- ============================================================
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- ============================================================
-- 7. Approval function (atomic)
-- ============================================================
create or replace function public.approve_update_request(req_id uuid, note text default null)
returns void language plpgsql security definer set search_path = public as $$
declare
  r public.household_update_requests%rowtype;
  sql text;
begin
  if not public.is_admin() then
    raise exception 'forbidden';
  end if;

  select * into r from public.household_update_requests where id = req_id and status = 'pending';
  if not found then
    raise exception 'request not found or already reviewed';
  end if;

  -- Apply the change. field_name is whitelisted by table check constraint.
  if r.field_name = 'family_size' then
    update public.households
       set family_size = r.new_value::int, updated_at = now(), updated_by = auth.uid()
     where id = r.household_id;
  elsif r.field_name = 'skills' then
    update public.households
       set skills = string_to_array(r.new_value, ','), updated_at = now(), updated_by = auth.uid()
     where id = r.household_id;
  elsif r.field_name = 'status' then
    update public.households
       set status = r.new_value, updated_at = now(), updated_by = auth.uid()
     where id = r.household_id;
  elsif r.field_name = 'occupation' then
    update public.households
       set occupation = r.new_value, updated_at = now(), updated_by = auth.uid()
     where id = r.household_id;
  elsif r.field_name = 'notes' then
    update public.households
       set notes = r.new_value, updated_at = now(), updated_by = auth.uid()
     where id = r.household_id;
  elsif r.field_name = 'phone' then
    update public.profiles
       set phone = r.new_value
     where household_id = r.household_id and role = 'villager';
  end if;

  insert into public.household_audit_log (household_id, changed_by, field_name, old_value, new_value)
  values (r.household_id, auth.uid(), r.field_name, r.old_value, r.new_value);

  update public.household_update_requests
     set status = 'approved', reviewed_by = auth.uid(), reviewed_at = now(), review_note = note
   where id = req_id;
end;
$$;

create or replace function public.reject_update_request(req_id uuid, note text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    raise exception 'forbidden';
  end if;
  update public.household_update_requests
     set status = 'rejected', reviewed_by = auth.uid(), reviewed_at = now(), review_note = note
   where id = req_id and status = 'pending';
end;
$$;

-- ============================================================
-- 8. Row-Level Security
-- ============================================================
alter table public.households                enable row level security;
alter table public.profiles                  enable row level security;
alter table public.household_update_requests enable row level security;
alter table public.household_audit_log       enable row level security;

-- households: any signed-in user can read; admin can write
drop policy if exists hh_read_all    on public.households;
drop policy if exists hh_admin_write on public.households;
create policy hh_read_all    on public.households for select using (auth.uid() is not null);
create policy hh_admin_write on public.households for all    using (public.is_admin()) with check (public.is_admin());

-- profiles: read self or admin; update self; admin all
drop policy if exists prof_read_self    on public.profiles;
drop policy if exists prof_update_self  on public.profiles;
drop policy if exists prof_admin_write  on public.profiles;
create policy prof_read_self    on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy prof_update_self  on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = 'villager');
create policy prof_admin_write  on public.profiles for all    using (public.is_admin()) with check (public.is_admin());

-- requests: read own (or admin); insert own; only admin updates (via RPC)
drop policy if exists req_read_own     on public.household_update_requests;
drop policy if exists req_insert_own   on public.household_update_requests;
drop policy if exists req_admin_update on public.household_update_requests;
create policy req_read_own     on public.household_update_requests for select
  using (requested_by = auth.uid() or public.is_admin());
create policy req_insert_own   on public.household_update_requests for insert with check (
  requested_by = auth.uid()
  and household_id = (select household_id from public.profiles where id = auth.uid())
);
create policy req_admin_update on public.household_update_requests for update using (public.is_admin());

-- audit: admin only
drop policy if exists audit_admin_only on public.household_audit_log;
create policy audit_admin_only on public.household_audit_log for all using (public.is_admin());
