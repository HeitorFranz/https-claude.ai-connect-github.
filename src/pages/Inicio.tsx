import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function Inicio() {
  const { session } = useAuth()
  const navegar = useNavigate()
  const [busca, setBusca] = useState('')
  const nome = session?.user.email?.split('@')[0] ?? ''

  function buscar(e: FormEvent) {
    e.preventDefault()
    navegar(`/consulta?q=${encodeURIComponent(busca.trim())}`)
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl">Olá{nome ? `, ${nome}` : ''}!</h1>

      <form onSubmit={buscar} role="search" className="flex gap-2">
        <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="O que o cliente pediu?"
          aria-label="Busca rápida" className="flex-1 min-w-0 h-12 px-3 rounded-lg border border-line bg-panel text-base" />
        <button className="h-12 px-4 rounded-lg bg-red text-white font-bold">Consultar</button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/conhecimento" className="no-underline text-ink bg-panel border border-line rounded-2xl p-6 grid gap-2 hover:border-red">
          <span className="text-sm font-bold text-red uppercase tracking-wide">Estudar</span>
          <h2 className="text-2xl">Conhecimento</h2>
          <p className="text-mute">Químicas, materiais, produtos, como aplicar e como vender.</p>
        </Link>
        <Link to="/consulta" className="no-underline text-ink bg-panel border border-line rounded-2xl p-6 grid gap-2 hover:border-red">
          <span className="text-sm font-bold text-red uppercase tracking-wide">Na hora da venda</span>
          <h2 className="text-2xl">Consulta</h2>
          <p className="text-mute">O cliente pediu algo? Descubra qual produto indicar.</p>
        </Link>
      </div>

      <section>
        <h2 className="text-xl mb-2">Consultas recentes</h2>
        <p className="text-mute text-sm">O histórico aparece aqui depois que a Consulta estiver pronta.</p>
      </section>
    </div>
  )
}
