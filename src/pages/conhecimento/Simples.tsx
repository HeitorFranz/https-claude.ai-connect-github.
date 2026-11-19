import { conhecimento, passosVenda } from '../../lib/dados'
import Html from '../../components/Html'
import { BotaoCopiar, Cartao, Titulo, linkWhatsApp } from '../../components/ui'

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
              <p className="m-0 text-mute"><b>Na venda:</b> {q.na_venda}</p>
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
      <Titulo>Problema → solução</Titulo>
      <div className="grid gap-3 sm:grid-cols-2">
        {conhecimento.problema_solucao.map((p) => (
          <Cartao key={p.cliente_diz}>
            <p className="m-0 font-bold text-lg">{p.cliente_diz}</p>
            <p className="m-0 mt-1"><b className="text-red">Vender:</b> {p.vender}</p>
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
            <ol className="m-0 pl-5 grid gap-1">{c.passos.map((p) => <li key={p}>{p}</li>)}</ol>
          </Cartao>
        ))}
      </div>
    </div>
  )
}

export function Segmentos() {
  return (
    <div>
      <Titulo>Clientes e segmentos</Titulo>
      <div className="grid gap-3 sm:grid-cols-2">
        {conhecimento.segmentos.map((s) => (
          <Cartao key={s.segmento}><h2 className="text-lg mb-1">{s.segmento}</h2><p className="m-0">{s.mix}</p></Cartao>
        ))}
      </div>
    </div>
  )
}

export function Regras() {
  return (
    <div>
      <Titulo sub="Valem para qualquer marca e qualquer venda.">Regras de ouro</Titulo>
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

export function Vender() {
  const m = conhecimento.marca
  return (
    <div className="grid gap-8">
      <div>
        <Titulo>Como vender</Titulo>
        <ol className="list-none p-0 m-0 grid gap-3 sm:grid-cols-2">
          {passosVenda.map((p, i) => (
            <li key={p.titulo} className="bg-panel border border-line rounded-xl p-4">
              <span className="text-xs font-bold text-red">PASSO {i + 1}</span>
              <h2 className="text-lg my-1">{p.titulo}</h2>
              <p className="m-0">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
      <section>
        <h2 className="text-2xl mb-3">Argumentos da marca</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Cartao><b className="text-red text-xs uppercase">Prêmio</b><p className="m-0 mt-1">{m.top_of_mind}</p></Cartao>
          <Cartao><b className="text-red text-xs uppercase">Empresa</b><p className="m-0 mt-1">{m.empresa}</p></Cartao>
          <Cartao><b className="text-red text-xs uppercase">Slogan</b><p className="m-0 mt-1 text-xl font-extrabold">"{m.slogan}"</p></Cartao>
          <Cartao><b className="text-red text-xs uppercase">Segmentos do catálogo</b><p className="m-0 mt-1">{m.segmentos_catalogo.join(' · ')}</p></Cartao>
        </div>
      </section>
      <section>
        <h2 className="text-2xl mb-3">Objeções comuns</h2>
        <div className="grid gap-3">
          {conhecimento.objecoes.map((o) => (
            <Cartao key={o.objecao}><p className="m-0 font-bold">{o.objecao}</p><p className="m-0 mt-1">{o.resposta}</p></Cartao>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl mb-3">Mensagens prontas para WhatsApp</h2>
        <div className="grid gap-3">
          {conhecimento.mensagens_whatsapp.map((t) => (
            <Cartao key={t}>
              <p className="m-0 whitespace-pre-line">{t}</p>
              <div className="flex gap-2 mt-3">
                <BotaoCopiar texto={t} />
                <a href={linkWhatsApp(t)} target="_blank" rel="noreferrer" className="h-10 px-3 rounded-lg bg-ok text-white text-sm font-bold no-underline grid place-items-center">Enviar no WhatsApp</a>
              </div>
            </Cartao>
          ))}
        </div>
      </section>
    </div>
  )
}
