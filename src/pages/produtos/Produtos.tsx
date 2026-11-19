import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { familias, normalizar, produtos } from '../../lib/dados'
import { CampoBusca, Chip } from '../../components/ui'
import { secoes } from './secoes'

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
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div>
        <h1 className="text-3xl mb-1">Produtos</h1>
        <p className="text-mute m-0">Tudo sobre cada produto Unipega: onde usar, como aplicar, cuidados e materiais do Drive.</p>
      </div>

      <section aria-labelledby="guia">
        <h2 id="guia" className="text-sm font-bold uppercase tracking-wide text-mute mb-2">Guia técnico</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scroll-px-4 snap-x">
          {secoes.map((s) => (
            <Link key={s.slug} to={s.slug}
              className="snap-start shrink-0 w-40 no-underline text-ink bg-panel border border-line rounded-xl p-3 grid gap-1 hover:border-red transition-colors duration-150">
              <s.icone size={20} className="text-red" aria-hidden />
              <span className="font-bold leading-tight">{s.titulo}</span>
              <span className="text-xs text-mute leading-snug">{s.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[minmax(0,1fr)] gap-3">
        <CampoBusca valor={busca} mudar={(v) => atualizar('q', v)} rotulo="Buscar produto, uso ou material" />
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          <Chip ativo={!familia} onClick={() => atualizar('familia', '')}>Todas</Chip>
          {familias.map((f) => <Chip key={f} ativo={familia === f} onClick={() => atualizar('familia', familia === f ? '' : f)}>{f}</Chip>)}
        </div>
        <p className="text-sm text-mute m-0" aria-live="polite">{lista.length} produto{lista.length === 1 ? '' : 's'}</p>
        <ul className="list-none p-0 m-0 grid gap-2 sm:grid-cols-2">
          {lista.map((p) => (
            <li key={p.id}>
              <Link to={`p/${p.id}`} className="no-underline text-ink bg-panel border border-line rounded-xl p-4 flex items-center gap-3 hover:border-red transition-colors duration-150 h-full">
                <span className="grid gap-0.5 flex-1">
                  <span className="text-xs font-bold text-red uppercase">{p.familia}</span>
                  <span className="font-extrabold text-lg leading-tight">{p.nome}</span>
                  <span className="text-sm text-mute">{p.o_que_e}</span>
                </span>
                <ChevronRight size={20} className="text-mute shrink-0" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        {!lista.length && <p className="text-mute">Nenhum produto encontrado. Tente a <Link to="/consulta">Consulta UNIPEGA</Link> descrevendo o que o cliente precisa.</p>}
      </section>
    </div>
  )
}
