import { Route, Routes } from 'react-router-dom'
import Indice from './Indice'
import Mapa from './Mapa'
import Produtos from './Produtos'
import Glossario from './Glossario'
import Biblioteca from './Biblioteca'
import Quiz from './Quiz'
import { Aplicar, Conceitos, Materiais, Problemas, Quimicas, Regras, Segmentos, Vender } from './Simples'

export default function Conhecimento() {
  return (
    <Routes>
      <Route index element={<Indice />} />
      <Route path="mapa" element={<Mapa />} />
      <Route path="conceitos" element={<Conceitos />} />
      <Route path="quimicas" element={<Quimicas />} />
      <Route path="materiais" element={<Materiais />} />
      <Route path="produtos" element={<Produtos />} />
      <Route path="problemas" element={<Problemas />} />
      <Route path="aplicar" element={<Aplicar />} />
      <Route path="segmentos" element={<Segmentos />} />
      <Route path="vender" element={<Vender />} />
      <Route path="regras" element={<Regras />} />
      <Route path="glossario" element={<Glossario />} />
      <Route path="biblioteca" element={<Biblioteca />} />
      <Route path="quiz" element={<Quiz />} />
    </Routes>
  )
}
