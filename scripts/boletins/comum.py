import json, pathlib
SAIDA = pathlib.Path('/home/user/consulta-unipega/data/boletins')
LIM_ACR = ("Não aplicar em espelhos e aquários; nem em polietileno, polipropileno, nylon, acrílico e teflon (PTFE); nem em contato com alimentos "
  "ou imersão contínua em líquidos; nem em adesão estrutural que exija resistência; nem em superfícies que soltam óleo, plastificantes ou solventes "
  "(madeira com óleo), molhadas ou com revestimento descascando. Para colagem, ao menos um dos substratos deve ser poroso. Fazer pré-teste antes de pintar; "
  "tintas à base de solvente ou óleo podem prejudicar o produto.")
ARM_30 = "Embalagem original, 5 a 30 °C, longe do sol e de fontes de calor. Não devolver sobras à embalagem. Validade: 18 meses."
PREP = ["Superfície seca, limpa, sem pó e sem óleo; lixar resíduos soltos.", "Desengordurar com álcool isopropílico — nunca querosene ou gasolina.",
  "Usar fita nas laterais da junta para melhor acabamento.", "Em substratos não citados, fazer teste de aderência antes."]
MODO_SEL = ["Aplicar e fazer o acabamento imediatamente.", "Se usar fita, retirá-la antes de formar película.",
  "Após o uso, deixar um tampão de produto no bico; depois de aberto, usar em até 1 semana.", "Limpar ferramentas antes da cura; depois de curado, só sai mecanicamente."]
IMPORT = ["Secagem completa varia com temperatura e espessura; em dias frios e úmidos pode levar até 10 dias.", "Aplicar entre 10 e 40 °C.",
  "Evitar contato com água nas primeiras 24 h.", "Espessura máxima de 8 mm."]
def salvar(pid, **b):
    f = SAIDA / f'{pid}.json'
    lista = json.loads(f.read_text()) if f.exists() else []
    lista = [x for x in lista if x['boletim_id'] != b['boletim_id']] + [b]
    f.write_text(json.dumps(lista, ensure_ascii=False, indent=1))
LIM_ACET = ("Não aplicar em vidro laminado, metais corrosíveis, espelhos, superfícies pintadas, aquários e concreto; nem em polietileno, polipropileno, "
  "policarbonato, acrílico e teflon (PTFE); nem em peças em contato com alimentos ou imersão contínua; nem em fachadas de vidro ou adesão estrutural. Não aceita pintura.")
ARM_12 = "Embalagem original, 5 a 30 °C, longe do sol e de fontes de calor. Não devolver sobras à embalagem. Validade: 12 meses."
LIM_HIB = ("Não aplicar em aquários; nem em polietileno, polipropileno, nylon, acrílico e teflon (PTFE); nem em peças em contato com alimentos ou imersão contínua; "
  "nem em fachadas de vidro ou adesão estrutural; nem em juntas de movimentação e fachadas de edificações. Fazer pré-teste antes de pintar; tintas à base de solvente ou óleo podem prejudicar.")
LIM_NEU = ("Não aplicar em aquários; nem em polietileno, polipropileno, nylon, acrílico e teflon (PTFE); nem em peças em contato com alimentos ou imersão contínua; "
  "nem em fachadas de vidro ou adesão estrutural. Não aceita pintura.")
ESPELHO = ['Fixação de espelho: substrato (parede, azulejo, madeira) limpo e nivelado.','Aplicar fita dupla face no espelho.',
  'Aplicar o adesivo em filetes verticais de 10 mm de largura por 6 mm de altura.',
  'Unir as superfícies em até 5 minutos, mantendo no mínimo 3 mm entre espelho e parede.',
  'Conferir a posição antes de encostar — a fita não permite reposicionar.','Usar calços de apoio e retirar só depois de no mínimo 6 h.',
  'Seguir a norma ABNT NBR 15198 (espelho de prata – beneficiamento e instalação).']
CUBA = ['Fixação de cuba: aplicar o produto na cuba e pressionar imediatamente contra a pedra.','Esperar 6 h para movimentar a cuba e 24 h para usar.']
HIB50 = {'Formação de película':'10 min','Cura':'3,0 mm/24 h','Densidade':'1,70 g/cm³','Dureza Shore A':'50','Tensão de ruptura':'2,5 MPa','Alongamento':'80%','Temperatura de aplicação':'5 a 40 °C','Resistência térmica':'-40 / +90 °C'}
ARM_AER = "Embalagem original, 5 a 30 °C, sempre em pé, longe do sol e de calor. Não expor a mais de 50 °C nem deixar dentro do carro. Validade: 24 meses."
LIM_FISPQ = "Ler a FISPQ (ficha de segurança) e seguir as precauções da embalagem antes de usar."
PVA = 'Adesivo PVA com alta força de colagem e flexibilidade, para artefatos de madeira, laminados, papel e papelão. Recomendado para montagem de móveis. À base de água, não tóxico, odor suave, fácil de aplicar. Colagens de alto desempenho em madeiras de média e baixa densidade, aglomerados e superfícies porosas. Serve para colagem a frio e a quente.'
ARM_AER36 = ARM_AER.replace('24 meses', '36 meses')
GRAXAS = 'graxa-branca-graxa-spray-grafite-vaselina-silicone-spray-lub-correntes'
ANTI_MODO = ['Aplicar na região da solda e nas áreas por onde os respingos devem escorrer — basta uma camada leve de óleo.','Soldar normalmente: a maior parte dos respingos escorre até o chão; os que ficarem saem com pouca pressão, mesmo frios.','Antes de pintar, limpar a peça com desengraxante spray.']
FITAS = 'demarcacao-antiderrapante-empacotamento-dupla-face'
ARM48 = 'Embalagem original, abaixo de 30 °C, longe do sol e de calor. Validade: 48 meses.'
PREP_F = ['Superfície limpa, seca, sem pó, sujeira ou contaminantes.','Temperatura ideal de aplicação: 20 °C. Testar antes em condição parecida.']
PRESS = 'Aplicar com pressão uniforme — o adesivo é sensível à pressão e precisa de contato total.'
