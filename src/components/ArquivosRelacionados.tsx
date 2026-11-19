import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { ordemTipos, rotuloTipo, type Arquivo } from '../lib/dados'
import { iconeTipo, IconePasta } from './icones'
import { BotaoCopiar } from './ui'

const temMiniatura = (a: Arquivo) => !a.pasta && (a.tipo === 'arte' || a.tipo === 'banner' || a.tipo === 'foto')

function Miniatura({ a }: { a: Arquivo }) {
  const [falhou, setFalhou] = useState(false)
  const Icone = a.pasta ? IconePasta : iconeTipo[a.tipo]
  if (!temMiniatura(a) || falhou)
    return <div className="w-14 h-14 shrink-0 rounded-lg bg-bg grid place-items-center text-mute" aria-hidden><Icone size={24} /></div>
  return (
    <div className="w-14 h-14 shrink-0 rounded-lg bg-bg overflow-hidden" aria-hidden>
      <img src={`https://drive.google.com/thumbnail?id=${a.id}&sz=w400`} alt="" loading="lazy" width={56} height={56}
        className="w-full h-full object-cover" onError={() => setFalhou(true)} />
    </div>
  )
}

export function ItemArquivo({ a }: { a: Arquivo }) {
  return (
    <li className="flex gap-3 items-center py-3 border-b border-line last:border-0">
      <Miniatura a={a} />
      <a href={a.url} target="_blank" rel="noreferrer" className="flex-1 font-medium text-ink no-underline hover:text-red transition-colors duration-150 leading-snug">
        {a.titulo} {a.pasta && <span className="text-xs text-mute">(pasta)</span>}
        <ExternalLink size={14} className="inline ml-1 text-mute" aria-label="abre no Drive" />
      </a>
      <BotaoCopiar texto={a.url} rotulo="Copiar link" />
    </li>
  )
}

export default function ArquivosRelacionados({ lista }: { lista: Arquivo[] }) {
  if (!lista.length) return <p className="text-mute text-sm">Nenhum arquivo do Drive ligado a este produto ainda.</p>
  return (
    <div className="grid gap-3">
      {ordemTipos.map((t) => {
        const doTipo = lista.filter((a) => a.tipo === t)
        if (!doTipo.length) return null
        const Icone = iconeTipo[t]
        return (
          <details key={t} open={doTipo.length <= 6} className="bg-panel border border-line rounded-xl px-4">
            <summary className="cursor-pointer font-bold py-3 flex items-center gap-2 min-h-11">
              <Icone size={18} className="text-red" aria-hidden /> {rotuloTipo[t]} <span className="text-mute font-normal">({doTipo.length})</span>
            </summary>
            <ul className="list-none p-0 m-0 border-t border-line">{doTipo.map((a) => <ItemArquivo key={a.id} a={a} />)}</ul>
          </details>
        )
      })}
    </div>
  )
}
