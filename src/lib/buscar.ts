import { boletinsDoProduto, conhecimento, normalizar, produtos, type Produto } from './dados'

const PARADAS = new Set(
  'a o as os um uma uns umas de da do das dos e em no na nos nas para pra pro por com sem que se ser esta esta ta ja eu ele ela cliente quer queria preciso precisa algo coisa fazer muito mais bem tem ter vai como qual onde meu minha sua seu isso esse essa nao'.split(' '),
)

/** Palavras da busca, sem acento, sem palavras vazias e no singular aproximado. */
export function termos(texto: string): string[] {
  return palavras(texto).map((w) => w.raiz)
}

function raiz(t: string) {
  let r = t.length > 4 && t.endsWith('s') ? t.slice(0, -1) : t
  if (r.length > 4 && /[ao]$/.test(r)) r = r.slice(0, -1)
  return r
}

/** Palavras da busca com a forma original (para mostrar) e a raiz (para comparar). */
function palavras(texto: string) {
  const vistas = new Set<string>()
  return texto
    .split(/[^\p{L}\p{N}]+/u)
    .map((orig) => ({ orig: orig.toLowerCase(), raiz: raiz(normalizar(orig)) }))
    .filter((w) => w.raiz.length > 1 && !PARADAS.has(normalizar(w.orig)) && !vistas.has(w.raiz) && vistas.add(w.raiz))
}

const PLASTICOS_SEM_ADESAO = /(^|[^a-z])(polipropileno|polietileno|pp|pe|nylon|nailon|teflon)([^a-z]|$)/

/** Regra geral: silicone, PU e acrílico não aderem em PE, PP, nylon e teflon sem primer. */
export function alertaPlastico(texto: string): string | null {
  return PLASTICOS_SEM_ADESAO.test(normalizar(texto))
    ? 'Silicone, PU e acrílico NÃO aderem em PE, PP, nylon e teflon (baixa tensão superficial). Precisa de primer — vale para todas as marcas.'
    : null
}

export type Resultado = { produto: Produto; pontos: number; motivos: string[]; alertas: string[] }

const contem = (alvo: string, t: string) => new RegExp(`(^|[^a-z0-9])${t}`).test(alvo)

export function buscar(texto: string): Resultado[] {
  const ws = palavras(texto)
  const ts = ws.map((w) => w.raiz)
  if (!ts.length) return []
  const frase = normalizar(texto).trim()

  // Problemas conhecidos cuja frase do cliente bate com a busca dão pontos aos produtos citados na solução.
  const solucoes = conhecimento.problema_solucao
    .map((x) => ({ x, hits: termos(x.cliente_diz).filter((t) => ts.includes(t)).length }))
    .filter((s) => s.hits >= 2 || (s.hits === 1 && ts.length === 1))

  const res: Resultado[] = produtos.map((p) => {
    const nome = normalizar(p.nome)
    const bols = boletinsDoProduto(p.id)
    const usar = normalizar([p.usar_em, p.o_que_e, ...bols.map((b) => b.caracteristicas)].join(' '))
    const nao = normalizar(p.nao_usar)
    const chaves = p.termos_busca.map(normalizar)
    let pontos = 0
    const motivos: string[] = []
    const alertas: string[] = []

    if (frase.length > 2 && nome.includes(frase)) {
      pontos += 30
      motivos.push('nome do produto')
    }
    for (const { orig, raiz: t } of ws) {
      if (contem(nome, t)) { pontos += 6; motivos.push(`nome: “${orig}”`) }
      else if (chaves.some((c) => c.startsWith(t) || t.startsWith(c))) { pontos += 4; motivos.push(`serve para “${orig}”`) }
      else if (contem(usar, t)) { pontos += 2; motivos.push(`indicado para “${orig}”`) }
      if (contem(nao, t)) { pontos -= 5; alertas.push(`Não usar em “${orig}”: ${p.nao_usar}`) }
    }
    const nomeCurto = normalizar(p.nome.split(/[/(]/)[0].trim())
    for (const s of solucoes) {
      if (normalizar(s.x.vender).includes(nomeCurto)) { pontos += 5 * s.hits; motivos.push(`resolve: ${s.x.cliente_diz}`) }
    }
    return { produto: p, pontos, motivos: [...new Set(motivos)], alertas }
  })

  return res.filter((r) => r.pontos > 0).sort((a, b) => b.pontos - a.pontos)
}
