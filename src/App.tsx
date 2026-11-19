import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import RequireAuth from './auth/RequireAuth'
import Layout from './components/Layout'
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import EmBreve from './pages/EmBreve'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route index element={<Inicio />} />
              <Route path="conhecimento/*" element={<EmBreve titulo="Conhecimento" />} />
              <Route path="consulta" element={<EmBreve titulo="Consulta" />} />
              <Route path="produto/:id" element={<EmBreve titulo="Produto" />} />
              <Route path="*" element={<EmBreve titulo="Página não encontrada" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
