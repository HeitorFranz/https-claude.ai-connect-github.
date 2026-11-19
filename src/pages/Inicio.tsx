import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Search } from 'lucide-react'

const opcoes = [
  { to: '/consulta', titulo: 'Consultar UNIPEGA', texto: 'Busque pelo nome ou descreva o que o cliente precisa e veja o produto certo.', Icone: Search, destaque: true },
  { to: '/produtos', titulo: 'Produtos', texto: 'Base de conhecimento: onde usar, como aplicar, cuidados, vídeos e fotos.', Icone: BookOpen, destaque: false },
]

export default function Inicio() {
  return (
    <div className="min-h-[calc(100dvh-10rem)] grid content-center gap-4 max-w-xl mx-auto w-full">
      <h1 className="text-3xl mb-2">O que você quer fazer?</h1>
      {opcoes.map(({ to, titulo, texto, Icone, destaque }) => (
        <Link key={to} to={to}
          className={`no-underline rounded-2xl p-6 grid grid-cols-[auto_1fr_auto] items-center gap-4 border-2 transition-colors duration-150 ${destaque ? 'bg-red text-white border-red hover:opacity-95' : 'bg-panel text-ink border-line hover:border-red'}`}>
          <span className={`w-14 h-14 rounded-xl grid place-items-center ${destaque ? 'bg-white/15' : 'bg-redbg text-red'}`}><Icone size={28} aria-hidden /></span>
          <span className="grid gap-1">
            <span className="text-2xl font-extrabold leading-tight">{titulo}</span>
            <span className={`text-sm ${destaque ? 'text-white/85' : 'text-mute'}`}>{texto}</span>
          </span>
          <ArrowRight size={24} aria-hidden />
        </Link>
      ))}
    </div>
  )
}
