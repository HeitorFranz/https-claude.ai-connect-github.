import { conhecimento } from '../../lib/dados'
import Html from '../../components/Html'
import { Cartao, Titulo } from '../../components/ui'

export function Conceitos() {
  return (
    <div>
      <Titulo>Conceitos</Titulo>
      <div className="grid gap-3 sm:grid-cols-2">
        {conhecimento.conceitos.map((c) => (
          <Cartao key={c.titulo}><h2 className="text-lg mb-1">{c.titulo}</h2><Html html={c.texto_html} /></Cartao>
        ))}
      </div>
    </div>
  )
}

export function Quimicas() {
  return (
    <div>
      <Titulo>As químicas</Titulo>
      <div className="grid gap-3 sm:grid-cols-2">
        {conhecimento.quimicas.map((q) => (
          <div key={q.nome} className="bg-panel border border-line border-l-8 rounded-xl p-4" style={{ borderLeftColor: q.cor }}>
            <div className="grid gap-2">
              <h2 className="text-xl flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: q.cor }} />{q.nome}</h2>
              <p className="m-0">{q.o_que_e}</p>
              <p className="m-0"><b className="text-ok">Vai bem:</b> {q.vai_bem}</p>
              <p className="m-0"><b className="text-no">Evitar:</b> {q.evitar}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Materiais() {
  return (
    <div>
      <Titulo>Materiais e substratos</Titulo>
      <div className="grid gap-3">
        {conhecimento.materiais.map((m) => (
          <Cartao key={m.material}>
            <h2 className="text-lg mb-1">{m.material}</h2>
            <p className="m-0 text-mute">{m.cuidado}</p>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              <p className="m-0"><b className="text-ok">Indicar:</b> {m.indicar}</p>
              <p className="m-0"><b className="text-no">Evitar:</b> {m.evitar}</p>
            </div>
          </Cartao>
        ))}
      </div>
    </div>
  )
}

export function Problemas() {
  return (
    <div>
      <Titulo sub="O problema que aparece na obra e o produto que resolve.">Problemas e soluções</Titulo>
      <div className="grid gap-3 sm:grid-cols-2">
        {conhecimento.problema_solucao.map((p) => (
          <Cartao key={p.cliente_diz}>
            <p className="m-0 font-bold text-lg">{p.cliente_diz}</p>
            <p className="m-0 mt-1"><b className="text-ok">Solução:</b> {p.vender}</p>
            <p className="m-0 mt-1 text-mute">{p.porque}</p>
          </Cartao>
        ))}
      </div>
    </div>
  )
}

export function Aplicar() {
  return (
    <div>
      <Titulo>Como aplicar</Titulo>
      <div className="grid gap-3 sm:grid-cols-2">
        {conhecimento.como_aplicar.map((c) => (
          <Cartao key={c.titulo}>
            <h2 className="text-lg mb-2">{c.titulo}</h2>
            <ol className="m-0 pl-5 grid gap-1 list-decimal">{c.passos.map((p) => <li key={p}>{p}</li>)}</ol>
          </Cartao>
        ))}
      </div>
    </div>
  )
}

export function Regras() {
  return (
    <div>
      <Titulo sub="Valem para qualquer marca e qualquer aplicação.">Regras de ouro</Titulo>
      <ol className="list-none p-0 m-0 grid gap-3">
        {conhecimento.regras_tecnicas_gerais.map((r, i) => (
          <li key={r} className="flex gap-3 bg-panel border border-line rounded-xl p-4">
            <span className="shrink-0 w-8 h-8 rounded-full bg-yel text-[#151311] font-extrabold grid place-items-center">{i + 1}</span>
            <span>{r}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
