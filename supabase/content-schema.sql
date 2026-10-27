-- Jalankan di Supabase Dashboard > SQL Editor
create table if not exists site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- Public boleh baca, tulis hanya via service role (API server)
alter table site_content enable row level security;
create policy "public read" on site_content for select using (true);
