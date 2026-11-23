exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
salvar(FITAS, boletim_id='1GI9Zfh1K8QiInlZMkwPPd9xnaGONmOEG', titulo='Fita Fixa Forte Extreme',
  caracteristicas='Fita de fixação ultra forte e permanente para áreas internas, substitui pregos e parafusos: quadros, porta-chaves, espelhos, decoração, canaletas, ganchos e suporte de papel. Em superfícies lisas: paredes, acrílico, vidro, plástico, metal, madeira com verniz ou pintada e revestimentos. Não amarela.',
  preparo=['Marcar a posição a lápis.','Superfície e objeto limpos, sem oleosidade, lisos e sem irregularidades.'],
  modo_de_uso=['Cortar a fita na quantidade que aguenta o peso (ver cartela).','Colar no objeto e tirar o filme.','Pressionar por 1 minuto.','Carga total só após 48 h.','Aplicar entre 5 e 40 °C.'],
  limitacoes='Não aplicar onde há solventes, em papel de parede, superfícies delicadas ou pintura recente. Não usar em aplicações estruturais. Não sobrepor pedaços.',
  armazenamento='25 °C e 50% de umidade, longe do sol e de calor; nunca acima de 50 °C. Validade: 24 meses.', dados={'Larguras':'19 e 24 mm × 2 m','Cor':'Branco'})
salvar('silver-tape', boletim_id='1K9du9sNd1h3_OLhdV2GMl6ce8eBu8MGx', titulo='Silver Tape',
  caracteristicas='Fita de polietileno reforçada com tecido de poliéster e algodão e adesivo de borracha e resinas. Alta adesão, resistente a rasgo, umidade e graxa, à prova d’água e anticorrosão. Manutenção geral, vedação de dutos de ar-condicionado e refrigeração, reparos provisórios, materiais náuticos (bote, jet ski, prancha, barco), encadernação, fechamento de caixas, reparo de calçados, emenda de tecidos e vedação provisória de tubulações não aquecidas.',
  preparo=PREP_F, modo_de_uso=[PRESS], limitacoes='Uso em tubulações só se não forem aquecidas; reparos provisórios.', armazenamento=ARM48,
  dados={'Adesão ao aço':'732 gf/cm','Espessura':'0,19 mm','Tração':'3,8 kgf/cm','Alongamento':'30%','Temperatura mínima de aplicação':'15 °C','Temperatura de trabalho':'-10 a 90 °C'})
salvar('fita-veda-rosca', boletim_id='1vf8ocu6Thi9-gFuIml19aPbh3NL5E5Xb', titulo='Fita Veda Rosca',
  caracteristicas='Fita de PTFE laminado e expandido para vedar juntas roscáveis (PVC, CPVC ou metal) em instalações de água fria e quente, eliminando folgas entre conexões. Muito baixa reatividade: resiste a ácidos, bases, solventes, combustíveis, lubrificantes e vapor.',
  preparo=PREP_F[:1], modo_de_uso=['Enrolar no sentido horário, de 5 a 8 voltas, cada volta sobrepondo a anterior.','Cortar pressionando a fita junto à rosca, sem deixar sobra na ponta.'],
  limitacoes='Excesso de fita pode romper tubos e conexões. Não usar com água acima de 85 °C. Incompatível com metais alcalinos fundidos, magnésio ou pó de alumínio acima de 350 °C e flúor gasoso.',
  armazenamento=ARM48.replace('48','36'), dados={'Material':'PTFE','Temperatura de trabalho':'-90 a 240 °C','pH de trabalho':'0 a 14','Medidas':'18 mm × 50 m, 18 × 25 m, 18 × 10 m, 12 × 10 m'})
salvar('_fora-do-catalogo', boletim_id='1B2-iFrf9U1ySgXE6_GI_YZ_ABjXq4O0P', titulo='Adesivo para Placas de PVC',
  caracteristicas='Adesivo de resina acrílica para instalar painéis (placas) de PVC. Cola plástico, madeira, tijolo, gesso e MDF. Alta aderência, fácil de aplicar e limpar, resistente à umidade e ao mofo.',
  preparo=PREP+['Parede sem tinta ou impermeabilizante — atrapalham secagem e aderência.'],
  modo_de_uso=['Espalhar o adesivo direto na parede com desempenadeira dentada, a cerca de 15° da superfície.','Posicionar a placa e pressionar firme com espátula.','Tirar o excesso com espátula e limpar as bordas com esponja úmida.','Aplicar entre 10 e 40 °C.','Evitar água nas primeiras 12 h.'],
  limitacoes=LIM_ACR, armazenamento=ARM_30,
  dados={'Formação de película':'15 min','Cura':'2,0 mm/24 h','Densidade':'1,64 g/cm³','Tensão de ruptura':'3,0 MPa','Alongamento':'10%','Temperatura de aplicação':'10 a 40 °C','Cor':'Branco'})
print('lote 12 ok')
