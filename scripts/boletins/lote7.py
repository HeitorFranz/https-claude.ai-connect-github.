exec(open('/tmp/claude-0/-home-user/24920155-b958-5fc2-9b7e-bdf31e6c2ea0/scratchpad/ferramentas/comum.py').read())
PROL = ['Aplicar direto no local com o prolongador.']
salvar(GRAXAS, boletim_id='1sD0gWKBTDN8pWcneTU0j4eNn1ocZ6U6f', titulo='Graxa Spray Multiuso',
  caracteristicas='Graxa à base de cálcio com óleos parafínicos. Excelente resistência à água, boa proteção contra corrosão, alta resistência à oxidação e grande estabilidade mecânica. Pode ser aplicada em peças em movimento, sem parar para manutenção. Engrenagens, motores, encaixe de tubos e conexões. Indústria: mancais simples, rolamentos, acoplamentos, partes móveis e pequenas caixas de engrenagens. Carro: cubos de roda, juntas estriadas, cardans, fechaduras e pinos de capô.',
  preparo=[], modo_de_uso=PROL, limitacoes='', armazenamento=ARM_AER36, dados={'Base':'Cálcio'})
salvar('uni-lub', boletim_id='1h8BRM4rksmffGFkEW9DlhEWoqSBEp2np', titulo='Uni Lub – Desengripante uso geral',
  caracteristicas='Lubrificante de uso geral que reduz atrito e desgaste entre partes metálicas, elimina ruídos e lubrifica por completo pelo alto poder de penetração. Protege por muito tempo contra ferrugem e intempéries. Indústria: máquinas, ferramentas, rolamentos, esteiras, válvulas, eixos, motores elétricos, engrenagens e polias. Carro: cabos, pedais, engrenagens, polias e até peças elétricas. Casa: fechaduras, dobradiças, trincos, ferramentas, eletrodomésticos, máquinas de costura e de lavar, bicicletas e qualquer peça metálica. Sem CFC.',
  preparo=[], modo_de_uso=['Aplicar na peça a lubrificar ou desengripar usando o prolongador (penetra mais).','Esperar alguns minutos para o produto penetrar nas peças engripadas.','Funciona com a lata em pé ou de cabeça para baixo.'],
  limitacoes='Não usar em alimentos nem em recipientes que tenham contato com alimentos.', armazenamento=ARM_AER36, dados={})
salvar('limpa-contato', boletim_id='1nEXzEMPjOBO6VxYosJkj8bJaaC0UPyb2', titulo='Limpa Contato Elétrico (inflamável)',
  caracteristicas='Limpa e restaura a continuidade elétrica em circuitos eletrônicos sem desmontar o equipamento. Limpa e seca na hora, previne falhas e mau contato sem alterar propriedades elétricas e não conduz corrente. Remove graxa, sujeira, óleo e contaminantes de contatos. Para ignição e injeção eletrônica, cabos de vela, relés, conectores, computadores, impressoras, placas, sensores ópticos, potenciômetros, cabeçotes magnéticos, máquinas elétricas, disjuntores, fusíveis e chaves.',
  preparo=[], modo_de_uso=PROL, limitacoes='Produto inflamável. '+LIM_FISPQ, armazenamento=ARM_AER36, dados={})
salvar('odorizador-e-limpa-ar-condicionado', boletim_id='1oLo2hd0RXwpu60mEBiu5S0X5wI9dWEf9', titulo='Odorizador Spray',
  caracteristicas='Neutraliza maus odores e prolonga o perfume no ambiente. Uso residencial e comercial: salas, banheiros, cozinhas e quartos. Aplicação em névoa.',
  preparo=[], modo_de_uso=['Apertar a válvula para liberar a fragrância no ar.'],
  limitacoes='Em excesso o perfume fica forte demais e pode incomodar pessoas sensíveis a odores.', armazenamento=ARM_AER,
  dados={'Fragrâncias':'Lavanda, Floral, Capim-limão, Home, Bambu'})
salvar(GRAXAS, boletim_id='13RtnQhR_EujQhvL04bl5MBBRADxLX64h', titulo='Vaselina Spray Multiuso',
  caracteristicas='À base de parafinas selecionadas. Lubrifica metal, plástico, couro, vinil e borracha. Excelente resistência à umidade, protege contra oxidação e maresia (aumenta a vida de equipamentos náuticos). Para ferragens, maçanetas, fechaduras, dobradiças, janelas e portas de metal, corrediças, aparelhos de musculação, máquinas de vidro, pinos de capô, polos de bateria, molinetes, carretilhas, roldanas, bicicletas, carros e barcos. Facilita passar fios no conduíte e colocar vidros automotivos.',
  preparo=[], modo_de_uso=PROL, limitacoes='Não indicado para peças que exigem alto esforço no trabalho.', armazenamento=ARM_AER36, dados={'Base':'Parafinas'})
salvar('uni-80', boletim_id='1OpsIqBDgymGoTbyW0tDggN1ka8ZA4spl', titulo='Uni 80 – Descarbonizante e limpa TBI',
  caracteristicas='Limpa e descarboniza carburadores, carcaças de motor e pistões sem desmontar. Remove em minutos óxidos e resíduos que obstruem canais e válvulas da injeção. Limpeza profunda em alumínio e metais: bicos injetores, coletores de admissão, válvulas e câmaras de combustão. Pode ser aplicado no carburador ou na borboleta com o motor de arranque girando; ajuda na partida de motores com problema de carburação.',
  preparo=[],
  modo_de_uso=['Carburador: tampar a entrada de combustível, ligar o motor e esgotar o combustível; aplicar pelo respiro do carburador; puxar o afogador e dar partida várias vezes; esperar 15 min; reconectar a mangueira, recolocar a tampa do filtro e ligar o motor.',
    'Peças carbonizadas: aplicar em toda a volta, deixar agir 15 min, tirar resíduos com pano ou pincel, repetir se preciso e secar.',
    'Bicos injetores: desligar a alimentação elétrica da bomba, ligar o motor e esgotar o combustível; soltar a entrada do tubo distribuidor, aplicar e dar partida; deixar agir 15 min; religar tudo e acelerar rápido várias vezes.'],
  limitacoes=LIM_FISPQ, armazenamento=ARM_AER36, dados={})
print('lote 7 ok')
