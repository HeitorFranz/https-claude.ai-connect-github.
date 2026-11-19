import { Link, useParams } from 'react-router-dom'
import { arquivosDoProduto, fichasDoProduto, produtoPorId, produtos, type Ficha } from '../lib/dados'
import ArquivosRelacionados from '../components/ArquivosRelacionados'
import { Cartao, Titulo } from '../components/ui'

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

export default function Produto() {
  const { id = '' } = useParams()
  const p = produtoPorId.get(id)
  if (!p) return <div><Titulo voltar="/conhecimento/produtos">Produto não encontrado</Titulo></div>

  const fichas = fichasDoProduto(p.id)
  const arqs = arquivosDoProduto(p)
  const mesmaFamilia = produtos.filter((x) => x.familia === p.familia && x.id !== p.id)

  return (
    <div className="grid gap-6">
      <div>
        <Titulo voltar="/conhecimento/produtos" sub={p.o_que_e}>{p.nome}</Titulo>
        <span className="inline-block -mt-3 text-xs font-bold text-red uppercase">{p.familia}</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Cartao><h2 className="text-lg text-ok mb-1">Usar em</h2><p className="m-0">{p.usar_em}</p></Cartao>
        <Cartao><h2 className="text-lg text-no mb-1">Não usar</h2><p className="m-0">{p.nao_usar}</p></Cartao>
        <Cartao><h2 className="text-lg mb-1">Embalagens e cores</h2><p className="m-0">{p.embalagens}</p></Cartao>
        <Cartao className="border-yel border-2"><h2 className="text-lg mb-1">Dica de venda</h2><p className="m-0">{p.dica_venda}</p></Cartao>
      </div>

      {fichas.map(([nome, f]) => (
        <section key={nome}>
          <h2 className="text-xl mb-2">Ficha técnica{fichas.length > 1 ? ` — ${nome}` : ''}</h2>
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
        <h2 className="text-xl mb-2">Materiais para enviar</h2>
        <p className="text-sm text-mute mb-3">Vínculo por palavra-chave: pode haver arquivo de outro produto parecido.</p>
        <ArquivosRelacionados lista={arqs} contexto={`Unipega ${p.nome}`} />
      </section>

      {mesmaFamilia.length > 0 && (
        <section>
          <h2 className="text-xl mb-2">Mesma família</h2>
          <div className="flex gap-2 flex-wrap">
            {mesmaFamilia.map((x) => (
              <Link key={x.id} to={`/produto/${x.id}`} className="no-underline px-3 py-2 rounded-full border border-line bg-panel text-ink text-sm font-medium hover:border-red">{x.nome}</Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
