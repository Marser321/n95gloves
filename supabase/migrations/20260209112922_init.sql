create extension if not exists "uuid-ossp";

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  status text not null default 'pending',
  currency text not null default 'UYU',
  total_amount numeric not null,
  customer_name text,
  customer_email text,
  customer_phone text,
  preference_id text,
  payment_id text,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders (id) on delete cascade,
  product_id text not null,
  name text not null,
  qty integer not null,
  unit_price numeric not null,
  subtotal numeric not null
);

create table if not exists public.payments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders (id) on delete set null,
  provider text not null default 'mercadopago',
  payment_id text not null,
  status text not null,
  raw jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_order_items_order_id on public.order_items (order_id);
create index if not exists idx_payments_order_id on public.payments (order_id);
create index if not exists idx_payments_payment_id on public.payments (payment_id);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
before update on public.orders
for each row execute function public.touch_updated_at();
