import { useTabela } from '../lib/TabelaContext'
import type { Parametros as P } from '../lib/precos'

const sel = 'w-full h-11 px-3 rounded-lg border border-line bg-panel text-base outline-none focus:border-ink'

export default function Parametros({ compacto = false }: { compacto?: boolean }) {
  const { tabela: t, parametros: p, setParametros } = useTabela()
  if (!t || !p) return null
  const muda = (parcial: Partial<P>) => setParametros({ ...p, ...parcial })
  const marcas = [...new Set(t.canais.map((c) => c.marca))].filter((m) => t.itens.some((i) => i.marca === m))
  const canal = t.canais.find((c) => c.nome === p.canal && c.marca === p.marca)
  const campos: { rotulo: string; el: React.ReactNode }[] = [
    { rotulo: 'Marca', el: (
      <select className={sel} value={p.marca} onChange={(e) => {
        const m = e.target.value
        muda({ marca: m, mercado: t.mercados.find((x) => x.marca === m)?.nome ?? p.mercado, canal: t.canais.find((c) => c.marca === m && /REVENDA/.test(c.nome))?.nome ?? t.canais.find((c) => c.marca === m)!.nome })
      }}>{marcas.map((m) => <option key={m}>{m}</option>)}</select>) },
    { rotulo: 'Tabela (canal)', el: (
      <select className={sel} value={p.canal} onChange={(e) => muda({ canal: e.target.value })}>
        {t.canais.filter((c) => c.marca === p.marca).map((c) => <option key={c.nome} value={c.nome}>{c.nome} ({(c.desconto * 100).toFixed(0)}%)</option>)}
      </select>) },
    { rotulo: 'Mercado', el: (
      <select className={sel} value={p.mercado} onChange={(e) => muda({ mercado: e.target.value })}>
        {t.mercados.filter((m) => m.marca === p.marca).map((m) => <option key={m.nome}>{m.nome}</option>)}
      </select>) },
    { rotulo: 'Estado (UF)', el: (
      <select className={sel} value={p.uf} onChange={(e) => muda({ uf: e.target.value })}>
        {t.ufs.map((u) => <option key={u.uf} value={u.uf}>{u.uf} — ICMS {u.icms === 'ZF' ? 'Zona Franca' : `${Math.round(u.icms * 100)}%`}</option>)}
      </select>) },
    { rotulo: 'Frete', el: <select className={sel} value={p.frete} onChange={(e) => muda({ frete: e.target.value })}>{t.fretes.map((f) => <option key={f.nome}>{f.nome}</option>)}</select> },
    { rotulo: 'Prazo de pagamento', el: <select className={sel} value={p.prazo} onChange={(e) => muda({ prazo: e.target.value })}>{t.prazos.map((x) => <option key={x.nome}>{x.nome}</option>)}</select> },
    { rotulo: 'Cliente compra para', el: (
      <select className={sel} value={p.uso} onChange={(e) => muda({ uso: e.target.value as P['uso'] })}>
        <option value="REVENDA">Revenda (com ST)</option><option value="CONSUMO">Uso e consumo (sem ST)</option>
      </select>) },
  ]
  return (
    <div className="@container grid gap-3">
      <div className={`grid gap-3 ${compacto ? '@md:grid-cols-2 @3xl:grid-cols-4' : '@md:grid-cols-2 @3xl:grid-cols-4'}`}>
        {campos.map((c) => <label key={c.rotulo} className="grid gap-1 text-sm font-bold">{c.rotulo}{c.el}</label>)}
      </div>
      {canal && <p className="m-0 text-sm text-mute">Pedido mínimo desta tabela: <b className="text-ink">{canal.pedidoMinimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></p>}
    </div>
  )
}
