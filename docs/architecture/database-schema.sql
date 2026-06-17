-- Maison Arc initial PostgreSQL schema
-- Pragmatic modular-monolith schema for bespoke commission commerce.

create extension if not exists pgcrypto;

create type user_role as enum (
  'customer',
  'atelier_reviewer',
  'customer_concierge',
  'content_editor',
  'admin'
);

create type account_status as enum (
  'active',
  'invited',
  'suspended'
);

create type identity_provider as enum (
  'magic_link',
  'otp_email',
  'password',
  'google'
);

create type design_status as enum (
  'draft',
  'shared',
  'archived'
);

create type share_status as enum (
  'active',
  'revoked',
  'expired'
);

create type cart_status as enum (
  'active',
  'checked_out',
  'abandoned'
);

create type checkout_status as enum (
  'initiated',
  'payment_method_captured',
  'submitted',
  'expired',
  'cancelled'
);

create type order_status as enum (
  'submitted',
  'under_review',
  'approved',
  'rejected',
  'deposit_requested',
  'deposit_paid',
  'in_production',
  'ready_to_ship',
  'shipped',
  'completed',
  'cancelled'
);

create type payment_status as enum (
  'pending',
  'requires_action',
  'authorized',
  'captured',
  'failed',
  'refunded',
  'cancelled'
);

create type payment_kind as enum (
  'setup',
  'deposit',
  'balance',
  'refund'
);

create type article_status as enum (
  'draft',
  'published',
  'archived'
);

create table users (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  first_name text,
  last_name text,
  phone text,
  role user_role not null default 'customer',
  status account_status not null default 'active',
  email_verified_at timestamptz,
  password_hash text,
  totp_secret_encrypted text,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table user_identities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  provider identity_provider not null,
  provider_subject text,
  created_at timestamptz not null default now(),
  unique (provider, provider_subject)
);

create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  session_token_hash text not null unique,
  user_agent text,
  ip_address inet,
  last_seen_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table magic_link_tokens (
  id uuid primary key default gen_random_uuid(),
  email citext not null,
  token_hash text not null unique,
  redirect_path text,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create table user_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  label text,
  recipient_name text not null,
  line1 text not null,
  line2 text,
  city text not null,
  region text,
  postal_code text not null,
  country_code char(2) not null,
  is_default_shipping boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table sizing_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  preferred_eu_size integer,
  preferred_uk_size numeric(4,1),
  preferred_us_size numeric(4,1),
  fit_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  subtitle text not null,
  category text not null,
  badge text,
  description text,
  base_price_cents integer not null,
  currency char(3) not null default 'USD',
  is_configurable boolean not null default true,
  inventory_state text not null default 'available',
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table product_option_groups (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  display_type text not null,
  sort_order integer not null
);

create table product_option_values (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references product_option_groups(id) on delete cascade,
  code text not null,
  label text not null,
  hex_color text,
  surcharge_cents integer not null default 0,
  is_active boolean not null default true,
  sort_order integer not null,
  unique (group_id, code)
);

create table product_option_compatibility (
  product_id uuid not null references products(id) on delete cascade,
  option_value_id uuid not null references product_option_values(id) on delete cascade,
  primary key (product_id, option_value_id)
);

create table saved_designs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  product_id uuid not null references products(id),
  name text not null,
  status design_status not null default 'draft',
  configuration jsonb not null,
  estimated_price_cents integer not null,
  currency char(3) not null default 'USD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index saved_designs_user_id_idx on saved_designs(user_id);

create table shared_design_links (
  id uuid primary key default gen_random_uuid(),
  design_id uuid not null references saved_designs(id) on delete cascade,
  created_by_user_id uuid not null references users(id),
  token_hash text not null unique,
  status share_status not null default 'active',
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  status cart_status not null default 'active',
  currency char(3) not null default 'USD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references carts(id) on delete cascade,
  product_id uuid not null references products(id),
  saved_design_id uuid references saved_designs(id) on delete set null,
  configuration jsonb not null,
  quantity integer not null default 1,
  estimated_unit_price_cents integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index cart_items_cart_id_idx on cart_items(cart_id);

create table checkout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  cart_id uuid not null references carts(id),
  shipping_address_id uuid references user_addresses(id),
  status checkout_status not null default 'initiated',
  estimated_subtotal_cents integer not null,
  estimated_deposit_cents integer not null,
  currency char(3) not null default 'USD',
  stripe_customer_id text,
  stripe_setup_intent_id text,
  created_at timestamptz not null default now(),
  expires_at timestamptz,
  updated_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references users(id),
  checkout_session_id uuid references checkout_sessions(id),
  shipping_address_snapshot jsonb not null,
  sizing_profile_snapshot jsonb,
  status order_status not null default 'submitted',
  currency char(3) not null default 'USD',
  estimated_subtotal_cents integer not null,
  estimated_deposit_cents integer not null,
  approved_subtotal_cents integer,
  approved_deposit_cents integer,
  approved_balance_cents integer,
  submitted_at timestamptz not null default now(),
  approved_at timestamptz,
  rejected_at timestamptz,
  production_started_at timestamptz,
  shipped_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_user_id_idx on orders(user_id);
create index orders_status_idx on orders(status);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  saved_design_id uuid references saved_designs(id) on delete set null,
  configuration jsonb not null,
  quantity integer not null,
  estimated_unit_price_cents integer not null,
  approved_unit_price_cents integer,
  atelier_notes text,
  created_at timestamptz not null default now()
);

create index order_items_order_id_idx on order_items(order_id);

create table atelier_reviews (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references orders(id) on delete cascade,
  reviewer_user_id uuid references users(id),
  decision text,
  material_availability_status text,
  lead_time_days integer,
  approved_subtotal_cents integer,
  approved_deposit_cents integer,
  approved_balance_cents integer,
  customer_notes text,
  internal_notes text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table payment_methods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_payment_method_id text not null unique,
  brand text,
  last4 text,
  exp_month integer,
  exp_year integer,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete set null,
  user_id uuid not null references users(id),
  payment_method_id uuid references payment_methods(id),
  kind payment_kind not null,
  status payment_status not null default 'pending',
  amount_cents integer not null,
  currency char(3) not null default 'USD',
  stripe_payment_intent_id text unique,
  stripe_setup_intent_id text,
  failure_code text,
  failure_message text,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payments_order_id_idx on payments(order_id);
create index payments_user_id_idx on payments(user_id);

create table order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  from_status order_status,
  to_status order_status not null,
  changed_by_user_id uuid references users(id),
  reason text,
  created_at timestamptz not null default now()
);

create table journal_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body jsonb not null,
  hero_image_url text,
  status article_status not null default 'draft',
  published_at timestamptz,
  created_by_user_id uuid references users(id),
  updated_by_user_id uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table audit_log_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references users(id),
  actor_role user_role,
  action text not null,
  resource_type text not null,
  resource_id text not null,
  ip_address inet,
  request_id text,
  before_state jsonb,
  after_state jsonb,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index audit_log_events_resource_idx on audit_log_events(resource_type, resource_id);
create index audit_log_events_actor_idx on audit_log_events(actor_user_id);
