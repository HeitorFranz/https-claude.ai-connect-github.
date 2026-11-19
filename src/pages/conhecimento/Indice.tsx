import { Link } from 'react-router-dom'
import { secoes } from './secoes'

export default function Indice() {
  return (
    <div>
      <h1 className="text-3xl mb-1">Conhecimento</h1>
      <p className="text-mute mb-5">Tudo para estudar a linha Unipega.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {secoes.map((s, i) => (
          <Link key={s.slug} to={s.slug} className="no-underline text-ink bg-panel border border-line rounded-xl p-4 hover:border-red grid gap-1">
            <span className="text-xs font-bold text-red">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-extrabold text-lg leading-tight">{s.titulo}</span>
            <span className="text-sm text-mute">{s.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
