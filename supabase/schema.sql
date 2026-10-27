-- Jalankan di Supabase Dashboard > SQL Editor
create table if not exists projects (
  id bigint generated always as identity primary key,
  title text not null,
  des text,
  img text,
  icon_lists text[] default '{}',
  link text,
  slug text unique not null,
  pin_title text,
  category text,
  status text,
  start_date text,
  role text,
  team_size text,
  gallery text[] default '{}',
  features text[] default '{}',
  challenges text[] default '{}',
  technologies jsonb default '[]',
  detailed_description text,
  github_url text,
  live_url text,
  created_at timestamptz default now()
);

-- Public boleh baca, tulis hanya via service role (API server)
alter table projects enable row level security;
create policy "public read" on projects for select using (true);
