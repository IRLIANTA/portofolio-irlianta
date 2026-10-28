create table items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('experience','achievement','project','certificate')),
  title text not null, subtitle text, period text, description text,
  tags text, image text, link text, sort int default 0,
  created_at timestamptz default now()
);
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text, email text, message text, created_at timestamptz default now()
);
alter table items enable row level security;
alter table messages enable row level security;
