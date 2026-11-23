import { Route, Routes } from 'react-router-dom'
import Produtos from './Produtos'
import Produto from './Produto'
import Guia from './Guia'
import Mapa from './Mapa'
import Glossario from './Glossario'
import Biblioteca from './Biblioteca'
import { Aplicar, Conceitos, Materiais, Problemas, Quimicas, Regras } from './Simples'

export function AreaProdutos() {
  return (
    <Routes>
      <Route index element={<Produtos />} />
      <Route path="p/:id" element={<Produto />} />
    </Routes>
  )
}

export function AreaGuia() {
  return (
    <Routes>
      <Route index element={<Guia />} />
      <Route path="mapa" element={<Mapa />} />
      <Route path="conceitos" element={<Conceitos />} />
      <Route path="quimicas" element={<Quimicas />} />
      <Route path="materiais" element={<Materiais />} />
      <Route path="problemas" element={<Problemas />} />
      <Route path="aplicar" element={<Aplicar />} />
      <Route path="regras" element={<Regras />} />
      <Route path="glossario" element={<Glossario />} />
      <Route path="biblioteca" element={<Biblioteca />} />
    </Routes>
  )
}
