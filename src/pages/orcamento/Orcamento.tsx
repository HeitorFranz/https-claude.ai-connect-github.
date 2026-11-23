import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Copy, FilePlus2, Minus, Plus, Printer, Save, Search, Trash2, Upload } from 'lucide-react'
import { useTabela } from '../../lib/TabelaContext'
import { useOrcamento, type Rascunho } from '../../lib/orcamento'
import { listarClientes, nomeCliente, type Cliente } from '../../lib/clientes'
import { reais, unidadesCaixa } from '../../lib/precos'
import { normalizar } from '../../lib/dados'
import { supabase } from '../../lib/supabase'
import type { Item } from '../../lib/tabelaPrecos'
import Parametros from '../../components/Parametros'
import { Titulo } from '../../components/ui'

type Salvo = { id: string; cliente_nome: string | null; total: number | null; status: string; created_at: string; itens: { codigo: string; quantidade: number }[]; observacoes: string | null; cliente_id: string | null; parametros: Record<string, string> }
const STATUS: Record<string, string> = { rascunho: 'Rascunho', enviado: 'Enviado', fechado: 'Fechado', perdido: 'Perdido' }
const dataBR = (iso: string) => new Date(iso).toLocaleDateString('pt-BR')

export default function Orcamento() {
  const { tabela: t, parametros: par, setParametros, preco, atualizadaEm, carregando } = useTabela()
  const { rascunho: r, adicionar, mudarQuantidade, remover, atualizar, novo } = useOrcamento()
  const [busca, setBusca] = useState('')
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [abrirCond, setAbrirCond] = useState(false)
  const [salvos, setSalvos] = useState<Salvo[]>([])
  const [aviso, setAviso] = useState('')

  useEffect(() => { listarClientes().then(setClientes).catch(() => setClientes([])) }, [])
  const carregarSalvos = () => supabase.from('orcamentos').select('id, cliente_nome, total, status, created_at, itens, observacoes, cliente_id, parametros').order('created_at', { ascending: false }).limit(30).then(({ data }) => setSalvos((data as Salvo[]) ?? []))
  useEffect(() => { void carregarSalvos() }, [])

  const porCodigo = useMemo(() => new Map((t?.itens ?? []).map((i) => [i.codigo, i])), [t])
  const resultados = useMemo(() => {
    const termos = normalizar(busca).split(/\s+/).filter(Boolean)
    if (!t || !termos.length) return []
    return t.itens.filter((i) => { const alvo = normalizar(`${i.codigo} ${i.descricao} ${i.secao}`); return termos.every((x) => alvo.includes(x)) }).slice(0, 12)
  }, [busca, t])

  const linhas = r.linhas.map((l) => { const item = porCodigo.get(l.codigo); return { ...l, item, p: item ? preco(item) : null } })
  const tot = linhas.reduce((a, l) => {
    if (!l.p || l.p.situacao !== 'ok') return a
    const u = l.p.unitario!, q = l.quantidade
    a.produtos += u * q; a.ipi += u * l.p.ipi * q; a.st += (l.p.comIpi! * l.p.st) * q; a.total += l.p.comIpiSt! * q
    return a
  }, { produtos: 0, ipi: 0, st: 0, total: 0 })
  const canal = t?.canais.find((c) => c.nome === par?.canal && c.marca === par?.marca)
  const prazo = t?.prazos.find((x) => x.nome === par?.prazo)
  const faltaMinimo = canal ? canal.pedidoMinimo - tot.produtos : 0

  function texto() {
    const linhasTxt = linhas.filter((l) => l.item && l.p?.situacao === 'ok').map((l) => `• ${l.quantidade} un — ${l.item!.descricao.trim()} (${l.codigo})\n   ${reais(l.p!.comIpiSt)} un · ${reais(l.p!.comIpiSt! * l.quantidade)}`)
    return [`*Orçamento Unipega*${r.clienteNome ? ` — ${r.clienteNome}` : ''}`, `${t?.titulo} · ${par?.prazo} · ${par?.frete}`, '', ...linhasTxt, '',
      `Produtos: ${reais(tot.produtos)}`, tot.ipi ? `IPI: ${reais(tot.ipi)}` : '', tot.st ? `ST: ${reais(tot.st)}` : '', `*Total: ${reais(tot.total)}*`, r.observacoes ? `\nObs.: ${r.observacoes}` : ''].filter((x) => x !== '').join('\n')
  }
  async function copiar() { await navigator.clipboard.writeText(texto()).catch(() => {}); setAviso('Orçamento copiado'); setTimeout(() => setAviso(''), 2000) }
  async function salvar() {
    const corpo = { cliente_id: r.clienteId, cliente_nome: r.clienteNome || null, tabela_titulo: t?.titulo, parametros: par, itens: r.linhas, total: Math.round(tot.total * 100) / 100, observacoes: r.observacoes || null }
    const q = r.id ? supabase.from('orcamentos').update(corpo).eq('id', r.id).select('id').single() : supabase.from('orcamentos').insert(corpo).select('id').single()
    const { data, error } = await q
    if (error) return setAviso(`Erro ao salvar: ${error.message}`)
    atualizar({ id: data.id })
    setAviso('Orçamento salvo'); setTimeout(() => setAviso(''), 2000)
    void carregarSalvos()
  }
  function abrir(s: Salvo) {
    const rasc: Rascunho = { id: s.id, clienteId: s.cliente_id, clienteNome: s.cliente_nome ?? '', observacoes: s.observacoes ?? '', linhas: s.itens }
    atualizar(rasc)
    if (s.parametros && par) setParametros({ ...par, ...s.parametros })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  async function mudarStatus(id: string, status: string) { await supabase.from('orcamentos').update({ status }).eq('id', id); void carregarSalvos() }
  async function apagar(id: string) { if (!confirm('Apagar este orçamento salvo?')) return; await supabase.from('orcamentos').delete().eq('id', id); void carregarSalvos() }

  if (carregando) return <p className="text-mute">Carregando tabela de preços…</p>
  if (!t || !par) return (
    <div className="grid gap-4 max-w-xl">
      <Titulo sub="Para montar orçamentos, envie a tabela de preços do mês.">Orçamento</Titulo>
      <Link to="tabela" className="h-12 px-5 w-fit rounded-xl bg-red text-white no-underline font-extrabold flex items-center gap-2"><Upload size={19} aria-hidden />Enviar tabela do mês</Link>
    </div>
  )

  const AddItem = ({ i }: { i: Item }) => {
    const p = preco(i)
    return (
      <li className="flex items-center gap-3 py-2.5">
        <span className="grid flex-1 min-w-0">
          <span className="font-bold leading-snug">{i.descricao}</span>
          <span className="text-xs text-mute">{i.codigo} · {i.caixa}{i.st ? ' · com ST' : ''}</span>
        </span>
        <span className="text-right shrink-0 font-extrabold">{p?.situacao === 'ok' ? reais(p.unitario) : '—'}</span>
        <button type="button" disabled={p?.situacao !== 'ok'} onClick={() => { adicionar(i.codigo, unidadesCaixa(i.caixa)); setBusca('') }} aria-label={`Adicionar ${i.descricao}`}
          className="w-11 h-11 shrink-0 rounded-lg bg-ink text-panel grid place-items-center cursor-pointer disabled:opacity-30"><Plus size={20} /></button>
      </li>
    )
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3 print:hidden">
        <div className="-mb-6"><Titulo sub={`${t.titulo}${atualizadaEm ? ` · carregada em ${dataBR(atualizadaEm)}` : ''}`}>Orçamento</Titulo></div>
        <div className="flex gap-2">
          <Link to="tabela" className="h-11 px-4 rounded-xl border border-line bg-panel no-underline text-ink font-bold flex items-center gap-2 hover:border-ink"><Upload size={18} aria-hidden /><span className="hidden sm:inline">Atualizar tabela</span></Link>
          <button type="button" onClick={() => { if (!r.linhas.length || confirm('Começar um orçamento novo? O atual não salvo será perdido.')) novo() }}
            className="h-11 px-4 rounded-xl border border-line bg-panel font-bold flex items-center gap-2 cursor-pointer hover:border-ink"><FilePlus2 size={18} aria-hidden /><span className="hidden sm:inline">Novo</span></button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] gap-5 items-start">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
          <section className="bg-panel border border-line rounded-2xl p-4 grid gap-3 print:hidden">
            <label className="grid gap-1 text-sm font-bold">Cliente
              <select value={r.clienteId ?? ''} onChange={(e) => {
                const c = clientes.find((x) => x.id === e.target.value)
                atualizar({ clienteId: c?.id ?? null, clienteNome: c ? nomeCliente(c) : '' })
                if (c?.uf && t.ufs.some((u) => u.uf === c.uf)) setParametros({ ...par, uf: c.uf })
              }} className="h-11 px-3 rounded-lg border border-line bg-panel text-base font-normal">
                <option value="">Sem cliente</option>
                {clientes.map((c) => <option key={c.id} value={c.id}>{nomeCliente(c)}{c.cidade ? ` — ${c.cidade}` : ''}</option>)}
              </select>
            </label>
            <button type="button" onClick={() => setAbrirCond((v) => !v)} aria-expanded={abrirCond} className="flex items-center gap-2 text-left cursor-pointer min-h-11">
              <span className="grid flex-1"><span className="font-bold">Condições</span><span className="text-sm text-mute">{par.canal} · {par.mercado} · {par.uf} · {par.prazo} · {par.uso === 'CONSUMO' ? 'uso e consumo' : 'revenda'}</span></span>
              <ChevronDown size={20} className={abrirCond ? 'rotate-180' : ''} aria-hidden />
            </button>
            {abrirCond && <Parametros />}
          </section>

          <section className="bg-panel border border-line rounded-2xl p-4 grid gap-2 print:hidden">
            <label htmlFor="busca-item" className="font-bold">Adicionar produto</label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" aria-hidden />
              <input id="busca-item" type="search" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Código ou nome: pu40 cinza, AES0534.0001…"
                className="w-full h-12 pl-10 pr-3 rounded-xl border border-line bg-panel text-base outline-none focus:border-ink" />
            </div>
            {resultados.length > 0 && <ul className="list-none p-0 m-0 divide-y divide-line">{resultados.map((i) => <AddItem key={i.codigo} i={i} />)}</ul>}
            {busca && !resultados.length && <p className="m-0 text-sm text-mute">Nada encontrado com “{busca}”.</p>}
          </section>

          <section className="bg-panel border border-line rounded-2xl p-4 grid gap-2">
            <h2 className="text-lg">Itens {r.clienteNome && <span className="text-mute font-bold">· {r.clienteNome}</span>}</h2>
            {!linhas.length && <p className="m-0 text-mute">Busque um produto acima ou toque em “1 caixa no orçamento” na página de um produto.</p>}
            <ul className="list-none p-0 m-0 divide-y divide-line">
              {linhas.map((l) => {
                const cx = l.item ? unidadesCaixa(l.item.caixa) : 1
                return (
                  <li key={l.codigo} className="py-3 grid gap-2">
                    <div className="flex gap-3 items-start">
                      <span className="grid flex-1 min-w-0">
                        <span className="font-bold leading-snug">{l.item?.descricao ?? l.codigo}</span>
                        <span className="text-xs text-mute">{l.codigo} · caixa com {cx} · {l.p?.situacao === 'ok' ? `${reais(l.p.unitario)} + impostos = ${reais(l.p.comIpiSt)} un` : 'fora da tabela atual'}</span>
                      </span>
                      <span className="font-extrabold shrink-0">{l.p?.situacao === 'ok' ? reais(l.p.comIpiSt! * l.quantidade) : '—'}</span>
                    </div>
                    <div className="flex items-center gap-2 print:hidden">
                      <button type="button" onClick={() => mudarQuantidade(l.codigo, l.quantidade - cx)} aria-label="Menos uma caixa" className="w-10 h-10 rounded-lg border border-line grid place-items-center cursor-pointer"><Minus size={16} /></button>
                      <input type="number" min={0} value={l.quantidade} onChange={(e) => mudarQuantidade(l.codigo, Number(e.target.value))} aria-label="Quantidade em unidades"
                        className="w-20 h-10 px-2 rounded-lg border border-line bg-panel text-center text-base tabular-nums" />
                      <button type="button" onClick={() => mudarQuantidade(l.codigo, l.quantidade + cx)} aria-label="Mais uma caixa" className="w-10 h-10 rounded-lg border border-line grid place-items-center cursor-pointer"><Plus size={16} /></button>
                      <span className="text-xs text-mute">un. {l.quantidade % cx ? <b className="text-mid">(não fecha caixa)</b> : `(${l.quantidade / cx} cx)`}</span>
                      <button type="button" onClick={() => remover(l.codigo)} aria-label="Remover item" className="ml-auto w-10 h-10 rounded-lg text-no grid place-items-center cursor-pointer hover:bg-redbg"><Trash2 size={18} /></button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>

          <label className="grid gap-1 text-sm font-bold print:hidden">Observações
            <textarea value={r.observacoes} onChange={(e) => atualizar({ observacoes: e.target.value })} rows={2} className="px-3 py-2.5 rounded-lg border border-line bg-panel text-base font-normal" />
          </label>
        </div>

        <aside className="lg:sticky lg:top-20 grid gap-3">
          <section className="bg-bar text-bar-ink rounded-2xl p-5 grid gap-2">
            <dl className="m-0 grid gap-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-bar-ink/70">Produtos (sem impostos)</dt><dd className="m-0 font-bold">{reais(tot.produtos)}</dd></div>
              <div className="flex justify-between"><dt className="text-bar-ink/70">IPI</dt><dd className="m-0 font-bold">{reais(tot.ipi)}</dd></div>
              <div className="flex justify-between"><dt className="text-bar-ink/70">ST</dt><dd className="m-0 font-bold">{reais(tot.st)}</dd></div>
            </dl>
            <div className="border-t border-white/15 pt-2 flex justify-between items-baseline">
              <span className="font-bold">Total</span><span className="text-[1.75rem] font-extrabold text-white">{reais(tot.total)}</span>
            </div>
            {prazo && prazo.parcelas > 1 && tot.total > 0 && <p className="m-0 text-sm text-bar-ink/70">{prazo.parcelas}× de {reais(tot.total / prazo.parcelas)} ({prazo.nome})</p>}
            {canal && tot.produtos > 0 && (faltaMinimo > 0
              ? <p className="m-0 text-sm bg-yel text-[#1d2329] rounded-lg px-3 py-2 font-bold">Faltam {reais(faltaMinimo)} para o pedido mínimo ({reais(canal.pedidoMinimo)})</p>
              : <p className="m-0 text-sm text-[#7ee2a8] font-bold">Pedido mínimo atingido</p>)}
          </section>
          <div className="grid grid-cols-2 gap-2 print:hidden">
            <button type="button" onClick={salvar} disabled={!r.linhas.length} className="col-span-2 h-12 rounded-xl bg-red text-white font-extrabold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"><Save size={18} aria-hidden />{r.id ? 'Salvar alterações' : 'Salvar orçamento'}</button>
            <button type="button" onClick={copiar} disabled={!r.linhas.length} className="h-11 rounded-xl border border-line bg-panel font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"><Copy size={17} aria-hidden />Copiar</button>
            <button type="button" onClick={() => window.print()} disabled={!r.linhas.length} className="h-11 rounded-xl border border-line bg-panel font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"><Printer size={17} aria-hidden />PDF</button>
          </div>
          <p className="m-0 text-sm text-ok font-bold min-h-5" aria-live="polite">{aviso}</p>
        </aside>
      </div>

      {salvos.length > 0 && (
        <section className="grid gap-2 print:hidden">
          <h2 className="text-lg">Orçamentos salvos</h2>
          <ul className="list-none p-0 m-0 bg-panel border border-line rounded-2xl divide-y divide-line overflow-hidden">
            {salvos.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <button type="button" onClick={() => abrir(s)} className="grid flex-1 min-w-[12rem] text-left cursor-pointer">
                  <span className="font-extrabold">{s.cliente_nome || 'Sem cliente'}</span>
                  <span className="text-sm text-mute">{dataBR(s.created_at)} · {s.itens.length} itens · {reais(s.total)}</span>
                </button>
                <select value={s.status} onChange={(e) => mudarStatus(s.id, e.target.value)} aria-label="Situação" className="h-10 px-2 rounded-lg border border-line bg-panel text-sm font-bold">
                  {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <button type="button" onClick={() => apagar(s.id)} aria-label="Apagar orçamento" className="w-10 h-10 rounded-lg text-no grid place-items-center cursor-pointer hover:bg-redbg"><Trash2 size={18} /></button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
