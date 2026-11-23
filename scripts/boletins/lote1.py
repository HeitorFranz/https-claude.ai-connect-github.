exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
salvar('cola-rodape', boletim_id='1Il-WNLg20qj6n5K9m92vSbM_AA9bKDOj', titulo='Cola Rodapé',
  caracteristicas='Cola de resina acrílica sem solventes para fixar rodapés, roda-meios, roda-tetos e rosetas. Adere em plástico, madeira, azulejo, tijolo, gesso, papelão e MDF. Alta aderência, fácil de aplicar e remover excessos, não cola na pele. Pode ser pintada e lixada após a cura total. Resiste à umidade e a fungos.',
  preparo=PREP, modo_de_uso=['Aplicar a cola na peça e nas emendas.','Pressionar contra a parede ou teto.','Retirar o excesso com espátula e limpar as bordas com esponja úmida.','Para acabamento das emendas, usar lixa d’água nas juntas.'],
  limitacoes=LIM_ACR, armazenamento=ARM_30,
  dados={'Tempo em aberto':'11 min','Cura total (20 °C)':'48 h (porosos) / 72 h (não porosos)','Temperatura de aplicação':'10 a 40 °C','Resistência térmica após cura':'-20 / +80 °C','COV':'5 g/L','Cor':'Branco (RAL 9003)'})
salvar('silicone-flexivel-base-d-agua', boletim_id='1VDcrMm0TukHRuh_3t-w7WfpHcuGTfXA3', titulo="Silicone Flexível base d'água",
  caracteristicas='Selante flexível com fungicida, sem solventes, para construções sustentáveis. Colagem e vedação em torno de esquadrias, rodapés, guarnições, juntas e acabamento de móveis. Adere em madeira, MDF, compensado, concreto, gesso, drywall, pedra e alvenaria. Aceita revestimento e pintura.',
  preparo=PREP+['Em trincas de parede: abrir a fissura com ferramenta pontiaguda. Largura e profundidade máximas de 1 mm — fendas maiores podem ser problema estrutural e devem ser avaliadas por profissional.'],
  modo_de_uso=['Aplicar e fazer o acabamento imediatamente; em juntas, preencher toda a trinca.','Retirar o excesso pressionando levemente uma espátula.','Lixar após 24 h para dar acabamento.']+MODO_SEL[1:]+IMPORT,
  limitacoes=LIM_ACR, armazenamento=ARM_30,
  dados={'Formação de película':'15 min','Cura':'2,0 mm/24 h','Densidade':'1,5 g/cm³','Tensão de ruptura':'1,6 MPa','Alongamento':'80%','Temperatura de aplicação':'10 a 40 °C','Resistência térmica':'-20 / +60 °C','Cor':'Branco (RAL 9003)'})
salvar('monta-e-fixa', boletim_id='1xd7NTD6aKWEojchYvxrVpWqY_FUprlL0', titulo='Monta e Fixa – Adesivo acrílico',
  caracteristicas='Adesivo com fungicida para vedação e colagem em áreas internas e externas. Substitui pregos e fitas adesivas. Indicado para rodapés, guarnições e acabamento de móveis. Adere em madeira, MDF, compensado, concreto, gesso, drywall, pedra, alvenaria, isopor (poliestireno expandido) e cerâmica.',
  preparo=PREP, modo_de_uso=['Aplicar em pequenos cordões, pontos ou com espátula dentada — excesso prejudica a secagem e a fixação inicial.','A quantidade depende da área, do peso e do esforço da peça.','Juntar as partes e pressionar.','Peças pesadas: usar calços ou fita adesiva até a cura total.','Retirar o excesso com pano úmido.']+MODO_SEL[2:]+IMPORT,
  limitacoes=LIM_ACR, armazenamento=ARM_30,
  dados={'Formação de película':'15 min','Cura':'2,0 mm/24 h','Densidade':'1,51 g/cm³','Tensão de ruptura':'2,5 MPa','Alongamento':'30%','Temperatura de aplicação':'10 a 40 °C','Resistência térmica':'-20 / +60 °C','Cor':'Branco (RAL 9003)'})
HIB = 'Selante de alto desempenho com fungicida para vedações perimetrais. Veda e cola alumínio, vidro, azulejo, louça sanitária, metal não oxidável, concreto, alvenaria, madeira, pedras, cerâmicas, PVC e plásticos em geral. Excelente aderência sem primer, fácil de aplicar e limpar, resiste a fungos, não escorre e vira borracha flexível após a cura. Pode ser pintado depois de curado. Excelente resistência a UV e intempéries.'
salvar('silicone-hibrido-clear-24h-cores', boletim_id='1_sha7GQVcPCodNjWP9vewHaKyBd7IooT', titulo='Silicone Híbrido Uso Geral Cores', caracteristicas=HIB,
  preparo=PREP, modo_de_uso=MODO_SEL+IMPORT, limitacoes=LIM_ACR, armazenamento=ARM_30,
  dados={'Formação de película':'15 min','Cura':'2,0 mm/24 h','Densidade':'1,15 g/cm³','Tensão de ruptura':'2,0 MPa','Alongamento':'500%','Temperatura de aplicação':'10 a 40 °C','Resistência térmica':'-20 / +60 °C','Cores':'Branco, cinza, preto'})
salvar('silicone-hibrido-clear-24h-cores', boletim_id='1D2w_qVq8l1ILvzua-jjhHjqg8RR-Aaju', titulo='Silicone Híbrido Uso Geral Clear 24h', caracteristicas=HIB,
  preparo=PREP, modo_de_uso=MODO_SEL+['Sai branco do tubo e fica incolor após a cura total.']+IMPORT, limitacoes=LIM_ACR, armazenamento=ARM_30,
  dados={'Formação de película':'15 min','Cura':'2,0 mm/24 h','Densidade':'1,05 g/cm³','Tensão de ruptura':'1,5 MPa','Alongamento':'300%','Temperatura de aplicação':'10 a 40 °C','Resistência térmica':'-20 / +60 °C','Cor':'Incolor após a cura'})
salvar('veda-calhas', boletim_id='1f3qw0-Ayy2AjlAemZqE7Ykho1QxOT9Q2', titulo='Veda Calhas – Cinza',
  caracteristicas='Selante com fungicida para calhas e emendas, rufos, telhas e pingadeiras galvanizadas. Também veda juntas de dutos de ar-condicionado e ventilação industrial. Pode ser pintado e revestido. Resiste à umidade e a fungos.',
  preparo=PREP, modo_de_uso=MODO_SEL+IMPORT, limitacoes=LIM_ACR, armazenamento=ARM_30,
  dados={'Formação de película':'15 min','Cura':'2,0 mm/24 h','Densidade':'1,58 g/cm³','Tensão de ruptura':'1,5 MPa','Alongamento':'50%','Temperatura de aplicação':'10 a 40 °C','Resistência térmica':'-20 / +60 °C','Cor':'Cinza'})
print('lote 1 ok')
