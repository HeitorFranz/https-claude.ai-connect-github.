exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
salvar(FITAS, boletim_id='1fJtxJK3KuKlW-YqvmJRliDrN5_tpobQD', titulo='Fita Antiderrapante',
  caracteristicas='Fita de PVC com grão abrasivo de óxido de alumínio nº 80 e adesivo acrílico, para evitar quedas e escorregões em escadas, rampas, calçadas, playgrounds, piscinas, supermercados, áreas de trabalho, veículos, oficinas, máquinas, caminhões e reboques.',
  preparo=PREP_F[:1]+['Passar pano com álcool isopropílico.','Temperatura ideal 20 °C (mínimo 15 °C).','Em superfície porosa, usar primer e vedador de bordas para a umidade não soltar a fita.'],
  modo_de_uso=['Tirar o liner só na ponta, posicionar e colar o resto tirando o liner aos poucos, sem encostar os dedos no adesivo.',PRESS,'Bater com martelo de borracha para fixar bem.','Arredondar as pontas com tesoura.','Manter sem água ou umidade por 48 a 72 h.'],
  limitacoes='Não indicada para ambientes com muita oleosidade, tráfego de veículos pesados ou de grande tração, nem sobre rejuntes.',
  armazenamento=ARM48, dados={'Adesão ao aço':'600 gf/cm','Espessura':'0,65 mm','Tração':'2,5 kgf/cm','Alongamento':'40%','Temperatura mínima de aplicação':'15 °C','Temperatura de trabalho':'-25 a 60 °C'})
salvar('fita-crepe', boletim_id='12CGSue85hRv9seJu01CyTXpVHojny02Y', titulo='Fita Crepe',
  caracteristicas='Fita de papel crepado branco com adesivo de borracha natural e resinas. Uso geral, industrial, escolar e proteção: proteger, delimitar, marcar, colar e reparar temporariamente; cartonagem e fechamento temporário de embalagens. Adere bem em superfícies regulares e limpas.',
  preparo=PREP_F, modo_de_uso=[PRESS], limitacoes='Uso temporário.',
  armazenamento=ARM48.replace('48','36'), dados={'Adesão ao aço':'78 gf/cm','Espessura':'0,14 mm','Tração':'1,18 kgf/cm','Alongamento':'7%','Temperatura mínima de aplicação':'15 °C','Temperatura de trabalho':'-10 a 75 °C'})
salvar(FITAS, boletim_id='1l5mae6DLW8YxyyjMtG9Ls1OD_srBRONG', titulo='Fita para Empacotamento (BOPP)',
  caracteristicas='Fita de polipropileno biorientado (BOPP) com adesivo acrílico base água. Alta adesão em vários materiais, resistente ao rasgo, desenrola fácil. Para fechar caixas e embalagens.',
  preparo=PREP_F, modo_de_uso=[PRESS], limitacoes='', armazenamento=ARM48,
  dados={'Adesão ao aço':'200 gf/cm','Espessura':'0,04 mm','Tração':'2,6 kgf/cm','Alongamento':'150%','Temperatura mínima de aplicação':'20 °C','Temperatura de trabalho':'0 a 60 °C'})
salvar(FITAS, boletim_id='1mPag4xAT35voxJ_vfde-908CPBZ-N6Vh', titulo='Fita Fixa Forte (dupla face, áreas internas)',
  caracteristicas='Fita de fixação ultra forte e permanente que substitui pregos e parafusos: quadros, porta-chaves, espelhos, decoração, canaletas, ganchos, suporte de papel. Em superfícies lisas de áreas internas: paredes, acrílico, vidro, plástico, metal, madeira com verniz ou pintada e revestimentos. Transparente, não amarela.',
  preparo=['Marcar a posição a lápis.','Superfície e objeto limpos, sem oleosidade, lisos e sem irregularidades.'],
  modo_de_uso=['Cortar a fita na quantidade que aguenta o peso (ver recomendação na cartela).','Colar no objeto e tirar o filme protetor.','Pressionar contra a superfície por 1 minuto.','A fita só atinge 100% da carga após 48 h.','Aplicar entre 5 e 40 °C.'],
  limitacoes='Não aplicar onde há solventes, em papel de parede, superfícies delicadas ou pintura recente. Não usar em aplicações estruturais. Não sobrepor pedaços de fita.',
  armazenamento='25 °C e 50% de umidade, longe do sol e de calor; nunca acima de 50 °C. Validade: 24 meses.', dados={'Larguras':'9, 12, 19 e 24 mm × 2 m','Cor':'Transparente'})
salvar('fita-isolante', boletim_id='144Ca0JC-NmWt7a1L-NA9fUWttPuxmMKl', titulo='Fita Isolante',
  caracteristicas='Fita de PVC com adesivo de resina e borracha, elástica e durável, antichama, com resistência química, até 600 V e 0 a 80 °C. Atende RoHS. Isolamento e identificação de instalações, chicotes elétricos e reparos domésticos.',
  preparo=PREP_F, modo_de_uso=[PRESS,'Para isolar: 4 camadas, sempre esticando a fita 50% e com meia sobreposição a cada volta.','Terminar com sobreposição total sobre a própria fita e cortar a ponta com leve tração.'],
  limitacoes='', armazenamento=ARM48, dados={'Tensão':'até 600 V','Adesão ao aço':'175 gf/cm','Espessura':'0,13 mm','Tração':'2,2 kgf/cm','Alongamento':'195%','Temperatura mínima de aplicação':'15 °C','Temperatura de trabalho':'-25 a 80 °C'})
print('lote 11 ok')
