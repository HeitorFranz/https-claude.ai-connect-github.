import produtosJson from '../../data/produtos.json'
import arquivosJson from '../../data/arquivos_drive.json'
import conhecimentoJson from '../../data/conhecimento.json'
import matrizJson from '../../data/matriz_quimica_material.json'
import fichasJson from '../../data/fichas_tecnicas.json'

export type Produto = {
  id: string
  familia: string
  nome: string
  o_que_e: string
  usar_em: string
  nao_usar: string
  embalagens: string
  dica_venda: string
  termos_busca: string[]
  palavras_arquivos: string[]
  arquivos_relacionados: string[]
}

export type TipoArquivo = 'video' | 'treinamento' | 'boletim' | 'arte' | 'banner' | 'catalogo' | 'foto'

export type Arquivo = {
  id: string
  titulo: string
  tipo: TipoArquivo
  pasta: boolean
  origem: string
  url: string
}

export type Ficha = Record<string, string | number | boolean | string[] | null>

export const produtos = produtosJson as Produto[]
export const arquivos = arquivosJson as Arquivo[]
export const conhecimento = conhecimentoJson
export const matriz = matrizJson as {
  materiais: string[]
  legenda: Record<string, string>
  quimicas: { quimica: string; valores: number[] }[]
  dica_por_material: Record<string, string>
}
export const fichas = fichasJson as Record<string, Ficha>

const arquivoPorId = new Map(arquivos.map((a) => [a.id, a]))
export const produtoPorId = new Map(produtos.map((p) => [p.id, p]))

export function arquivosDoProduto(p: Produto): Arquivo[] {
  return p.arquivos_relacionados.map((id) => arquivoPorId.get(id)).filter((a): a is Arquivo => !!a)
}

/** Ligação explícita ficha técnica (chave de fichas_tecnicas.json) → id do produto. */
const fichaParaProduto: Record<string, string> = {
  'PU 40 Multiuso': 'pu-40-multiuso',
  Parabrisas: 'parabrisas',
  'High Tack Ultra': 'high-tack-ultra',
  Aluzinco: 'aluzinco',
  'Acético 100% Profissional': 'acetico-100-profissional',
  'Acético Alta Temperatura': 'acetico-alta-temperatura',
  'Neutro Alta Temperatura / Ultra': 'neutro-alta-temperatura-ultra',
  'Unispray Alta Temperatura': 'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz',
  'Unispray Uso Geral': 'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz',
  'Fita Veda Rosca': 'fita-veda-rosca',
}

export function fichasDoProduto(id: string): [string, Ficha][] {
  return Object.entries(fichas).filter(([nome]) => fichaParaProduto[nome] === id)
}

export const familias = [...new Set(produtos.map((p) => p.familia))]

export function normalizar(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export const rotuloTipo: Record<TipoArquivo, string> = {
  video: 'Vídeos',
  treinamento: 'Treinamentos',
  boletim: 'Boletins técnicos',
  arte: 'Artes',
  banner: 'Banners',
  catalogo: 'Catálogos',
  foto: 'Fotos',
}
export const ordemTipos: TipoArquivo[] = ['video', 'treinamento', 'boletim', 'foto', 'arte', 'banner', 'catalogo']
