-- Phone signup support
--
-- Adds:
--   1. households.head_phone — admin-managed phone of the household head
--      (independent from profiles.phone which is set by the signed-up villager).
--   2. Marks profiles.phone as the canonical contact phone for a logged-in user.

alter table public.households
  add column if not exists head_phone text;

-- Index for admin lookup by phone (optional, cheap)
create index if not exists idx_households_head_phone on public.households(head_phone);

-- profiles.phone already exists; ensure the column allows the +countrycode format
-- and add a uniqueness constraint so two accounts can't claim the same phone.
do $$ begin
  alter table public.profiles add constraint profiles_phone_key unique (phone);
exception when duplicate_table or duplicate_object then null; end $$;
