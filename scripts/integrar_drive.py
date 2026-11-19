"""Integra o levantamento do Drive (data/drive_bruto) em arquivos_drive.json e liga os arquivos aos produtos."""
import json, re, sys, unicodedata
from pathlib import Path

raiz = Path(sys.argv[1])
dados = raiz / 'data'
arquivos = json.loads((dados / 'arquivos_drive.json').read_text())
produtos = json.loads((dados / 'produtos.json').read_text())
por_id = {a['id']: a for a in arquivos}
pastas = {a['id']: a for a in arquivos if a['pasta']}

def norm(s):
    return unicodedata.normalize('NFD', s.lower()).encode('ascii', 'ignore').decode()

# --- 1. Arquivos individuais (vídeos e boletins) ---------------------------------
GRUPOS = {  # pastas de boletim que reúnem vários produtos: título do PDF -> produto
    '1zEAu30HWTItOcmFCwvQ47Wb1Lclia-7D': [('antirrespingo', 'antirrespingo-de-solda'), ('macarico', 'gas-para-macarico'),
        ('grafite', 'GRAXAS'), ('graxa', 'GRAXAS'), ('vaselina', 'GRAXAS'), ('correntes', 'GRAXAS'), ('silicone spray', 'GRAXAS'),
        ('limpa ar', 'odorizador-e-limpa-ar-condicionado'), ('odorizador', 'odorizador-e-limpa-ar-condicionado'),
        ('uni lub', 'uni-lub'), ('limpa contato', 'limpa-contato'), ('uni 80', 'uni-80')],
    '1u3ObTITKMWmoD4WjIYedgBbWWVsOlILz': [('', 'gancho-suporte-feltro-e-anti-impacto')],
    '1fcg48NsVEFNfoz75H5bbKbMHhnHqfsPD': [('', 'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz')],
    '10FZHhd5jX3Hkp0pTBhtNSM3tHgeyy7AQ': [('uso geral', 'espuma-pu-uso-geral'), ('multiuso', 'espuma-pu-multiuso'), ('profissional', 'espuma-pu-profissional')],
    '1Jf0cTiLGoJFjBtQT7qaDodidOL7nMYuu': [('crepe', 'fita-crepe'), ('isolante', 'fita-isolante'), ('silver', 'silver-tape'), ('veda rosca', 'fita-veda-rosca'),
        ('', 'demarcacao-antiderrapante-empacotamento-dupla-face')],
}
GRAXAS = 'graxa-branca-graxa-spray-grafite-vaselina-silicone-spray-lub-correntes'
LIXO = re.compile(r'^(video-output-|[0-9a-f]{20,}|[0-9A-F]{8}-)', re.I)

ligar = {}  # produto id -> ids novos
novos = []
for linha in (dados / 'drive_bruto' / 'itens.tsv').read_text().splitlines():
    pai, fid, tipo, titulo = linha.split('\t')
    if fid in por_id:
        continue
    pasta = pastas.get(pai)
    origem = pasta['origem'] if pasta else 'Vídeos Unipega'
    nome_pasta = pasta['titulo'].split('–', 1)[-1].strip() if pasta else ''
    base = re.sub(r'\.(mp4|mov|pdf)$', '', titulo, flags=re.I).strip()
    if tipo == 'pdf':
        base = re.sub(r'^(PT|ES)_', '', base)
        bonito = f"Boletim técnico – {base.capitalize()}" + (' (espanhol)' if titulo.startswith('ES_') else '')
        t = 'boletim'
    else:
        bonito = f"Vídeo – {nome_pasta}" if LIXO.match(base) and nome_pasta else f"Vídeo – {base}"
        t = 'video'
    item = {'id': fid, 'titulo': bonito, 'tipo': t, 'pasta': False, 'origem': origem,
            'url': f'https://drive.google.com/file/d/{fid}/view'}
    novos.append(item)
    por_id[fid] = item
    if pai in GRUPOS:
        nt = norm(titulo)
        for chave, pid in GRUPOS[pai]:
            if chave in nt:
                ligar.setdefault(GRAXAS if pid == 'GRAXAS' else pid, []).append(fid)
                break
    else:
        for p in produtos:
            if pai in p['arquivos_relacionados']:
                ligar.setdefault(p['id'], []).append(fid)

# --- 2. Pastas de fotos por produto ---------------------------------------------
FOTOS = {
    'acetico 100% profissional': 'acetico-100-profissional', 'acetico 100%': 'acetico-100-profissional',
    'acetico multiuso': 'acetico-multiuso', 'acetico alta temperatura': 'acetico-alta-temperatura', 'vidro e aluminio': 'acetico-uso-geral',
    'adesivo epoxi tix': 'adesivo-epoxi-pro-mf-tix', 'adesivo epoxi mf': 'adesivo-epoxi-pro-mf-tix',
    'adesivo para pisos vinilicos': 'adesivo-para-pisos-vinilicos', 'anel de vedacao': 'anel-de-vedacao-para-vaso', 'aluzinco': 'aluzinco',
    'antirrespingo de solta sem silicone': 'antirrespingo-de-solda', 'antirrespingo de solda com silicone': 'antirrespingo-de-solda',
    'anti-impacto': 'gancho-suporte-feltro-e-anti-impacto', 'feltro': 'gancho-suporte-feltro-e-anti-impacto', 'gancho': 'gancho-suporte-feltro-e-anti-impacto',
    'bond 007': 'bond-007', 'chumbador quimico': 'chumbador-quimico-pro',
    'cola extra': 'colas-brancas-original-extra-multiuso-extra', 'cola extra multiuso': 'colas-brancas-original-extra-multiuso-extra',
    'cola original': 'colas-brancas-original-extra-multiuso-extra', 'cola madeira': 'cola-madeira', 'cola rodape': 'cola-rodape',
    'espuma limpa tudo': 'espuma-limpa-tudo', 'crystal clear': 'crystal-clear', 'corante liquido': 'corante-liquido',
    'espuma pu pro': 'espuma-pu-profissional', 'espuma pu uso geral': 'espuma-pu-uso-geral', 'espuma pu multiuso': 'espuma-pu-multiuso',
    'fita antiderrapante': 'demarcacao-antiderrapante-empacotamento-dupla-face', 'fita bopp': 'demarcacao-antiderrapante-empacotamento-dupla-face',
    'fita demarcacao de solo': 'demarcacao-antiderrapante-empacotamento-dupla-face', 'fita zebrada': 'demarcacao-antiderrapante-empacotamento-dupla-face',
    'fita fixa forte': 'demarcacao-antiderrapante-empacotamento-dupla-face', 'fita fixa forte extreme': 'demarcacao-antiderrapante-empacotamento-dupla-face',
    'fita crepe': 'fita-crepe', 'fita isolante': 'fita-isolante', 'fita veda rosca': 'fita-veda-rosca', 'fita silver tape': 'silver-tape',
    'fixa espelhos': 'fixa-espelhos', 'fixa cubas': 'fixa-cubas', 'fixa tudo': 'fixa-tudo',
    'graxa branca spray': GRAXAS, 'grafite spray': GRAXAS, 'graxa spray multiuso': GRAXAS, 'lubrificante correntes': GRAXAS,
    'vaselina spray': GRAXAS, 'silicone spray': GRAXAS,
    'gas para macarico': 'gas-para-macarico', 'macarico': 'gas-para-macarico', 'hibrido': 'pu-calhas-pu-35-hibrido-construcao',
    'high tack': 'high-tack-ultra', 'limpa ar condicionado': 'odorizador-e-limpa-ar-condicionado',
    'odorizador de ambientes': 'odorizador-e-limpa-ar-condicionado', 'limpa contato': 'limpa-contato',
    'neutro alta temperatura ultra': 'neutro-alta-temperatura-ultra', 'neutro alta temperatura oxima': 'neutro-alta-temperatura-ultra',
    'monta e fixa': 'monta-e-fixa', 'neutro 100%': 'neutro-100', 'parabrisas': 'parabrisas', 'protetor de tecidos': 'protetor-de-tecidos',
    'pu flex': 'pu-flex-uso-geral', 'pu 40 multiuso': 'pu-40-multiuso', 'pu 40 profissional': 'pu-40-profissional',
    'pu calhas': 'pu-calhas-pu-35-hibrido-construcao', 'pu 35': 'pu-calhas-pu-35-hibrido-construcao', 'sela trincas': 'sela-trincas',
    'silicone uso geral clear 24h': 'silicone-hibrido-clear-24h-cores', 'silicone uso geral colors': 'silicone-hibrido-clear-24h-cores',
    'silicone base agua flexivel': 'silicone-flexivel-base-d-agua', 'uni lub': 'uni-lub', 'uni 80': 'uni-80',
    'u-flex pu 55': 'u-flex-pu-55', 'u-flex pu 44': 'u-flex-pu-44', 'veda calhas': 'veda-calhas',
    'tinta spray alta temperatura': 'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz',
    'tinta spray metalico': 'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz',
    'tinta spray fluorescente': 'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz',
    'tinta spray uso geral': 'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz',
    'tinta spray verniz': 'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz',
    'tinta spray multiuso': 'unispray-uso-geral-metalico-fluorescente-alta-temp-verniz',
}
sem_produto = []
for linha in (dados / 'drive_bruto' / 'fotos_produtos.tsv').read_text().splitlines():
    pai, fid, _, titulo = linha.split('\t')
    pid = FOTOS.get(norm(titulo).strip())
    if fid not in por_id:
        item = {'id': fid, 'titulo': f'Fotos – {titulo.strip().capitalize()}', 'tipo': 'foto', 'pasta': True,
                'origem': 'Imagens produtos', 'url': f'https://drive.google.com/drive/folders/{fid}'}
        novos.append(item)
        por_id[fid] = item
    if pid:
        ligar.setdefault(pid, []).append(fid)
    else:
        sem_produto.append(titulo)

# --- 3. Gravar ----------------------------------------------------------------
ids_produtos = {p['id'] for p in produtos}
assert set(ligar) <= ids_produtos, set(ligar) - ids_produtos
for p in produtos:
    extra = [i for i in ligar.get(p['id'], []) if i not in p['arquivos_relacionados']]
    p['arquivos_relacionados'] = extra + p['arquivos_relacionados']
(dados / 'arquivos_drive.json').write_text(json.dumps(arquivos + novos, ensure_ascii=False, indent=1))
(dados / 'produtos.json').write_text(json.dumps(produtos, ensure_ascii=False, indent=1))
print('novos itens:', len(novos), '| ligações:', sum(len(v) for v in ligar.values()))
print('pastas de fotos sem produto no catálogo:', sem_produto)
print('produtos sem nenhum arquivo:', [p['nome'] for p in produtos if not p['arquivos_relacionados']])
