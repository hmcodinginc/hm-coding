-- HM Coding production security model
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- Safe to re-run: policies are dropped/recreated; schema is aligned idempotently.

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create schema if not exists private;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user' check (role in ('admin', 'user')),
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Production may already have public.profiles from an older schema where email
-- was NOT NULL. Align columns without inventing placeholder emails.
alter table public.profiles add column if not exists email text;
alter table public.profiles alter column email drop not null;

alter table public.profiles add column if not exists role text;
alter table public.profiles add column if not exists created_at timestamptz default now();
alter table public.profiles add column if not exists updated_at timestamptz default now();

update public.profiles set role = 'user' where role is null;
update public.profiles set created_at = now() where created_at is null;
update public.profiles set updated_at = now() where updated_at is null;

alter table public.profiles alter column role set default 'user';
alter table public.profiles alter column role set not null;
alter table public.profiles alter column created_at set default now();
alter table public.profiles alter column created_at set not null;
alter table public.profiles alter column updated_at set default now();
alter table public.profiles alter column updated_at set not null;

do $$
begin
  alter table public.profiles
    add constraint profiles_role_check check (role in ('admin', 'user'));
exception
  when duplicate_object then null;
end $$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, email)
  values (new.id, 'user', new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill missing profile rows. email may legitimately be NULL.
insert into public.profiles (id, role, email)
select u.id, 'user', u.email
from auth.users u
where not exists (
  select 1
  from public.profiles p
  where p.id = u.id
)
on conflict (id) do nothing;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

revoke all on function private.is_admin() from public, anon, authenticated;
grant execute on function private.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- Existing content tables (create if a fresh project; otherwise no-op)
-- ---------------------------------------------------------------------------
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  location text not null default '',
  experience text,
  job_type text,
  salary text,
  time text,
  apply_url text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  rating integer not null default 5,
  review_text text not null,
  role text,
  initials text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  subject text,
  created_at timestamptz not null default now()
);

alter table public.reviews add column if not exists approved boolean not null default false;
alter table public.reviews add column if not exists email text;
alter table public.reviews add column if not exists role text;
alter table public.reviews add column if not exists initials text;
alter table public.contact_messages add column if not exists subject text;
alter table public.jobs add column if not exists active boolean not null default true;
alter table public.jobs add column if not exists apply_url text not null default '';
alter table public.jobs add column if not exists job_type text;
alter table public.jobs add column if not exists salary text;
alter table public.jobs add column if not exists time text;
alter table public.jobs add column if not exists experience text;

alter table public.reviews alter column approved set default false;

-- ---------------------------------------------------------------------------
-- Enable RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.reviews enable row level security;
alter table public.contact_messages enable row level security;

alter table public.profiles force row level security;
alter table public.jobs force row level security;
alter table public.reviews force row level security;
alter table public.contact_messages force row level security;

-- ---------------------------------------------------------------------------
-- Replace all existing policies on these tables
-- ---------------------------------------------------------------------------
do $$
declare
  r record;
begin
  for r in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in ('profiles', 'jobs', 'reviews', 'contact_messages')
  loop
    execute format('drop policy if exists %I on %I.%I', r.policyname, r.schemaname, r.tablename);
  end loop;
end $$;

-- PROFILES
-- Users may read only their own row (frontend uses this for admin UX).
-- Nobody can insert/update/delete via the API. Role changes are SQL-only.
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

-- JOBS
create policy "jobs_public_read_active"
  on public.jobs
  for select
  to anon, authenticated
  using (active = true);

create policy "jobs_admin_read_all"
  on public.jobs
  for select
  to authenticated
  using (private.is_admin());

create policy "jobs_admin_insert"
  on public.jobs
  for insert
  to authenticated
  with check (private.is_admin());

create policy "jobs_admin_update"
  on public.jobs
  for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "jobs_admin_delete"
  on public.jobs
  for delete
  to authenticated
  using (private.is_admin());

-- REVIEWS
create policy "reviews_public_read_approved"
  on public.reviews
  for select
  to anon, authenticated
  using (approved = true);

create policy "reviews_admin_read_all"
  on public.reviews
  for select
  to authenticated
  using (private.is_admin());

create policy "reviews_public_insert_pending"
  on public.reviews
  for insert
  to anon, authenticated
  with check (
    approved = false
    and rating >= 1
    and rating <= 5
    and char_length(trim(name)) >= 2
    and char_length(trim(review_text)) >= 8
  );

create policy "reviews_admin_update"
  on public.reviews
  for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "reviews_admin_delete"
  on public.reviews
  for delete
  to authenticated
  using (private.is_admin());

-- CONTACT MESSAGES
create policy "contact_public_insert"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (
    char_length(trim(name)) >= 2
    and char_length(trim(email)) >= 5
    and char_length(trim(message)) >= 8
  );

create policy "contact_admin_select"
  on public.contact_messages
  for select
  to authenticated
  using (private.is_admin());

create policy "contact_admin_update"
  on public.contact_messages
  for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "contact_admin_delete"
  on public.contact_messages
  for delete
  to authenticated
  using (private.is_admin());
