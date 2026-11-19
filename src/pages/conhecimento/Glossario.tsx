import { useState } from 'react'
import { conhecimento, normalizar } from '../../lib/dados'
import { CampoBusca, Titulo } from '../../components/ui'

export default function Glossario() {
  const [busca, setBusca] = useState('')
  const t = normalizar(busca.trim())
  const lista = [...conhecimento.glossario]
    .sort((a, b) => a.termo.localeCompare(b.termo, 'pt-BR'))
    .filter((g) => !t || normalizar(g.termo + ' ' + g.definicao).includes(t))
  return (
    <div>
      <Titulo>Glossário</Titulo>
      <div className="mb-4"><CampoBusca valor={busca} mudar={setBusca} rotulo="Buscar termo" /></div>
      <dl className="m-0 grid gap-2">
        {lista.map((g) => (
          <div key={g.termo} className="bg-panel border border-line rounded-xl p-4">
            <dt className="font-extrabold">{g.termo}</dt>
            <dd className="m-0 text-mute">{g.definicao}</dd>
          </div>
        ))}
      </dl>
      {!lista.length && <p className="text-mute">Nenhum termo encontrado.</p>}
    </div>
  )
}
