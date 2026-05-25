# 004 — Setup & Tooling - MFE Pages Router

## Objetivo
Inicializar e configurar o projeto `mfe-pages-router` como uma aplicação Next.js 15 baseada no Pages Router (sem App Router) com suporte a TypeScript.

## Critérios de Aceite
- [ ] Inicializar o diretório `mfe-pages-router` com Next.js 15 utilizando a flag `--no-app`.
- [ ] Configurar as dependências do projeto no `package.json`.
- [ ] Garantir suporte para SASS/SCSS.
- [ ] Criar estrutura base de diretórios com `src/pages/index.tsx`, `src/pages/_app.tsx` e `src/components/Page/`.
- [ ] Executar build local com sucesso usando `npm run build`.

## Cenários de Teste
### Happy Path
- O comando `npm run dev` na porta 3002 inicia a aplicação com sucesso.
- A página exibe a mensagem inicial padrão ou customizada "Hello from Pages Router" ao carregar `http://localhost:3002`.

## Arquivos a Criar/Modificar
- `mfe-pages-router/package.json` — Dependências e scripts
- `mfe-pages-router/tsconfig.json` — Definições de TypeScript
- `mfe-pages-router/src/pages/_app.tsx` — Custom App
- `mfe-pages-router/src/pages/index.tsx` — Home isolada para desenvolvimento standalone

## Dependências Externas
- Nenhuma

## Dependências de Issues
- Nenhuma

## Estimativa P / M / G
P

---

## Pesquisa
O Next.js 15 traz suporte nativo a React 19 por padrão, porém a versão do Design System `@rafacdomin/ds-core` utiliza React 18 (`^18.3.1`).
Portanto, para garantir compatibilidade completa e singleton com o MFE React puro, devemos configurar o Next.js 15 para utilizar o **React 18** e **ReactDOM 18**.
Isto é feito forçando as resoluções/versões do react no `package.json`:
- `"react": "^18.3.1"`
- `"react-dom": "^18.3.1"`

Para criar o projeto usando Pages Router, passamos `--no-app`.

## Implementação Planejada
Faremos a inicialização usando:
```bash
npx create-next-app@latest ./ --typescript --no-tailwind --no-eslint --no-app --no-src-dir --import-alias "@/*" --use-npm --disable-git --yes
```

Após a inicialização, modificaremos o `package.json` para assegurar as versões corretas de React 18 e reinstalaremos as dependências.
Também instalaremos `sass` para suporte a SCSS Modules.

## Decisões Técnicas
- **React 18 vs React 19**: Manteremos a versão do React no Next.js em 18.3.1 para evitar discrepâncias e bugs de contexto (como o erro de ThemeProvider anterior) ao rodar com Module Federation de outros remotes.
- **Estrutura sem pasta `src/`**: Manteremos a estrutura padrão recomendada (como o Shell e outros apps no monorepo) sem a pasta `src/` caso a flag `--no-src-dir` seja usada, ou com ela caso desejemos unificar. Conforme a linha 9 de `004_mfe_pages_setup.md`, criaremos com `pages/` na raiz ou `src/pages/`. Usaremos `pages/` na raiz para simplificar importações e estrutura, ajustando a estrutura do `004` para criar os arquivos diretamente sob `pages/index.tsx` e `pages/_app.tsx`.

## Checklist de Implementação
- [x] Criar branch `feature/issue-004-mfe-pages-setup`.
- [x] Navegar para `mfe-pages-router/` e inicializar o projeto Next.js com as flags de TypeScript, sem app router, sem Tailwind, sem ESLint, desativando git e instalando dependências com npm.
- [x] Modificar `package.json` em `mfe-pages-router` para forçar `react` e `react-dom` para `^18.3.1` (e as devDependencies de `@types/react` e `@types/react-dom` correspondentes).
- [x] Adicionar suporte a SASS executando `npm install sass` no projeto.
- [x] Rodar `npm install` novamente para unificar a árvore de dependências do React 18.
- [x] Ajustar o arquivo `pages/_app.tsx` para suporte básico de styles globais.
- [x] Ajustar o arquivo `pages/index.tsx` com uma página simples exibindo "Hello from Pages Router".
- [x] Configurar a porta do servidor de dev para `3002` no script `dev` do `package.json` (ex: `next dev -p 3002`).
- [x] Executar o build local via `npm run build` para testar.
- [x] Validar que o servidor de dev inicializa na porta 3002 via `npm run dev`.
