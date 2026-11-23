import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Linha = { codigo: string; quantidade: number }
export type Rascunho = { id?: string; clienteId: string | null; clienteNome: string; observacoes: string; linhas: Linha[] }
type Estado = {
  rascunho: Rascunho
  adicionar: (codigo: string, quantidade?: number) => void
  mudarQuantidade: (codigo: string, quantidade: number) => void
  remover: (codigo: string) => void
  atualizar: (parcial: Partial<Rascunho>) => void
  novo: () => void
}
const CHAVE = 'consulta-unipega:orcamento'
const vazio = (): Rascunho => ({ clienteId: null, clienteNome: '', observacoes: '', linhas: [] })
const Ctx = createContext<Estado | null>(null)

export function OrcamentoProvider({ children }: { children: ReactNode }) {
  const [rascunho, setR] = useState<Rascunho>(() => {
    try { return { ...vazio(), ...JSON.parse(localStorage.getItem(CHAVE) ?? '{}') } } catch { return vazio() }
  })
  useEffect(() => { try { localStorage.setItem(CHAVE, JSON.stringify(rascunho)) } catch { /* sem armazenamento local */ } }, [rascunho])

  const adicionar = useCallback((codigo: string, quantidade = 1) => setR((r) => {
    const ja = r.linhas.find((l) => l.codigo === codigo)
    return { ...r, linhas: ja ? r.linhas.map((l) => (l.codigo === codigo ? { ...l, quantidade: l.quantidade + quantidade } : l)) : [...r.linhas, { codigo, quantidade }] }
  }), [])
  const mudarQuantidade = useCallback((codigo: string, quantidade: number) => setR((r) => ({ ...r, linhas: r.linhas.map((l) => (l.codigo === codigo ? { ...l, quantidade: Math.max(0, quantidade) } : l)) })), [])
  const remover = useCallback((codigo: string) => setR((r) => ({ ...r, linhas: r.linhas.filter((l) => l.codigo !== codigo) })), [])
  const atualizar = useCallback((parcial: Partial<Rascunho>) => setR((r) => ({ ...r, ...parcial })), [])
  const novo = useCallback(() => setR(vazio()), [])
  const v = useMemo(() => ({ rascunho, adicionar, mudarQuantidade, remover, atualizar, novo }), [rascunho, adicionar, mudarQuantidade, remover, atualizar, novo])
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>
}

export function useOrcamento() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useOrcamento fora do OrcamentoProvider')
  return v
}
