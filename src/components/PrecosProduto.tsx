import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronDown, Plus } from 'lucide-react'
import { itensDoProduto, useTabela } from '../lib/TabelaContext'
import { useOrcamento } from '../lib/orcamento'
import { pct, reais, unidadesCaixa } from '../lib/precos'
import type { Item } from '../lib/tabelaPrecos'
import { BotaoCopiar } from './ui'

function LinhaItem({ i }: { i: Item }) {
  const { preco } = useTabela()
  const { adicionar } = useOrcamento()
  const [aberto, setAberto] = useState(false)
  const [ok, setOk] = useState(false)
  const p = preco(i)
  const cx = unidadesCaixa(i.caixa)
  return (
    <li className="py-3 grid gap-2">
      <div className="flex items-start gap-3">
        <div className="grid flex-1 min-w-0 gap-0.5">
          <span className="font-bold leading-snug">{i.descricao.replace(/^UNIPEGA /, '')}</span>
          <span className="text-sm text-mute flex flex-wrap gap-x-3">
            <span className="tabular-nums">{i.codigo}</span><span>{i.caixa}</span>{i.st && <span className="text-mid font-bold">com ST</span>}
          </span>
        </div>
        <div className="text-right shrink-0">
          <div className="text-lg font-extrabold leading-tight">{p?.situacao === 'ok' ? reais(p.unitario) : 'Lançamento'}</div>
          {p?.situacao === 'ok' && <div className="text-xs text-mute">c/ IPI{p.st ? ' e ST' : ''}: {reais(p.comIpiSt)}</div>}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={p?.situacao !== 'ok'} onClick={() => { adicionar(i.codigo, cx); setOk(true); setTimeout(() => setOk(false), 1500) }}
          className={`h-10 px-3 rounded-lg text-sm font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-40 transition-colors duration-150 ${ok ? 'bg-okbg text-ok' : 'bg-ink text-panel'}`}>
          {ok ? <><Check size={16} aria-hidden />Adicionado</> : <><Plus size={16} aria-hidden />1 caixa no orçamento</>}
        </button>
        <BotaoCopiar texto={i.codigo} rotulo="Copiar código" />
        <button type="button" onClick={() => setAberto((v) => !v)} aria-expanded={aberto} className="h-10 px-3 rounded-lg border border-line text-sm font-bold flex items-center gap-1 cursor-pointer hover:border-ink">
          Detalhes <ChevronDown size={16} className={aberto ? 'rotate-180' : ''} aria-hidden />
        </button>
      </div>
      {aberto && (
        <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-1 text-sm bg-bg rounded-lg p-3">
          {p && <><dt className="text-mute">ICMS</dt><dd className="m-0 font-bold">{p.icms === 'ZF' ? 'Zona Franca' : pct(p.icms)}</dd>
          <dt className="text-mute">IPI</dt><dd className="m-0 font-bold">{p.ipi ? pct(p.ipi) : 'Isento'}</dd>
          <dt className="text-mute">ST no estado</dt><dd className="m-0 font-bold">{p.st ? pct(p.st) : 'Não se aplica'}</dd>
          <dt className="text-mute">Preço da caixa ({cx} un.)</dt><dd className="m-0 font-bold">{reais((p.comIpiSt ?? 0) * cx)}</dd></>}
          {i.politica && <><dt className="text-mute">Política de estoque</dt><dd className="m-0 font-bold">{i.politica}</dd></>}
          {i.pedidoPrazo && <><dt className="text-mute">Pedido mínimo / prazo</dt><dd className="m-0 font-bold">{i.pedidoPrazo}</dd></>}
          {Object.entries(i.cadastro ?? {}).map(([k, v]) => <Fragment key={k}><dt className="text-mute">{k.charAt(0) + k.slice(1).toLowerCase()}</dt><dd className="m-0 font-bold break-all">{String(v)}</dd></Fragment>)}
        </dl>
      )}
    </li>
  )
}

export function PrecoAPartir({ produtoId }: { produtoId: string }) {
  const { tabela, preco } = useTabela()
  const valores = itensDoProduto(tabela, produtoId).map((i) => preco(i)?.unitario).filter((v): v is number => typeof v === 'number')
  if (!valores.length) return null
  return <span className="text-sm text-mute">a partir de <b className="text-ink">{reais(Math.min(...valores))}</b></span>
}

export default function PrecosProduto({ produtoId }: { produtoId: string }) {
  const { tabela, parametros, carregando } = useTabela()
  if (carregando) return <p className="m-0 text-mute">Carregando tabela de preços…</p>
  if (!tabela) return <p className="m-0 text-mute">Nenhuma tabela de preços carregada. <Link to="/orcamento/tabela">Envie a planilha do mês</Link>.</p>
  const itens = itensDoProduto(tabela, produtoId)
  return (
    <div className="grid gap-3">
      <p className="m-0 text-sm text-mute">
        {tabela.titulo} · {parametros?.canal} · {parametros?.uf} · {parametros?.prazo}. <Link to="/orcamento" className="font-bold">Mudar condições</Link>
      </p>
      {itens.length ? <ul className="list-none p-0 m-0 divide-y divide-line">{itens.map((i) => <LinhaItem key={i.codigo} i={i} />)}</ul>
        : <p className="m-0 text-mute">Este produto não tem código na tabela do mês.</p>}
    </div>
  )
}
