import { readFileSync, writeFileSync } from 'node:fs'
import { test } from 'vitest'
import { lerTabela } from '../tabelaPrecos'
test.skipIf(!process.env.SAIDA)('exporta json', () => {
  const t = lerTabela(readFileSync(process.env.TABELA_XLSX!).buffer as ArrayBuffer)
  writeFileSync(process.env.SAIDA!, JSON.stringify(t))
})
