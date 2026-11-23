exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
U = 'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz'
PREP_T = ['Superfície limpa, seca, sem pó, cera, gordura ou óleo e sem restos de tinta velha ou ferrugem.','Em superfícies absorventes, aplicar primer antes.']
MODO_T = ['Testar o jato apertando a válvula algumas vezes numa superfície qualquer.','Agitar bem a lata em movimentos circulares antes e durante o uso.','Aplicar a 25 cm, com movimentos constantes e uniformes; a primeira demão bem fina para não escorrer.','Esperar 1 a 3 min entre demãos.','Ao terminar, virar a lata para baixo e apertar até sair só gás (limpa a válvula).','Bico entupido: mergulhar em thinner ou acetona; se preciso, desentupir com agulha.','Usar máscara com filtro para vapores orgânicos, óculos e luvas de PVC.']
ARM_T = 'Local coberto e ventilado, 5 a 25 °C, lata em pé; nunca acima de 50 °C nem dentro do carro. Validade: 36 meses.'
D = lambda rend, **k: {'Secagem entre demãos':'1 a 3 min','Secagem ao toque':'≥ 30 min','Secagem total':'24 h','Rendimento (lata 350 mL)':rend,'Temperatura de aplicação':'5 a 45 °C', **k}
salvar(U, boletim_id='15mBF0yGgyjE2WSYsp9dIJUDMqHYzTw55', titulo='Tinta Spray Alta Temperatura',
  caracteristicas='Tinta acrílica em aerossol para partes externas de objetos e superfícies metálicas expostas a calor, com picos de até 600 °C (churrasqueira, escapamento, lareira, motor). Secagem rápida, camada sem bolhas. Sem CFC.',
  preparo=PREP_T, modo_de_uso=MODO_T, limitacoes=LIM_FISPQ, armazenamento=ARM_T,
  dados=D('1,2 a 1,5 m²', **{'Resistência térmica':'até 600 °C','Cores':'Alumínio, branco, preto fosco, preto brilhante'}))
salvar(U, boletim_id='1RHFAx4f4RuirOGsjpdYmNuLbsLGMgmVb', titulo='Tinta Spray Fluorescente',
  caracteristicas='Tinta em aerossol com efeito luminoso quando exposta à luz. Para decoração de ambientes internos, salões, lojas, escolas e vitrines, em vários materiais. Secagem rápida. Sem CFC.',
  preparo=PREP_T, modo_de_uso=MODO_T, limitacoes=LIM_FISPQ, armazenamento=ARM_T, dados=D('1,2 a 1,5 m²', Cores='Amarelo, laranja, rosa, verde'))
salvar(U, boletim_id='16kwMUD0AP1YvIklVVKgF1Tf3-oysPFxx', titulo='Tinta Spray Metálica',
  caracteristicas='Tinta acrílica em aerossol com efeito metálico para valorizar artesanato e decoração. Boa cobertura em metal, madeira, cerâmica, gesso e outros. Resiste a intempéries: uso interno e externo. Sem CFC.',
  preparo=PREP_T, modo_de_uso=MODO_T, limitacoes=LIM_FISPQ, armazenamento=ARM_T, dados=D('1,2 a 1,5 m²', Cores='Bronze, cromado, prata, ouro, rose gold'))
salvar(U, boletim_id='18JNMIFb9leka9riQGKvVl5QDA90Z2HQ_', titulo='Tinta Spray Uso Geral',
  caracteristicas='Tinta acrílica em aerossol para pinturas do dia a dia, com grande variedade de cores. Boa cobertura em metal, madeira, cerâmica, gesso e outros. Resiste a intempéries: uso interno e externo. Secagem rápida. Sem CFC.',
  preparo=PREP_T, modo_de_uso=MODO_T, limitacoes=LIM_FISPQ, armazenamento=ARM_T,
  dados=D('1,5 a 2,0 m²', Cores='Amarelo, branco brilhante, branco fosco, laranja, rosa, azul claro, azul escuro, marrom, verde, cinza claro, preto brilhante, preto fosco, vermelho, alumínio, grafite, violeta (lista do boletim)'))
salvar(U, boletim_id='1KOGxiS8nOxlrF9BVpxc4OvLZnVsAX7OM', titulo='Verniz Spray',
  caracteristicas='Verniz acrílico em aerossol para acabamento e proteção de pinturas, artesanato e decoração. Para metal, madeira, cerâmica, gesso e outros. Resiste a intempéries: uso interno e externo.',
  preparo=PREP_T, modo_de_uso=MODO_T, limitacoes=LIM_FISPQ, armazenamento=ARM_T, dados=D('1,2 a 1,5 m²', Acabamentos='Brilhante, fosco'))
print('lote 9 ok')
