import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check, MessageCircle, Phone, Trash2 } from 'lucide-react'
import { apagarCliente, buscarCliente, clienteVazio, nomeCliente, salvarCliente, SECOES, type Campo, type Cliente } from '../../lib/clientes'
import { cor, produtos } from '../../lib/dados'
import { Titulo, Voltar } from '../../components/ui'

const entrada = 'w-full h-11 px-3 rounded-lg border border-line bg-panel text-base outline-none focus:border-ink'
const soDigitos = (s: string | null) => (s ?? '').replace(/\D/g, '')
const TIPO_INPUT: Record<string, string> = { texto: 'text', tel: 'tel', email: 'email', url: 'url', data: 'date', numero: 'number' }

function CampoForm({ c, valor, mudar }: { c: Campo; valor: unknown; mudar: (v: string) => void }) {
  const id = `campo-${c.chave}`
  const v = valor === null || valor === undefined ? '' : String(valor)
  let controle
  if (c.tipo === 'select')
    controle = (
      <select id={id} value={v} onChange={(e) => mudar(e.target.value)} className={entrada}>
        <option value="">—</option>
        {c.opcoes!.map((o) => <option key={o.valor} value={o.valor}>{o.nome}</option>)}
      </select>
    )
  else if (c.tipo === 'area') controle = <textarea id={id} value={v} onChange={(e) => mudar(e.target.value)} rows={3} className={`${entrada} h-auto py-2.5`} />
  else
    controle = (
      <input id={id} value={v} onChange={(e) => mudar(e.target.value)} className={entrada}
        type={TIPO_INPUT[c.tipo ?? 'texto']}
        inputMode={c.chave === 'cep' || c.chave === 'cnpj_cpf' ? 'numeric' : c.tipo === 'numero' ? 'decimal' : undefined}
        step={c.tipo === 'numero' ? '0.01' : undefined} />
    )
  return (
    <div className={`grid gap-1 content-start ${c.largo ? '@lg:col-span-2' : ''}`}>
      <label htmlFor={id} className="text-sm font-bold">{c.rotulo}</label>
      {controle}
      {c.dica && <span className="text-xs text-mute">{c.dica}</span>}
    </div>
  )
}

export default function ClienteForm() {
  const { id } = useParams()
  const navegar = useNavigate()
  const [c, setC] = useState<Cliente | null>(id ? null : clienteVazio())
  const [estado, setEstado] = useState<'' | 'salvando' | 'salvo'>('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (id) buscarCliente(id).then((x) => (x ? setC(x) : setErro('Cliente não encontrado.'))).catch((e: Error) => setErro(e.message))
  }, [id])

  function mudar(chave: keyof Cliente, valor: string) {
    setEstado('')
    setC((x) => (x ? { ...x, [chave]: valor === '' ? null : chave === 'limite_credito' ? Number(valor) : valor } : x))
    if (chave === 'cep' && soDigitos(valor).length === 8) preencherCep(soDigitos(valor))
  }
  async function preencherCep(cep: string) {
    try {
      const r = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json()
      if (r.erro) return
      setC((x) => (x ? { ...x, logradouro: x.logradouro || r.logradouro || null, bairro: x.bairro || r.bairro || null, cidade: x.cidade || r.localidade || null, uf: x.uf || r.uf || null } : x))
    } catch { /* sem internet: o usuário preenche à mão */ }
  }
  function alternarProduto(pid: string) {
    setEstado('')
    setC((x) => (x ? { ...x, produtos_interesse: x.produtos_interesse.includes(pid) ? x.produtos_interesse.filter((p) => p !== pid) : [...x.produtos_interesse, pid] } : x))
  }
  async function salvar(e: FormEvent) {
    e.preventDefault()
    if (!c) return
    setErro('')
    setEstado('salvando')
    try {
      const salvo = await salvarCliente(c)
      setC(salvo)
      setEstado('salvo')
      if (!id) navegar(`/clientes/${salvo.id}`, { replace: true })
    } catch (er) {
      setEstado('')
      setErro((er as Error).message)
    }
  }
  async function apagar() {
    if (!c?.id || !confirm(`Apagar ${nomeCliente(c)}? Isso não pode ser desfeito.`)) return
    try {
      await apagarCliente(c.id)
      navegar('/clientes', { replace: true })
    } catch (er) {
      setErro((er as Error).message)
    }
  }

  if (!c) return <div className="grid gap-3"><Voltar para="/clientes" rotulo="Clientes" />{erro ? <p role="alert" className="text-no m-0">{erro}</p> : <p className="text-mute m-0">Carregando…</p>}</div>

  return (
    <form onSubmit={salvar} className="grid grid-cols-[minmax(0,1fr)] gap-5 pb-20">
      <div className="grid gap-2">
        <Voltar para="/clientes" rotulo="Clientes" />
        <div className="-mb-6"><Titulo sub="Nenhum campo é obrigatório. Preencha o que souber e complete depois.">{id ? nomeCliente(c) : 'Novo cliente'}</Titulo></div>
        {(c.whatsapp || c.telefone) && (
          <div className="flex gap-2 flex-wrap">
            {c.whatsapp && <a href={`https://wa.me/55${soDigitos(c.whatsapp)}`} target="_blank" rel="noreferrer" className="h-10 px-3 rounded-lg bg-okbg text-ok no-underline font-bold flex items-center gap-2"><MessageCircle size={18} aria-hidden />WhatsApp</a>}
            {c.telefone && <a href={`tel:${soDigitos(c.telefone)}`} className="h-10 px-3 rounded-lg border border-line text-ink no-underline font-bold flex items-center gap-2"><Phone size={18} aria-hidden />Ligar</a>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-4 items-start">
        {SECOES.map((s) => (
          <fieldset key={s.titulo} className="@container m-0 bg-panel border border-line rounded-2xl p-[clamp(1rem,2.5vw,1.5rem)] grid gap-4">
            <legend className="sr-only">{s.titulo}</legend>
            <h2 className="text-lg" aria-hidden>{s.titulo}</h2>
            <div className="grid gap-4 @lg:grid-cols-2">
              {s.campos.map((f) => <CampoForm key={f.chave} c={f} valor={c[f.chave]} mudar={(v) => mudar(f.chave, v)} />)}
            </div>
          </fieldset>
        ))}
        <fieldset className="m-0 bg-panel border border-line rounded-2xl p-[clamp(1rem,2.5vw,1.5rem)] grid gap-3">
          <legend className="sr-only">Produtos de interesse</legend>
          <h2 className="text-lg" aria-hidden>Produtos de interesse</h2>
          <p className="m-0 text-sm text-mute">Toque nos produtos que esse cliente usa ou pode usar.</p>
          <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto">
            {produtos.map((p) => {
              const on = c.produtos_interesse.includes(p.id)
              return (
                <button key={p.id} type="button" onClick={() => alternarProduto(p.id)} aria-pressed={on}
                  className={`h-9 px-3 rounded-full border text-sm font-bold flex items-center gap-1.5 cursor-pointer transition-colors duration-150 ${on ? 'bg-ink text-panel border-ink' : 'border-line hover:border-ink'}`}>
                  <span className="w-2 h-2 rounded-full" style={{ background: cor(p.familia) }} aria-hidden />{p.nome}
                </button>
              )
            })}
          </div>
        </fieldset>
      </div>

      {erro && <p role="alert" className="m-0 bg-redbg text-no rounded-xl p-4">Não foi possível salvar: {erro}</p>}

      <div className="fixed bottom-0 inset-x-0 z-10 bg-panel/95 backdrop-blur border-t border-line">
        <div className="pagina py-3 flex items-center gap-3">
          {c.id && (
            <button type="button" onClick={apagar} className="h-11 px-3 rounded-xl text-no font-bold flex items-center gap-2 cursor-pointer hover:bg-redbg">
              <Trash2 size={18} aria-hidden /><span className="hidden sm:inline">Apagar</span>
            </button>
          )}
          <span className="ml-auto text-sm text-mute" aria-live="polite">{estado === 'salvo' ? 'Salvo' : estado === 'salvando' ? 'Salvando…' : ''}</span>
          <button disabled={estado === 'salvando'} className="h-11 px-6 rounded-xl bg-red text-white font-extrabold flex items-center gap-2 cursor-pointer disabled:opacity-60 hover:brightness-110 transition duration-150">
            <Check size={19} aria-hidden />{id ? 'Salvar alterações' : 'Salvar cliente'}
          </button>
        </div>
      </div>
    </form>
  )
}
