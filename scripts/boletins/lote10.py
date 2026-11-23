exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
LIM_E = 'Não serve para montagem estrutural nem envidraçamento estrutural; não aplicar em contato direto com alimentos, imersão constante em água ou articulações com abrasão constante. Não adere em polietileno, polipropileno e teflon. Incompatível com cola de contato à base de solvente.'
PREP_E = ['Superfície limpa, sem pó e sem óleo.','Borrifar água em névoa no local antes de aplicar (melhora expansão e fixação).']
MODO_E = ['Aplicar entre 12 e 35 °C.','Agitar a lata com força por cerca de 1 minuto.','Encaixar o bico aplicador na válvula.','Virar a lata de cabeça para baixo e apertar o gatilho suavemente, enchendo só METADE do vão — a espuma expande.','Após 10 minutos, borrifar água de novo (melhor expansão, sem bolhas).','Juntas extensas: filetes de no máximo 4 cm, esperando secar um antes do próximo.','Pode cortar após 2 h; cura total em 24 h.','Usar todo o conteúdo da lata de uma vez.','Espuma ainda não curada sai com removedor de PU.']
D_E = lambda tr: {'Formação de película':'7 a 15 min','Tempo de corte':'50 a 100 min','Cura total':'24 h','Rendimento':'5,1 L a cada 100 g','Resistência à tração':tr,'Temperatura de aplicação':'12 a 35 °C','Resistência térmica':'-40 / +90 °C'}
ARM_E = lambda m: f'Embalagem original, 5 a 30 °C, lata em pé, longe do sol; nunca acima de 50 °C nem dentro do carro. Validade: {m} meses.'
CAR_G = 'Espuma expansiva de poliuretano, sem CFC, de alta expansão. Fixação de dutos e aparelhos de ar-condicionado, preenchimento de batentes de portas e janelas, cumeeiras, isolamento térmico e acústico. Adere em metal, madeira, alvenaria, cerâmica, mármore e granito. Não encolhe, pode ser cortada e lixada depois de seca e aceita pintura.'
salvar('espuma-pu-uso-geral', boletim_id='1xUdb7n6PieIEzjMn0jE-NFztUHD7_hbr', titulo='Espuma de PU Uso Geral', caracteristicas=CAR_G,
  preparo=PREP_E, modo_de_uso=MODO_E, limitacoes=LIM_E, armazenamento=ARM_E(13), dados=D_E('> 30 kPa'))
salvar('espuma-pu-multiuso', boletim_id='1QXSAHFQS3WiQDCcK1Tnw9GFZXSgE6IP9', titulo='Espuma de PU Multiuso', caracteristicas=CAR_G,
  preparo=PREP_E, modo_de_uso=MODO_E, limitacoes=LIM_E, armazenamento=ARM_E(13), dados=D_E('> 30 kPa'))
salvar('espuma-pu-profissional', boletim_id='1fapE9-UR0Fjsmv71Im1yzzwwbaqWNGoq', titulo='Espuma de PU Profissional',
  caracteristicas='Espuma de poliuretano de estrutura celular fina e excelente adesão em diversos materiais de construção. Preenchimento homogêneo e permanente, alta expansão, isolamento térmico e acústico, resiste a variações de temperatura. Para instalação de batentes, portas, janelas, telhas, placas de isolamento, acomodação de banheiras, ar-condicionado, eliminação de goteiras, revestimento de barcos, portas frigoríficas, junções de paredes e divisórias. Corta e lixa fácil depois de seca, aceita pintura. Sem CFC.',
  preparo=PREP_E, modo_de_uso=MODO_E, limitacoes=LIM_E, armazenamento=ARM_E(18), dados=D_E('> 50 kPa'))
salvar(FITAS, boletim_id='14t3oh9gMntp9m0QNU51m4AeYcs6eqGHt', titulo='Fita Zebrada – Demarcação de área',
  caracteristicas='Fita de polietileno em cores vivas para advertência e isolamento de áreas (sinalização, interdição, balizamento). Resiste a água, óleo e produtos químicos. Uso interno e externo, presa em cones, tripés e outras estruturas.',
  preparo=['Limpar e desobstruir o local; definir os limites antes (com cones, por exemplo).'],
  modo_de_uso=['Esticar a fita entre os pontos, bem visível, sem tensionar demais (pode romper).','Prender em postes, árvores, paredes ou estruturas; fixar as pontas com fita ou ganchos contra o vento.','Conferir que não bloqueia a passagem de forma perigosa.','Monitorar e substituir ou reforçar se soltar ou danificar.'],
  limitacoes='', armazenamento=ARM48, dados={'Material':'Polietileno','Espessura':'0,04 mm','Tração':'0,8 kgf/cm','Alongamento':'40%'})
salvar(FITAS, boletim_id='1n2MusXbirtehdUHbMZlH54MPAlymGMBj', titulo='Fita de Demarcação de Solo',
  caracteristicas='Fita de PVC flexível com adesivo de borracha para sinalizar piso no lugar da tinta, nas cores da NR-12. Resiste à maioria dos químicos e à umidade. Para quadras, fábricas, escritórios, bancos, estacionamentos, marcação de vidros, identificação de tubulações industriais, decoração e proteção.',
  preparo=['Superfície limpa, seca e sem pó; passar pano com álcool isopropílico.','Temperatura ideal de aplicação: 20 °C (mínimo 15 °C). Testar antes em condição parecida.'],
  modo_de_uso=['Aplicar com pressão uniforme — o adesivo é sensível à pressão e precisa de contato total.','Arredondar as pontas com tesoura para não levantar.','Manter o local sem água ou umidade por 48 a 72 h.'],
  limitacoes='Não indicada para ambientes com muita oleosidade, áreas com tráfego de veículos pesados ou de grande tração, nem sobre rejuntes do piso.',
  armazenamento=ARM48, dados={'Adesão ao aço':'164 gf/cm','Espessura':'0,15 mm','Tração':'2,1 kgf/cm','Alongamento':'178%','Temperatura mínima de aplicação':'15 °C','Temperatura de trabalho':'-25 a 80 °C'})
print('lote 10 ok')
