import { describe, expect, test } from 'vitest'
import { filtrosVazios, recomendar, type Filtros } from '../recomendar'

const f = (parcial: Partial<Filtros>): Filtros => ({ ...filtrosVazios(), ...parcial })
const topo = (texto: string, filtros?: Filtros, n = 2) => recomendar(texto, filtros).resultados.slice(0, n).map((r) => r.produto.id)
const excluidos = (texto: string, filtros?: Filtros) => recomendar(texto, filtros).excluidos.map((e) => e.produto.id)

// Casos de aceitação da SPEC §8 (com o ajuste da junta de dilatação explicado no teste).
describe('Consulta UNIPEGA — casos da especificação', () => {
  test('calha de zinco no sol → Aluzinco', () => {
    expect(topo('calha de zinco vazando, pega sol', f({ funcoes: ['vedar'], materiais: ['galvanizado'], ambientes: ['externo'] }), 1)).toEqual(['aluzinco'])
  })
  test('aquário → só Acético 100% sem fungicida', () => {
    const r = recomendar('montar aquário', f({ ambientes: ['aquario'] }))
    expect(r.resultados.map((x) => x.produto.id)).toEqual(['acetico-100-sem-fungicida'])
  })
  test('colar espelho → Fixa Espelhos e acético em "Não use"', () => {
    expect(topo('colar espelho na parede', f({ materiais: ['espelho'] }), 1)).toEqual(['fixa-espelhos'])
    expect(excluidos('colar espelho na parede', f({ materiais: ['espelho'] }))).toContain('acetico-uso-geral')
  })
  test('trocar para-brisa → Parabrisas / U-Flex PU 55', () => {
    expect(topo('trocar para-brisa')).toEqual(expect.arrayContaining(['parabrisas', 'u-flex-pu-55']))
  })
  test('instalar porta → espuma PU', () => {
    expect(topo('instalar porta', f({ funcoes: ['preencher'] }))[0]).toMatch(/^espuma-pu/)
  })
  test('parafuso enferrujado → Uni Lub', () => {
    expect(topo('parafuso enferrujado travado', f({ funcoes: ['desengripar'] }), 1)).toEqual(['uni-lub'])
  })
  test('pedra pesada em parede úmida → High Tack Ultra', () => {
    expect(topo('colar pedra pesada, parede úmida', f({ exigencias: ['peso'], ambientes: ['molhado'] }), 1)).toEqual(['high-tack-ultra'])
  })
  test('box sem aparecer → Híbrido Clear ou Acético Uso Geral', () => {
    expect(topo('box do banheiro sem aparecer', f({ exigencias: ['transparente'], ambientes: ['molhado'] }))).toEqual(
      expect.arrayContaining(['silicone-hibrido-clear-24h-cores']),
    )
  })
  test('junta de dilatação → U-Flex PU 44 no topo; PU 40 Multiuso excluído', () => {
    // A SPEC também cita o PU 40 Profissional, mas o boletim técnico dele proíbe junta de movimentação:
    // ele continua na lista com aviso para confirmar com o fabricante.
    const filtros = f({ exigencias: ['flexivel'], materiais: ['concreto'] })
    expect(topo('junta de dilatação no piso', filtros)).toContain('u-flex-pu-44')
    expect(excluidos('junta de dilatação no piso', filtros)).toEqual(expect.arrayContaining(['pu-40-multiuso', 'pu-flex-uso-geral', 'pu-calhas-pu-35-hibrido-construcao']))
  })
  test('junta do motor → Acético Alta Temperatura', () => {
    expect(topo('vedar junta do motor', f({ ambientes: ['alta_temp'] }))).toContain('acetico-alta-temperatura')
  })
  test('pintar churrasqueira → Unispray (versão alta temperatura)', () => {
    expect(topo('pintar churrasqueira', f({ funcoes: ['pintar'], ambientes: ['alta_temp'] }), 1)).toEqual(['unispray-uso-geral-metalico-fluorescente-alta-temp-verniz'])
  })
  test('balde de polipropileno → alerta de primer e nenhum produto', () => {
    const r = recomendar('colar balde de polipropileno', f({ materiais: ['pe_pp'] }))
    expect(r.resultados).toHaveLength(0)
    expect(r.alertas[0]).toMatch(/primer/)
  })
  test('trinca antes de pintar → Sela Trincas / Tapa Tudo', () => {
    expect(topo('trinca na parede antes de pintar', f({ exigencias: ['pintavel'] }))).toEqual(expect.arrayContaining(['sela-trincas']))
    expect(excluidos('trinca na parede antes de pintar', f({ exigencias: ['pintavel'] }))).toContain('acetico-uso-geral')
  })
  test('vergalhão no concreto → Chumbador Químico PRO', () => {
    expect(topo('fixar vergalhão no concreto', f({ funcoes: ['ancorar'] }), 1)).toEqual(['chumbador-quimico-pro'])
  })
  test('sofá sujo → Espuma Limpa Tudo', () => {
    expect(topo('sofá sujo', f({ funcoes: ['limpar'], materiais: ['tecido'] }), 1)).toEqual(['espuma-limpa-tudo'])
  })
})

describe('busca pelo nome', () => {
  test('nome exato vem primeiro', () => {
    expect(topo('bond 007', undefined, 1)).toEqual(['bond-007'])
    expect(topo('aluzinco', undefined, 1)).toEqual(['aluzinco'])
  })
})
