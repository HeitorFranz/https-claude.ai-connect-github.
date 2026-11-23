import { readFileSync, existsSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { lerTabela } from '../tabelaPrecos'
import { calcularPreco } from '../precos'

const ARQ = process.env.TABELA_XLSX ?? ''
describe.skipIf(!ARQ || !existsSync(ARQ))('tabela de preços (planilha real)', () => {
  const t = lerTabela(readFileSync(ARQ).buffer as ArrayBuffer)
  test('lê as tabelas internas', () => {
    expect(t.titulo).toMatch(/TABELA DE PREÇOS/)
    expect(t.canais.length).toBeGreaterThan(10)
    expect(t.ufs.find((u) => u.uf === 'SC')?.icms).toBe(0.12)
    expect(t.itens.length).toBeGreaterThan(300)
  })
  // Valores calculados pela própria planilha na aba TABELA_UNIPEGA (Revenda 04, SP, CIF SP Capital, 28 DDL)
  test.each([
    ['AES0534.0001', 6.141684497179536],
    ['AES0534.0006', 9.625909356156388],
    ['AES0534.0020', 8.533398171561952],
  ])('preço de %s bate com a planilha', (cod, esperado) => {
    const item = t.itens.find((i) => i.codigo === cod)!
    const p = calcularPreco(t, item, { marca: 'UNIPEGA', mercado: 'CONSTRUÇÃO GERAL', canal: 'REVENDA 04', uf: 'SP', frete: 'CIF SP CAPITAL ( +3,50% )', prazo: '28 DDL', uso: 'REVENDA' })
    expect(p.unitario).toBe(Math.ceil(esperado * 100) / 100)
  })
  test('Stuhr bate com a aba TABELA_STUHR', () => {
    const item = t.itens.find((i) => i.codigo === 'AES0509.0528')!
    const p = calcularPreco(t, item, { marca: 'STUHR', mercado: 'CONSTRUÇÃO GERAL', canal: 'DISTRIBUIDOR STUHR', uf: 'SP', frete: 'CIF SP CAPITAL ( +3,50% )', prazo: '28 DDL', uso: 'REVENDA' })
    expect(p.unitario).toBe(Math.ceil(14.807955650651621 * 100) / 100)
  })
})
