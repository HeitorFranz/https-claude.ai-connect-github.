import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Download, MessageCircle, Phone, Plus, UserRound } from 'lucide-react'
import { baixarPlanilha, listarClientes, nomeCliente, type Cliente } from '../../lib/clientes'
import { normalizar } from '../../lib/dados'
import { CampoBusca, Chip, Titulo } from '../../components/ui'

const SITUACAO: Record<string, { nome: string; cls: string }> = {
  ativo: { nome: 'Ativo', cls: 'bg-okbg text-ok' },
  prospect: { nome: 'Prospect', cls: 'bg-yelbg text-mid' },
  inativo: { nome: 'Inativo', cls: 'bg-bg text-mute' },
}
const soDigitos = (s: string | null) => (s ?? '').replace(/\D/g, '')
const dataBR = (d: string | null) => (d ? d.split('-').reverse().join('/') : '—')

export default function Clientes() {
  const [lista, setLista] = useState<Cliente[] | null>(null)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')
  const [situacao, setSituacao] = useState('')

  useEffect(() => {
    listarClientes().then(setLista).catch((e: Error) => setErro(e.message))
  }, [])

  const filtrados = useMemo(() => {
    const t = normalizar(busca.trim())
    return (lista ?? []).filter((c) => {
      if (situacao && c.status !== situacao) return false
      if (!t) return true
      return normalizar([c.nome_fantasia, c.razao_social, c.contato_nome, c.cidade, c.bairro, c.segmento, c.cnpj_cpf].join(' ')).includes(t)
    })
  }, [lista, busca, situacao])

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
      <div className="flex flex-wrap items-end gap-3 justify-between">
        <div className="-mb-6"><Titulo sub="Seus clientes, com contato, endereço, visitas e o que cada um usa.">Clientes</Titulo></div>
        <div className="flex gap-2">
          {lista && lista.length > 0 && (
            <button type="button" onClick={() => baixarPlanilha(filtrados)}
              className="h-11 px-4 rounded-xl border border-line bg-panel font-bold flex items-center gap-2 cursor-pointer hover:border-ink transition-colors duration-150">
              <Download size={18} aria-hidden /><span className="hidden sm:inline">Baixar planilha</span>
            </button>
          )}
          <Link to="novo" className="h-11 px-4 rounded-xl bg-red text-white no-underline font-extrabold flex items-center gap-2 hover:brightness-110 transition duration-150">
            <Plus size={19} aria-hidden />Novo cliente
          </Link>
        </div>
      </div>

      {erro && <p role="alert" className="m-0 bg-redbg text-no rounded-xl p-4">Não foi possível carregar os clientes: {erro}</p>}
      {!lista && !erro && <p className="m-0 text-mute">Carregando clientes…</p>}

      {lista && lista.length === 0 && (
        <div className="bg-panel border border-line rounded-2xl p-8 grid gap-3 justify-items-center text-center">
          <span className="w-14 h-14 rounded-2xl bg-bg grid place-items-center"><UserRound size={28} aria-hidden /></span>
          <h2 className="text-xl">Nenhum cliente ainda</h2>
          <p className="m-0 text-mute max-w-[40ch]">Cadastre o primeiro. Nenhum campo é obrigatório: preencha só o que souber e complete depois.</p>
          <Link to="novo" className="h-11 px-5 rounded-xl bg-red text-white no-underline font-extrabold flex items-center gap-2"><Plus size={19} aria-hidden />Cadastrar cliente</Link>
        </div>
      )}

      {lista && lista.length > 0 && (
        <>
          <div className="grid gap-3">
            <CampoBusca valor={busca} mudar={setBusca} rotulo="Buscar por nome, cidade, bairro, segmento ou CNPJ" />
            <div className="flex gap-2 flex-wrap">
              <Chip ativo={!situacao} onClick={() => setSituacao('')}>Todos {lista.length}</Chip>
              {Object.entries(SITUACAO).map(([k, v]) => (
                <Chip key={k} ativo={situacao === k} onClick={() => setSituacao(situacao === k ? '' : k)}>{v.nome} {lista.filter((c) => c.status === k).length}</Chip>
              ))}
            </div>
          </div>

          {/* Computador: tabela */}
          <div className="hidden md:block bg-panel border border-line rounded-2xl overflow-hidden">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-bg text-left text-mute">
                <tr>
                  <th className="px-4 py-3 font-bold">Cliente</th>
                  <th className="px-4 py-3 font-bold">Cidade</th>
                  <th className="px-4 py-3 font-bold">Contato</th>
                  <th className="px-4 py-3 font-bold">Situação</th>
                  <th className="px-4 py-3 font-bold">Próxima visita</th>
                  <th className="px-2 py-3"><span className="sr-only">Abrir</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtrados.map((c) => (
                  <tr key={c.id} className="hover:bg-bg transition-colors duration-150">
                    <td className="px-4 py-3">
                      <Link to={c.id!} className="no-underline text-ink font-extrabold">{nomeCliente(c)}</Link>
                      {c.segmento && <div className="text-mute">{c.segmento}</div>}
                    </td>
                    <td className="px-4 py-3">{[c.cidade, c.uf].filter(Boolean).join(' / ') || '—'}</td>
                    <td className="px-4 py-3">{c.contato_nome || '—'}{c.whatsapp && <div className="text-mute">{c.whatsapp}</div>}</td>
                    <td className="px-4 py-3">{c.status ? <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${SITUACAO[c.status].cls}`}>{SITUACAO[c.status].nome}</span> : '—'}</td>
                    <td className="px-4 py-3">{dataBR(c.proxima_visita)}</td>
                    <td className="px-2 py-3 text-right"><Link to={c.id!} aria-label={`Abrir ${nomeCliente(c)}`} className="text-mute"><ChevronRight size={20} /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Celular: cartões */}
          <ul className="md:hidden list-none p-0 m-0 bg-panel border border-line rounded-2xl divide-y divide-line overflow-hidden">
            {filtrados.map((c) => (
              <li key={c.id} className="flex items-center gap-2 pr-2">
                <Link to={c.id!} className="flex-1 min-w-0 no-underline text-ink px-4 py-3 grid gap-0.5">
                  <span className="font-extrabold leading-tight flex items-center gap-2">
                    <span className="truncate">{nomeCliente(c)}</span>
                    {c.status && <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${SITUACAO[c.status].cls}`}>{SITUACAO[c.status].nome}</span>}
                  </span>
                  <span className="text-sm text-mute truncate">{[c.contato_nome, c.cidade].filter(Boolean).join(' · ') || 'Sem contato cadastrado'}</span>
                </Link>
                {c.whatsapp && (
                  <a href={`https://wa.me/55${soDigitos(c.whatsapp)}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp de ${nomeCliente(c)}`}
                    className="w-11 h-11 rounded-full grid place-items-center text-ok hover:bg-okbg"><MessageCircle size={20} /></a>
                )}
                {!c.whatsapp && c.telefone && (
                  <a href={`tel:${soDigitos(c.telefone)}`} aria-label={`Ligar para ${nomeCliente(c)}`} className="w-11 h-11 rounded-full grid place-items-center text-ink hover:bg-bg"><Phone size={20} /></a>
                )}
              </li>
            ))}
          </ul>
          {!filtrados.length && <p className="m-0 text-mute">Nenhum cliente com esse filtro.</p>}
        </>
      )}
    </div>
  )
}
