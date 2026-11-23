import type { Item, TabelaPrecos } from './tabelaPrecos'

export type Parametros = { marca: string; mercado: string; canal: string; uf: string; frete: string; prazo: string; uso: 'REVENDA' | 'CONSUMO' }

export type Preco = {
  unitario: number | null // sem IPI e sem ST, arredondado para cima em 2 casas (igual à planilha de orçamento)
  ipi: number // 0 quando isento
  comIpi: number | null
  st: number // 0 quando isento
  comIpiSt: number | null
  icms: number | 'ZF'
  situacao: 'ok' | 'lancamento' | 'indisponivel'
}

const PIS_COFINS = 0.0925
const arredondaCima = (v: number) => Math.ceil(Math.round(v * 1e6) / 1e4) / 100

export function parametrosPadrao(t: TabelaPrecos, marca = 'UNIPEGA'): Parametros {
  const canal = t.canais.find((c) => c.marca === marca && /REVENDA 04|REVENDA GERAL/.test(c.nome)) ?? t.canais.find((c) => c.marca === marca)!
  return {
    marca,
    mercado: t.mercados.find((m) => m.marca === marca)?.nome ?? '',
    canal: canal?.nome ?? '',
    uf: 'SC',
    frete: t.fretes.find((f) => /SUL-SC/.test(f.nome))?.nome ?? t.fretes[0]?.nome ?? '',
    prazo: t.prazos.find((p) => p.nome === '28 DDL')?.nome ?? t.prazos[0]?.nome ?? '',
    uso: 'REVENDA',
  }
}

/** Mesmo cálculo da aba ORÇAMENTO da planilha. */
export function calcularPreco(t: TabelaPrecos, item: Item, p: Parametros): Preco {
  const merc = t.mercados.find((m) => m.nome === p.mercado && m.marca === p.marca) ?? t.mercados.find((m) => m.nome === p.mercado)
  const canal = t.canais.find((c) => c.nome === p.canal && c.marca === p.marca) ?? t.canais.find((c) => c.nome === p.canal)
  const uf = t.ufs.find((u) => u.uf === p.uf)
  const base = merc ? item.base[merc.coluna] : null
  const icmsUf = uf?.icms ?? 0.18
  const icms: number | 'ZF' = icmsUf === 'ZF' ? 'ZF' : icmsUf === 0.18 ? 0.18 : item.icms === 0.04 ? 0.04 : icmsUf
  const divisor = icms === 'ZF' ? 1 : 1 - icms - PIS_COFINS
  const frete = t.fretes.find((f) => f.nome === p.frete)?.pct ?? 0
  const prazo = t.prazos.find((x) => x.nome === p.prazo)?.pct ?? 0.01
  const fator = (canal?.fator ?? 1) * (1 + frete) * (1 + prazo)
  const ipi = item.ipi ?? 0
  const stPct = p.uso === 'CONSUMO' || !item.st ? 0 : (() => { const v = t.stPorUf[item.codigo]?.[p.uf]; return typeof v === 'number' ? v : 0 })()
  if (base === null || base === undefined) return { unitario: null, ipi, comIpi: null, st: stPct, comIpiSt: null, icms, situacao: 'lancamento' }
  const unitario = arredondaCima((base / divisor) * fator)
  const comIpi = unitario * (1 + ipi)
  return { unitario, ipi, comIpi, st: stPct, comIpiSt: comIpi * (1 + stPct), icms, situacao: 'ok' }
}

export const reais = (v: number | null | undefined) => (v === null || v === undefined ? '—' : v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
export const pct = (v: number) => `${(v * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`
export const unidadesCaixa = (caixa: string) => Number(caixa.match(/\d+/)?.[0] ?? 1) || 1
