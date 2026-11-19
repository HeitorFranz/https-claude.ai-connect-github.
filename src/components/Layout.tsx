import { Link, Outlet, useLocation } from 'react-router-dom'
import { House, LogOut } from 'lucide-react'
import { useAuth } from '../auth/AuthProvider'

export default function Layout() {
  const { sair } = useAuth()
  const { pathname } = useLocation()
  const area = pathname.startsWith('/consulta') ? 'Consultar UNIPEGA' : pathname.startsWith('/produtos') ? 'Produtos' : null

  return (
    <div className="min-h-dvh flex flex-col overflow-x-clip">
      <header className="bg-red text-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-2">
          {area ? (
            <Link to="/" aria-label="Voltar ao início" className="text-white w-11 h-11 -ml-2 grid place-items-center rounded-lg hover:bg-white/10 transition-colors duration-150"><House size={22} /></Link>
          ) : null}
          <Link to="/" className="text-white no-underline font-extrabold text-lg tracking-tight truncate">{area ?? 'Consulta UNIPEGA'}</Link>
          {!area && <span className="text-sm opacity-85">· Maper</span>}
          <button onClick={sair} className="ml-auto text-sm font-medium px-3 h-11 rounded-full flex items-center gap-1.5 cursor-pointer hover:bg-white/10 transition-colors duration-150">
            <LogOut size={18} aria-hidden /> Sair
          </button>
        </div>
      </header>
      <main className="flex-1 min-w-0 w-full max-w-5xl mx-auto px-4 py-6 pb-16">
        <Outlet />
      </main>
    </div>
  )
}
