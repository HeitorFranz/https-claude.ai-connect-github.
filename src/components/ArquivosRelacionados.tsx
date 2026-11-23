import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { ordemTipos, rotuloTipo, type Arquivo, type TipoArquivo } from '../lib/dados'
import { iconeTipo, IconePasta } from './icones'
import { BotaoCopiar } from './ui'

const temMiniatura = (a: Arquivo) => !a.pasta && (a.tipo === 'arte' || a.tipo === 'banner' || a.tipo === 'foto')

function Miniatura({ a }: { a: Arquivo }) {
  const [falhou, setFalhou] = useState(false)
  const Icone = a.pasta ? IconePasta : iconeTipo[a.tipo]
  if (!temMiniatura(a) || falhou)
    return <div className="w-12 h-12 shrink-0 rounded-lg bg-bg grid place-items-center text-mute" aria-hidden><Icone size={22} /></div>
  return (
    <div className="w-12 h-12 shrink-0 rounded-lg bg-bg overflow-hidden" aria-hidden>
      <img src={`https://drive.google.com/thumbnail?id=${a.id}&sz=w400`} alt="" loading="lazy" width={48} height={48}
        className="w-full h-full object-cover" onError={() => setFalhou(true)} />
    </div>
  )
}

export function ItemArquivo({ a }: { a: Arquivo }) {
  return (
    <li className="flex gap-3 items-center py-2.5">
      <Miniatura a={a} />
      <a href={a.url} target="_blank" rel="noreferrer" className="flex-1 min-w-0 text-ink no-underline hover:text-red transition-colors duration-150 leading-snug">
        <span className="font-bold">{a.titulo.replace(/^(Vídeos?|Boletim técnico|Arte|Fotos|Treinamento|Banner) – /, '')}</span>
        {a.pasta && <span className="text-xs text-mute"> · pasta</span>}
        <ExternalLink size={13} className="inline ml-1 text-mute" aria-label="abre no Drive" />
      </a>
      <BotaoCopiar texto={a.url} rotulo="Copiar link" />
    </li>
  )
}

export default function ArquivosRelacionados({ lista }: { lista: Arquivo[] }) {
  const tipos = ordemTipos.filter((t) => lista.some((a) => a.tipo === t))
  const [tipo, setTipo] = useState<TipoArquivo | null>(tipos[0] ?? null)
  if (!lista.length) return <p className="m-0 text-mute">Nenhum vídeo, foto ou arquivo do Drive ligado a este produto.</p>
  const atual = tipo && tipos.includes(tipo) ? tipo : tipos[0]
  const doTipo = lista.filter((a) => a.tipo === atual)
  return (
    <div className="grid gap-3">
      <div className="flex gap-2 flex-wrap">
        {tipos.map((t) => {
          const Icone = iconeTipo[t]
          const n = lista.filter((a) => a.tipo === t).length
          return (
            <button key={t} type="button" onClick={() => setTipo(t)} aria-pressed={atual === t}
              className={`h-10 px-3 rounded-full border text-sm font-bold flex items-center gap-1.5 cursor-pointer transition-colors duration-150 ${atual === t ? 'bg-ink text-panel border-ink' : 'border-line hover:border-ink'}`}>
              <Icone size={16} aria-hidden />{rotuloTipo[t]} <span className="opacity-60">{n}</span>
            </button>
          )
        })}
      </div>
      <ul className="list-none p-0 m-0 divide-y divide-line">{doTipo.map((a) => <ItemArquivo key={a.id} a={a} />)}</ul>
    </div>
  )
}
