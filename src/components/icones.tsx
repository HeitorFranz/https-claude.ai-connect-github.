import { BookOpen, FileText, Folder, GraduationCap, Image, Images, Megaphone, PlayCircle, type LucideIcon } from 'lucide-react'
import type { TipoArquivo } from '../lib/dados'

export const iconeTipo: Record<TipoArquivo, LucideIcon> = {
  video: PlayCircle,
  treinamento: GraduationCap,
  boletim: FileText,
  arte: Image,
  banner: Megaphone,
  catalogo: BookOpen,
  foto: Images,
}
export const IconePasta = Folder
