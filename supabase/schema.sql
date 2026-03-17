-- POLI Beta - Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ========================================
-- PROFILES (extends Supabase auth.users)
-- ========================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  ethical_profile text default 'esg',
  risk_tolerance text default 'moderate' check (risk_tolerance in ('conservative', 'moderate', 'aggressive')),
  currency text default 'EUR',
  language text default 'fr',
  onboarding_done boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ========================================
-- PORTFOLIOS
-- ========================================
create table public.portfolios (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null default 'Mon Portfolio',
  description text,
  ethical_profile text default 'esg',
  created_at timestamptz default now()
);

-- ========================================
-- HOLDINGS (assets in a portfolio)
-- ========================================
create table public.holdings (
  id uuid default uuid_generate_v4() primary key,
  portfolio_id uuid references public.portfolios(id) on delete cascade not null,
  symbol text not null,
  name text not null,
  asset_type text not null check (asset_type in ('stock', 'etf', 'bond', 'crypto', 'reit', 'commodity', 'cash')),
  quantity numeric not null default 0,
  avg_price numeric not null default 0,
  current_price numeric default 0,
  ethical_score integer default 50 check (ethical_score between 0 and 100),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ========================================
-- TRANSACTIONS
-- ========================================
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  portfolio_id uuid references public.portfolios(id) on delete set null,
  type text not null check (type in ('buy', 'sell', 'dividend', 'deposit', 'withdrawal', 'conversion')),
  symbol text,
  quantity numeric,
  price numeric,
  total numeric not null,
  currency text default 'EUR',
  status text default 'completed' check (status in ('pending', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz default now()
);

-- ========================================
-- BANK CONNECTIONS
-- ========================================
create table public.bank_connections (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  bank_name text not null,
  bank_code text,
  status text default 'connected' check (status in ('connected', 'disconnected', 'error', 'pending')),
  balance numeric default 0,
  last_sync timestamptz default now(),
  created_at timestamptz default now()
);

-- ========================================
-- GOALS
-- ========================================
create table public.goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  target_amount numeric not null,
  current_amount numeric default 0,
  deadline date,
  category text default 'savings',
  color text default '#34d399',
  icon text default 'target',
  created_at timestamptz default now()
);

-- ========================================
-- BUDGET CATEGORIES
-- ========================================
create table public.budget_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  category text not null,
  amount numeric not null,
  budget_limit numeric,
  month text not null, -- format: YYYY-MM
  type text default 'expense' check (type in ('income', 'expense')),
  created_at timestamptz default now()
);

-- ========================================
-- ROW LEVEL SECURITY
-- ========================================
alter table public.profiles enable row level security;
alter table public.portfolios enable row level security;
alter table public.holdings enable row level security;
alter table public.transactions enable row level security;
alter table public.bank_connections enable row level security;
alter table public.goals enable row level security;
alter table public.budget_entries enable row level security;

-- Profiles: users can only access their own
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Portfolios
create policy "Users can CRUD own portfolios" on public.portfolios for all using (auth.uid() = user_id);

-- Holdings
create policy "Users can CRUD own holdings" on public.holdings for all
  using (portfolio_id in (select id from public.portfolios where user_id = auth.uid()));

-- Transactions
create policy "Users can CRUD own transactions" on public.transactions for all using (auth.uid() = user_id);

-- Bank connections
create policy "Users can CRUD own bank connections" on public.bank_connections for all using (auth.uid() = user_id);

-- Goals
create policy "Users can CRUD own goals" on public.goals for all using (auth.uid() = user_id);

-- Budget entries
create policy "Users can CRUD own budget entries" on public.budget_entries for all using (auth.uid() = user_id);
