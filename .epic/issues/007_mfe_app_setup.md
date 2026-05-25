# 007 — Setup & Tooling - MFE App Router

## Objetivo
Inicializar e configurar o projeto `mfe-app-router` como uma aplicação Next.js 15 baseada no App Router com suporte a TypeScript, garantindo que o Turbopack esteja desativado.

## Critérios de Aceite
- [ ] Inicializar o diretório `mfe-app-router` usando Next.js 15 com App Router (`--typescript --app`).
- [ ] Garantir que o Turbopack está desligado (`--turbopack=false` nos scripts de desenvolvimento).
- [ ] Instalar dependências necessárias e configurar SASS/SCSS.
- [ ] Criar estrutura base de diretórios com `src/components/Page/`.
- [ ] Executar build local com sucesso usando `npm run build`.

## Cenários de Teste
### Happy Path
- O comando `npm run dev` na porta 3001 inicializa sem erros e serve a página padrão em `http://localhost:3001`.

## Arquivos a Criar/Modificar
- `mfe-app-router/package.json` — Scripts do Next.js sem turbopack e dependências
- `mfe-app-router/tsconfig.json` — Definições TypeScript
- `mfe-app-router/app/layout.tsx` — Layout padrão do App Router
- `mfe-app-router/app/page.tsx` — Página principal standalone

## Dependências Externas
- Nenhuma

## Dependências de Issues
- Nenhuma

## Estimativa P / M / G
P
