import { AlertTriangle, Archive, ExternalLink, ListChecks, Sparkles, Wrench } from 'lucide-react'
import type { Boletim } from '../lib/dados'

function Lista({ itens, numerada }: { itens: string[]; numerada?: boolean }) {
  const Tag = numerada ? 'ol' : 'ul'
  return <Tag className={`m-0 pl-5 grid gap-1 ${numerada ? 'list-decimal' : 'list-disc'}`}>{itens.map((i) => <li key={i}>{i}</li>)}</Tag>
}

function Bloco({ icone: Icone, titulo, children, tom = '' }: { icone: typeof Sparkles; titulo: string; children: React.ReactNode; tom?: string }) {
  return (
    <section className="grid gap-1.5">
      <h4 className={`m-0 text-base font-extrabold flex items-center gap-2 ${tom}`}><Icone size={18} aria-hidden />{titulo}</h4>
      {children}
    </section>
  )
}

export default function BoletimTecnico({ b, aberto }: { b: Boletim; aberto: boolean }) {
  const dados = Object.entries(b.dados)
  return (
    <details open={aberto} className="bg-panel border border-line rounded-xl">
      <summary className="cursor-pointer px-4 py-3 min-h-11 font-extrabold flex items-center gap-2">
        <span className="flex-1">{b.titulo}</span>
      </summary>
      <div className="px-4 pb-4 grid gap-4 border-t border-line pt-4">
        <Bloco icone={Sparkles} titulo="O que é e onde usar"><p className="m-0">{b.caracteristicas}</p></Bloco>
        {b.preparo.length > 0 && <Bloco icone={Wrench} titulo="Preparo da superfície"><Lista itens={b.preparo} /></Bloco>}
        {b.modo_de_uso.length > 0 && <Bloco icone={ListChecks} titulo="Como aplicar"><Lista itens={b.modo_de_uso} numerada /></Bloco>}
        {b.limitacoes && (
          <div className="bg-redbg rounded-lg p-3">
            <Bloco icone={AlertTriangle} titulo="O que NÃO fazer" tom="text-no"><p className="m-0">{b.limitacoes}</p></Bloco>
          </div>
        )}
        {dados.length > 0 && (
          <section>
            <h4 className="m-0 mb-1.5 text-base font-extrabold">Dados técnicos</h4>
            <dl className="m-0 border border-line rounded-lg divide-y divide-line">
              {dados.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-3 py-2 text-sm">
                  <dt className="text-mute">{k}</dt>
                  <dd className="m-0 font-bold text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <Bloco icone={Archive} titulo="Armazenamento e validade"><p className="m-0 text-sm">{b.armazenamento}</p></Bloco>
        <a href={`https://drive.google.com/file/d/${b.boletim_id}/view`} target="_blank" rel="noreferrer" className="text-sm font-bold inline-flex items-center gap-1">
          Abrir o boletim original (PDF) <ExternalLink size={14} aria-hidden />
        </a>
      </div>
    </details>
  )
}
