-- Aplicada no projeto consulta-unipega em 23/11/2026 (migration "tabelas_preco_e_orcamentos").
create table public.tabelas_preco (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  titulo text not null, arquivo text, dados jsonb not null, criada_em timestamptz not null default now()
);
create index tabelas_preco_owner_idx on public.tabelas_preco (owner_id, criada_em desc);
alter table public.tabelas_preco enable row level security;
create policy "dono lê" on public.tabelas_preco for select to authenticated using ((select auth.uid()) = owner_id);
create policy "dono cria" on public.tabelas_preco for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "dono apaga" on public.tabelas_preco for delete to authenticated using ((select auth.uid()) = owner_id);
create table public.orcamentos (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  cliente_id uuid references public.clientes(id) on delete set null,
  cliente_nome text, tabela_titulo text, parametros jsonb not null default '{}', itens jsonb not null default '[]',
  total numeric(14,2), observacoes text,
  status text check (status in ('rascunho','enviado','fechado','perdido')) default 'rascunho',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index orcamentos_owner_idx on public.orcamentos (owner_id, created_at desc);
create index orcamentos_cliente_idx on public.orcamentos (cliente_id);
alter table public.orcamentos enable row level security;
create policy "dono lê" on public.orcamentos for select to authenticated using ((select auth.uid()) = owner_id);
create policy "dono cria" on public.orcamentos for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "dono edita" on public.orcamentos for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "dono apaga" on public.orcamentos for delete to authenticated using ((select auth.uid()) = owner_id);
create trigger orcamentos_updated_at before update on public.orcamentos for each row execute function public.tocar_updated_at();
