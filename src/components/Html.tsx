import DOMPurify from 'dompurify'

/** Renderiza os textos dos JSON que contêm <b>. Só negrito passa pela sanitização. */
export default function Html({ html, className }: { html: string; className?: string }) {
  const limpo = DOMPurify.sanitize(html, { ALLOWED_TAGS: ['b', 'strong', 'i', 'em'], ALLOWED_ATTR: [] })
  return <span className={className} dangerouslySetInnerHTML={{ __html: limpo }} />
}
