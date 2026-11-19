import { useParams } from 'react-router-dom'
import { produtoPorId } from '../../lib/dados'
import ProdutoDetalhe from '../../components/ProdutoDetalhe'
import { Titulo } from '../../components/ui'

export default function Produto() {
  const { id = '' } = useParams()
  const p = produtoPorId.get(id)
  if (!p) return <Titulo>Produto não encontrado</Titulo>
  return (
    <div>
      <Titulo sub={p.o_que_e}>{p.nome}</Titulo>
      <p className="-mt-3 mb-5 text-xs font-bold text-red uppercase">{p.familia}</p>
      <ProdutoDetalhe p={p} />
    </div>
  )
}
