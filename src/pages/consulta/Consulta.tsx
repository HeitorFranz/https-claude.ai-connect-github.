import { useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertTriangle, Ban, ChevronDown, Info, Search, SlidersHorizontal, X } from 'lucide-react'
import { filtrosVazios, OPCOES, recomendar, type Filtros, type Grupo, type Recomendado } from '../../lib/recomendar'
import ProdutoDetalhe, { CabecalhoProduto } from '../../components/ProdutoDetalhe'
import { cor } from '../../lib/dados'

const TITULOS: Record<Grupo, string> = { funcoes: 'O que precisa fazer', materiais: 'Material / superfície', ambientes: 'Ambiente', exigencias: 'Exigências' }
const SELOS = ['Melhor opção', 'Alternativa', 'Também serve']
const exemplos = ['calha de zinco vazando no sol', 'colar espelho na parede', 'parafuso enferrujado travado', 'box do banheiro sem aparecer', 'montar aquário', 'junta do motor']

function Cartao({ r, selo, ativo, escolher, destaque }: { r: Recomendado; selo: string; ativo: boolean; escolher: () => void; destaque: boolean }) {
  return (
    <button type="button" onClick={escolher} aria-pressed={ativo}
      className={`w-full text-left rounded-2xl bg-panel grid cursor-pointer border-2 overflow-hidden transition-colors duration-150 ${ativo ? 'border-ink' : 'border-line hover:border-mute'}`}>
      <span className={`px-4 py-1.5 text-sm font-extrabold ${destaque ? 'bg-yel text-[#1d2329]' : 'bg-bg text-mute'}`}>{selo}</span>
      <span className="p-4 grid gap-1.5">
        <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: cor(r.produto.familia) }}>
          <span className="w-2 h-2 rounded-full" style={{ background: cor(r.produto.familia) }} aria-hidden />{r.produto.familia}
        </span>
        <span className="text-xl font-extrabold leading-tight">{r.produto.nome}</span>
        <span className="text-sm text-mute">{r.produto.o_que_e}</span>
        {r.porque.length > 0 && (
          <span className="flex flex-wrap gap-1 mt-1">
            {r.porque.slice(0, 5).map((m) => <span key={m} className="text-xs font-bold bg-okbg text-ok rounded-full px-2 py-0.5">{m.replace(/^resolve: /, '')}</span>)}
          </span>
        )}
        {r.atencao.map((a) => (
          <span key={a} className="text-sm text-no flex gap-1.5"><AlertTriangle size={16} className="shrink-0 mt-0.5" aria-hidden />{a}</span>
        ))}
      </span>
    </button>
  )
}

export default function Consulta() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const [texto, setTexto] = useState(q)
  const [escolhidos, setEscolhidos] = useState<Filtros>(filtrosVazios)
  const [abrirFiltros, setAbrirFiltros] = useState(false)
  const [selecionado, setSelecionado] = useState<string | null>(null)

  const resposta = useMemo(() => recomendar(q, escolhidos), [q, escolhidos])
  const algumFiltro = Object.values(escolhidos).some((v) => v.length)
  const pesquisou = q.trim().length > 0 || algumFiltro
  const { resultados, excluidos, alertas, filtros } = resposta
  const ativo = resultados.find((r) => r.produto.id === selecionado) ?? resultados[0]

  function enviar(e: FormEvent) {
    e.preventDefault()
    setSelecionado(null)
    setParams(texto.trim() ? { q: texto.trim() } : {})
  }
  function alternar(g: Grupo, v: string) {
    setSelecionado(null)
    setEscolhidos((f) => ({ ...f, [g]: f[g].includes(v) ? f[g].filter((x) => x !== v) : [...f[g], v] }))
  }
  function limpar() {
    setTexto('')
    setEscolhidos(filtrosVazios())
    setSelecionado(null)
    setParams({})
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
      <div className="grid gap-1.5">
        <h1 className="t-titulo">Consultar</h1>
        <p className="text-mute m-0">Digite o nome do produto ou descreva o que o cliente precisa.</p>
      </div>

      <form onSubmit={enviar} role="search" className="grid grid-cols-[minmax(0,1fr)] gap-2">
        <label htmlFor="consulta" className="sr-only">O que o cliente pediu?</label>
        <div className="flex gap-2">
          <input id="consulta" type="search" value={texto} onChange={(e) => setTexto(e.target.value)} enterKeyHint="search"
            placeholder="Ex.: calha de zinco vazando no sol"
            className="flex-1 min-w-0 h-12 px-4 rounded-xl border border-line bg-panel text-base outline-none focus:border-ink" />
          <button className="h-12 px-5 rounded-xl bg-red text-white font-extrabold cursor-pointer flex items-center gap-2 transition-opacity duration-150 hover:opacity-90">
            <Search size={18} aria-hidden /> Buscar
          </button>
        </div>
      </form>

      <section className="bg-panel border border-line rounded-2xl">
        <button type="button" onClick={() => setAbrirFiltros((v) => !v)} aria-expanded={abrirFiltros}
          className="w-full min-h-12 px-4 flex items-center gap-2 font-bold cursor-pointer">
          <SlidersHorizontal size={18} aria-hidden /> Filtros
          {Object.values(filtros).flat().length > 0 && <span className="text-xs bg-ink text-panel rounded-full px-2 py-0.5">{Object.values(filtros).flat().length}</span>}
          <ChevronDown size={18} className={`ml-auto transition-transform duration-150 ${abrirFiltros ? 'rotate-180' : ''}`} aria-hidden />
        </button>
        {abrirFiltros && (
          <div className="px-4 pb-4 grid gap-4 border-t border-line pt-4">
            <p className="m-0 text-xs text-mute flex gap-1.5"><Info size={14} className="shrink-0 mt-0.5" aria-hidden />Os filtros tracejados em amarelo foram entendidos do texto. Toque para marcar outros.</p>
            {(Object.keys(OPCOES) as Grupo[]).map((g) => (
              <fieldset key={g} className="m-0 p-0 border-0 grid gap-2">
                <legend className="text-sm font-bold mb-2">{TITULOS[g]}</legend>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(OPCOES[g]).map(([v, nome]) => {
                    const marcado = escolhidos[g].includes(v)
                    const detectado = !marcado && filtros[g].includes(v)
                    return (
                      <button key={v} type="button" onClick={() => alternar(g, v)} aria-pressed={marcado}
                        className={`min-h-10 px-3 rounded-full border text-sm font-medium cursor-pointer transition-colors duration-150 ${marcado ? 'bg-ink text-panel border-ink' : detectado ? 'border-ink border-dashed bg-yelbg' : 'border-line bg-panel hover:border-ink'}`}>
                        {nome}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        )}
      </section>

      {!pesquisou && (
        <div className="flex gap-2 flex-wrap">
          {exemplos.map((ex) => (
            <button key={ex} type="button" onClick={() => { setTexto(ex); setParams({ q: ex }) }}
              className="min-h-11 px-4 rounded-full border border-line bg-panel text-sm cursor-pointer hover:border-red transition-colors duration-150">{ex}</button>
          ))}
        </div>
      )}

      {pesquisou && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-mute" aria-live="polite">{resultados.length} produto{resultados.length === 1 ? '' : 's'} indicado{resultados.length === 1 ? '' : 's'}</span>
          <button type="button" onClick={limpar} className="ml-auto min-h-10 px-3 rounded-lg flex items-center gap-1 font-bold cursor-pointer hover:bg-panel"><X size={16} aria-hidden />Limpar</button>
        </div>
      )}

      {alertas.map((a) => (
        <div key={a} role="alert" className="bg-redbg border-2 border-no rounded-2xl p-4 flex gap-3">
          <AlertTriangle size={24} className="text-no shrink-0" aria-hidden />
          <p className="m-0 font-bold">{a}</p>
        </div>
      ))}

      {pesquisou && !resultados.length && !alertas.length && (
        <p className="text-mute">Nada encontrado. Tente o material (vidro, concreto, metal) ou o que precisa fazer (vedar, colar, limpar), ou marque nos filtros.</p>
      )}

      {resultados.length > 0 && (
        <section aria-label="Produtos indicados" className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))]">
          {resultados.slice(0, 3).map((r, i) => (
            <Cartao key={r.produto.id} r={r} selo={SELOS[i]} destaque={i === 0} ativo={ativo?.produto.id === r.produto.id} escolher={() => setSelecionado(r.produto.id)} />
          ))}
        </section>
      )}

      {resultados.length > 3 && (
        <details className="bg-panel border border-line rounded-xl px-4">
          <summary className="cursor-pointer min-h-12 flex items-center font-bold">Outras opções ({resultados.length - 3})</summary>
          <ul className="list-none p-0 m-0 pb-3 grid gap-1">
            {resultados.slice(3, 15).map((r) => (
              <li key={r.produto.id}>
                <button type="button" onClick={() => { setSelecionado(r.produto.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="w-full text-left min-h-11 px-2 rounded-lg cursor-pointer hover:bg-bg">
                  <b>{r.produto.nome}</b> <span className="text-mute text-sm">— {r.produto.o_que_e}</span>
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}

      {excluidos.length > 0 && (
        <details className="bg-panel border border-line rounded-xl px-4">
          <summary className="cursor-pointer min-h-12 flex items-center gap-2 font-bold text-no"><Ban size={18} aria-hidden />Não use ({excluidos.length})</summary>
          <ul className="list-none p-0 m-0 pb-3 grid gap-1 text-sm">
            {excluidos.slice(0, 30).map((e) => <li key={e.produto.id} className="py-1"><b>{e.produto.nome}:</b> <span className="text-mute">{e.motivo}</span></li>)}
          </ul>
        </details>
      )}

      {ativo && (
        <section aria-label="Produto escolhido" className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] gap-[clamp(1rem,2vw,1.5rem)] items-start pt-2">
          <div className="lg:sticky lg:top-20"><CabecalhoProduto p={ativo.produto} nivel={2} /></div>
          <ProdutoDetalhe key={ativo.produto.id} p={ativo.produto} />
        </section>
      )}
    </div>
  )
}
