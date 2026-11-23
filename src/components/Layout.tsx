import { Link, NavLink, Outlet } from 'react-router-dom'
import { BookOpen, LogOut, Package, Search } from 'lucide-react'
import { useAuth } from '../auth/AuthProvider'

const abas = [
  { to: '/consulta', label: 'Consultar', Icone: Search },
  { to: '/produtos', label: 'Produtos', Icone: Package },
  { to: '/guia', label: 'Guia técnico', Icone: BookOpen },
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
  return (
    <div className="min-h-dvh flex flex-col overflow-x-clip">
      <header className="bg-bar text-bar-ink sticky top-0 z-20 shadow-[0_1px_0_rgba(255,255,255,0.06)]">
        <div className="pagina h-14 flex items-center gap-[clamp(1rem,3vw,2.5rem)]">
          <Marca />
          <nav aria-label="Principal" className="hidden sm:flex h-full items-stretch gap-1">
            {abas.map(({ to, label, Icone }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => `relative px-3 flex items-center gap-2 no-underline text-sm font-bold transition-colors duration-150 ${isActive ? 'text-white after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-t after:bg-red' : 'text-bar-ink/65 hover:text-white'}`}>
                <Icone size={17} aria-hidden />{label}
              </NavLink>
            ))}
          </nav>
          <button onClick={sair} aria-label="Sair"
            className="ml-auto h-10 px-3 rounded-lg flex items-center gap-2 text-sm font-bold text-bar-ink/80 cursor-pointer hover:bg-white/10 hover:text-white transition-colors duration-150">
            <LogOut size={18} aria-hidden /><span className="hidden sm:inline">Sair</span>
          </button>
        </div>
        <nav aria-label="Principal" className="sm:hidden grid grid-cols-3 border-t border-white/10">
          {abas.map(({ to, label, Icone }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `relative h-12 flex items-center justify-center gap-1.5 no-underline text-[13px] font-bold ${isActive ? 'text-white after:absolute after:inset-x-4 after:bottom-0 after:h-[3px] after:rounded-t after:bg-red' : 'text-bar-ink/60'}`}>
              <Icone size={16} aria-hidden />{label}
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
