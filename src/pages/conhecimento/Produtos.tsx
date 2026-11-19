import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { familias, normalizar, produtos } from '../../lib/dados'
import { CampoBusca, Chip, Titulo } from '../../components/ui'

export default function Produtos() {
  const [params, setParams] = useSearchParams()
  const busca = params.get('q') ?? ''
  const familia = params.get('familia') ?? ''

  function atualizar(chave: string, valor: string) {
    const p = new URLSearchParams(params)
    if (valor) p.set(chave, valor)
    else p.delete(chave)
    setParams(p, { replace: true })
  }

  const lista = useMemo(() => {
    const termos = normalizar(busca).split(/\s+/).filter(Boolean)
    return produtos.filter((p) => {
      if (familia && p.familia !== familia) return false
      if (!termos.length) return true
      const alvo = normalizar([p.nome, p.familia, p.o_que_e, p.usar_em, p.termos_busca.join(' ')].join(' '))
      return termos.every((t) => alvo.includes(t))
    })
  }, [busca, familia])

  return (
    <div>
      <Titulo>Produtos</Titulo>
      <div className="grid gap-3 mb-4">
        <CampoBusca valor={busca} mudar={(v) => atualizar('q', v)} rotulo="Buscar produto, uso ou material" />
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          <Chip ativo={!familia} onClick={() => atualizar('familia', '')}>Todas</Chip>
          {familias.map((f) => <Chip key={f} ativo={familia === f} onClick={() => atualizar('familia', familia === f ? '' : f)}>{f}</Chip>)}
        </div>
      </div>
      <p className="text-sm text-mute mb-2">{lista.length} produto{lista.length === 1 ? '' : 's'}</p>
      <ul className="list-none p-0 m-0 grid gap-3 sm:grid-cols-2">
        {lista.map((p) => (
          <li key={p.id}>
            <Link to={`/produto/${p.id}`} className="no-underline text-ink bg-panel border border-line rounded-xl p-4 grid gap-1 hover:border-red h-full">
              <span className="text-xs font-bold text-red uppercase">{p.familia}</span>
              <span className="font-extrabold text-lg leading-tight">{p.nome}</span>
              <span className="text-sm text-mute">{p.o_que_e}</span>
            </Link>
          </li>
        ))}
      </ul>
      {!lista.length && <p className="text-mute">Nenhum produto encontrado.</p>}
    </div>
  )
}
