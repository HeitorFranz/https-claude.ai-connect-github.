import { AlertTriangle, BookA, FlaskConical, Grid3x3, Layers, Library, Lightbulb, ListChecks, ShieldCheck, type LucideIcon } from 'lucide-react'

export const secoes: { slug: string; titulo: string; desc: string; icone: LucideIcon }[] = [
  { slug: 'mapa', titulo: 'Química × material', desc: 'O que funciona em cada superfície', icone: Grid3x3 },
  { slug: 'problemas', titulo: 'Problemas e soluções', desc: 'O que fazer quando dá errado', icone: AlertTriangle },
  { slug: 'aplicar', titulo: 'Como aplicar', desc: 'Passo a passo', icone: ListChecks },
  { slug: 'regras', titulo: 'Regras de ouro', desc: 'O que nunca fazer', icone: ShieldCheck },
  { slug: 'quimicas', titulo: 'As químicas', desc: 'Acético, neutro, PU, acrílico…', icone: FlaskConical },
  { slug: 'materiais', titulo: 'Materiais', desc: 'Cuidados por superfície', icone: Layers },
  { slug: 'conceitos', titulo: 'Conceitos', desc: 'Cura, película, Shore…', icone: Lightbulb },
  { slug: 'glossario', titulo: 'Glossário', desc: 'Termos técnicos', icone: BookA },
  { slug: 'biblioteca', titulo: 'Biblioteca do Drive', desc: 'Vídeos, fotos, banners, boletins', icone: Library },
]
