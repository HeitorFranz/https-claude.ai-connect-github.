import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Voltar({ para, rotulo = 'Voltar' }: { para: string; rotulo?: string }) {
  return (
    <Link to={para} className="inline-flex items-center gap-1 text-sm font-bold no-underline text-mute hover:text-ink w-fit min-h-8">
      <ArrowLeft size={16} aria-hidden /> {rotulo}
    </Link>
  )
}

/** Cabeçalho de página: voltar (opcional), título e uma linha de contexto. */
export function Titulo({ children, voltar, sub }: { children: ReactNode; voltar?: string; sub?: ReactNode }) {
  return (
    <div className="mb-6 grid gap-2">
      {voltar && (
        <Link to={voltar} className="inline-flex items-center gap-1 text-sm font-bold no-underline text-mute hover:text-ink w-fit min-h-8">
          <ArrowLeft size={16} aria-hidden /> Voltar
        </Link>
      )}
      <h1 className="t-titulo">{children}</h1>
      {sub && <p className="text-mute m-0 max-w-[62ch]">{sub}</p>}
    </div>
  )
}

export function Cartao({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-panel border border-line rounded-xl p-4 ${className}`}>{children}</div>
}

export function CampoBusca({ valor, mudar, rotulo }: { valor: string; mudar: (v: string) => void; rotulo: string }) {
  return (
    <input type="search" value={valor} onChange={(e) => mudar(e.target.value)} placeholder={rotulo} aria-label={rotulo}
      className="w-full h-12 px-4 rounded-xl border border-line bg-panel text-base focus:border-ink outline-none" />
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
    <button type="button" onClick={copiar} aria-live="polite"
      className={`h-10 px-3 shrink-0 rounded-lg border border-line bg-panel text-sm font-bold cursor-pointer transition-colors duration-150 hover:border-ink ${ok ? 'text-ok border-ok' : ''} ${className}`}>
      {ok ? 'Copiado' : rotulo}
    </button>
  )
}

export function Chip({ ativo, onClick, children, cor }: { ativo: boolean; onClick: () => void; children: ReactNode; cor?: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={ativo}
      className={`h-10 px-3.5 rounded-full border text-sm font-bold whitespace-nowrap cursor-pointer transition-colors duration-150 flex items-center gap-2 ${ativo ? 'bg-ink text-panel border-ink' : 'bg-panel border-line text-ink hover:border-ink'}`}>
      {cor && <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cor }} aria-hidden />}
      {children}
    </button>
  )
}
