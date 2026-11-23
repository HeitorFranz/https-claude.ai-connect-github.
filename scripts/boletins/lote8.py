exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
G = 'gancho-suporte-feltro-e-anti-impacto'
PREP_ISO = ['Limpar a superfície SOMENTE com álcool isopropílico — outro produto pode comprometer a fita.','Remover toda oleosidade e poeira.']
ARM48 = 'Embalagem original, abaixo de 30 °C, longe do sol e de calor. Validade: 48 meses.'
salvar(GRAXAS, boletim_id='1C0xZLmwjT5GX7wcM5qjkwNorRNr7-9NT', titulo='Lubrificante Correntes Spray',
  caracteristicas='Lubrifica e protege correntes de motos, bicicletas, equipamentos agrícolas e máquinas com corrente. Penetra fundo, prolonga a vida útil, repele água e sujeira e não espirra como lubrificantes comuns. Proteção temporária contra corrosão e desgaste.',
  preparo=[], modo_de_uso=['Aplicar com o prolongador direto na corrente.','Dá para aplicar com o equipamento em movimento, mas parado o lubrificante penetra e fixa melhor.'],
  limitacoes='Proteção temporária — reaplicar periodicamente.', armazenamento=ARM_AER36, dados={})
salvar(GRAXAS, boletim_id='1jABOU6o-89y9daVlt3C-6G8gdvflTt3H', titulo='Silicone Spray Lubrificante',
  caracteristicas='Protege e lubrifica: realça as cores por muito tempo e evita ressecamento de plásticos, borrachas e metais. Lubrifica fechaduras, dobradiças, trilhos de cortinas e persianas; repele umidade, reduz atrito, protege contra maresia e evita ruídos. Para painel de carro, pneus, bancos de couro ou courvin, para-choques, plásticos em geral, esteiras de ginástica, móveis, couro pintado, fórmica, metais escovados ou pintados, frisos e pedras lisas. Sem CFC.',
  preparo=[], modo_de_uso=['Pulverizar uma camada fina nas áreas desejadas.','Em locais de difícil acesso, usar o prolongador.'],
  limitacoes='Não aplicar em equipamentos energizados nem em superfícies quentes.', armazenamento=ARM_AER36, dados={})
salvar(G, boletim_id='1Ftfz0WeTxCghqf0zps3hsAwopZI8tBcu', titulo='Adesivo Anti-impacto',
  caracteristicas='Gotas transparentes, discretas e muito resistentes que absorvem impacto, reduzem vibração e ruído e protegem móveis: portas de armário batendo, tampo de vidro bambeando, objetos riscando móveis. Não deformam e têm colagem extraforte.',
  preparo=PREP_ISO, modo_de_uso=['Tirar o adesivo da cartela sem encostar os dedos na parte que cola.','Aplicar e pressionar bem.'], limitacoes='', armazenamento=ARM48,
  dados={'Dureza Shore A':'70','Resistência ao cisalhamento':'2,5 N/mm²','Temperatura de aplicação':'5 a 40 °C','Temperatura de trabalho':'-20 a 80 °C','Gota P':'Ø 8 mm × 2,3 mm — 25 un.','Gota M':'Ø 10 mm × 3,0 mm — 15 un.','Gota G':'Ø 15,7 mm × 8,0 mm — 10 un.'})
salvar(G, boletim_id='1O7XtjqRvJZnD0WR8yQldZAjs6blM2zzV', titulo='Gancho Adesivo',
  caracteristicas='Ganchos e organizadores adesivos para decorar e organizar casa ou trabalho sem furar — bons para imóvel alugado. Fáceis de aplicar, resistentes e saem sem deixar resíduo.',
  preparo=PREP_ISO, modo_de_uso=['Tirar o liner protetor da fita e aplicar no local.','Pressionar com força por 30 segundos.','Esperar 1 hora antes de pendurar.'],
  limitacoes='Quanto maior a área de contato, mais resiste: não aplicar em superfícies irregulares, curvas ou texturizadas. Não serve para objetos volumosos (ex.: prateleiras) nem para objetos que balançam como pêndulo. Ao remover, pode arrancar pintura ou reboco fraco. Conferir a carga na embalagem.',
  armazenamento=ARM48, dados={'Gancho âmbar P':'3 × 2,2 cm — até 500 g — 4 un.','Gancho âmbar M':'5 × 3 cm — até 1 kg — 2 un.','Gancho âmbar G':'5 × 11 cm — até 3 kg — 1 un.'})
salvar(G, boletim_id='14DuHKRhQlqbJF7JYaxsHnzhLmp-uuOb-', titulo='Fita Adesiva Smart (quadros)',
  caracteristicas='Pendura quadros sem prego, parafuso, bucha ou furadeira e sem danificar a parede. Fácil de colocar e de tirar — ideal para aluguel ou para quem muda a decoração. Aplica em azulejo, madeira, MDF e parede.',
  preparo=PREP_ISO, modo_de_uso=['Separar as fitas em pares e tirar as películas.','Colar quatro fitas nas pontas da moldura.','Colar as outras na parede, na mesma posição (devem ficar sobrepostas às da moldura).','Pressionar cada fita da parede com força por 30 segundos.','Encostar a moldura alinhando as fitas e pressionar.'],
  limitacoes='Verificar a carga de cada produto na embalagem antes de aplicar.', armazenamento=ARM48, dados={'Fita Smart G':'2 × 9 cm — até 2 kg — 4 un.'})
salvar(G, boletim_id='1is60AlCgMRtRORiLBzHseWO5fvhAavQd', titulo='Feltro Adesivo',
  caracteristicas='Feltro protetor que absorve impacto e evita riscos e deslizamento ao mover móveis, protegendo pisos delicados e objetos. Boa aderência em várias superfícies.',
  preparo=PREP_ISO, modo_de_uso=['Tirar o filme protetor de trás sem encostar os dedos no adesivo.','Aplicar e pressionar bem.'], limitacoes='', armazenamento=ARM48,
  dados={'Espessura':'5 mm','Resistência ao cisalhamento':'2,5 N/mm²','Temperatura de aplicação':'5 a 40 °C','Temperatura de trabalho':'-20 a 80 °C','Redondo':'Ø 30 mm — 12 un.','Quadrado':'30 × 30 mm — 12 un.'})
print('lote 8 ok')
