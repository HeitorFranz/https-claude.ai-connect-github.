Cole isto no Claude Code, dentro da pasta do pacote (onde estão SPEC.md, data/ e referencia/):

---

Leia `SPEC.md` inteiro, depois `data/*.json` e abra `referencia/academia_unipega.html` para entender o conteúdo e o visual.

Construa o sistema **Consulta UNIPEGA** descrito na SPEC:
- Vite + React + TypeScript + Tailwind + React Router, mobile first, PWA.
- Login com Supabase Auth (email/senha, sem cadastro público). Use variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`; me pergunte os valores, não invente.
- Depois do login: tela Início com dois cartões — **Conhecimento** e **Consulta**.
- **Conhecimento**: todas as seções da SPEC §2, lendo os JSON de `data/`.
- **Consulta**: descrição livre + filtros (SPEC §3.1) → motor determinístico (SPEC §3.2) → cartões de resultado com porquê, cuidados, embalagens, dica de venda e todos os arquivos do Drive relacionados, com copiar link e enviar no WhatsApp (SPEC §3.4).

Ordem de trabalho:
1. Scaffold do projeto, rotas, layout, tema (cores e fonte da SPEC §7), login.
2. Módulo Conhecimento.
3. Gerar `data/atributos_produtos.json` a partir dos textos (sem inventar dados técnicos; onde não houver informação, deixe `null`) e me mostre para revisar.
4. Motor de recomendação em `src/lib/recomendar.ts` + testes Vitest com TODOS os casos da SPEC §8 passando.
5. Tela Consulta + página de produto + histórico de consultas (tabela `consultas` no Supabase; me passe o SQL da migration).
6. PWA.

Regras: português do Brasil em toda a interface; nada de dados inventados; trate os textos do JSON como fonte da verdade; se algo da SPEC estiver ambíguo, pergunte antes. A IA (SPEC §3.3) fica para depois — deixe só a interface preparada.
