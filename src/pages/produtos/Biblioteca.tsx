import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { arquivos, normalizar, ordemTipos, rotuloTipo, type TipoArquivo } from '../../lib/dados'
import { ItemArquivo } from '../../components/ArquivosRelacionados'
import { CampoBusca, Chip, Titulo } from '../../components/ui'

export default function Biblioteca() {
  const [params, setParams] = useSearchParams()
  const tipo = (params.get('tipo') ?? '') as TipoArquivo | ''
  const busca = params.get('q') ?? ''

  function atualizar(chave: string, valor: string) {
    const p = new URLSearchParams(params)
    if (valor) p.set(chave, valor)
    else p.delete(chave)
    setParams(p, { replace: true })
  }

  const lista = useMemo(() => {
    const t = normalizar(busca.trim())
    return arquivos.filter((a) => (!tipo || a.tipo === tipo) && (!t || normalizar(a.titulo + ' ' + a.origem).includes(t)))
  }, [tipo, busca])

  const contagem = (t: TipoArquivo) => arquivos.filter((a) => a.tipo === t).length

  return (
    <div>
      <Titulo sub="Arquivos da pasta Unipega no Drive. Os links só abrem para quem tem acesso à pasta.">Biblioteca do Drive</Titulo>
      <div className="grid gap-3 mb-4">
        <CampoBusca valor={busca} mudar={(v) => atualizar('q', v)} rotulo="Buscar arquivo" />
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          <Chip ativo={!tipo} onClick={() => atualizar('tipo', '')}>Todos ({arquivos.length})</Chip>
          {ordemTipos.map((t) => <Chip key={t} ativo={tipo === t} onClick={() => atualizar('tipo', tipo === t ? '' : t)}>{rotuloTipo[t]} ({contagem(t)})</Chip>)}
        </div>
      </div>
      <p className="text-sm text-mute mb-2">{lista.length} arquivo{lista.length === 1 ? '' : 's'}</p>
      <ul className="list-none p-0 m-0 bg-panel border border-line rounded-xl px-4">
        {lista.map((a) => <ItemArquivo key={a.id} a={a} />)}
      </ul>
    </div>
  )
}
