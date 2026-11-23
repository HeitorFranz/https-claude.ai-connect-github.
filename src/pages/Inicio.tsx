import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, ChevronRight, Package, Search } from 'lucide-react'
import { cor, familias, produtos } from '../lib/dados'

const exemplos = ['calha de zinco vazando', 'colar espelho', 'box do banheiro', 'parafuso travado']

export default function Inicio() {
  const navegar = useNavigate()
  const [texto, setTexto] = useState('')
  const consultar = (q: string) => navegar(q.trim() ? `/consulta?q=${encodeURIComponent(q.trim())}` : '/consulta')
  const enviar = (e: FormEvent) => { e.preventDefault(); consultar(texto) }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5 max-w-3xl mx-auto">
      <section className="bg-bar text-bar-ink rounded-2xl p-5 sm:p-7 grid gap-4">
        <div className="grid gap-1.5">
          <h1 className="text-[28px] sm:text-[36px] text-white">O que o cliente precisa?</h1>
          <p className="m-0 text-bar-ink/70">Escreva o pedido como ele falou. O app indica o produto e mostra o que não usar.</p>
        </div>
        <form onSubmit={enviar} role="search" className="flex gap-2">
          <input value={texto} onChange={(e) => setTexto(e.target.value)} type="search" enterKeyHint="search" aria-label="Pedido do cliente"
            placeholder="Ex.: calha de zinco vazando no sol"
            className="flex-1 min-w-0 h-13 px-4 rounded-xl bg-white text-[#1d2329] text-base outline-none focus:ring-2 focus:ring-red" />
          <button className="h-13 px-5 rounded-xl bg-red text-white font-extrabold cursor-pointer flex items-center gap-2 hover:brightness-110 transition duration-150">
            <Search size={19} aria-hidden /><span className="hidden sm:inline">Consultar</span>
          </button>
        </form>
        <div className="flex gap-2 flex-wrap">
          {exemplos.map((ex) => (
            <button key={ex} type="button" onClick={() => consultar(ex)}
              className="h-9 px-3 rounded-full border border-white/20 text-sm text-bar-ink/85 cursor-pointer hover:border-white/60 hover:text-white transition-colors duration-150">{ex}</button>
          ))}
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/produtos" className="no-underline text-ink bg-panel border border-line rounded-2xl p-5 grid gap-3 hover:border-ink transition-colors duration-150">
          <span className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-bg grid place-items-center"><Package size={22} aria-hidden /></span>
            <span className="grid flex-1"><span className="text-xl font-extrabold">Produtos</span><span className="text-sm text-mute">{produtos.length} produtos em {familias.length} famílias</span></span>
            <ChevronRight size={20} className="text-mute" aria-hidden />
          </span>
          <span className="flex gap-1" aria-hidden>{familias.map((f) => <span key={f} className="h-1.5 flex-1 rounded-full" style={{ background: cor(f) }} />)}</span>
        </Link>
        <Link to="/guia" className="no-underline text-ink bg-panel border border-line rounded-2xl p-5 grid gap-3 hover:border-ink transition-colors duration-150">
          <span className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-bg grid place-items-center"><BookOpen size={22} aria-hidden /></span>
            <span className="grid flex-1"><span className="text-xl font-extrabold">Guia técnico</span><span className="text-sm text-mute">Química × material, como aplicar, regras</span></span>
            <ChevronRight size={20} className="text-mute" aria-hidden />
          </span>
        </Link>
      </div>
    </div>
  )
}
