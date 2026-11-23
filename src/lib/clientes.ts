import { supabase } from './supabase'
import { conhecimento } from './dados'

export type Cliente = {
  id?: string
  tipo_pessoa: 'PJ' | 'PF' | null
  razao_social: string | null
  nome_fantasia: string | null
  cnpj_cpf: string | null
  inscricao_estadual: string | null
  segmento: string | null
  status: 'ativo' | 'prospect' | 'inativo' | null
  classificacao: 'A' | 'B' | 'C' | null
  contato_nome: string | null
  contato_cargo: string | null
  telefone: string | null
  whatsapp: string | null
  email: string | null
  site: string | null
  instagram: string | null
  cep: string | null
  logradouro: string | null
  numero: string | null
  complemento: string | null
  bairro: string | null
  cidade: string | null
  uf: string | null
  dia_visita: string | null
  frequencia_visita: string | null
  ultima_visita: string | null
  proxima_visita: string | null
  forma_pagamento: string | null
  prazo_pagamento: string | null
  limite_credito: number | null
  marcas_concorrentes: string | null
  mix_atual: string | null
  produtos_interesse: string[]
  observacoes: string | null
  created_at?: string
  updated_at?: string
}

export type Campo = {
  chave: keyof Cliente
  rotulo: string
  tipo?: 'texto' | 'tel' | 'email' | 'url' | 'data' | 'numero' | 'select' | 'area'
  opcoes?: { valor: string; nome: string }[]
  dica?: string
  largo?: boolean
}

const op = (...v: string[]) => v.map((x) => ({ valor: x, nome: x }))

export const SECOES: { titulo: string; campos: Campo[] }[] = [
  { titulo: 'Identificação', campos: [
    { chave: 'nome_fantasia', rotulo: 'Nome fantasia', largo: true },
    { chave: 'razao_social', rotulo: 'Razão social', largo: true },
    { chave: 'tipo_pessoa', rotulo: 'Tipo', tipo: 'select', opcoes: [{ valor: 'PJ', nome: 'Empresa (PJ)' }, { valor: 'PF', nome: 'Pessoa física (PF)' }] },
    { chave: 'cnpj_cpf', rotulo: 'CNPJ / CPF' },
    { chave: 'inscricao_estadual', rotulo: 'Inscrição estadual' },
    { chave: 'segmento', rotulo: 'Segmento', tipo: 'select', opcoes: op(...conhecimento.segmentos.map((s) => s.segmento), 'Outro') },
    { chave: 'status', rotulo: 'Situação', tipo: 'select', opcoes: [{ valor: 'ativo', nome: 'Ativo' }, { valor: 'prospect', nome: 'Prospect (ainda não compra)' }, { valor: 'inativo', nome: 'Inativo' }] },
    { chave: 'classificacao', rotulo: 'Classificação', tipo: 'select', opcoes: [{ valor: 'A', nome: 'A — compra muito' }, { valor: 'B', nome: 'B — compra médio' }, { valor: 'C', nome: 'C — compra pouco' }] },
  ] },
  { titulo: 'Contato', campos: [
    { chave: 'contato_nome', rotulo: 'Nome do contato' },
    { chave: 'contato_cargo', rotulo: 'Cargo', dica: 'Ex.: comprador, dono, gerente' },
    { chave: 'whatsapp', rotulo: 'WhatsApp', tipo: 'tel' },
    { chave: 'telefone', rotulo: 'Telefone', tipo: 'tel' },
    { chave: 'email', rotulo: 'E-mail', tipo: 'email' },
    { chave: 'site', rotulo: 'Site', tipo: 'url' },
    { chave: 'instagram', rotulo: 'Instagram', dica: '@perfil' },
  ] },
  { titulo: 'Endereço', campos: [
    { chave: 'cep', rotulo: 'CEP', dica: 'Preenche o endereço sozinho' },
    { chave: 'logradouro', rotulo: 'Rua / avenida', largo: true },
    { chave: 'numero', rotulo: 'Número' },
    { chave: 'complemento', rotulo: 'Complemento' },
    { chave: 'bairro', rotulo: 'Bairro' },
    { chave: 'cidade', rotulo: 'Cidade' },
    { chave: 'uf', rotulo: 'UF', tipo: 'select', opcoes: op('AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO') },
  ] },
  { titulo: 'Visitas e pagamento', campos: [
    { chave: 'dia_visita', rotulo: 'Melhor dia para visita', tipo: 'select', opcoes: op('Segunda','Terça','Quarta','Quinta','Sexta','Sábado') },
    { chave: 'frequencia_visita', rotulo: 'Frequência', tipo: 'select', opcoes: op('Semanal','Quinzenal','Mensal','Bimestral','Sob demanda') },
    { chave: 'ultima_visita', rotulo: 'Última visita', tipo: 'data' },
    { chave: 'proxima_visita', rotulo: 'Próxima visita', tipo: 'data' },
    { chave: 'forma_pagamento', rotulo: 'Forma de pagamento', tipo: 'select', opcoes: op('Boleto','Pix','Cartão','Dinheiro','Outro') },
    { chave: 'prazo_pagamento', rotulo: 'Prazo', dica: 'Ex.: 28/35/42 dias' },
    { chave: 'limite_credito', rotulo: 'Limite de crédito (R$)', tipo: 'numero' },
  ] },
  { titulo: 'O que o cliente usa', campos: [
    { chave: 'mix_atual', rotulo: 'Produtos Unipega que já compra', tipo: 'area', largo: true },
    { chave: 'marcas_concorrentes', rotulo: 'Outras marcas que trabalha', tipo: 'area', largo: true },
  ] },
  { titulo: 'Observações', campos: [{ chave: 'observacoes', rotulo: 'Anotações', tipo: 'area', largo: true }] },
]

export const clienteVazio = (): Cliente => ({
  tipo_pessoa: null, razao_social: null, nome_fantasia: null, cnpj_cpf: null, inscricao_estadual: null, segmento: null, status: null, classificacao: null,
  contato_nome: null, contato_cargo: null, telefone: null, whatsapp: null, email: null, site: null, instagram: null,
  cep: null, logradouro: null, numero: null, complemento: null, bairro: null, cidade: null, uf: null,
  dia_visita: null, frequencia_visita: null, ultima_visita: null, proxima_visita: null, forma_pagamento: null, prazo_pagamento: null, limite_credito: null,
  marcas_concorrentes: null, mix_atual: null, produtos_interesse: [], observacoes: null,
})

export const nomeCliente = (c: Partial<Cliente>) => c.nome_fantasia || c.razao_social || c.contato_nome || 'Cliente sem nome'

export async function listarClientes(): Promise<Cliente[]> {
  const { data, error } = await supabase.from('clientes').select('*').order('nome_fantasia', { ascending: true, nullsFirst: false })
  if (error) throw new Error(error.message)
  return data as Cliente[]
}

export async function buscarCliente(id: string): Promise<Cliente | null> {
  const { data, error } = await supabase.from('clientes').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error(error.message)
  return data as Cliente | null
}

export async function salvarCliente(c: Cliente): Promise<Cliente> {
  const { id, created_at: _c, updated_at: _u, ...dados } = c
  void _c; void _u
  const q = id ? supabase.from('clientes').update(dados).eq('id', id) : supabase.from('clientes').insert(dados)
  const { data, error } = await q.select().single()
  if (error) throw new Error(error.message)
  return data as Cliente
}

export async function apagarCliente(id: string) {
  const { error } = await supabase.from('clientes').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

/** Planilha CSV (separador ;) que abre direto no Excel com acentos. */
export function baixarPlanilha(lista: Cliente[]) {
  const campos = SECOES.flatMap((s) => s.campos)
  const cab = [...campos.map((c) => c.rotulo), 'Produtos de interesse']
  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? '' : String(v)
    return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const linhas = lista.map((c) => [...campos.map((f) => esc(c[f.chave])), esc(c.produtos_interesse.join(', '))].join(';'))
  const csv = '﻿' + [cab.map(esc).join(';'), ...linhas].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  a.download = `clientes-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
}
