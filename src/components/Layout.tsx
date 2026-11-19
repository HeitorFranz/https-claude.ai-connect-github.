import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

const abas = [
  { to: '/', label: 'Início', end: true },
  { to: '/conhecimento', label: 'Conhecimento' },
  { to: '/consulta', label: 'Consulta' },
]

export default function Layout() {
  const { sair } = useAuth()
  return (
    <div className="min-h-dvh flex flex-col overflow-x-clip">
      <header className="bg-red text-white">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link to="/" className="text-white no-underline font-extrabold text-lg tracking-tight">Consulta UNIPEGA</Link>
          <span className="text-sm opacity-85">· Maper</span>
          <button onClick={sair} className="ml-auto text-sm font-medium px-3 h-9 rounded-full border border-white/50">Sair</button>
        </div>
      </header>
      <main className="flex-1 min-w-0 w-full max-w-5xl mx-auto px-4 py-6 pb-24">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 inset-x-0 bg-panel border-t border-line">
        <div className="max-w-5xl mx-auto grid grid-cols-3">
          {abas.map((a) => (
            <NavLink key={a.to} to={a.to} end={a.end}
              className={({ isActive }) => `h-14 grid place-items-center no-underline text-sm font-bold ${isActive ? 'text-red' : 'text-mute'}`}>
              {a.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
