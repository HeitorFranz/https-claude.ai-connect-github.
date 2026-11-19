import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Titulo({ children, voltar = '/produtos', sub }: { children: ReactNode; voltar?: string; sub?: ReactNode }) {
  return (
    <div className="mb-5 grid gap-1">
      <Link to={voltar} className="text-sm font-medium no-underline">← Voltar</Link>
      <h1 className="text-3xl">{children}</h1>
      {sub && <p className="text-mute max-w-[62ch]">{sub}</p>}
    </div>
  )
}

export function Cartao({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-panel border border-line rounded-xl p-4 ${className}`}>{children}</div>
}

export function CampoBusca({ valor, mudar, rotulo }: { valor: string; mudar: (v: string) => void; rotulo: string }) {
  return (
    <input type="search" value={valor} onChange={(e) => mudar(e.target.value)} placeholder={rotulo} aria-label={rotulo}
      className="w-full h-12 px-3 rounded-lg border border-line bg-panel text-base" />
  )
}

export function BotaoCopiar({ texto, rotulo = 'Copiar', className = '' }: { texto: string; rotulo?: string; className?: string }) {
  const [ok, setOk] = useState(false)
  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto)
    } catch {
      const t = document.createElement('textarea')
      t.value = texto
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setOk(true)
    setTimeout(() => setOk(false), 1500)
  }
  return (
    <button type="button" onClick={copiar} className={`h-11 px-3 shrink-0 rounded-lg border border-line bg-bg text-sm font-bold cursor-pointer transition-colors duration-150 hover:border-red ${className}`}>
      {ok ? 'Copiado ✓' : rotulo}
    </button>
  )
}

export function Chip({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={ativo}
      className={`h-11 px-4 rounded-full border text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 ${ativo ? 'bg-red text-white border-red' : 'bg-panel border-line text-ink'}`}>
      {children}
    </button>
  )
}
