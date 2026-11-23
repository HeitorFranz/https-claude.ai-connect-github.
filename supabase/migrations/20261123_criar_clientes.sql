-- Aplicada no projeto Supabase consulta-unipega em 23/11/2026 (migration "criar_clientes").
-- Todos os campos são opcionais; cada usuário só enxerga os próprios clientes (RLS).
create table public.clientes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  tipo_pessoa text check (tipo_pessoa in ('PJ','PF')),
  razao_social text, nome_fantasia text, cnpj_cpf text, inscricao_estadual text, segmento text,
  status text check (status in ('ativo','prospect','inativo')),
  classificacao text check (classificacao in ('A','B','C')),
  contato_nome text, contato_cargo text, telefone text, whatsapp text, email text, site text, instagram text,
  cep text, logradouro text, numero text, complemento text, bairro text, cidade text, uf text,
  dia_visita text, frequencia_visita text, ultima_visita date, proxima_visita date,
  forma_pagamento text, prazo_pagamento text, limite_credito numeric(12,2),
  marcas_concorrentes text, mix_atual text, produtos_interesse text[] not null default '{}', observacoes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index clientes_owner_idx on public.clientes (owner_id);
alter table public.clientes enable row level security;
create policy "dono lê" on public.clientes for select to authenticated using ((select auth.uid()) = owner_id);
create policy "dono cria" on public.clientes for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "dono edita" on public.clientes for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "dono apaga" on public.clientes for delete to authenticated using ((select auth.uid()) = owner_id);
create or replace function public.tocar_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end; $$;
create trigger clientes_updated_at before update on public.clientes for each row execute function public.tocar_updated_at();
