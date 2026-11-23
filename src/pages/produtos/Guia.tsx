import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Titulo } from '../../components/ui'
import { secoes } from './secoes'

const grupos = [
  { nome: 'Para escolher o produto', slugs: ['mapa', 'problemas', 'materiais', 'quimicas'] },
  { nome: 'Para aplicar certo', slugs: ['aplicar', 'regras'] },
  { nome: 'Para consultar', slugs: ['conceitos', 'glossario', 'biblioteca'] },
]

export default function Guia() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <Titulo sub="O conhecimento técnico que vale para todos os produtos.">Guia técnico</Titulo>
      {grupos.map((g) => (
        <section key={g.nome} className="grid gap-2 -mt-2">
          <h2 className="text-lg">{g.nome}</h2>
          <ul className="list-none p-0 m-0 bg-panel border border-line rounded-2xl divide-y divide-line overflow-hidden">
            {g.slugs.map((slug) => {
              const s = secoes.find((x) => x.slug === slug)!
              return (
                <li key={slug}>
                  <Link to={slug} className="no-underline text-ink flex items-center gap-3 px-4 py-3.5 hover:bg-bg transition-colors duration-150">
                    <span className="w-10 h-10 rounded-lg bg-bg grid place-items-center text-ink shrink-0"><s.icone size={20} aria-hidden /></span>
                    <span className="grid flex-1">
                      <span className="font-extrabold leading-tight">{s.titulo}</span>
                      <span className="text-sm text-mute">{s.desc}</span>
                    </span>
                    <ChevronRight size={20} className="text-mute shrink-0" aria-hidden />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
