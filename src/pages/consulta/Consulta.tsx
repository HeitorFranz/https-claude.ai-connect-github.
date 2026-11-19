import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AlertTriangle, ChevronRight, Search } from 'lucide-react'
import { alertaPlastico, buscar } from '../../lib/buscar'
import ProdutoDetalhe from '../../components/ProdutoDetalhe'

const exemplos = ['calha de zinco vazando', 'colar espelho na parede', 'parafuso enferrujado travado', 'box do banheiro', 'vedar aquário']

export default function Consulta() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const [texto, setTexto] = useState(q)
  const alerta = alertaPlastico(q)
  const resultados = useMemo(() => (alertaPlastico(q) ? [] : buscar(q)), [q])
  const [melhor, ...outros] = resultados

  function enviar(e: FormEvent) {
    e.preventDefault()
    setParams(texto.trim() ? { q: texto.trim() } : {})
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div>
        <h1 className="text-3xl mb-1">Consultar UNIPEGA</h1>
        <p className="text-mute m-0">Digite o nome do produto ou descreva o que o cliente precisa.</p>
      </div>

      <form onSubmit={enviar} role="search" className="grid grid-cols-[minmax(0,1fr)] gap-2">
        <label htmlFor="consulta" className="text-sm font-bold">O que o cliente pediu?</label>
        <div className="flex gap-2">
          <input id="consulta" type="search" value={texto} onChange={(e) => setTexto(e.target.value)} enterKeyHint="search"
            placeholder="Ex.: calha de zinco vazando no sol"
            className="flex-1 min-w-0 h-12 px-3 rounded-lg border border-line bg-panel text-base" />
          <button className="h-12 px-4 rounded-lg bg-red text-white font-bold cursor-pointer flex items-center gap-2 transition-opacity duration-150 hover:opacity-90">
            <Search size={18} aria-hidden /> Buscar
          </button>
        </div>
      </form>

      {!q && (
        <div className="flex gap-2 flex-wrap">
          {exemplos.map((ex) => (
            <button key={ex} type="button" onClick={() => { setTexto(ex); setParams({ q: ex }) }}
              className="min-h-11 px-4 rounded-full border border-line bg-panel text-sm cursor-pointer hover:border-red transition-colors duration-150">{ex}</button>
          ))}
        </div>
      )}

      {alerta && (
        <div role="alert" className="bg-redbg border-2 border-no rounded-2xl p-4 flex gap-3">
          <AlertTriangle size={24} className="text-no shrink-0" aria-hidden />
          <p className="m-0 font-bold">{alerta}</p>
        </div>
      )}

      {q && !melhor && !alerta && (
        <p className="text-mute" aria-live="polite">Nenhum produto encontrado para “{q}”. Tente outras palavras, como o material (vidro, concreto, metal) ou o que precisa fazer (vedar, colar, limpar).</p>
      )}

      {melhor && (
        <section aria-live="polite" className="grid grid-cols-[minmax(0,1fr)] gap-4">
          <div className="bg-panel border-2 border-red rounded-2xl p-4 grid gap-2">
            <span className="text-xs font-bold text-red uppercase tracking-wide">Mais indicado</span>
            <h2 className="text-2xl m-0">{melhor.produto.nome}</h2>
            <p className="m-0 text-mute">{melhor.produto.o_que_e}</p>
            {melhor.motivos.length > 0 && <p className="m-0 text-sm"><b>Por quê:</b> {melhor.motivos.slice(0, 4).join(' · ')}</p>}
            {melhor.alertas.map((a) => (
              <p key={a} className="m-0 text-sm text-no flex gap-2"><AlertTriangle size={16} className="shrink-0 mt-0.5" aria-hidden />{a}</p>
            ))}
            <Link to={`/produtos/p/${melhor.produto.id}`} className="text-sm font-bold">Abrir na página de Produtos</Link>
          </div>
          <ProdutoDetalhe p={melhor.produto} />
        </section>
      )}

      {outros.length > 0 && (
        <section>
          <h2 className="text-xl mb-2">Outras opções</h2>
          <ul className="list-none p-0 m-0 grid gap-2">
            {outros.slice(0, 8).map((r) => (
              <li key={r.produto.id}>
                <button type="button" onClick={() => { setTexto(r.produto.nome); setParams({ q: r.produto.nome }); window.scrollTo({ top: 0 }) }}
                  className="w-full text-left bg-panel border border-line rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-red transition-colors duration-150">
                  <span className="grid gap-0.5 flex-1">
                    <span className="font-extrabold">{r.produto.nome}</span>
                    <span className="text-sm text-mute">{r.produto.o_que_e}</span>
                    {r.alertas.length > 0 && <span className="text-xs text-no font-bold">Atenção: tem restrição para o que foi pedido</span>}
                  </span>
                  <ChevronRight size={20} className="text-mute shrink-0" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
