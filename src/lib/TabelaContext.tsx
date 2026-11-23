import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { supabase } from './supabase'
import { useAuth } from '../auth/AuthProvider'
import type { Item, TabelaPrecos } from './tabelaPrecos'
import { calcularPreco, parametrosPadrao, type Parametros, type Preco } from './precos'

type Estado = {
  tabela: TabelaPrecos | null
  atualizadaEm: string | null
  carregando: boolean
  erro: string
  parametros: Parametros | null
  setParametros: (p: Parametros) => void
  preco: (item: Item) => Preco | null
  recarregar: () => Promise<void>
}

const Ctx = createContext<Estado | null>(null)
const CHAVE = 'consulta-unipega:parametros'

export function TabelaProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth()
  const [tabela, setTabela] = useState<TabelaPrecos | null>(null)
  const [atualizadaEm, setAtualizadaEm] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [parametros, setParam] = useState<Parametros | null>(null)

  const recarregar = useCallback(async () => {
    if (!session) return
    setCarregando(true)
    const { data, error } = await supabase.from('tabelas_preco').select('dados, criada_em').order('criada_em', { ascending: false }).limit(1).maybeSingle()
    setCarregando(false)
    if (error) return setErro(error.message)
    if (!data) return setTabela(null)
    const t = data.dados as TabelaPrecos
    setTabela(t)
    setAtualizadaEm(data.criada_em as string)
    let salvo: Parametros | null = null
    try { salvo = JSON.parse(localStorage.getItem(CHAVE) ?? 'null') } catch { /* sem armazenamento local */ }
    const valido = salvo && t.canais.some((c) => c.nome === salvo!.canal) && t.ufs.some((u) => u.uf === salvo!.uf)
    setParam(valido ? salvo : parametrosPadrao(t))
  }, [session])

  useEffect(() => { void recarregar() }, [recarregar])

  const setParametros = useCallback((p: Parametros) => {
    setParam(p)
    try { localStorage.setItem(CHAVE, JSON.stringify(p)) } catch { /* sem armazenamento local */ }
  }, [])

  const preco = useCallback((item: Item) => (tabela && parametros ? calcularPreco(tabela, item, { ...parametros, marca: item.marca || parametros.marca, mercado: mercadoDaMarca(tabela, parametros, item.marca), canal: canalDaMarca(tabela, parametros, item.marca) }) : null), [tabela, parametros])

  const valor = useMemo(() => ({ tabela, atualizadaEm, carregando, erro, parametros, setParametros, preco, recarregar }), [tabela, atualizadaEm, carregando, erro, parametros, setParametros, preco, recarregar])
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

/** Se o item é de outra marca, usa o mercado/canal equivalentes dessa marca. */
function mercadoDaMarca(t: TabelaPrecos, p: Parametros, marca: string) {
  if (!marca || marca === p.marca) return p.mercado
  return t.mercados.find((m) => m.marca === marca && m.nome === p.mercado)?.nome ?? t.mercados.find((m) => m.marca === marca)?.nome ?? p.mercado
}
function canalDaMarca(t: TabelaPrecos, p: Parametros, marca: string) {
  if (!marca || marca === p.marca) return p.canal
  return t.canais.find((c) => c.marca === marca && c.nome === p.canal)?.nome ?? t.canais.find((c) => c.marca === marca && /REVENDA/.test(c.nome))?.nome ?? t.canais.find((c) => c.marca === marca)?.nome ?? p.canal
}

export function useTabela() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useTabela fora do TabelaProvider')
  return v
}

/* ---------- ligação produto do app → códigos da tabela ---------- */
const REGRAS: Record<string, RegExp> = {
  'acetico-uso-geral': /ACETICO .*USO GERAL|ACETICO (INCOLOR|BRANCO|PRETO) CARTUCHO 200ML/,
  'acetico-100-profissional': /ACETICO PRO /,
  'acetico-multiuso': /ACETICO MULTIUSO/,
  'acetico-alta-temperatura': /ACETICO HT/,
  'acetico-100-sem-fungicida': /AQUARIO/,
  'neutro-100': /NEUTRO 100%/,
  'neutro-alta-temperatura-ultra': /NEUTRO HT/,
  aluzinco: /ALUZINCO/,
  'silicone-sem-cheiro-easy-pack': /UNIPEGA SILICONE (INCOLOR|BRANCO|PRETO) EASY PACK/,
  'sela-trincas': /SELA TRINCA/,
  'silicone-flexivel-base-d-agua': /BASE D'AGUA/,
  'veda-calhas': /VEDA CALHA/,
  'monta-e-fixa': /MONTA E FIXA/,
  'cola-rodape': /COLA RODAPE/,
  'adesivo-para-pisos-vinilicos': /COLA VINILICA/,
  'pu-40-profissional': /PU40 (BRANCO|CINZA|PRETO|BEGE)/,
  'pu-40-multiuso': /PU40 MULTIUSO/,
  'pu-flex-uso-geral': /PU FLEX/,
  'silicone-hibrido-clear-24h-cores': /HIBRIDO USO GERAL/,
  'high-tack-ultra': /HIGH TACK PRO/,
  'fixa-tudo': /FIXA TUDO/,
  'fixa-cubas': /FIXA CUBAS/,
  'fixa-espelhos': /FIXA ESPELHO/,
  'crystal-clear': /CRYSTAL CLEAR/,
  parabrisas: /PARABRISAS/,
  'u-flex-pu-44': /PU44/,
  'u-flex-pu-55': /PU55/,
  'espuma-pu-uso-geral': /ESPUMA DE PU USO GERAL/,
  'espuma-pu-multiuso': /ESPUMA DE PU MULTIUSO/,
  'espuma-pu-profissional': /ESPUMA DE PU PRO/,
  'chumbador-quimico-pro': /CHUMBADOR/,
  'adesivo-epoxi-pro-mf-tix': /EPOXI/,
  'bond-007': /BOND 007/,
  'colas-brancas-original-extra-multiuso-extra': /COLA (BRANCA ORIGINAL|EXTRA)/,
  'cola-madeira': /COLA MADEIRA/,
  'fita-crepe': /CREPE/,
  'silver-tape': /SILVER TAPE/,
  'fita-isolante': /FITA ISOLANTE/,
  'demarcacao-antiderrapante-empacotamento-dupla-face': /FITA DEM|ANTIDERRAPANTE|EMPACOTAMENTO|DUPLA FACE/,
  'fita-veda-rosca': /VEDA ROSCA/,
  'anel-de-vedacao-para-vaso': /ANEL DE VEDACAO/,
  'uni-lub': /UNILUB/,
  'uni-80': /UNICAR80/,
  'graxa-branca-graxa-spray-grafite-vaselina-silicone-spray-lub-correntes': /SILICONE SPRAY|VASELINA|GRAFITE|GRAXA|CORRENTES/,
  'limpa-contato': /LIMPA CONTATO/,
  'antirrespingo-de-solda': /ANTIRRESPINGO/,
  'gas-para-macarico': /MACARICO/,
  'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz': /TINTA SPRAY|VERNIZ SPRAY/,
  'corante-liquido': /CORANTE/,
  'espuma-limpa-tudo': /LIMPA TUDO/,
  'protetor-de-tecidos': /PROTETOR DE TECIDOS/,
  'odorizador-e-limpa-ar-condicionado': /ODORIZADOR|LIMPA AR/,
  'gancho-suporte-feltro-e-anti-impacto': /FELTRO|ANTI IMPACTO|FITA SMART|GANCHO/,
}
const semAcento = (s: string) => s.toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export function itensDoProduto(t: TabelaPrecos | null, produtoId: string): Item[] {
  const re = REGRAS[produtoId]
  if (!t || !re) return []
  const vistos = new Set<string>()
  return t.itens.filter((i) => i.marca === 'UNIPEGA' && re.test(semAcento(i.descricao)) && !vistos.has(i.codigo) && vistos.add(i.codigo))
}
