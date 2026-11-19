import { useState } from 'react'
import { conhecimento } from '../../lib/dados'
import { Titulo } from '../../components/ui'

const CHAVE = 'consulta-unipega:quiz'
type Placar = { melhor: number; ultimo: number; total: number }

function lerPlacar(): Placar | null {
  try {
    const s = localStorage.getItem(CHAVE)
    return s ? (JSON.parse(s) as Placar) : null
  } catch {
    return null
  }
}

export default function Quiz() {
  const perguntas = conhecimento.quiz
  const [respostas, setRespostas] = useState<(number | null)[]>(() => perguntas.map(() => null))
  const [placar, setPlacar] = useState<Placar | null>(lerPlacar)
  const respondidas = respostas.filter((r) => r !== null).length
  const acertos = respostas.filter((r, i) => r === perguntas[i].correta).length
  const terminou = respondidas === perguntas.length

  function responder(i: number, op: number) {
    if (respostas[i] !== null) return
    const novas = respostas.map((r, j) => (j === i ? op : r))
    setRespostas(novas)
    if (novas.every((r) => r !== null)) {
      const total = novas.filter((r, j) => r === perguntas[j].correta).length
      const novo = { ultimo: total, melhor: Math.max(total, placar?.melhor ?? 0), total: perguntas.length }
      setPlacar(novo)
      try { localStorage.setItem(CHAVE, JSON.stringify(novo)) } catch { /* sem armazenamento */ }
    }
  }

  return (
    <div>
      <Titulo sub={placar ? `Seu melhor resultado: ${placar.melhor} de ${placar.total}.` : undefined}>Quiz</Titulo>
      <ol className="list-none p-0 m-0 grid gap-4">
        {perguntas.map((q, i) => {
          const r = respostas[i]
          return (
            <li key={q.pergunta} className="bg-panel border border-line rounded-xl p-4">
              <p className="m-0 font-bold mb-3"><span className="text-red">{i + 1}.</span> {q.pergunta}</p>
              <div className="grid gap-2">
                {q.opcoes.map((op, j) => {
                  const estado = r === null ? '' : j === q.correta ? 'border-ok bg-ok/15' : j === r ? 'border-no bg-no/15' : 'opacity-60'
                  return (
                    <button key={op} type="button" disabled={r !== null} onClick={() => responder(i, j)}
                      className={`text-left min-h-12 px-3 py-2 rounded-lg border border-line bg-bg ${estado}`}>
                      {r !== null && j === q.correta && '✓ '}{r === j && j !== q.correta && '✕ '}{op}
                    </button>
                  )
                })}
              </div>
              {r !== null && <p className="m-0 mt-3 text-sm"><b className={r === q.correta ? 'text-ok' : 'text-no'}>{r === q.correta ? 'Certo!' : 'Errado.'}</b> {q.explicacao}</p>}
            </li>
          )
        })}
      </ol>
      <div className="sticky bottom-16 mt-4 bg-panel border border-line rounded-xl p-4 flex items-center gap-3" aria-live="polite">
        <span className="font-bold">{acertos} de {respondidas} certas</span>
        <span className="text-mute text-sm">({respondidas}/{perguntas.length} respondidas)</span>
        {terminou && (
          <button type="button" onClick={() => setRespostas(perguntas.map(() => null))} className="ml-auto h-10 px-3 rounded-lg bg-red text-white font-bold text-sm">Refazer</button>
        )}
      </div>
    </div>
  )
}
