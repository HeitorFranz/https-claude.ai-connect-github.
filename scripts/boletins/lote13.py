exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
salvar('acetico-100-profissional', boletim_id='1ZarZdwahw92An4XSUwOK7I4yNX46G0sR', titulo='Silicone Acético 100% Profissional / Uso Geral',
  caracteristicas='Silicone acético monocomponente para vedação e colagem de alumínio, vidro, azulejo, louça sanitária e box de banheiro. Resiste a fungos, não escorre e cura com a umidade do ar, virando borracha flexível e resistente.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_ACET, armazenamento=ARM_12,
  dados={'Formação de película':'10 min','Cura':'3,0 mm/24 h','Densidade':'0,94 g/cm³','Dureza Shore A':'14','Tensão de ruptura':'1,3 MPa','Alongamento':'500%','Temperatura de aplicação':'5 a 35 °C','Resistência térmica':'-40 / +120 °C','Cores':'Incolor, branco, cinza, preto'})
salvar('aluzinco', boletim_id='104mZAQ4jXszB1r1erEM3duTAzr4holYC', titulo='Aluzinco',
  caracteristicas='Silicone de cura neutra para calhas e emendas, rufos, telhas e pingadeiras galvanizadas; também juntas de dutos de ar-condicionado e ventilação industrial. Não oxida metais. Não escorre, cura em temperatura ambiente e fica flexível por muitos anos. Resiste a clima, UV e variação de temperatura.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_NEU, armazenamento=ARM_12,
  dados={'Formação de película':'6 min','Cura':'2,0 mm/24 h','Densidade':'1,51 g/cm³','Dureza Shore A':'30','Tensão de ruptura':'1,4 MPa','Alongamento':'150%','Temperatura de aplicação':'5 a 35 °C','Resistência térmica':'-40 / +120 °C','Cor':'Cinza'})
salvar('high-tack-ultra', boletim_id='1wj7ANPwH7Ay6muvV6apB04O3V6gMzvqe', titulo='High Tack Ultra',
  caracteristicas='Adesivo de polímero híbrido com alto tack inicial (agarra na hora) para colagens extrafortes de até 350 kg em metal, concreto, alvenaria, pedra, mármore, cerâmica, azulejo, vidro, policarbonato, PVC, louça, madeira e outros (exceto PE, PP e PTFE). Aplica em qualquer clima e até em superfície úmida. Resiste a UV, sem solventes, uso interno e externo, aceita pintura e não mancha.',
  preparo=PREP, modo_de_uso=['Colagens gerais: aplicar e fazer o acabamento imediatamente; peças muito pesadas, usar calço; se usar fita, retirar antes de formar película.']+ESPELHO+CUBA+MODO_SEL[2:],
  limitacoes=LIM_HIB.replace('nem em polietileno','nem em isopor (poliestireno expandido), polietileno'), armazenamento=ARM_12,
  dados={'Carga':'até 350 kg','Formação de película':'20 min','Cura':'4,0 mm/24 h','Densidade':'1,40 g/cm³','Dureza Shore A':'50','Tensão de ruptura':'3,0 MPa','Alongamento':'150%','Temperatura de aplicação':'5 a 40 °C','Resistência térmica':'-40 / +90 °C','Cor':'Branco'})
salvar('parabrisas', boletim_id='1-0x3yUL2ZCTTqDb0leBP486lgQ2-FlSG', titulo='Parabrisas – Adesivo híbrido',
  caracteristicas='Adesivo híbrido tixotrópico de alto módulo para colar para-brisas e vidros automotivos no mercado de reposição. Alta adesão inicial, resistente à água, não escorre e cura com a umidade do ar, virando borracha flexível. Excelente resistência a UV e intempéries.',
  preparo=PREP, modo_de_uso=['Cortar a ponta da embalagem e cortar o bico em “V” de um lado.','Aplicar o adesivo no para-brisa e unir ao veículo em até 5 minutos, pressionando leve e por igual em toda a borda.','Esperar 8 h antes de movimentar o veículo.']+MODO_SEL[2:],
  limitacoes=LIM_HIB, armazenamento=ARM_12,
  dados={'Formação de película':'25 min','Cura':'3,0 mm/24 h','Densidade':'1,55 g/cm³','Dureza Shore A':'50','Tensão de ruptura':'2,5 MPa','Alongamento':'150%','Temperatura de aplicação':'5 a 40 °C','Resistência térmica':'-40 / +90 °C','Liberação do veículo':'8 h','Cor':'Preto'})
salvar('pu-40-profissional', boletim_id='1U6sKSC-gNoPtp21d9GDw68UWidYcZo0C', titulo='PU 40 Uso Profissional',
  caracteristicas='Selante híbrido para vedação e colagem de pré-moldados, painéis metálicos e juntas em geral de concreto, aço, alumínio, madeira, vidro, fibra de vidro e cerâmica. Ideal para calafetação. Não escorre, cura com a umidade do ar e vira borracha flexível. Pode ser pintado após a cura. Excelente resistência a UV e intempéries.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_HIB, armazenamento=ARM_12,
  dados={'Formação de película':'20 min','Cura':'2,0 mm/24 h','Densidade':'1,68 g/cm³','Dureza Shore A':'40','Tensão de ruptura':'1,0 MPa','Alongamento':'100%','Temperatura de aplicação':'5 a 40 °C','Resistência térmica':'-40 / +90 °C','Cores':'Branco, cinza, preto'})
print('lote 13 ok')
