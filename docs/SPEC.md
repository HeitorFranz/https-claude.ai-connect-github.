# Consulta UNIPEGA — Especificação do sistema

Sistema pessoal do Heitor (vendedor Maper, linha Unipega — Chapecó/SC) para **estudar** os produtos e **descobrir na hora qual produto indicar** quando um cliente pede algo.

Toda a base de conhecimento já está pronta em `data/` (extraída do Catálogo 2026, de ~150 vídeos de treinamento, dos boletins técnicos e das artes do Drive Unipega LATAM).

---

## 1. Fluxo principal

```
Login  →  Início (2 cartões grandes)
            ├── CONHECIMENTO  (estudar: explicação geral de tudo)
            └── CONSULTA      (cliente pediu algo → qual produto mandar?)
```

### 1.1 Login
- Uso pessoal (1 usuário, depois talvez a equipe Maper).
- Recomendado: **Supabase Auth** (email + senha). Sem cadastro público: o usuário é criado no painel.
- Rotas protegidas; sessão persistente; botão sair.

### 1.2 Início
- Saudação + dois cartões: **Conhecimento** e **Consulta**.
- Atalho: campo de busca rápida (abre a Consulta já com o texto).
- "Consultas recentes" (últimas 10, salvas por usuário).

---

## 2. Módulo CONHECIMENTO

Reproduz e melhora o manual que já existe em `referencia/academia_unipega.html` (abra no navegador para ver o conteúdo e a ordem). Fonte: `data/conhecimento.json`, `data/produtos.json`, `data/matriz_quimica_material.json`.

Seções (cada uma com rota própria):
1. **Mapa química × material** — tabela interativa (`matriz_quimica_material.json`). Clicar num material mostra a dica (`dica_por_material`).
2. **Conceitos** — 12 cartões (`conceitos`). `texto_html` contém `<b>`; renderizar com sanitização.
3. **As químicas** — acético, neutro, acrílico, híbrido, PU isocianato, espuma, epóxi/poliéster, cianoacrilato/PVA (`quimicas`).
4. **Materiais / substratos** — tabela (`materiais`).
5. **Produtos** — lista com busca + filtro por família; **página de produto** (ver §4).
6. **Problema → solução** (`problema_solucao`).
7. **Como aplicar** — passo a passo (`como_aplicar`).
8. **Clientes / segmentos** (`segmentos`).
9. **Como vender** — passos, argumentos de marca (`marca`), objeções (`objecoes`), mensagens de WhatsApp com botão copiar (`mensagens_whatsapp`).
10. **Glossário** com busca (`glossario`).
11. **Quiz** (`quiz`) com correção e placar salvo.
12. **Regras técnicas gerais** (`regras_tecnicas_gerais`) — mostrar como "regras de ouro".

Também: biblioteca de arquivos (`arquivos_drive.json`) navegável por tipo: vídeo, treinamento, boletim, arte, banner, catálogo, foto.

---

## 3. Módulo CONSULTA (o coração do sistema)

Objetivo: o Heitor descreve o pedido do cliente, marca filtros, e o sistema devolve **os produtos certos, ranqueados, com o porquê, os cuidados e todo o material para mandar ao cliente**.

### 3.1 Entrada
- **Descrição livre** (ex.: "calha de zinco vazando, fica no sol o dia todo").
- **Filtros** (chips multi‑seleção):
  - **O que precisa fazer:** vedar · colar · fixar sem furar · preencher · ancorar · isolar · lubrificar · desengripar · limpar · pintar · proteger · perfumar
  - **Material / superfície:** vidro · alumínio · cerâmica/azulejo · concreto/alvenaria · madeira/MDF · galvanizado/aluzinco · ferro/aço · espelho · policarbonato · PVC · pedra/mármore · gesso/isopor · tecido · plástico PE/PP · motor/peça mecânica · circuito elétrico
  - **Ambiente:** interno · externo/sol · área molhada · submerso · alta temperatura · contato com animais (aquário)
  - **Exigências:** pintável · transparente/invisível · sem cheiro · sem pistola · flexível (junta que se move) · aguenta peso · cura rápida · cor específica
  - **Quem é o cliente:** consumidor final · profissional · segmento (lista de `segmentos`)
- Botão **Consultar** + "limpar".

### 3.2 Motor de recomendação (v1 sem IA, determinístico)
1. **Atributos estruturados por produto** — PRIMEIRA TAREFA: criar `data/atributos_produtos.json` derivando de `produtos.json` + `conhecimento.json` + `fichas_tecnicas.json`. Schema sugerido:
   ```ts
   type Atributos = {
     id: string;                       // = produtos[].id
     funcoes: Funcao[];                // vedar, colar, fixar...
     materiais_ok: Material[];
     materiais_proibidos: Material[];
     ambientes_ok: Ambiente[];
     ambientes_proibidos: Ambiente[];
     pintavel: boolean | null;
     transparente: boolean;
     sem_cheiro: boolean;
     sem_pistola: boolean;             // bisnaga / Easy Pack / spray
     junta_movimentacao: boolean;
     carga_max_kg?: number;
     temp_max_c?: number;
     publico: ('consumidor'|'profissional')[];
     segmentos: string[];
     giro: 'alto'|'medio'|'baixo';     // usar dica_venda
   }
   ```
   Revisar com cuidado contra os textos de `usar_em` / `nao_usar` e as regras gerais. Nunca inventar dado técnico.
2. **Exclusões duras** (produto sai da lista, mas aparece em "Não use" com o motivo):
   - material selecionado ∈ `materiais_proibidos` (ex.: acético + concreto/espelho/galvanizado/policarbonato).
   - PE/PP/nylon/teflon → nenhum selante/adesivo; mostrar alerta "precisa de primer, nenhuma marca adere".
   - aquário → só "Acético 100% sem fungicida".
   - pintável exigido → excluir silicones.
   - junta de movimentação → excluir PU 40 Multiuso, PU Flex, PU Calhas.
   - temperatura exigida > `temp_max_c`.
3. **Pontuação**: função (+5), cada material compatível (+4), ambiente (+3), cada exigência atendida (+2), termos da descrição batendo em `nome` (+6), `termos_busca` (+4), `usar_em`/`o_que_e` (+2), segmento (+1), giro alto (+1). Normalizar texto (minúsculas, sem acento).
4. **Saída**: Top 3 em destaque ("Melhor opção", "Alternativa", "Opção econômica" quando houver) + lista completa.

### 3.3 v2 opcional — interpretação com IA
- Endpoint backend que envia a descrição livre para a **API da Anthropic (Claude)** e recebe JSON com os filtros inferidos (funções, materiais, ambiente, exigências). O motor determinístico continua decidindo; a IA só preenche filtros e escreve a explicação em português simples.
- Chave da API só no servidor (variável de ambiente). Nunca no front.

### 3.4 Resultado (cartão do produto)
- Nome, família, **por que este produto** (critérios que bateram), **atenção** (o que `nao_usar` diz e regras relevantes), embalagens/cores, dica de venda, fichas técnicas quando houver.
- **Materiais relacionados** (de `arquivos_relacionados` → `arquivos_drive.json`), agrupados: 🎥 Vídeos · 🎓 Treinamento · 📄 Boletim técnico · 🖼 Artes · 📢 Banner/Catálogo.
  - Cada item: abrir no Drive, **copiar link**, **enviar no WhatsApp** (`https://wa.me/?text=` com mensagem pronta + link).
  - Miniatura de imagem: `https://drive.google.com/thumbnail?id={id}&sz=w400` (funciona se o arquivo estiver compartilhado por link; ter fallback de ícone).
- Botão **"Gerar mensagem para o cliente"**: monta texto com o produto, para que serve, como aplicar (de `como_aplicar` quando houver) e links.
- Seção "**Como aplicar**" quando houver passo a passo correspondente.

### 3.5 Histórico
- Salvar cada consulta (texto, filtros, produtos sugeridos, produto escolhido) para o Heitor rever depois.

---

## 4. Página de produto (compartilhada por Conhecimento e Consulta)
`/produto/:id` — todos os campos de `produtos.json` + atributos + fichas técnicas + todos os arquivos relacionados + produtos alternativos (mesma família / mesma função).

---

## 5. Dados (`data/`)
| Arquivo | Conteúdo |
|---|---|
| `produtos.json` | 55 produtos: família, nome, o que é, usar em, não usar, embalagens, dica de venda, `termos_busca`, `palavras_arquivos`, `arquivos_relacionados` (ids) |
| `arquivos_drive.json` | 291 itens do Drive (vídeos, treinamentos, boletins, artes, banners, catálogos, pastas) com `url` |
| `conhecimento.json` | conceitos, químicas, materiais, problema→solução, como aplicar, segmentos, objeções, mensagens, glossário, quiz, marca, regras técnicas |
| `matriz_quimica_material.json` | matriz 5 químicas × 10 materiais (0/1/2) + dica por material |
| `fichas_tecnicas.json` | números dos boletins (película, cura, Shore A, alongamento, temperatura, cores) |

Notas brutas em `referencia/notas_treinamento.md` (o que foi dito nos vídeos + boletins). Catálogo em `referencia/CATALOGO_2026.pdf` e texto extraído em `referencia/catalogo_texto.txt`.

**Lacunas conhecidas** (marcar na UI como "confirmar"):
- Epóxi PRO MF/TIX não tem arquivo de Drive vinculado.
- PU 50 aparece no catálogo mas sem detalhes confiáveis → não está em `produtos.json`.
- Muitos vídeos de treinamento não têm fala (só demonstração).
- Ligação produto↔arquivo é por palavra-chave: revisar falsos positivos (ex.: vídeos de outros acéticos aparecem no Acético Uso Geral). Ideal: tela admin para ajustar vínculos.

## 6. Stack sugerida
- **Front:** Vite + React + TypeScript + Tailwind + React Router. Busca com normalização de acento (ou Fuse.js para fuzzy).
- **Auth/DB:** Supabase (Auth + Postgres). Tabelas: `produtos`, `atributos`, `arquivos`, `produto_arquivo`, `consultas`, `quiz_resultados`. Seed a partir dos JSON. (v1 pode ler os JSON direto e usar Supabase só para auth + histórico.)
- **Backend (v2 IA):** Express ou Supabase Edge Function chamando a API da Anthropic.
- **Deploy:** Vercel.
- **Mobile first** — ele usa no celular, na frente do cliente. PWA instalável.

## 7. Identidade visual
- Fundo pedra `#efece7`, tinta `#151311`, vermelho tijolo `#c8371e` (principal), amarelo segurança `#f2c230` (destaques), verde `#1f8a4c` = funciona, vermelho = não usar, âmbar = depende. Tema escuro equivalente.
- Fonte: Schibsted Grotesk. Ver `referencia/academia_unipega.html`.
- Não usar o logo da Unipega sem autorização; nome do sistema: "Consulta UNIPEGA · Maper".

## 8. Testes de aceitação da Consulta
| Pedido do cliente / filtros | Deve vir em 1º (ou top 2) |
|---|---|
| "calha de zinco vazando, pega sol" · vedar · galvanizado · externo | Aluzinco (alternativas: PU Calhas, Veda Calhas) |
| "montar aquário" · aquário | Acético 100% sem fungicida — e SÓ ele |
| "colar espelho na parede" · espelho | Fixa Espelhos (Acético em "Não use") |
| "trocar para-brisa" | Parabrisas / U-Flex PU 55 |
| "instalar porta" · preencher | Espuma PU (Pro se porta pesada) |
| "parafuso enferrujado travado" · desengripar | Uni Lub |
| "colar pedra pesada, parede úmida" · aguenta peso · área molhada | High Tack Ultra |
| "box do banheiro sem aparecer" · transparente · área molhada | Silicone Híbrido Clear 24h, Acético Uso Geral |
| "junta de dilatação no piso" · flexível · concreto | PU 40 Profissional / U-Flex PU 44 (PU 40 Multiuso excluído) |
| "vedar junta do motor" · alta temperatura | Acético Alta Temperatura |
| "pintar churrasqueira" · pintar · alta temperatura | Unispray Alta Temperatura (Uso Geral excluído) |
| "colar balde de polipropileno" · PE/PP | Alerta "nenhum selante adere sem primer" |
| "trinca na parede antes de pintar" · pintável | Sela Trincas / Tapa Tudo |
| "fixar vergalhão no concreto" · ancorar | Chumbador Químico PRO |
| "sofá sujo" · limpar · tecido | Espuma Limpa Tudo (+ Protetor de Tecidos) |

Escrever testes automatizados (Vitest) para o motor com esses casos.

## 9. Roadmap
1. Projeto + login + layout + Início.
2. Conhecimento (todas as seções) lendo os JSON.
3. `atributos_produtos.json` + motor de recomendação + testes.
4. Tela Consulta + cartões de resultado + materiais do Drive + WhatsApp.
5. Histórico + quiz salvo + PWA.
6. (v2) IA para interpretar a descrição; admin para editar produtos/vínculos; sincronizar Drive pela Google Drive API.
