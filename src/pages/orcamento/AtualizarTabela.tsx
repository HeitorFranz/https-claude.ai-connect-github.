import { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileSpreadsheet, Upload } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useTabela } from '../../lib/TabelaContext'
import type { TabelaPrecos } from '../../lib/tabelaPrecos'
import { Titulo, Voltar } from '../../components/ui'

export default function AtualizarTabela() {
  const { tabela: atual, recarregar } = useTabela()
  const navegar = useNavigate()
  const [nova, setNova] = useState<TabelaPrecos | null>(null)
  const [arquivo, setArquivo] = useState('')
  const [estado, setEstado] = useState<'' | 'lendo' | 'salvando'>('')
  const [erro, setErro] = useState('')

  async function escolher(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setErro(''); setNova(null); setEstado('lendo'); setArquivo(f.name)
    try {
      const { lerTabela } = await import('../../lib/tabelaPrecos')
      setNova(lerTabela(await f.arrayBuffer()))
    } catch (er) {
      setErro(`Não consegui ler essa planilha: ${(er as Error).message}`)
    }
    setEstado('')
  }

  async function salvar() {
    if (!nova) return
    setEstado('salvando'); setErro('')
    const { error } = await supabase.from('tabelas_preco').insert({ titulo: nova.titulo, arquivo, dados: nova })
    if (error) { setEstado(''); return setErro(`Não foi possível salvar: ${error.message}`) }
    await recarregar()
    navegar('/orcamento')
  }

  const mudancas = (() => {
    if (!nova || !atual) return null
    const velho = new Map(atual.itens.map((i) => [i.codigo, i]))
    let novos = 0, alterados = 0
    for (const i of nova.itens) {
      const v = velho.get(i.codigo)
      if (!v) novos++
      else if (JSON.stringify(v.base) !== JSON.stringify(i.base) || v.ipi !== i.ipi) alterados++
    }
    const saiu = atual.itens.filter((i) => !nova.itens.some((n) => n.codigo === i.codigo)).length
    return { novos, alterados, saiu }
  })()

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5 max-w-3xl">
      <div className="grid gap-2">
        <Voltar para="/orcamento" rotulo="Orçamento" />
        <div className="-mb-6"><Titulo sub="Todo mês envie a TABELA NAC nova (.xlsx). Os preços, impostos, fretes, prazos e tabelas de desconto são lidos dela.">Atualizar tabela do mês</Titulo></div>
      </div>
      {atual && <p className="m-0 text-sm text-mute">Tabela em uso: <b className="text-ink">{atual.titulo}</b> ({atual.itens.length} itens)</p>}

      <label className="bg-panel border-2 border-dashed border-line rounded-2xl p-8 grid gap-2 justify-items-center text-center cursor-pointer hover:border-ink transition-colors duration-150">
        <Upload size={30} aria-hidden />
        <span className="font-extrabold text-lg">{estado === 'lendo' ? 'Lendo a planilha…' : 'Escolher a planilha do mês'}</span>
        <span className="text-sm text-mute">Arquivo .xlsx, do jeito que a Unipega envia</span>
        <input type="file" accept=".xlsx,.xlsm" onChange={escolher} className="sr-only" />
      </label>

      {erro && <p role="alert" className="m-0 bg-redbg text-no rounded-xl p-4">{erro}</p>}

      {nova && (
        <section className="bg-panel border border-line rounded-2xl p-5 grid gap-3">
          <h2 className="text-lg flex items-center gap-2"><FileSpreadsheet size={20} aria-hidden />{nova.titulo}</h2>
          <dl className="m-0 grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden text-sm">
            {[['Produtos', nova.itens.length], ['Tabelas (canais)', nova.canais.length], ['Fretes', nova.fretes.length], ['Prazos', nova.prazos.length]].map(([k, v]) => (
              <div key={k} className="bg-bg px-3 py-2"><dt className="text-mute">{k}</dt><dd className="m-0 font-extrabold text-lg">{v}</dd></div>
            ))}
          </dl>
          {mudancas && <p className="m-0 text-sm">Comparado com a tabela atual: <b>{mudancas.alterados}</b> com preço alterado, <b>{mudancas.novos}</b> novos, <b>{mudancas.saiu}</b> saíram.</p>}
          <button type="button" onClick={salvar} disabled={estado === 'salvando'}
            className="h-12 rounded-xl bg-red text-white font-extrabold cursor-pointer disabled:opacity-60 hover:brightness-110 transition duration-150">
            {estado === 'salvando' ? 'Salvando…' : 'Usar esta tabela a partir de agora'}
          </button>
        </section>
      )}
    </div>
  )
}
