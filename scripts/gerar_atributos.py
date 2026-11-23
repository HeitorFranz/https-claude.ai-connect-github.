"""Gera data/atributos_produtos.json. Cada valor vem de produtos.json, dos boletins (data/boletins.json) ou das
notas de treinamento; None = sem informação. Rodar: python3 -I scripts/gerar_atributos.py"""
import json, pathlib
raiz = pathlib.Path(__file__).resolve().parent.parent / 'data'

PLAST = ['pe_pp']
ACET_PROIB = ['concreto', 'espelho', 'galvanizado', 'ferro', 'policarbonato', 'pe_pp']
A = {}
def a(pid, funcoes, ok, proib=(), amb=('interno',), amb_proib=(), pintavel=None, transparente=False, sem_cheiro=None,
      sem_pistola=None, flexivel=None, peso=False, cura_rapida=False, temp_max=None, aviso=None, publico=('consumidor', 'profissional')):
    A[pid] = dict(id=pid, funcoes=list(funcoes), materiais_ok=list(ok), materiais_proibidos=list(proib), ambientes_ok=list(amb),
                  ambientes_proibidos=list(amb_proib), pintavel=pintavel, transparente=transparente, sem_cheiro=sem_cheiro,
                  sem_pistola=sem_pistola, junta_movimentacao=flexivel, aguenta_peso=peso, cura_rapida=cura_rapida,
                  temp_max_c=temp_max, publico=list(publico), aviso=aviso)

EXT_MOL = ('interno', 'externo', 'molhado')
# Silicones acéticos (boletins: não aceita pintura; proíbe concreto, espelho, metal corrosivo, policarbonato, PE/PP, aquário)
a('acetico-uso-geral', ['vedar', 'colar'], ['vidro', 'aluminio', 'ceramica'], ACET_PROIB, EXT_MOL, ['submerso', 'aquario'], False, True, False, True, True, temp_max=120)
a('acetico-100-profissional', ['vedar', 'colar'], ['vidro', 'aluminio', 'ceramica'], ACET_PROIB, EXT_MOL, ['submerso', 'aquario'], False, True, False, False, True, temp_max=120, publico=['profissional'])
a('acetico-multiuso', ['vedar', 'colar'], ['vidro', 'aluminio', 'ceramica'], ACET_PROIB, EXT_MOL, ['submerso', 'aquario'], False, True, False, False, True, temp_max=120)
a('acetico-alta-temperatura', ['vedar'], ['ferro', 'motor', 'vidro', 'aluminio'], ['concreto', 'espelho', 'galvanizado', 'policarbonato', 'pe_pp'], ('interno', 'externo', 'alta_temp'), ['submerso', 'aquario'], False, False, False, True, True, temp_max=315)
a('acetico-100-sem-fungicida', ['vedar', 'colar'], ['vidro', 'aluminio', 'ceramica'], ACET_PROIB, ('interno', 'externo', 'aquario', 'submerso'), [], False, True, False, False, True, temp_max=180,
  aviso='Sem fungicida: em banheiro e área úmida comum pode mofar.')
# Silicones neutros
a('neutro-100', ['vedar', 'colar'], ['concreto', 'pedra', 'ceramica', 'ferro', 'vidro', 'policarbonato', 'pvc', 'aluminio', 'galvanizado'], PLAST, EXT_MOL, ['submerso', 'aquario'], False, True, None, False, True, temp_max=120)
a('neutro-alta-temperatura-ultra', ['vedar'], ['ferro', 'motor', 'vidro', 'aluminio'], PLAST, ('interno', 'externo', 'alta_temp'), ['submerso', 'aquario'], False, False, None, True, True, temp_max=350)
a('aluzinco', ['vedar'], ['galvanizado', 'aluminio', 'vidro', 'ferro', 'concreto', 'madeira'], PLAST, EXT_MOL, ['submerso', 'aquario'], False, False, None, False, True, temp_max=120)
a('silicone-sem-cheiro-easy-pack', ['vedar'], ['vidro', 'ceramica', 'ferro', 'concreto'], PLAST, EXT_MOL, ['aquario'], None, False, True, True, True)
a('silicone-neutro-vidro-duplo', ['vedar'], ['vidro'], PLAST, ('interno', 'externo'), ['submerso', 'aquario'], False, False, None, False, True, temp_max=180, publico=['profissional'])
# Acrílicos (boletins: pintáveis, proíbem espelho/aquário/PE-PP/imersão; -20/+60 °C)
ACR_P = ['espelho', 'pe_pp']
a('sela-trincas', ['preencher', 'vedar'], ['concreto', 'gesso'], ACR_P, ('interno', 'externo'), ['submerso', 'aquario', 'molhado'], True, False, True, True, False, temp_max=60)
a('tapa-tudo', ['preencher'], ['madeira', 'gesso', 'concreto'], [], ('interno',), ['molhado', 'submerso'], True, False, True, True, False)
a('silicone-flexivel-base-d-agua', ['vedar', 'colar', 'preencher'], ['madeira', 'concreto', 'gesso', 'pedra'], ACR_P, ('interno', 'externo'), ['submerso', 'aquario', 'molhado'], True, False, True, True, True, temp_max=60)
a('veda-calhas', ['vedar'], ['galvanizado', 'aluminio', 'ferro'], ACR_P, ('externo',), ['submerso', 'aquario'], True, False, True, True, None, temp_max=60,
  aviso='Precisa de tempo seco para curar: chuva logo após a aplicação lava o produto.')
a('monta-e-fixa', ['colar', 'fixar'], ['madeira', 'concreto', 'gesso', 'pedra', 'ceramica'], ACR_P, ('interno', 'externo'), ['submerso', 'aquario'], True, False, True, False, False, temp_max=60)
a('cola-rodape', ['colar', 'fixar'], ['madeira', 'gesso', 'ceramica', 'concreto'], ACR_P, ('interno',), ['submerso', 'aquario'], True, False, True, False, False, temp_max=80)
a('adesivo-para-pisos-vinilicos', ['colar'], ['concreto', 'pvc'], ['ceramica', 'madeira', 'ferro'], ('interno',), ['molhado', 'externo', 'submerso'], None, False, True, True, False, temp_max=42, publico=['profissional'])
a('adesivo-placas-pvc', ['colar', 'fixar'], ['pvc', 'madeira', 'gesso', 'concreto'], ACR_P, ('interno',), ['submerso', 'aquario'], None, False, True, False, False)
# Híbridos (boletins: -40/+90 °C, pintáveis com pré-teste, proíbem aquário/PE-PP/juntas de movimentação)
HIB_P = ['pe_pp']
a('pu-40-profissional', ['vedar', 'colar'], ['concreto', 'ferro', 'aluminio', 'madeira', 'vidro', 'ceramica', 'galvanizado'], HIB_P, EXT_MOL, ['submerso', 'aquario'], True, False, None, False, True, temp_max=90, publico=['profissional'],
  aviso='O boletim técnico diz para NÃO aplicar em juntas de movimentação; o material de divulgação indica para junta de dilatação. Confirmar com o fabricante.')
a('pu-40-multiuso', ['vedar', 'colar'], ['vidro', 'aluminio', 'concreto', 'madeira', 'ferro', 'pedra', 'ceramica', 'galvanizado'], HIB_P, EXT_MOL, ['submerso', 'aquario'], True, False, None, True, False, temp_max=90)
a('pu-flex-uso-geral', ['vedar'], ['madeira', 'ferro', 'aluminio', 'ceramica', 'concreto', 'galvanizado'], HIB_P, EXT_MOL, ['submerso', 'aquario'], True, False, None, True, False, temp_max=90)
a('pu-calhas-pu-35-hibrido-construcao', ['vedar', 'colar'], ['galvanizado', 'ferro', 'aluminio', 'madeira', 'ceramica', 'concreto', 'vidro'], HIB_P, EXT_MOL, ['submerso', 'aquario'], True, False, None, False, False, temp_max=90)
a('silicone-hibrido-clear-24h-cores', ['vedar', 'colar'], ['aluminio', 'vidro', 'ceramica', 'concreto', 'madeira', 'pedra', 'pvc', 'ferro'], ['espelho', 'pe_pp'], EXT_MOL, ['submerso', 'aquario'], True, True, None, True, True, temp_max=60)
a('high-tack-ultra', ['colar', 'fixar'], ['ferro', 'concreto', 'pedra', 'ceramica', 'vidro', 'policarbonato', 'pvc', 'madeira', 'espelho'], ['pe_pp', 'gesso'], EXT_MOL, ['submerso', 'aquario'], True, False, True, False, False, True, True, temp_max=90)
a('fixa-tudo', ['colar', 'fixar'], ['ferro', 'concreto', 'pedra', 'ceramica', 'vidro', 'policarbonato', 'pvc', 'espelho'], HIB_P, EXT_MOL, ['submerso', 'aquario'], True, False, None, True, False, True, temp_max=90)
a('fixa-cubas', ['colar', 'fixar'], ['pedra', 'ceramica', 'ferro', 'concreto'], HIB_P, ('interno', 'molhado'), ['submerso', 'aquario'], True, False, None, False, False, True, temp_max=90)
a('fixa-espelhos', ['colar', 'fixar'], ['espelho', 'ceramica', 'madeira', 'concreto'], HIB_P, ('interno',), ['submerso', 'aquario'], True, False, None, False, False, True, temp_max=90)
a('crystal-clear', ['colar', 'vedar'], ['ferro', 'concreto', 'pedra', 'ceramica', 'vidro', 'policarbonato', 'pvc', 'madeira'], HIB_P, EXT_MOL, ['submerso', 'aquario'], True, True, True, False, False, temp_max=90)
a('parabrisas', ['colar'], ['vidro', 'ferro'], HIB_P, ('externo',), ['aquario'], None, False, None, False, False, temp_max=90, publico=['profissional'])
# Poliuretanos isocianato (produtos.json + notas)
a('u-flex-pu-44', ['vedar'], ['concreto', 'ferro', 'aluminio'], [], EXT_MOL, [], None, False, None, False, True, publico=['profissional'])
a('u-flex-pu-55', ['colar'], ['vidro', 'ferro'], [], ('externo',), [], None, False, None, False, False, publico=['profissional'])
# Espumas PU (boletins: não estrutural, não PE/PP, -40/+90, aceita pintura)
ESP = dict(proib=['pe_pp'], amb=('interno', 'externo'), amb_proib=['submerso'], pintavel=True, sem_pistola=True, temp_max=90)
a('espuma-pu-uso-geral', ['preencher', 'isolar', 'fixar'], ['ferro', 'madeira', 'concreto', 'ceramica', 'pedra'], **ESP)
a('espuma-pu-multiuso', ['preencher', 'isolar', 'fixar'], ['ferro', 'madeira', 'concreto', 'ceramica', 'pedra'], **ESP)
a('espuma-pu-profissional', ['preencher', 'isolar', 'fixar'], ['ferro', 'madeira', 'concreto', 'ceramica', 'pedra'], **{**ESP, 'sem_pistola': False}, publico=['profissional'])
# Adesivos e colas
a('chumbador-quimico-pro', ['ancorar', 'fixar'], ['concreto'], [], ('interno', 'externo', 'molhado'), [], None, False, None, False, False, True, True, publico=['profissional'])
a('adesivo-epoxi-pro-mf-tix', ['colar', 'ancorar'], ['concreto', 'ferro', 'pedra'], [], ('interno', 'externo'), [], None, False, None, None, False, True, publico=['profissional'])
a('bond-007', ['colar'], ['ferro', 'madeira', 'ceramica', 'tecido', 'pvc'], ['pe_pp'], ('interno',), ['submerso'], None, True, None, True, False, False, True)
a('colas-brancas-original-extra-multiuso-extra', ['colar'], ['madeira', 'tecido'], [], ('interno',), ['molhado', 'submerso'], None, False, True, True, False)
a('cola-madeira', ['colar'], ['madeira'], [], ('interno',), ['molhado', 'submerso'], None, False, True, True, False, cura_rapida=True)
# Fitas e vedação sanitária
a('fita-crepe', ['proteger', 'fixar'], [], [], ('interno',), [], None, False, True, True, False)
a('silver-tape', ['vedar', 'fixar'], ['ferro', 'pvc', 'tecido'], [], ('interno', 'externo', 'molhado'), [], None, False, True, True, False)
a('fita-isolante', ['isolar'], ['eletrico'], [], ('interno', 'externo'), [], None, False, True, True, False, temp_max=80)
a('demarcacao-antiderrapante-empacotamento-dupla-face', ['fixar', 'proteger'], ['concreto', 'vidro', 'ferro', 'madeira', 'ceramica'], [], ('interno', 'externo'), [], None, True, True, True, False)
a('fita-veda-rosca', ['vedar'], ['pvc', 'ferro'], [], ('interno', 'externo', 'molhado'), [], None, False, True, True, False, temp_max=240)
a('anel-de-vedacao-para-vaso', ['vedar'], ['ceramica', 'pvc'], [], ('interno', 'molhado'), [], None, False, True, True, False, temp_max=50)
# Aerossóis
a('uni-lub', ['desengripar', 'lubrificar', 'proteger'], ['ferro', 'motor'], [], ('interno', 'externo'), [], None, False, None, True, False)
a('uni-80', ['limpar'], ['motor'], [], ('interno', 'externo'), [], None, False, None, True, False)
a('graxa-branca-graxa-spray-grafite-vaselina-silicone-spray-lub-correntes', ['lubrificar', 'proteger'], ['ferro', 'motor', 'plastico', 'tecido'], [], ('interno', 'externo', 'molhado'), [], None, False, None, True, False)
a('limpa-contato', ['limpar'], ['eletrico'], [], ('interno',), [], None, False, None, True, False)
a('antirrespingo-de-solda', ['proteger'], ['ferro'], [], ('interno', 'externo'), [], None, False, None, True, False)
a('gas-para-macarico', ['aquecer'], ['ferro'], [], ('externo',), [], None, False, None, True, False)
a('unispray-uso-geral-metalico-fluorescente-alta-temp-verniz', ['pintar', 'proteger'], ['ferro', 'madeira', 'ceramica', 'gesso'], [], ('interno', 'externo', 'alta_temp'), [], None, False, None, True, False, temp_max=600,
  aviso='Só a versão Alta Temperatura aguenta calor (até 600 °C); a Uso Geral não.')
a('corante-liquido', ['pintar'], [], [], ('interno', 'externo'), [], None, False, True, True, False, aviso='Só para tintas à base de água.')
a('espuma-limpa-tudo', ['limpar'], ['tecido'], [], ('interno',), [], None, False, None, True, False)
a('protetor-de-tecidos', ['proteger'], ['tecido'], [], ('interno',), [], None, False, None, True, False)
a('odorizador-e-limpa-ar-condicionado', ['perfumar', 'limpar'], [], [], ('interno',), [], None, False, None, True, False)
a('gancho-suporte-feltro-e-anti-impacto', ['fixar', 'proteger'], ['ceramica', 'madeira', 'vidro'], [], ('interno',), [], None, True, True, True, False)

# Cheiro: só o que os textos dizem (acético = cheiro de vinagre; Easy Pack = sem cheiro; colas PVA = odor suave).
SEM_CHEIRO = {'silicone-sem-cheiro-easy-pack', 'colas-brancas-original-extra-multiuso-extra', 'cola-madeira'}
for pid, x in A.items():
    x['sem_cheiro'] = False if pid.startswith('acetico') else (True if pid in SEM_CHEIRO else None)
# Sem pistola: decidido pela embalagem em produtos.json.
SEM_PISTOLA_EMB = ('isnaga', 'Easy Pack', 'ote ', 'Pote', 'Lata', 'lata', 'Frasco', 'Balde', 'balde', ' x ', 'Flow pack', 'Blister', 'mL.', 'cartela')
for p in json.loads((raiz / 'produtos.json').read_text()):
    emb = p['embalagens']
    x = A[p['id']]
    if 'com pistola' in emb:
        x['sem_pistola'] = False
    elif any(k in emb for k in SEM_PISTOLA_EMB) or 'artucho' not in emb and 'achê' not in emb:
        x['sem_pistola'] = True
    else:
        x['sem_pistola'] = False
x = A['chumbador-quimico-pro']; x['sem_pistola'] = False  # boletim: aplicar com pistola de selante

prods = [p['id'] for p in json.loads((raiz / 'produtos.json').read_text())]
falta = [p for p in prods if p not in A]
assert not falta, falta
(raiz / 'atributos_produtos.json').write_text(json.dumps([A[p] for p in prods], ensure_ascii=False, indent=1))
print(len(A), 'produtos com atributos')
