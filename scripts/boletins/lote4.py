exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
salvar('neutro-100', boletim_id='1bslg7pJpVuwNKQGDw0w-bNLaFiXb7K5z', titulo='Silicone Neutro 100%',
  caracteristicas='Silicone de cura neutra para colagem e vedação de materiais porosos e não porosos: concreto, alvenaria, pedra, cerâmica, metal, vidro, policarbonato e PVC. Não oxida metais. Não escorre, cura em temperatura ambiente e fica flexível por muitos anos. Resiste a clima, UV e variação de temperatura.',
  preparo=PREP, modo_de_uso=MODO_SEL, limitacoes=LIM_NEU, armazenamento=ARM_12,
  dados={'Formação de película':'6 min','Cura':'2,0 mm/24 h','Densidade':'0,98 g/cm³','Dureza Shore A':'20','Tensão de ruptura':'1,3 MPa','Alongamento':'300%','Temperatura de aplicação':'5 a 35 °C','Resistência térmica':'-40 / +120 °C','Cores':'Incolor, branco, preto'})
salvar('protetor-de-tecidos', boletim_id='1zNTQES7IxWiSsTFKLVbhcdLlYZEm-y5e', titulo='Protetor de Tecidos – Impermeabilizante',
  caracteristicas='Protege estofados, almofadas, cortinas, bancos de carro, tênis, bolsas, malas e roupas de manchas de líquidos e outras substâncias. Dá mais resistência às fibras e mantém cor e textura por mais tempo.',
  preparo=['Tecido limpo e seco.','Teste de compatibilidade: aplicar numa área escondida até umedecer e secar com um pano branco. Se soltar cor ou manchar, não usar.'],
  modo_de_uso=['Agitar bem a lata.','Aplicar a cerca de 15 cm, em movimento uniforme, umedecendo sem encharcar.','Esperar 5 minutos e aplicar nova demão no sentido contrário. Repetir 3 vezes (tramas mais abertas pedem mais demãos).','Seco ao toque em 3 a 4 h; cura total em 24 h. Manter o local ventilado (janelas abertas, vidros do carro abaixados).','Teste de eficiência: após 24 h, derramar um pouco de água e ver se repele; reaplicar se preciso.','Rendimento: 2 latas de 400 mL por carro (bancos da frente e de trás).','Durante a aplicação, só o aplicador no local, com máscara de filtro para vapores orgânicos. Proteger pisos de madeira, tacos, pedras e peças acrílicas, vinílicas ou com verniz.','Manutenção: aspirar o tecido 1 a 2 vezes por semana; secar líquidos derramados com papel absorvente sem apertar.'],
  limitacoes='Não protege contra urina, batom e tintas. Não é impermeabilizante definitivo — precisa reaplicar. Não usar em tapete, carpete, couro, suede, camurça e plásticos. '+LIM_FISPQ,
  armazenamento=ARM_AER, dados={'Embalagem':'Aerossol 400 mL','Secagem ao toque':'3 a 4 h','Cura total':'24 h'})
salvar('espuma-limpa-tudo', boletim_id='1PBOaXCCDwU2PVlvFf2rd6Rn7J2FQOCEF', titulo='Espuma Limpa Tudo',
  caracteristicas='Espuma de ação profunda e concentrada para limpar estofados, carpetes, tapetes, interior de carros, tênis e bolsas sem força e sem enxágue. Restaura cor e aparência. Serve também para camurça, vinil, almofadas, fórmica, papel de parede, pisos, azulejos e qualquer superfície lavável ou pintada. Sem CFC.',
  preparo=['Testar antes numa área escondida para ver se não mancha ou desbota.'],
  modo_de_uso=['Agitar bem a lata.','Aplicar a espuma de forma uniforme a cerca de 20 cm da superfície.','Deixar agir 30 segundos.','Se precisar, esfregar com pano úmido, esponja ou escova.','Passar um pano seco.','Em vidros e superfícies polidas, tirar o excesso antes de secar. Se secar, usar limpa-vidros e cera automotiva.'],
  limitacoes=LIM_FISPQ, armazenamento=ARM_AER, dados={})
salvar('colas-brancas-original-extra-multiuso-extra', boletim_id='1wAnDM_-yaYmlQmlx7KdOPVujPYkGyQ-p', titulo='Cola Branca Extra',
  caracteristicas='Para colagens que exigem maior resistência. '+PVA+' Excelente flexibilidade, ideal para materiais que sofrem esforço mecânico.',
  preparo=PREP[:2], modo_de_uso=['Aplicar de forma uniforme e unir as partes.'], limitacoes='',
  armazenamento='Embalagem original, 5 a 30 °C, longe do sol e de calor. Manter fechada para não formar pele. Validade: 13 meses.',
  dados={'Aspecto':'Líquido branco; filme translúcido e flexível','Viscosidade':'5.500 a 8.500 cP','Densidade':'1,03 a 1,12 g/cm³','Teor de sólidos':'15,5 a 18,5%'})
salvar('colas-brancas-original-extra-multiuso-extra', boletim_id='1Yf_nvyo4FZa9p2Tg5wtRJF5V-SV4CpFm', titulo='Cola Branca Extra Multiuso',
  caracteristicas='Para colagens que exigem maior resistência. '+PVA+' Excelente flexibilidade.',
  preparo=PREP[:2], modo_de_uso=['Aplicar de forma uniforme e unir as partes.'], limitacoes='',
  armazenamento='Embalagem original, 5 a 30 °C, longe do sol e de calor. Manter fechada para não formar pele. Validade: 13 meses.',
  dados={'Aspecto':'Líquido branco; filme translúcido e flexível','Viscosidade':'2.000 a 5.000 cP','Densidade':'1,03 a 1,06 g/cm³','Teor de sólidos':'12,5 a 15,5%'})
salvar('cola-madeira', boletim_id='1n06PdAzfzofMI4i_yLfk6sgs8MtluM-f', titulo='Cola Madeira – Colagens e reparos',
  caracteristicas='Adesivo de alto desempenho para colagens e reparos em madeira. '+PVA+' Secagem rápida e boa aderência.',
  preparo=['Superfícies limpas, planas e secas.'], modo_de_uso=['Aplicar o adesivo de forma uniforme.','Juntar as partes imediatamente e manter sob pressão por 2 a 3 minutos.'], limitacoes='',
  armazenamento='Embalagem original, 5 a 30 °C, longe do sol e de calor. Manter fechada para não formar pele. Validade: 18 meses.',
  dados={'Aspecto':'Líquido amarelo; filme opaco e rígido','Viscosidade':'9.000 a 15.000 cP','Densidade':'1,03 a 1,12 g/cm³','Teor de sólidos':'27 a 31%'})
print('lote 4 ok')
