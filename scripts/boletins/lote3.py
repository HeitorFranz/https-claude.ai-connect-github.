exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
salvar('fixa-espelhos', boletim_id='1Vw2gXvx51mubfxURPX62QKlWUTPDXKtR', titulo='Fixa Espelho – Adesivo híbrido',
  caracteristicas='Adesivo de polímero híbrido (silanos modificados) para fixar espelhos: alta adesão inicial e não oxida o metal (não mancha o espelho). Fácil de aplicar, permite reposicionar a colagem, não escorre e cura com a umidade do ar, virando borracha flexível e resistente.',
  preparo=PREP, modo_de_uso=ESPELHO+MODO_SEL[2:], limitacoes=LIM_HIB, armazenamento=ARM_12, dados={**HIB50,'Cores':'Branco, cinza'})
salvar('crystal-clear', boletim_id='1MMaiGD9t2LsJyeAt6jlXPCq0Mw7FuEOL', titulo='Crystal Clear',
  caracteristicas='Selante de polímero híbrido (silanos modificados), sem solventes, cristalino. Cola e veda metal, concreto, alvenaria, pedra, mármore, cerâmica, azulejo, vidro, policarbonato, PVC, louça, madeira e outros. Pode ser aplicado em qualquer clima e até em superfícies úmidas.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_HIB, armazenamento=ARM_12,
  dados={'Formação de película':'15 min','Cura':'2,0 mm/24 h','Densidade':'1,02 g/cm³','Dureza Shore A':'30','Tensão de ruptura':'2,0 MPa','Alongamento':'200%','Temperatura de aplicação':'5 a 40 °C','Resistência térmica':'-40 / +90 °C','Cor':'Cristalino'})
salvar('fixa-cubas', boletim_id='117rl-k-Aj-ar8hS0uv0i4tykg1BlaExi', titulo='Fixa Cubas – Adesivo híbrido',
  caracteristicas='Adesivo de polímero híbrido (silanos modificados) para fixar cubas: alta adesão inicial e não oxida metais. Cola e veda materiais porosos e não porosos como metais, concreto, pedras e cerâmicas. Não escorre e cura com a umidade do ar, virando borracha flexível e resistente.',
  preparo=PREP, modo_de_uso=CUBA+MODO_SEL[2:], limitacoes=LIM_HIB, armazenamento=ARM_12, dados={**HIB50,'Cor':'Branco'})
salvar('fixa-tudo', boletim_id='1EZpQWiyKSWl96qviMu2dclsgPBZpigNB', titulo='Fixa Tudo – Adesivo híbrido',
  caracteristicas='Adesivo híbrido para colagem e vedação de materiais porosos e não porosos: metais, concreto, pedras, cerâmicas, vidro, policarbonato e PVC. Pela alta adesão inicial também serve para fixar espelhos e colar cubas. Não escorre e cura com a umidade do ar, virando borracha flexível.',
  preparo=PREP, modo_de_uso=['Colagens gerais: aplicar e fazer o acabamento imediatamente; peças muito pesadas, usar calço; se usar fita, retirar antes de formar película.']+ESPELHO+CUBA+MODO_SEL[2:],
  limitacoes=LIM_HIB, armazenamento=ARM_12, dados={**HIB50,'Cor':'Branco'})
NAT = 'Silicone neutro monocomponente para vedação de elementos de aquecimento, juntas de forno, fogões, filtros de chaminé, fornos industriais e juntas de motor. Resiste a intempéries, altas temperaturas e óleo de motor. Não escorre, cura em temperatura ambiente e fica flexível por muitos anos. Resiste a UV.'
D_NAT = {'Formação de película':'6 min','Cura':'2,0 mm/24 h','Densidade':'1,20 g/cm³','Dureza Shore A':'42','Tensão de ruptura':'2,0 MPa','Alongamento':'250%','Temperatura de aplicação':'5 a 35 °C','Resistência térmica contínua':'-40 / +260 °C','Cores':'Preto, cinza'}
salvar('neutro-alta-temperatura-ultra', boletim_id='1nrX112LCcFbN3Dj7amhOHitQJ5SyDuqG', titulo='Silicone Neutro Alta Temperatura (oxima)',
  caracteristicas=NAT+' Temperatura intermitente de -40 a 315 °C.', preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_NEU, armazenamento=ARM_12,
  dados={**D_NAT,'Resistência intermitente':'até 315 °C'})
salvar('neutro-alta-temperatura-ultra', boletim_id='1nOefCu_77_CNP66noBk98UXwynrdO5Sf', titulo='Silicone Neutro Alta Temperatura Ultra',
  caracteristicas=NAT+' Temperatura intermitente de -40 a 350 °C.', preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_NEU, armazenamento=ARM_12,
  dados={**D_NAT,'Resistência intermitente':'até 350 °C'})
print('lote 3 ok')
