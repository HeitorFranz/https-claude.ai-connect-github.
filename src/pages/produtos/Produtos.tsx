import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { boletinsDoProduto, cor, familias, normalizar, produtos } from '../../lib/dados'
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

  const grupos = familias.filter((f) => lista.some((p) => p.familia === f))

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
      <Titulo sub="Onde usar, como aplicar, dados técnicos e materiais do Drive de cada produto.">Produtos</Titulo>
      <div className="grid gap-3 -mt-3">
        <CampoBusca valor={busca} mudar={(v) => atualizar('q', v)} rotulo="Buscar por nome, uso ou material" />
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scroll-px-4">
          <Chip ativo={!familia} onClick={() => atualizar('familia', '')}>Todas</Chip>
          {familias.map((f) => <Chip key={f} cor={cor(f)} ativo={familia === f} onClick={() => atualizar('familia', familia === f ? '' : f)}>{f}</Chip>)}
        </div>
      </div>

      {!lista.length && (
        <p className="text-mute m-0">Nenhum produto com “{busca}”. Descreva o pedido na <Link to={`/consulta?q=${encodeURIComponent(busca)}`}>Consulta</Link> que o app encontra o produto certo.</p>
      )}

      {grupos.map((g) => (
        <section key={g} className="grid gap-2">
          <h2 className="text-lg flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: cor(g) }} aria-hidden />{g}
            <span className="text-mute text-sm font-bold">{lista.filter((p) => p.familia === g).length}</span>
          </h2>
          <ul className="list-none p-0 m-0 bg-panel border border-line rounded-2xl divide-y divide-line overflow-hidden">
            {lista.filter((p) => p.familia === g).map((p) => (
              <li key={p.id}>
                <Link to={`p/${p.id}`} className="no-underline text-ink flex items-center gap-3 px-4 py-3.5 hover:bg-bg transition-colors duration-150">
                  <span className="grid flex-1 min-w-0">
                    <span className="font-extrabold leading-tight">{p.nome}</span>
                    <span className="text-sm text-mute truncate">{p.o_que_e}</span>
                  </span>
                  {boletinsDoProduto(p.id).length > 0 && <span className="hidden sm:inline text-xs font-bold text-mute border border-line rounded-full px-2 py-0.5">boletim</span>}
                  <ChevronRight size={20} className="text-mute shrink-0" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
