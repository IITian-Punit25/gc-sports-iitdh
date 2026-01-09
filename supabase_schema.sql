-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Teams Table
create table teams (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  gender text not null check (gender in ('MEN', 'WOMEN')),
  pool text check (pool in ('A', 'B')),
  house text check (house in ('H1', 'H2', 'H3', 'H4')),
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Sports Table
create table sports (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text not null check (category in ('TEAM', 'INDIVIDUAL', 'ATHLETICS', 'YOGA')),
  gender_allowed text not null check (gender_allowed in ('MEN', 'WOMEN', 'BOTH')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Matches Table
create table matches (
  id uuid default uuid_generate_v4() primary key,
  sport_id uuid references sports(id) not null,
  team_a_id uuid references teams(id) not null,
  team_b_id uuid references teams(id) not null,
  date timestamp with time zone not null,
  status text not null default 'SCHEDULED' check (status in ('SCHEDULED', 'LIVE', 'COMPLETED')),
  score_a text,
  score_b text,
  winner_id uuid references teams(id),
  stage text not null check (stage in ('LEAGUE', 'QUARTER', 'SEMI', 'FINAL', 'THIRD_PLACE')),
  stream_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Standings Table (GC Points)
create table standings (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references teams(id) not null unique,
  total_points numeric(5, 2) default 0,
  gold_medals integer default 0,
  silver_medals integer default 0,
  bronze_medals integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Basic)
alter table teams enable row level security;
alter table sports enable row level security;
alter table matches enable row level security;
alter table standings enable row level security;

-- Public Read Access
create policy "Public read access" on teams for select using (true);
create policy "Public read access" on sports for select using (true);
create policy "Public read access" on matches for select using (true);
create policy "Public read access" on standings for select using (true);

-- Admin Write Access (Assuming authenticated users are admins for now)
create policy "Admin write access" on teams for all using (auth.role() = 'authenticated');
create policy "Admin write access" on sports for all using (auth.role() = 'authenticated');
create policy "Admin write access" on matches for all using (auth.role() = 'authenticated');
create policy "Admin write access" on standings for all using (auth.role() = 'authenticated');

-- Seed Data (Optional - Example)
-- insert into teams (name, gender, pool) values ('Hostel 1', 'MEN', 'A');
