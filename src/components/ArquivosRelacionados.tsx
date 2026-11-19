import { ordemTipos, rotuloTipo, type Arquivo } from '../lib/dados'
import { BotaoCopiar, linkWhatsApp } from './ui'

function Miniatura({ a }: { a: Arquivo }) {
  const icone = a.pasta ? '📁' : a.tipo === 'video' ? '🎥' : a.tipo === 'boletim' ? '📄' : '🖼'
  if (a.pasta || a.tipo === 'video' || a.tipo === 'boletim' || a.tipo === 'treinamento')
    return <div className="w-14 h-14 shrink-0 rounded-lg bg-bg grid place-items-center text-2xl" aria-hidden>{icone}</div>
  return (
    <div className="w-14 h-14 shrink-0 rounded-lg bg-bg grid place-items-center text-2xl overflow-hidden" aria-hidden>
      <img src={`https://drive.google.com/thumbnail?id=${a.id}&sz=w400`} alt="" loading="lazy"
        className="w-full h-full object-cover" onError={(e) => { e.currentTarget.replaceWith(document.createTextNode(icone)) }} />
    </div>
  )
}

export function ItemArquivo({ a, contexto }: { a: Arquivo; contexto?: string }) {
  const msg = `${contexto ? contexto + ' — ' : ''}${a.titulo}\n${a.url}`
  return (
    <li className="flex gap-3 items-start py-3 border-b border-line last:border-0">
      <Miniatura a={a} />
      <div className="grid gap-2 flex-1">
        <a href={a.url} target="_blank" rel="noreferrer" className="font-medium text-ink no-underline hover:text-red">
          {a.titulo} {a.pasta && <span className="text-xs text-mute">(pasta)</span>}
        </a>
        <div className="flex gap-2 flex-wrap">
          <a href={a.url} target="_blank" rel="noreferrer" className="h-10 px-3 rounded-lg border border-line bg-bg text-sm font-bold no-underline text-ink grid place-items-center">Abrir</a>
          <BotaoCopiar texto={a.url} rotulo="Copiar link" />
          <a href={linkWhatsApp(msg)} target="_blank" rel="noreferrer" className="h-10 px-3 rounded-lg bg-ok text-white text-sm font-bold no-underline grid place-items-center">WhatsApp</a>
        </div>
      </div>
    </li>
  )
}

export default function ArquivosRelacionados({ lista, contexto }: { lista: Arquivo[]; contexto?: string }) {
  if (!lista.length) return <p className="text-mute text-sm">Nenhum arquivo do Drive vinculado. <span className="text-mid font-bold">Confirmar.</span></p>
  return (
    <div className="grid gap-4">
      {ordemTipos.map((t) => {
        const doTipo = lista.filter((a) => a.tipo === t)
        if (!doTipo.length) return null
        return (
          <details key={t} open={doTipo.length <= 6}>
            <summary className="cursor-pointer font-bold py-1">{rotuloTipo[t]} <span className="text-mute font-normal">({doTipo.length})</span></summary>
            <ul className="list-none p-0 m-0">{doTipo.map((a) => <ItemArquivo key={a.id} a={a} contexto={contexto} />)}</ul>
          </details>
        )
      })}
    </div>
  )
}
