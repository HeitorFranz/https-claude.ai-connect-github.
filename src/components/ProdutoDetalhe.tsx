import { Link } from 'react-router-dom'
import { Ban, CheckCircle2, Package } from 'lucide-react'
import { arquivosDoProduto, conhecimento, fichasDoProduto, normalizar, produtos, type Ficha, type Produto } from '../lib/dados'
import ArquivosRelacionados from './ArquivosRelacionados'
import { Cartao } from './ui'

const rotulosFicha: Record<string, string> = {
  pelicula_min: 'Formação de película (min)',
  cura_mm_24h: 'Cura (mm em 24 h)',
  densidade: 'Densidade (g/cm³)',
  shore_a: 'Dureza Shore A',
  ruptura_mpa: 'Resistência à ruptura (MPa)',
  alongamento_pct: 'Alongamento (%)',
  aplicacao_c: 'Temperatura de aplicação (°C)',
  resistencia_c: 'Resistência térmica (°C)',
  cores: 'Cores',
  pintavel: 'Pintável',
  material: 'Material',
  obs: 'Observação',
}

function valorFicha(v: Ficha[string]) {
  if (v === null || v === undefined) return '—'
  if (typeof v === 'boolean') return v ? 'Sim' : 'Não'
  if (Array.isArray(v)) return v.join(', ')
  return String(v)
}

/** Passo a passo de "Como aplicar" cujo título bate com o nome/família do produto. */
function comoAplicarDo(p: Produto) {
  const alvo = normalizar(p.nome + ' ' + p.familia)
  return conhecimento.como_aplicar.filter((c) => {
    const palavras = normalizar(c.titulo).split(/[^a-z0-9]+/).filter((w) => w.length > 3)
    return palavras.some((w) => alvo.includes(w))
  })
}

/** Problemas cuja solução cita este produto. */
function problemasDo(p: Produto) {
  const nome = normalizar(p.nome.split(/[/(]/)[0].trim())
  return conhecimento.problema_solucao.filter((x) => normalizar(x.vender).includes(nome))
}

export default function ProdutoDetalhe({ p }: { p: Produto }) {
  const fichas = fichasDoProduto(p.id)
  const arqs = arquivosDoProduto(p)
  const aplicar = comoAplicarDo(p)
  const problemas = problemasDo(p)
  const mesmaFamilia = produtos.filter((x) => x.familia === p.familia && x.id !== p.id)

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <Cartao>
          <h3 className="text-lg text-ok mb-1 flex items-center gap-2"><CheckCircle2 size={20} aria-hidden />Onde usar</h3>
          <p className="m-0">{p.usar_em}</p>
        </Cartao>
        <Cartao>
          <h3 className="text-lg text-no mb-1 flex items-center gap-2"><Ban size={20} aria-hidden />Não usar</h3>
          <p className="m-0">{p.nao_usar}</p>
        </Cartao>
        <Cartao className="sm:col-span-2">
          <h3 className="text-lg mb-1 flex items-center gap-2"><Package size={20} aria-hidden />Embalagens e cores</h3>
          <p className="m-0">{p.embalagens}</p>
        </Cartao>
      </div>

      {aplicar.map((c) => (
        <section key={c.titulo}>
          <h3 className="text-xl mb-2">Como aplicar — {c.titulo}</h3>
          <ol className="m-0 pl-5 grid gap-1 bg-panel border border-line rounded-xl py-4 pr-4">{c.passos.map((s) => <li key={s}>{s}</li>)}</ol>
        </section>
      ))}

      {problemas.length > 0 && (
        <section>
          <h3 className="text-xl mb-2">Problemas que ele resolve</h3>
          <div className="grid gap-2">
            {problemas.map((x) => (
              <Cartao key={x.cliente_diz}><p className="m-0 font-bold">{x.cliente_diz}</p><p className="m-0 mt-1 text-mute">{x.porque}</p></Cartao>
            ))}
          </div>
        </section>
      )}

      {fichas.map(([nome, f]) => (
        <section key={nome}>
          <h3 className="text-xl mb-2">Ficha técnica{fichas.length > 1 ? ` — ${nome}` : ''}</h3>
          <dl className="m-0 bg-panel border border-line rounded-xl divide-y divide-line">
            {Object.entries(f).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-2">
                <dt className="text-mute">{rotulosFicha[k] ?? k}</dt>
                <dd className="m-0 font-bold text-right">{valorFicha(v)}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <section>
        <h3 className="text-xl mb-2">Vídeos, fotos e materiais</h3>
        <ArquivosRelacionados lista={arqs} />
      </section>

      {mesmaFamilia.length > 0 && (
        <section>
          <h3 className="text-xl mb-2">Mesma família</h3>
          <div className="flex gap-2 flex-wrap">
            {mesmaFamilia.map((x) => (
              <Link key={x.id} to={`/produtos/p/${x.id}`} className="no-underline px-4 min-h-11 grid place-items-center rounded-full border border-line bg-panel text-ink text-sm font-medium hover:border-red transition-colors duration-150">{x.nome}</Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
