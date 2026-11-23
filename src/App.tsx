import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import RequireAuth from './auth/RequireAuth'
import Layout from './components/Layout'
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import { AreaGuia, AreaProdutos } from './pages/produtos'
import Consulta from './pages/consulta/Consulta'
import Clientes from './pages/clientes/Clientes'
import ClienteForm from './pages/clientes/ClienteForm'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route index element={<Inicio />} />
              <Route path="consulta" element={<Consulta />} />
              <Route path="produtos/*" element={<AreaProdutos />} />
              <Route path="guia/*" element={<AreaGuia />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="clientes/novo" element={<ClienteForm />} />
              <Route path="clientes/:id" element={<ClienteForm />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
