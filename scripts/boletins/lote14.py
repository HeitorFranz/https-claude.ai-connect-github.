exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
D_PU = lambda shore, rup, al, pel, dens, cores: {'Formação de película':pel,'Cura':'2,0 mm/24 h','Densidade':dens,'Dureza Shore A':shore,'Tensão de ruptura':rup,'Alongamento':al,'Temperatura de aplicação':'5 a 40 °C','Resistência térmica':'-40 / +90 °C','Cores':cores}
salvar('pu-40-multiuso', boletim_id='12vGwAtJ6Wb3i48GpuhCrq68Cb8f6Spi4', titulo='PU 40 Multiuso',
  caracteristicas='Selante híbrido para vedação perimetral de vidros e esquadrias, juntas em granito, concreto, madeira e metal, tubulações, portas, janelas, calhas, rufos, dutos, toldos e telhados. Ideal para calafetação. Adere em metal, madeira, vidro, fibra de vidro, pedra e cerâmica. Não escorre, cura com a umidade do ar e vira borracha flexível. Pode ser pintado após a cura. Resiste a UV e intempéries.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_HIB, armazenamento=ARM_12, dados=D_PU('40','1,0 MPa','100%','20 min','1,68 g/cm³','Branco, cinza, preto'))
salvar('pu-calhas-pu-35-hibrido-construcao', boletim_id='1RrukyI7_zPb8jm3OBH-LwmCv5AjyGAS-', titulo='PU Calhas – Selante multiuso',
  caracteristicas='Selante híbrido para vedação entre chapas, calhas e rufos, e de madeira, aço, alumínio, cerâmica e concreto. Ideal para calafetação. Não escorre, cura com a umidade do ar e vira borracha flexível. Pode ser pintado após a cura.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_HIB, armazenamento=ARM_12, dados=D_PU('40','0,8 MPa','80%','15 min','1,74 g/cm³','Cinza'))
salvar('pu-calhas-pu-35-hibrido-construcao', boletim_id='10QIjBqF_N34GvBf9LMJJ8E5xAtkGOu9j', titulo='PU 35 – Selante de construção',
  caracteristicas='Selante híbrido para vedação e colagem de pré-moldados, painéis metálicos e juntas de concreto, aço, alumínio, madeira, vidro, fibra de vidro e cerâmica. Ideal para calafetação. Não escorre, cura com a umidade do ar e vira borracha flexível. Pode ser pintado após a cura. Excelente resistência a UV e intempéries.',
  preparo=PREP, modo_de_uso=MODO_SEL,
  limitacoes='Não aplicar em aquários; nem em polietileno, polipropileno, nylon, acrílico e teflon (PTFE); nem em peças em contato com alimentos ou imersão contínua; nem em fachadas de vidro ou adesão estrutural. Fazer pré-teste antes de pintar; tintas à base de solvente ou óleo podem prejudicar.',
  armazenamento=ARM_12, dados=D_PU('35','1,0 MPa','100%','20 min','1,68 g/cm³','Branco, cinza, preto'))
salvar('pu-flex-uso-geral', boletim_id='1kJj4W27xZpgnx-ja8ysHDb-J6zF2dX6X', titulo='PU Flex Uso Geral',
  caracteristicas='Selante híbrido para vedações e calafetações perimetrais em geral. Veda madeira, aço, alumínio, cerâmica, concreto, calhas e rufos. Não escorre, cura com a umidade do ar e vira borracha flexível. Pode ser pintado após a cura.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_HIB, armazenamento=ARM_12, dados=D_PU('40','1,0 MPa','100%','20 min','1,68 g/cm³','Branco, cinza, preto'))
print('lote 14 ok')
