import atributosJson from '../../data/atributos_produtos.json'
import { normalizar, produtos, type Produto } from './dados'
import { alertaPlastico, pontuarTexto } from './buscar'

export type Atributos = {
  id: string
  funcoes: string[]
  materiais_ok: string[]
  materiais_proibidos: string[]
  ambientes_ok: string[]
  ambientes_proibidos: string[]
  pintavel: boolean | null
  transparente: boolean
  sem_cheiro: boolean | null
  sem_pistola: boolean | null
  junta_movimentacao: boolean | null
  aguenta_peso: boolean
  cura_rapida: boolean
  temp_max_c: number | null
  publico: string[]
  aviso: string | null
}

export const atributos = new Map((atributosJson as Atributos[]).map((a) => [a.id, a]))

export const OPCOES = {
  funcoes: { vedar: 'Vedar', colar: 'Colar', fixar: 'Fixar sem furar', preencher: 'Preencher', ancorar: 'Ancorar', isolar: 'Isolar', lubrificar: 'Lubrificar', desengripar: 'Desengripar', limpar: 'Limpar', pintar: 'Pintar', proteger: 'Proteger', perfumar: 'Perfumar' },
  materiais: { vidro: 'Vidro', aluminio: 'Alumínio', ceramica: 'Cerâmica / azulejo', concreto: 'Concreto / alvenaria', madeira: 'Madeira / MDF', galvanizado: 'Galvanizado / aluzinco', ferro: 'Ferro / aço / metal', espelho: 'Espelho', policarbonato: 'Policarbonato', pvc: 'PVC', pedra: 'Pedra / mármore', gesso: 'Gesso / drywall', tecido: 'Tecido', pe_pp: 'Plástico PE / PP', motor: 'Motor / peça mecânica', eletrico: 'Circuito elétrico' },
  ambientes: { interno: 'Interno', externo: 'Externo / sol', molhado: 'Área molhada', submerso: 'Submerso', alta_temp: 'Alta temperatura', aquario: 'Aquário' },
  exigencias: { pintavel: 'Pintável', transparente: 'Transparente', sem_cheiro: 'Sem cheiro', sem_pistola: 'Sem pistola', flexivel: 'Junta que se move', peso: 'Aguenta peso', cura_rapida: 'Cura rápida' },
} as const

export type Grupo = keyof typeof OPCOES
export type Filtros = Record<Grupo, string[]>
export const filtrosVazios = (): Filtros => ({ funcoes: [], materiais: [], ambientes: [], exigencias: [] })

/** Palavras do pedido que acendem filtros sozinhas (raiz sem acento → grupo/valor). */
const PISTAS: [RegExp, Grupo, string][] = [
  [/\bved(a|ar|ando)|vazand|vazament|goteira|infiltra/, 'funcoes', 'vedar'],
  [/\bcola(r)?\b|colagem|grudar/, 'funcoes', 'colar'],
  [/fixar|pendurar|sem furar/, 'funcoes', 'fixar'],
  [/preench|buraco|vao\b|batente|instalar porta/, 'funcoes', 'preencher'],
  [/ancora|chumba|vergalh|barra roscada/, 'funcoes', 'ancorar'],
  [/desengrip|enferruj|travad|emperr/, 'funcoes', 'desengripar'],
  [/lubrific|rangend|rangendo|barulho de dobradi/, 'funcoes', 'lubrificar'],
  [/limpa|sujo|suja|mancha/, 'funcoes', 'limpar'],
  [/pint(ar|ura)\b/, 'funcoes', 'pintar'],
  [/perfum|cheiro ruim|odor/, 'funcoes', 'perfumar'],
  [/\bvidro|janela/, 'materiais', 'vidro'],
  [/alumini|esquadria/, 'materiais', 'aluminio'],
  [/azulejo|ceramic|porcelanat|louca/, 'materiais', 'ceramica'],
  [/concreto|alvenaria|parede|piso|tijolo|reboco/, 'materiais', 'concreto'],
  [/madeira|mdf/, 'materiais', 'madeira'],
  [/galvaniz|zinco|aluzinco|galvalume|calha|rufo/, 'materiais', 'galvanizado'],
  [/\bferro|\baco\b|metal|parafuso|portao/, 'materiais', 'ferro'],
  [/espelho/, 'materiais', 'espelho'],
  [/policarbonato/, 'materiais', 'policarbonato'],
  [/\bpvc/, 'materiais', 'pvc'],
  [/pedra|marmore|granito/, 'materiais', 'pedra'],
  [/gesso|drywall/, 'materiais', 'gesso'],
  [/sofa|tecido|estofad|tapete|banco do carro/, 'materiais', 'tecido'],
  [/motor|carburador|engrenag/, 'materiais', 'motor'],
  [/eletric|fio |fiacao|contato eletr/, 'materiais', 'eletrico'],
  [/\bsol\b|externa|externo|telhado|fachada/, 'ambientes', 'externo'],
  [/banheiro|box|molhad|chuveiro|pia/, 'ambientes', 'molhado'],
  [/aquario/, 'ambientes', 'aquario'],
  [/churrasqueira|forno|lareira|escapamento|alta temperatura|motor quente|fogao/, 'ambientes', 'alta_temp'],
  [/pesad|aguentar peso/, 'exigencias', 'peso'],
  [/transparente|sem aparecer|invisivel|incolor/, 'exigencias', 'transparente'],
  [/sem cheiro/, 'exigencias', 'sem_cheiro'],
  [/sem pistola/, 'exigencias', 'sem_pistola'],
  [/dilatacao|junta de movimento|movimentacao/, 'exigencias', 'flexivel'],
  [/antes de pintar|vai pintar|pintavel/, 'exigencias', 'pintavel'],
]

export function detectarFiltros(texto: string): Filtros {
  const t = ' ' + normalizar(texto) + ' '
  const f = filtrosVazios()
  for (const [re, g, v] of PISTAS) if (re.test(t) && !f[g].includes(v)) f[g].push(v)
  return f
}

export const juntarFiltros = (a: Filtros, b: Filtros): Filtros => ({
  funcoes: [...new Set([...a.funcoes, ...b.funcoes])],
  materiais: [...new Set([...a.materiais, ...b.materiais])],
  ambientes: [...new Set([...a.ambientes, ...b.ambientes])],
  exigencias: [...new Set([...a.exigencias, ...b.exigencias])],
})

export type Recomendado = { produto: Produto; pontos: number; porque: string[]; atencao: string[] }
export type Excluido = { produto: Produto; motivo: string }
export type Resposta = { resultados: Recomendado[]; excluidos: Excluido[]; alertas: string[]; filtros: Filtros }

const rotulo = (g: Grupo, v: string) => (OPCOES[g] as Record<string, string>)[v] ?? v
const TEMP_ALTA = 150

export function recomendar(texto: string, escolhidos: Filtros = filtrosVazios()): Resposta {
  const filtros = juntarFiltros(escolhidos, detectarFiltros(texto))
  const alertas: string[] = []
  const plastico = alertaPlastico(texto) ?? (filtros.materiais.includes('pe_pp') ? alertaPlastico('pp') : null)
  if (plastico) return { resultados: [], excluidos: [], alertas: [plastico], filtros }

  const aquario = filtros.ambientes.includes('aquario')
  if (aquario) alertas.push('Aquário: só silicone acético SEM fungicida — o fungicida mata os peixes.')
  const temTexto = normalizar(texto).trim().length > 1
  const textoPorId = new Map(pontuarTexto(texto).map((r) => [r.produto.id, r]))
  const resultados: Recomendado[] = []
  const excluidos: Excluido[] = []

  for (const p of produtos) {
    const a = atributos.get(p.id)
    if (!a) continue
    const excluir = (motivo: string) => excluidos.push({ produto: p, motivo })

    const matProib = filtros.materiais.find((m) => a.materiais_proibidos.includes(m))
    if (matProib) { excluir(`Não usar em ${rotulo('materiais', matProib).toLowerCase()}.`); continue }
    if (aquario && !a.ambientes_ok.includes('aquario')) { excluir('Não serve para aquário.'); continue }
    const ambProib = filtros.ambientes.find((x) => a.ambientes_proibidos.includes(x))
    if (ambProib) { excluir(`Não indicado para ${rotulo('ambientes', ambProib).toLowerCase()}.`); continue }
    if (filtros.exigencias.includes('pintavel') && a.pintavel === false) { excluir('Não aceita pintura.'); continue }
    if (filtros.exigencias.includes('flexivel') && a.junta_movimentacao === false) { excluir('Não é para junta que se movimenta.'); continue }
    if (filtros.ambientes.includes('alta_temp') && a.temp_max_c !== null && a.temp_max_c < TEMP_ALTA) { excluir(`Aguenta só até ${a.temp_max_c} °C.`); continue }

    let pontos = 0
    const porque: string[] = []
    for (const f of filtros.funcoes) if (a.funcoes.includes(f)) { pontos += 5; porque.push(rotulo('funcoes', f)) }
    for (const m of filtros.materiais) if (a.materiais_ok.includes(m)) { pontos += 4; porque.push(rotulo('materiais', m)) }
    for (const x of filtros.ambientes) {
      if (a.ambientes_ok.includes(x) || (x === 'alta_temp' && (a.temp_max_c ?? 0) >= TEMP_ALTA)) { pontos += 3; porque.push(rotulo('ambientes', x)) }
    }
    const exig: Record<string, boolean> = {
      pintavel: a.pintavel === true, transparente: a.transparente, sem_cheiro: a.sem_cheiro === true, sem_pistola: a.sem_pistola === true,
      flexivel: a.junta_movimentacao === true, peso: a.aguenta_peso, cura_rapida: a.cura_rapida,
    }
    for (const e of filtros.exigencias) if (exig[e]) { pontos += 2; porque.push(rotulo('exigencias', e)) }

    const t = textoPorId.get(p.id)
    const atencao = [...(t?.alertas ?? [])]
    if (a.aviso) atencao.push(a.aviso)
    if (t) { pontos += t.pontos; porque.push(...t.motivos.filter((m) => m.startsWith('resolve'))) }

    const temFiltro = Object.values(filtros).some((v) => v.length)
    if (pontos > 0 && (temFiltro || temTexto)) resultados.push({ produto: p, pontos, porque: [...new Set(porque)], atencao })
  }

  resultados.sort((x, y) => y.pontos - x.pontos)
  return { resultados, excluidos, alertas, filtros }
}
