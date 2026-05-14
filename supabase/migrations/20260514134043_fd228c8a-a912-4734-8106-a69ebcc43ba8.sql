
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index conversations_session_id_idx on public.conversations(session_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);
create index messages_conversation_id_idx on public.messages(conversation_id);

alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Public access scoped by session_id (no auth in this app)
create policy "Anyone can read conversations" on public.conversations for select using (true);
create policy "Anyone can insert conversations" on public.conversations for insert with check (true);
create policy "Anyone can update conversations" on public.conversations for update using (true);

create policy "Anyone can read messages" on public.messages for select using (true);
create policy "Anyone can insert messages" on public.messages for insert with check (true);
