import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function RequireAuth() {
  const { session, carregando } = useAuth()
  const local = useLocation()
  if (carregando) return <p className="p-6 text-mute">Carregando…</p>
  if (!session) return <Navigate to="/login" replace state={{ de: local.pathname + local.search }} />
  return <Outlet />
}
