-- Supabase PostgreSQL unified schema for PBTS (Admin, Driver, Passenger)
-- Uses snake_case and UUID primary keys to avoid conflicts across apps
-- Run in Supabase SQL editor. Ensure extension pgcrypto is enabled for gen_random_uuid().

create extension if not exists pgcrypto;

-- Enums
create type driver_status as enum ('ACTIVE','INACTIVE','SUSPENDED','ON_LEAVE');
create type bus_type as enum ('ANBESSA','SHEGER','VELOCITY');
create type bus_status as enum ('ACTIVE','MAINTENANCE','INACTIVE','OUT_OF_SERVICE');
create type schedule_status as enum ('SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED','DELAYED');
create type trip_status as enum ('IN_PROGRESS','COMPLETED','CANCELLED');
create type feedback_status as enum ('PENDING','REVIEWED','RESOLVED','DISMISSED');
create type feedback_category as enum ('SERVICE','CLEANLINESS','PUNCTUALITY','SAFETY','DRIVER_BEHAVIOR','OTHER');
create type stop_type as enum ('BUS_STOP','TERMINAL','STATION');
create type incident_type as enum ('BREAKDOWN','ACCIDENT','DELAY','EMERGENCY','TRAFFIC','OTHER');
create type incident_severity as enum ('LOW','MEDIUM','HIGH','CRITICAL');
create type incident_status as enum ('REPORTED','ACKNOWLEDGED','IN_PROGRESS','RESOLVED','CLOSED');
create type stop_status as enum ('ARRIVED','DEPARTED');
create type user_type as enum ('ADMIN','DRIVER','SYSTEM');
create type notification_type as enum ('BUS_ARRIVAL','DELAY','ROUTE_CHANGE','INCIDENT','SYSTEM');

-- Admins
create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Drivers
create table if not exists drivers (
  id uuid primary key default gen_random_uuid(),
  employee_id text unique not null,
  first_name text not null,
  last_name text not null,
  license_number text unique not null,
  phone_number text not null,
  email text,
  password_hash text not null,
  address text not null,
  date_of_birth date not null,
  hire_date date not null,
  status driver_status not null default 'ACTIVE',
  experience integer not null default 0,
  rating numeric(3,2) not null default 0,
  total_trips integer not null default 0,
  emergency_name text not null,
  emergency_phone text not null,
  emergency_relation text not null,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_drivers_status on drivers(status);

-- Routes
create table if not exists routes (
  id uuid primary key default gen_random_uuid(),
  static_id text unique not null,              -- external/GTFS id
  route_number text not null,                  -- shortName
  name text not null,                          -- longName
  start_location text not null,
  end_location text not null,
  distance numeric(10,2) not null,
  estimated_duration integer not null,         -- minutes
  fare_price numeric(10,2) not null,
  is_active boolean not null default false,
  agency_id text,                              -- GTFS agency id
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_routes_active on routes(is_active);
create index if not exists idx_routes_number on routes(route_number);

-- Stops
create table if not exists stops (
  id uuid primary key default gen_random_uuid(),
  static_id text unique not null,              -- external stop id
  name text not null,
  latitude numeric(9,6) not null,
  longitude numeric(9,6) not null,
  type stop_type not null default 'BUS_STOP',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_stops_active on stops(is_active);
create index if not exists idx_stops_geo on stops(latitude, longitude);

-- Route <-> Stop mapping
create table if not exists route_stops (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references routes(id) on delete cascade,
  stop_id uuid not null references stops(id) on delete cascade,
  "order" integer not null,
  time_from_start integer not null,
  created_at timestamptz not null default now(),
  unique (route_id, "order"),
  unique (route_id, stop_id)
);
create index if not exists idx_route_stops_route on route_stops(route_id);
create index if not exists idx_route_stops_stop on route_stops(stop_id);

-- Buses
create table if not exists buses (
  id uuid primary key default gen_random_uuid(),
  plate_number text unique not null,
  bus_number text unique not null,
  fleet_number text,
  bus_type bus_type not null,
  status bus_status not null default 'ACTIVE',
  capacity integer not null,
  standing_capacity integer,
  current_passengers integer not null default 0,
  route_id uuid references routes(id) on delete set null,  -- current route
  driver_id uuid references drivers(id) on delete set null,
  last_maintenance timestamptz,
  next_maintenance timestamptz,
  mileage integer,
  fuel_level integer,
  gps_enabled boolean not null default true,
  manufacturer text,
  model_year integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_buses_status on buses(status);
create index if not exists idx_buses_route on buses(route_id);
create index if not exists idx_buses_driver on buses(driver_id);

-- Schedules
create table if not exists schedules (
  id uuid primary key default gen_random_uuid(),
  route_static_id text not null,
  route_id uuid references routes(id) on delete set null,
  bus_id uuid not null references buses(id) on delete restrict,
  driver_id uuid not null references drivers(id) on delete restrict,
  departure_time timestamptz not null,
  arrival_time timestamptz,
  status schedule_status not null default 'SCHEDULED',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_schedules_route on schedules(route_id);
create index if not exists idx_schedules_bus on schedules(bus_id);
create index if not exists idx_schedules_driver on schedules(driver_id);
create index if not exists idx_schedules_status on schedules(status);
create index if not exists idx_schedules_departure on schedules(departure_time);

-- Trip Records
create table if not exists trip_records (
  id uuid primary key default gen_random_uuid(),
  schedule_id uuid not null references schedules(id) on delete cascade,
  bus_id uuid not null references buses(id) on delete restrict,
  driver_id uuid not null references drivers(id) on delete restrict,
  route_static_id text not null,
  route_id uuid references routes(id) on delete set null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  status trip_status not null default 'IN_PROGRESS',
  current_stop_static_id text,
  current_latitude numeric(9,6),
  current_longitude numeric(9,6),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_trip_records_schedule on trip_records(schedule_id);
create index if not exists idx_trip_records_driver on trip_records(driver_id);
create index if not exists idx_trip_records_bus on trip_records(bus_id);
create index if not exists idx_trip_records_status on trip_records(status);
create index if not exists idx_trip_records_started_at on trip_records(started_at);

-- Passenger Feedback
create table if not exists passenger_feedback (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  rating integer not null check (rating between 1 and 5),
  category feedback_category not null default 'OTHER',
  message text not null,
  status feedback_status not null default 'PENDING',
  route_static_id text,
  stop_static_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_feedback_email on passenger_feedback(email);
create index if not exists idx_feedback_status on passenger_feedback(status);

-- Feedback OTP / verification
create table if not exists feedback_verifications (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  otp_hash text not null,
  expires_at timestamptz not null,
  verified_at timestamptz,
  attempts integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_feedback_verifications_email on feedback_verifications(email);

-- Route Analytics
create table if not exists route_analytics (
  id uuid primary key default gen_random_uuid(),
  route_static_id text unique not null,
  search_count integer not null default 0,
  last_searched timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Incidents
create table if not exists incidents (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trip_records(id) on delete cascade,
  type incident_type not null,
  severity incident_severity not null,
  description text not null,
  location text,
  status incident_status not null default 'REPORTED',
  reported_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references admins(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_incidents_trip on incidents(trip_id);
create index if not exists idx_incidents_status on incidents(status);
create index if not exists idx_incidents_reported on incidents(reported_at);

-- Stop Updates
create table if not exists stop_updates (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trip_records(id) on delete cascade,
  stop_static_id text not null,
  status stop_status not null,
  timestamp timestamptz not null default now(),
  latitude numeric(9,6),
  longitude numeric(9,6)
);
create index if not exists idx_stop_updates_trip on stop_updates(trip_id);
create index if not exists idx_stop_updates_timestamp on stop_updates(timestamp);

-- Audit Logs
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  user_type user_type not null,
  action text not null,
  entity text not null,
  entity_id uuid,
  changes jsonb,
  ip_address text,
  user_agent text,
  timestamp timestamptz not null default now()
);
create index if not exists idx_audit_logs_user on audit_logs(user_id);
create index if not exists idx_audit_logs_entity on audit_logs(entity);
create index if not exists idx_audit_logs_timestamp on audit_logs(timestamp);

-- Notifications
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  type notification_type not null,
  title text not null,
  message text not null,
  route_id uuid references routes(id) on delete set null,
  trip_id uuid references trip_records(id) on delete set null,
  "read" boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_notifications_created on notifications(created_at);
create index if not exists idx_notifications_read on notifications("read");

create table if not exists delay_reports (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trip_records(id) on delete cascade,
  reason text not null,
  minutes_delayed integer not null check (minutes_delayed >= 0),
  reported_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_delay_reports_trip on delay_reports(trip_id);
create index if not exists idx_delay_reports_reported_at on delay_reports(reported_at);

create table if not exists schedule_conflicts (
  id uuid primary key default gen_random_uuid(),
  schedule_id uuid not null references schedules(id) on delete cascade,
  conflict_type text not null,
  details jsonb,
  detected_at timestamptz not null default now(),
  resolved boolean not null default false,
  resolved_at timestamptz,
  resolved_by uuid references admins(id) on delete set null,
  notes text
);
create index if not exists idx_schedule_conflicts_schedule on schedule_conflicts(schedule_id);
create index if not exists idx_schedule_conflicts_resolved on schedule_conflicts(resolved);
create index if not exists idx_schedule_conflicts_detected_at on schedule_conflicts(detected_at);

-- Suggested foreign keys for cross-app consistency
-- (All apps use same tables; no per-app duplication required)
-- Ensure consistent timezone: use timestamptz throughout.

-- Optional: RLS policy placeholders (enable RLS per table and add policies)
-- alter table drivers enable row level security;
-- create policy "drivers read by admins" on drivers for select using (exists(select 1 from admins));
