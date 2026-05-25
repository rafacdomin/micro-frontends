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
