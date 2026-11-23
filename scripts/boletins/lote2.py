exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
salvar('sela-trincas', boletim_id='14rP6UA8aKLjRp1T4FE3ruGRqlUJ1KLu0', titulo='Sela Trincas',
  caracteristicas='Selante de base acrílica com fungicida para vedar trincas superficiais e fissuras com pouca movimentação. Adere em concreto, alvenaria e drywall. Aceita revestimento, pode ser lixado e pintado.',
  preparo=PREP[:2]+['Abrir a fissura com ferramenta pontiaguda e remover o material solto. Largura e profundidade máximas de 1 mm — fendas maiores podem indicar problema estrutural e devem ser avaliadas por profissional.'],
  modo_de_uso=['Preencher completamente a trinca.','Retirar o excesso pressionando levemente uma espátula.','Lixar após 24 h para dar acabamento.']+MODO_SEL[2:]+IMPORT,
  limitacoes=LIM_ACR, armazenamento=ARM_30,
  dados={'Formação de película':'15 min','Cura':'2,0 mm/24 h','Densidade':'1,58 g/cm³','Tensão de ruptura':'1,5 MPa','Alongamento':'50%','Temperatura de aplicação':'10 a 40 °C','Resistência térmica':'-20 / +60 °C','Cor':'Branco (RAL 9003)'})
salvar('veda-calhas', boletim_id='155d8t_yJ7H4hDFSqg0Fv2isNILGKky0z', titulo='Veda Calhas – Alumínio',
  caracteristicas='Selante com fungicida para calhas e emendas, rufos, telhas e pingadeiras galvanizadas. Também veda juntas de dutos de ar-condicionado e ventilação industrial. Pode ser pintado e revestido. Resiste à umidade e a fungos.',
  preparo=PREP, modo_de_uso=MODO_SEL+IMPORT, limitacoes=LIM_ACR, armazenamento=ARM_30,
  dados={'Formação de película':'30 min','Cura':'2,0 mm/24 h','Densidade':'1,05 g/cm³','Tensão de ruptura':'2,7 MPa','Alongamento':'400%','Temperatura de aplicação':'10 a 40 °C','Resistência térmica':'-20 / +60 °C','Cor':'Alumínio (RAL 9023)'})
salvar('acetico-100-sem-fungicida', boletim_id='1wkzT6Q8mE0BEJF29lsD_n8CPsYPPiVM8', titulo='Silicone Acético 100% sem fungicida',
  caracteristicas='Silicone acético monocomponente para vedação e selagem de aquários, terrários e câmaras frigoríficas. Excelente adesão em vidro, alumínio e azulejo. NÃO contém fungicida. Não escorre, cura em temperatura ambiente e fica flexível por muitos anos. Resiste a clima, UV e variação de temperatura.',
  preparo=PREP, modo_de_uso=MODO_SEL,
  limitacoes='Não aplicar em vidro laminado, metais corrosíveis, espelhos, superfícies pintadas e concreto; nem em polietileno, polipropileno, policarbonato, acrílico e teflon; nem em fachadas de vidro ou adesão estrutural. Não aceita pintura.',
  armazenamento=ARM_12,
  dados={'Formação de película':'8 min','Cura':'3,0 mm/24 h','Densidade':'1,03 g/cm³','Dureza Shore A':'25','Tensão de ruptura':'1,5 MPa','Alongamento':'200%','Temperatura de aplicação':'5 a 35 °C','Resistência térmica':'-40 / +180 °C','Cor':'Incolor'})
salvar('acetico-multiuso', boletim_id='1DgBPpslXkJid5DJiTCS9Nsyr4eViAYHG', titulo='Silicone Acético Multiuso',
  caracteristicas='Silicone acético monocomponente para vedação e colagem de alumínio, vidro, azulejo, louça sanitária e box de banheiro. Resiste a fungos, não escorre e cura com a umidade do ar, virando borracha flexível e resistente.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_ACET, armazenamento=ARM_12,
  dados={'Formação de película':'10 min','Cura':'3,0 mm/24 h','Densidade':'0,94 g/cm³','Dureza Shore A':'14','Tensão de ruptura':'1,3 MPa','Alongamento':'500%','Temperatura de aplicação':'5 a 35 °C','Resistência térmica':'-40 / +120 °C','Cores':'Incolor, branco, cinza, preto'})
salvar('acetico-uso-geral', boletim_id='1mWWDmjsmKUh8ofXmolenTfsSewONSMdN', titulo='Silicone Acético Vidro e Alumínio',
  caracteristicas='Silicone acético desenvolvido para esquadrias de janelas: instalação, colagem e vedação de esquadrias e vidros, telas e divisórias de chuveiro, janelas, juntas perimetrais, pias e banheiros. Adere em superfície molhada e, curado, vira borracha resistente à água, permanente e flexível. Não escorre. Resiste a intempéries, UV e variação de temperatura.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_ACET, armazenamento=ARM_12,
  dados={'Formação de película':'10 min','Cura':'3,0 mm/24 h','Densidade':'0,98 g/cm³','Dureza Shore A':'18','Tensão de ruptura':'1,4 MPa','Alongamento':'500%','Temperatura de aplicação':'5 a 35 °C','Resistência térmica':'-40 / +120 °C','Cores':'Incolor, branco, cinza, preto'})
salvar('acetico-alta-temperatura', boletim_id='1yP6M6U3G7YyKoGCKVYs2L9g98LIORncF', titulo='Silicone Acético Alta Temperatura',
  caracteristicas='Silicone acético para vedação de elementos de aquecimento, gaxetas de fornos, estufas, filtros de chaminé, fornos industriais e juntas de motor. Resiste a intempéries, altas temperaturas e óleo de motor. Não escorre, cura em temperatura ambiente e fica flexível. Temperatura intermitente de -40 a 315 °C.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_ACET, armazenamento=ARM_12,
  dados={'Formação de película':'8 min','Cura':'3,0 mm/24 h','Densidade':'1,03 g/cm³','Dureza Shore A':'26','Tensão de ruptura':'1,5 MPa','Alongamento':'250%','Temperatura de aplicação':'5 a 35 °C','Resistência térmica constante':'-40 / +260 °C','Resistência intermitente':'até 315 °C','Cores':'Vermelho, preto'})
print('lote 2 ok')
