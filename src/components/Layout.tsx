import { Link, NavLink, Outlet } from 'react-router-dom'
import { BookOpen, Calculator, LogOut, Package, Search, Users } from 'lucide-react'
import { useOrcamento } from '../lib/orcamento'
import { useAuth } from '../auth/AuthProvider'

const abas = [
  { to: '/consulta', label: 'Consultar', Icone: Search },
  { to: '/produtos', label: 'Produtos', Icone: Package },
  { to: '/orcamento', label: 'Orçamento', Icone: Calculator },
  { to: '/clientes', label: 'Clientes', Icone: Users },
  { to: '/guia', label: 'Guia', Icone: BookOpen },
]

function Marca() {
  return (
    <Link to="/" className="flex items-center gap-2.5 no-underline text-bar-ink shrink-0" aria-label="Consulta Unipega — início">
      <span className="w-8 h-8 rounded-md bg-red grid place-items-center text-white font-extrabold text-lg leading-none">U</span>
      <span className="leading-tight">
        <span className="block font-extrabold tracking-tight">Consulta Unipega</span>
        <span className="block text-xs text-bar-ink/60">Maper</span>
      </span>
    </Link>
  )
}

export default function Layout() {
  const { sair } = useAuth()
  const { rascunho } = useOrcamento()
  const n = rascunho.linhas.length
  return (
    <div className="min-h-dvh flex flex-col overflow-x-clip">
      <header className="print:hidden bg-bar text-bar-ink sticky top-0 z-20 shadow-[0_1px_0_rgba(255,255,255,0.06)]">
        <div className="pagina h-14 flex items-center gap-[clamp(1rem,3vw,2.5rem)]">
          <Marca />
          <nav aria-label="Principal" className="hidden sm:flex h-full items-stretch gap-1">
            {abas.map(({ to, label, Icone }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => `relative px-3 flex items-center gap-2 no-underline text-sm font-bold transition-colors duration-150 ${isActive ? 'text-white after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-t after:bg-red' : 'text-bar-ink/65 hover:text-white'}`}>
                <Icone size={17} aria-hidden />{label}{to === '/orcamento' && n > 0 && <span className="ml-0.5 min-w-5 h-5 px-1 rounded-full bg-red text-white text-[11px] grid place-items-center">{n}</span>}
              </NavLink>
            ))}
          </nav>
          <button onClick={sair} aria-label="Sair"
            className="ml-auto h-10 px-3 rounded-lg flex items-center gap-2 text-sm font-bold text-bar-ink/80 cursor-pointer hover:bg-white/10 hover:text-white transition-colors duration-150">
            <LogOut size={18} aria-hidden /><span className="hidden sm:inline">Sair</span>
          </button>
        </div>
        <nav aria-label="Principal" className="sm:hidden grid grid-cols-5 border-t border-white/10">
          {abas.map(({ to, label, Icone }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `relative h-13 flex flex-col items-center justify-center gap-0.5 no-underline text-[11px] font-bold ${isActive ? 'text-white after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-t after:bg-red' : 'text-bar-ink/60'}`}>
              <span className="relative"><Icone size={16} aria-hidden />{to === '/orcamento' && n > 0 && <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-0.5 rounded-full bg-red text-white text-[10px] grid place-items-center">{n}</span>}</span>{label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="flex-1 min-w-0 pagina pt-[clamp(1.25rem,3vw,2.5rem)] pb-16">
        <Outlet />
      </main>
    </div>
  )
}
