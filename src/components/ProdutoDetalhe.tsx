import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Archive, Ban, CheckCircle2, ExternalLink, FileText, Lightbulb, ListChecks, Package, Wrench } from 'lucide-react'
import { arquivosDoProduto, boletinsDoProduto, conhecimento, cor, fichasDoProduto, normalizar, produtos, type Boletim, type Produto } from '../lib/dados'
import { atributos } from '../lib/recomendar'
import ArquivosRelacionados from './ArquivosRelacionados'

/* ---------- utilidades ---------- */

const vazio = (s: string) => /^[—-]?$/.test(s.trim())

function comoAplicarDo(p: Produto) {
  const alvo = normalizar(p.nome + ' ' + p.familia)
  return conhecimento.como_aplicar.filter((c) => normalizar(c.titulo).split(/[^a-z0-9]+/).filter((w) => w.length > 3).some((w) => alvo.includes(w)))
}
function problemasDo(p: Produto) {
  const nome = normalizar(p.nome.split(/[/(]/)[0].trim())
  return conhecimento.problema_solucao.filter((x) => normalizar(x.vender).includes(nome))
}

/** Os números que mais pesam na hora de indicar: aparecem no topo, como no rótulo do cartucho. */
const DESTAQUES: [RegExp, string][] = [
  [/^Carga$/, 'Carga'],
  [/^Cura$/, 'Cura'],
  [/^Formação de película$/, 'Película'],
  [/^Resistência térmica/, 'Aguenta'],
  [/^Resistência intermitente$/, 'Pico'],
  [/^Temperatura de trabalho$/, 'Trabalho'],
  [/^Rendimento/, 'Rende'],
  [/^Secagem total$/, 'Secagem'],
  [/^Tensão$/, 'Tensão'],
]
function destaques(b?: Boletim) {
  if (!b) return []
  const out: { rotulo: string; valor: string }[] = []
  for (const [re, rotulo] of DESTAQUES) {
    const k = Object.keys(b.dados).find((x) => re.test(x))
    if (k && out.length < 4) out.push({ rotulo, valor: b.dados[k] })
  }
  return out
}

/* ---------- peças ---------- */

function Secao({ icone: Icone, titulo, tom = 'text-ink', children }: { icone: typeof Package; titulo: string; tom?: string; children: ReactNode }) {
  return (
    <section className="grid gap-2">
      <h3 className={`text-[17px] flex items-center gap-2 ${tom}`}><Icone size={19} aria-hidden />{titulo}</h3>
      {children}
    </section>
  )
}
function Lista({ itens, numerada }: { itens: string[]; numerada?: boolean }) {
  if (numerada)
    return (
      <ol className="m-0 p-0 list-none grid gap-2">
        {itens.map((t, i) => (
          <li key={t} className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-ink text-panel text-xs font-extrabold grid place-items-center mt-0.5">{i + 1}</span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
    )
  return <ul className="m-0 pl-5 list-disc grid gap-1.5 marker:text-mute">{itens.map((t) => <li key={t}>{t}</li>)}</ul>
}

/* ---------- cabeçalho do produto ---------- */

export function CabecalhoProduto({ p, nivel = 1 }: { p: Produto; nivel?: 1 | 2 }) {
  const b = boletinsDoProduto(p.id)[0]
  const nums = destaques(b)
  const H = nivel === 1 ? 'h1' : 'h2'
  return (
    <header className="bg-panel border border-line rounded-2xl overflow-hidden">
      <div className="h-1.5" style={{ background: cor(p.familia) }} aria-hidden />
      <div className="p-5 grid gap-3">
        <p className="m-0 text-sm font-bold flex items-center gap-2" style={{ color: cor(p.familia) }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: cor(p.familia) }} aria-hidden />{p.familia}
        </p>
        <H className="text-[26px] sm:text-[32px]">{p.nome}</H>
        <p className="m-0 text-mute max-w-[62ch]">{p.o_que_e}</p>
        {nums.length > 0 && (
          <dl className="m-0 grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
            {nums.map((n) => (
              <div key={n.rotulo} className="bg-bg px-3 py-2.5">
                <dt className="text-xs text-mute">{n.rotulo}</dt>
                <dd className="m-0 font-extrabold leading-tight">{n.valor}</dd>
              </div>
            ))}
          </dl>
        )}
        <p className="m-0 text-sm flex gap-2 text-mute"><Package size={17} className="shrink-0 mt-0.5" aria-hidden />{p.embalagens}</p>
      </div>
    </header>
  )
}

/* ---------- abas ---------- */

type Aba = 'geral' | 'aplicar' | 'tecnico' | 'materiais'

export default function ProdutoDetalhe({ p }: { p: Produto }) {
  const [aba, setAba] = useState<Aba>('geral')
  const [versao, setVersao] = useState(0)
  const bols = boletinsDoProduto(p.id)
  const b = bols[Math.min(versao, bols.length - 1)]
  const arqs = arquivosDoProduto(p)
  const dicas = comoAplicarDo(p)
  const problemas = problemasDo(p)
  const aviso = atributos.get(p.id)?.aviso
  const fichas = bols.length ? [] : fichasDoProduto(p.id)
  const mesmaFamilia = produtos.filter((x) => x.familia === p.familia && x.id !== p.id)

  const abas: { id: Aba; nome: string; n?: number }[] = [
    { id: 'geral', nome: 'Geral' },
    { id: 'aplicar', nome: 'Aplicar' },
    { id: 'tecnico', nome: 'Técnico' },
    { id: 'materiais', nome: 'Materiais', n: arqs.length },
  ]

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <div role="tablist" aria-label="Informações do produto" className="grid grid-cols-4 gap-1 p-1 bg-panel border border-line rounded-xl">
        {abas.map((x) => (
          <button key={x.id} role="tab" type="button" aria-selected={aba === x.id} onClick={() => setAba(x.id)}
            className={`h-10 px-1 rounded-lg text-[13px] sm:text-sm font-bold whitespace-nowrap cursor-pointer transition-colors duration-150 ${aba === x.id ? 'bg-ink text-panel' : 'text-mute hover:text-ink'}`}>
            {x.nome}{x.n ? <span className="ml-1.5 opacity-70">{x.n}</span> : null}
          </button>
        ))}
      </div>

      {bols.length > 1 && (aba === 'aplicar' || aba === 'tecnico') && (
        <label className="grid gap-1 text-sm font-bold">
          Versão do produto
          <select value={versao} onChange={(e) => setVersao(Number(e.target.value))} className="h-11 px-3 rounded-lg border border-line bg-panel text-base font-normal">
            {bols.map((x, i) => <option key={x.boletim_id} value={i}>{x.titulo}</option>)}
          </select>
        </label>
      )}

      <div role="tabpanel" className="bg-panel border border-line rounded-2xl p-5 grid gap-6">
        {aba === 'geral' && (
          <>
            {aviso && (
              <p className="m-0 bg-yelbg border-l-4 border-yel rounded-lg p-3 flex gap-2 text-sm"><AlertTriangle size={18} className="shrink-0 mt-0.5 text-mid" aria-hidden />{aviso}</p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-okbg rounded-xl p-4 grid gap-1.5">
                <h3 className="text-[17px] text-ok flex items-center gap-2"><CheckCircle2 size={19} aria-hidden />Onde usar</h3>
                <p className="m-0">{p.usar_em}</p>
              </div>
              <div className="bg-redbg rounded-xl p-4 grid gap-1.5">
                <h3 className="text-[17px] text-no flex items-center gap-2"><Ban size={19} aria-hidden />Não use</h3>
                <p className="m-0">{vazio(p.nao_usar) ? (b?.limitacoes ? 'Veja as limitações na aba Técnico.' : 'Sem restrições informadas.') : p.nao_usar}</p>
              </div>
            </div>
            {b && <Secao icone={FileText} titulo="Sobre o produto"><p className="m-0">{b.caracteristicas}</p></Secao>}
            {problemas.length > 0 && (
              <Secao icone={Lightbulb} titulo="Problemas que ele resolve">
                <ul className="m-0 p-0 list-none grid gap-2">
                  {problemas.map((x) => (
                    <li key={x.cliente_diz} className="border border-line rounded-lg p-3"><b>{x.cliente_diz}</b><br /><span className="text-mute">{x.porque}</span></li>
                  ))}
                </ul>
              </Secao>
            )}
            {mesmaFamilia.length > 0 && (
              <Secao icone={Package} titulo="Da mesma família">
                <div className="flex gap-2 flex-wrap">
                  {mesmaFamilia.map((x) => (
                    <Link key={x.id} to={`/produtos/p/${x.id}`} className="no-underline px-3.5 h-10 grid place-items-center rounded-full border border-line text-ink text-sm font-bold hover:border-ink transition-colors duration-150">{x.nome}</Link>
                  ))}
                </div>
              </Secao>
            )}
          </>
        )}

        {aba === 'aplicar' && (
          <>
            {!b && !dicas.length && <p className="m-0 text-mute">Não há instruções de aplicação para este produto no material do Drive.</p>}
            {b && b.preparo.length > 0 && <Secao icone={Wrench} titulo="1. Prepare a superfície"><Lista itens={b.preparo} /></Secao>}
            {b && b.modo_de_uso.length > 0 && <Secao icone={ListChecks} titulo={b.preparo.length ? '2. Aplique' : 'Como aplicar'}><Lista itens={b.modo_de_uso} numerada /></Secao>}
            {dicas.map((c) => (
              <Secao key={c.titulo} icone={Lightbulb} titulo={`Dica do treinamento: ${c.titulo}`}><Lista itens={c.passos} /></Secao>
            ))}
          </>
        )}

        {aba === 'tecnico' && (
          <>
            {!b && !fichas.length && <p className="m-0 text-mute">Este produto não tem boletim técnico em português na pasta do Drive.</p>}
            {b?.limitacoes && (
              <div className="bg-redbg rounded-xl p-4">
                <Secao icone={AlertTriangle} titulo="Limitações" tom="text-no"><p className="m-0">{b.limitacoes}</p></Secao>
              </div>
            )}
            {(b ? Object.entries(b.dados) : fichas.flatMap(([, f]) => Object.entries(f).map(([k, v]) => [k, String(v)]))).length > 0 && (
              <Secao icone={FileText} titulo="Dados técnicos">
                <dl className="m-0 border border-line rounded-xl divide-y divide-line">
                  {(b ? Object.entries(b.dados) : fichas.flatMap(([, f]) => Object.entries(f).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : String(v)]))).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
                      <dt className="text-mute">{k}</dt>
                      <dd className="m-0 font-bold text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Secao>
            )}
            {b && <Secao icone={Archive} titulo="Armazenamento e validade"><p className="m-0">{b.armazenamento}</p></Secao>}
            {b && (
              <a href={`https://drive.google.com/file/d/${b.boletim_id}/view`} target="_blank" rel="noreferrer"
                className="w-fit h-11 px-4 rounded-lg border border-line text-ink no-underline font-bold flex items-center gap-2 hover:border-ink transition-colors duration-150">
                <FileText size={18} aria-hidden /> Abrir o boletim em PDF <ExternalLink size={15} aria-hidden />
              </a>
            )}
          </>
        )}

        {aba === 'materiais' && <ArquivosRelacionados lista={arqs} />}
      </div>
    </div>
  )
}
