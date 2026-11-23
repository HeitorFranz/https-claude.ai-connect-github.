/**
 * Lê a "TABELA NAC" mensal (.xlsx) e extrai só o necessário para calcular preços e montar orçamentos.
 * As tabelas internas são achadas pelos títulos das colunas, não por posição fixa, para aguentar a planilha de cada mês.
 * Colunas de custo da planilha NÃO são lidas.
 */
import * as XLSX from 'xlsx'

export type Canal = { nome: string; marca: string; pedidoMinimo: number; desconto: number; fator: number; descontoMaximo: number | null }
export type Mercado = { nome: string; marca: string; coluna: number }
export type Item = {
  codigo: string
  descricao: string
  marca: string
  secao: string
  caixa: string
  icms: number | null
  ipi: number | null
  st: boolean
  base: Record<number, number | null>
  politica?: string
  pedidoPrazo?: string
  cadastro?: Record<string, string | number>
}
export type TabelaPrecos = {
  titulo: string
  geradaEm: string
  canais: Canal[]
  mercados: Mercado[]
  ufs: { uf: string; icms: number | 'ZF'; stColuna: number | null }[]
  fretes: { nome: string; pct: number }[]
  prazos: { nome: string; media: number; pct: number; parcelas: number }[]
  stPorUf: Record<string, Record<string, number | 'ISENTO'>>
  itens: Item[]
}

type Linha = unknown[]
const txt = (v: unknown) => (v === null || v === undefined ? '' : String(v).replace(/\s+/g, ' ').trim())
const num = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null)
const norm = (v: unknown) => txt(v).toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

function linhas(wb: XLSX.WorkBook, aba: string): Linha[] {
  const ws = wb.Sheets[aba]
  if (!ws) throw new Error(`A planilha não tem a aba "${aba}".`)
  return XLSX.utils.sheet_to_json<Linha>(ws, { header: 1, raw: true, defval: null, blankrows: true })
}

/** Acha a linha de cabeçalho que contém todos os títulos e devolve a posição de cada um. */
function cabecalho(ls: Linha[], titulos: string[], aPartirDe = 0): { linha: number; col: Record<string, number> } {
  for (let i = 0; i < Math.min(ls.length, 60); i++) {
    const r = ls[i] ?? []
    const col: Record<string, number> = {}
    for (const t of titulos) {
      const j = r.findIndex((c, k) => k >= aPartirDe && norm(c) === norm(t))
      if (j < 0) break
      col[t] = j
    }
    if (Object.keys(col).length === titulos.length) return { linha: i, col }
  }
  throw new Error(`Não achei as colunas ${titulos.join(', ')}.`)
}

function lerBdmUdc(wb: XLSX.WorkBook) {
  const ls = linhas(wb, 'BDM_UDC')
  const h = cabecalho(ls, ['FATURAMENTO', 'NOME DA TABELA', 'PED MIN', 'BU', 'DESCONTO', 'FATOR'])
  const r0 = h.linha + 1
  const c = h.col
  const canais: Canal[] = []
  const mercados: Mercado[] = []
  const ufs: TabelaPrecos['ufs'] = []
  const fretes: TabelaPrecos['fretes'] = []
  const prazos: TabelaPrecos['prazos'] = []
  const cab = ls[h.linha]
  const pos = (t: string, depois = 0) => cab.findIndex((x, k) => k > depois && norm(x) === t)
  const cUf = pos('UF')
  const cMerc = pos('NOME DA TABELA', cUf)
  const cFrete = pos('FRETE')
  const cPrazo = pos('PRAZO')
  for (let i = r0; i < ls.length; i++) {
    const r = ls[i]
    if (txt(r[c['NOME DA TABELA']]) && num(r[c['FATOR']]) !== null)
      canais.push({ nome: txt(r[c['NOME DA TABELA']]), marca: txt(r[c['BU']]), pedidoMinimo: num(r[c['PED MIN']]) ?? 0, desconto: num(r[c['DESCONTO']]) ?? 0, fator: num(r[c['FATOR']])!, descontoMaximo: num(r[c['FATOR'] + 1]) })
    if (cUf >= 0 && /^[A-Z]{2}$/.test(txt(r[cUf]))) {
      const icms = txt(r[cUf]) === 'ZF' ? 'ZF' : num(r[cUf + 1])
      if (icms !== null) ufs.push({ uf: txt(r[cUf]), icms, stColuna: num(r[cUf + 2]) })
    }
    if (cMerc >= 0 && txt(r[cMerc]) && num(r[cMerc + 1]) !== null) mercados.push({ nome: txt(r[cMerc]), coluna: num(r[cMerc + 1])!, marca: txt(r[cMerc + 2]) })
    if (cFrete >= 0 && txt(r[cFrete]) && num(r[cFrete + 1]) !== null) fretes.push({ nome: txt(r[cFrete]), pct: num(r[cFrete + 1])! })
    if (cPrazo >= 0 && txt(r[cPrazo]) && num(r[cPrazo + 2]) !== null) prazos.push({ nome: txt(r[cPrazo]), media: num(r[cPrazo + 1]) ?? 0, pct: num(r[cPrazo + 2])!, parcelas: num(r[cPrazo + 3]) ?? 1 })
  }
  // A coluna FRETE aparece em mais de uma tabela interna; a primeira é a usada no cálculo.
  const fretesUnicos = fretes.filter((f, i) => fretes.findIndex((g) => g.nome === f.nome) === i)
  return { canais, mercados, ufs, fretes: fretesUnicos, prazos }
}

function lerTexto(wb: XLSX.WorkBook) {
  const ls = linhas(wb, 'BDM_TEXTO')
  const h = cabecalho(ls, ['COD', 'TEXTO', 'ICMS', 'CAIXA', 'IPI', 'ST'])
  const cab = ls[h.linha].map(norm)
  const cPol = cab.indexOf('POLITICA')
  const cPed = cab.indexOf('PED PRAZ')
  const m = new Map<string, { texto: string; icms: number | null; caixa: string; ipi: number | null; st: boolean; politica: string; pedidoPrazo: string }>()
  for (const r of ls.slice(h.linha + 1)) {
    const cod = txt(r[h.col.COD])
    if (!cod) continue
    m.set(cod, {
      texto: txt(r[h.col.TEXTO]), icms: num(r[h.col.ICMS]), caixa: txt(r[h.col.CAIXA]), ipi: num(r[h.col.IPI]), st: norm(r[h.col.ST]) === 'COM ST',
      politica: cPol >= 0 ? txt(r[cPol]) : '', pedidoPrazo: cPed >= 0 ? txt(r[cPed]) : '',
    })
  }
  return m
}

function lerFormacao(wb: XLSX.WorkBook, colunasUsadas: number[]) {
  const ls = linhas(wb, 'BD_FORMACAO')
  const h = cabecalho(ls, ['CODIGO'])
  const c0 = h.col.CODIGO
  const m = new Map<string, { desc: string; marca: string; base: Record<number, number | null> }>()
  for (const r of ls.slice(h.linha + 1)) {
    const cod = txt(r[c0])
    if (!cod) continue
    const base: Record<number, number | null> = {}
    for (const k of colunasUsadas) base[k] = num(r[c0 + k - 1]) // índice do PROCV (1 = coluna do código)
    m.set(cod, { desc: txt(r[c0 + 1]), marca: txt(r[c0 + 2]), base })
  }
  return m
}

function lerSt(wb: XLSX.WorkBook) {
  const ls = linhas(wb, 'ITENS COM ST')
  const h = cabecalho(ls, ['COD', 'AC', 'SP'])
  const cab = ls[h.linha]
  const out: TabelaPrecos['stPorUf'] = {}
  for (const r of ls.slice(h.linha + 1)) {
    const cod = txt(r[h.col.COD])
    if (!cod) continue
    const porUf: Record<string, number | 'ISENTO'> = {}
    cab.forEach((t, j) => {
      if (/^[A-Z]{2}$/.test(txt(t)) && j >= h.col.AC) porUf[txt(t)] = num(r[j]) ?? 'ISENTO'
    })
    out[cod] = porUf
  }
  return out
}

const CADASTRO = ['NCM', 'GTIN13', 'GTIN14', 'MULTIPLO EMBALAGEM', 'CONTEÚDO LIQ (ml)', 'PESO LIQ. (g)', 'PESO BRUTO (g)', 'PESO BRUTO CAIXA', 'COR', 'TECNOLOGIA', 'EMBALAGEM', 'ORIGEM', 'VALIDADE (DIAS)', 'CEST', 'PALETIZAÇÃO', 'QTD PALLET']
function lerCadastro(wb: XLSX.WorkBook) {
  const ls = linhas(wb, 'INFOS_CADASTRO')
  const h = cabecalho(ls, ['CÓDIGO', 'DESCRIÇÃO', 'MARCA'])
  const cab = ls[h.linha].map(txt)
  const m = new Map<string, Record<string, string | number>>()
  for (const r of ls.slice(h.linha + 1)) {
    const cod = txt(r[h.col['CÓDIGO']])
    if (!cod) continue
    const d: Record<string, string | number> = {}
    cab.forEach((t, j) => {
      if (CADASTRO.includes(t) && r[j] !== null && r[j] !== '' && r[j] !== '-') d[t] = typeof r[j] === 'number' ? (r[j] as number) : txt(r[j])
    })
    m.set(cod, d)
  }
  return m
}

/** Ordem e seções como aparecem na aba de tabela de preços de cada marca. */
function lerVitrine(wb: XLSX.WorkBook, aba: string) {
  const ls = linhas(wb, aba)
  const h = cabecalho(ls, ['CÓDIGO', 'DESCRIÇÃO DO PRODUTO'])
  const cCod = h.col['CÓDIGO']
  // Mercado que estava selecionado quando a planilha foi salva (o "preço-base" mostrado na aba vale para ele).
  let mercado = ''
  for (const r of ls.slice(0, h.linha)) {
    const j = r.findIndex((c) => ['MERCADO', 'TABELA'].includes(norm(c)))
    if (j >= 0 && txt(r[j + 1])) { mercado = txt(r[j + 1]); break }
  }
  const out: { codigo: string; secao: string; baseMostrada: number | null }[] = []
  let secao = ''
  for (const r of ls.slice(h.linha - 3)) {
    const v = txt(r[cCod])
    if (/^[A-Z]{3}\d{4}\.\d{4}$/.test(v)) {
      const repetido = r.findIndex((c, k) => k > cCod + 1 && txt(c) === v)
      out.push({ codigo: v, secao, baseMostrada: repetido >= 0 ? num(r[repetido + 1]) : null })
    } else if (v && norm(v) !== 'CODIGO' && !txt(r[cCod + 1])) secao = v
  }
  return { mercado, itens: out }
}

export function lerTabela(arquivo: ArrayBuffer): TabelaPrecos {
  const wb = XLSX.read(arquivo, { type: 'array' })
  const titulo = (() => {
    for (const r of linhas(wb, 'TABELA_UNIPEGA').slice(0, 6)) for (const c of r) if (/TABELA DE PRE/i.test(txt(c))) return txt(c)
    return 'Tabela de preços'
  })()
  const udc = lerBdmUdc(wb)
  const texto = lerTexto(wb)
  const formacao = lerFormacao(wb, [...new Set(udc.mercados.map((m) => m.coluna))])
  const cadastro = lerCadastro(wb)
  const vitrines = ['TABELA_UNIPEGA', 'TABELA_STUHR'].filter((a) => wb.Sheets[a]).map((a) => lerVitrine(wb, a))
  const itens: Item[] = []
  const vistos = new Set<string>()
  for (const { mercado, itens: lista } of vitrines)
  for (const { codigo, secao, baseMostrada } of lista) {
    if (vistos.has(codigo)) continue
    vistos.add(codigo)
    const t = texto.get(codigo)
    const f = formacao.get(codigo)
    if (!t && !f) continue
    itens.push({
      codigo, secao,
      descricao: t?.texto || f?.desc || codigo,
      marca: f?.marca || (codigo && t?.texto?.split(' ')[0]) || '',
      caixa: t?.caixa ?? '',
      icms: t?.icms ?? null,
      ipi: t?.ipi ?? null,
      st: t?.st ?? false,
      base: (() => {
        const b = { ...(f?.base ?? {}) }
        // Ajuste manual feito na aba de preços (ex.: cor com +3%) prevalece sobre a formação para o mercado da aba.
        const merc = udc.mercados.find((m) => m.nome === mercado && m.marca === (f?.marca || ''))
        if (merc && baseMostrada !== null && b[merc.coluna] !== baseMostrada) b[merc.coluna] = baseMostrada
        return b
      })(),
      politica: t?.politica || undefined,
      pedidoPrazo: t?.pedidoPrazo || undefined,
      cadastro: cadastro.get(codigo),
    })
  }
  if (!itens.length) throw new Error('Não encontrei produtos com preço na planilha.')
  return { titulo, geradaEm: new Date().toISOString(), ...udc, stPorUf: lerSt(wb), itens }
}
