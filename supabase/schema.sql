create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact', 'demo')),
  name text not null check (char_length(name) between 2 and 120),
  role text not null check (char_length(role) between 1 and 80),
  school text not null check (char_length(school) between 2 and 160),
  phone text not null check (phone ~ '^(\+92|0)3[0-9]{2}[- ]?[0-9]{7}$'),
  email text not null check (char_length(email) <= 254 and email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  student_range text not null check (student_range in ('Under 300', '300 to 800', '800 to 2,000', '2,000 or more')),
  city text not null default '' check (char_length(city) <= 100),
  message text not null default '' check (char_length(message) <= 4000),
  preferred_date date,
  preferred_time text,
  selected_modules text[] not null default '{}',
  consent boolean not null default false check (consent),
  consented_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  submitted_at timestamptz not null default now(),
  check (
    (kind = 'contact' and char_length(message) between 10 and 4000 and preferred_date is null and preferred_time is null)
    or
    (kind = 'demo' and
      ((preferred_date is null and preferred_time is null) or
       (preferred_date is not null and preferred_time in ('10:00', '11:30', '14:00', '16:00'))))
  ),
  check (cardinality(selected_modules) <= 90)
);

create index if not exists leads_submitted_at_idx on public.leads (submitted_at desc);
create index if not exists leads_status_submitted_at_idx on public.leads (status, submitted_at desc);

alter table public.leads enable row level security;

revoke all on public.leads from anon, authenticated;
grant insert (kind, name, role, school, phone, email, student_range, city, message, preferred_date, preferred_time, selected_modules, consent)
  on public.leads to anon, authenticated;
grant select, delete on public.leads to authenticated;
grant update (status) on public.leads to authenticated;

drop policy if exists "Public may submit new leads" on public.leads;
create policy "Public may submit new leads"
  on public.leads for insert to anon, authenticated
  with check (status = 'new');

drop policy if exists "ILMA admins may read leads" on public.leads;
create policy "ILMA admins may read leads"
  on public.leads for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "ILMA admins may update lead status" on public.leads;
create policy "ILMA admins may update lead status"
  on public.leads for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "ILMA admins may delete leads" on public.leads;
create policy "ILMA admins may delete leads"
  on public.leads for delete to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
