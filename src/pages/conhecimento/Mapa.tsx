import { useState } from 'react'
import { matriz } from '../../lib/dados'
import Html from '../../components/Html'
import { Titulo } from '../../components/ui'

const cor = ['bg-no', 'bg-mid', 'bg-ok']
const simbolo = ['✕', '?', '✓']

export default function Mapa() {
  const [sel, setSel] = useState<number | null>(null)
  const material = sel === null ? null : matriz.materiais[sel]
  return (
    <div>
      <Titulo sub="Toque num material para ver a dica de venda.">Mapa química × material</Titulo>
      <div className="relative bg-panel border border-line rounded-xl p-3 overflow-x-auto">
        <table className="border-collapse w-full min-w-[720px] text-sm">
          <thead>
            <tr>
              <th className="text-left p-2">Química</th>
              {matriz.materiais.map((m, i) => (
                <th key={m} className={`p-1 ${sel === i ? 'bg-redbg' : ''}`}>
                  <button type="button" onClick={() => setSel(i)} aria-pressed={sel === i} className="font-bold text-xs p-1.5 rounded-md min-h-10 hover:bg-redbg">{m}</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matriz.quimicas.map((q) => (
              <tr key={q.quimica} className="border-t border-line">
                <th className="text-left p-2 font-bold whitespace-nowrap">{q.quimica}</th>
                {q.valores.map((v, i) => (
                  <td key={i} className={`text-center p-2 ${sel === i ? 'bg-redbg' : ''}`}>
                    <span className={`inline-grid place-items-center w-6 h-6 rounded-full text-white text-xs font-extrabold ${cor[v]}`}
                      title={matriz.legenda[String(v)]}>{simbolo[v]}</span>
                    <span className="sr-only">{matriz.legenda[String(v)]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-4 flex-wrap text-sm text-mute mt-3">
          {[2, 1, 0].map((v) => (
            <span key={v} className="flex items-center gap-1.5">
              <span className={`inline-grid place-items-center w-5 h-5 rounded-full text-white text-xs font-extrabold ${cor[v]}`}>{simbolo[v]}</span>
              {matriz.legenda[String(v)]}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 p-4 rounded-xl bg-panel border border-line min-h-20" aria-live="polite">
        {material ? <Html html={matriz.dica_por_material[material] ?? 'Sem dica para este material.'} /> : <span className="text-mute">Escolha um material na tabela.</span>}
      </div>
    </div>
  )
}
