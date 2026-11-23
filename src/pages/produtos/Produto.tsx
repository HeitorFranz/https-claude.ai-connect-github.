import { useParams } from 'react-router-dom'
import { produtoPorId } from '../../lib/dados'
import ProdutoDetalhe, { CabecalhoProduto } from '../../components/ProdutoDetalhe'
import { Titulo, Voltar } from '../../components/ui'

export default function Produto() {
  const { id = '' } = useParams()
  const p = produtoPorId.get(id)
  if (!p) return <Titulo voltar="/produtos" sub="Volte para a lista e escolha outro produto.">Produto não encontrado</Titulo>
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <Voltar para="/produtos" rotulo="Todos os produtos" />
      <CabecalhoProduto p={p} />
      <ProdutoDetalhe key={p.id} p={p} />
    </div>
  )
}
