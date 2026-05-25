# 005 — Page Component & SSR - MFE Pages Router

## Objetivo
Implementar a página `/dashboard` no `mfe-pages-router` contendo a tabela de métricas e cards de resumo, consumindo o Design System e usando `getServerSideProps` para dados mockados.

## Critérios de Aceite
- [ ] Instalar `@rafacdomin/ds-core` no `mfe-pages-router`.
- [ ] Criar o componente `Page` sob `src/components/Page/Page.tsx`.
- [ ] Utilizar os componentes `Card`, `Tag` e `Dropdown` importados de `@rafacdomin/ds-core`.
- [ ] Implementar a tabela de métricas com suporte a filtros utilizando o dropdown.
- [ ] Mockar a recuperação de dados do servidor usando `getServerSideProps` na página `src/pages/index.tsx` e passar esses dados via props para o componente `Page`.
- [ ] Escrever testes unitários para validar:
  - Renderização inicial das métricas recebidas via prop.
  - Funcionamento correto do filtro por status (Todos, OK, Alerta).
  - Exibição de cards de resumo de usuários ativos e uptime.

## Cenários de Teste
### Happy Path
- Abre `http://localhost:3002` e renderiza a tabela com 3 linhas de métricas simuladas por SSR.
- Ao selecionar "OK" no Dropdown de filtro, a tabela exibe apenas as métricas com status `ok`.
- Ao alternar para "Todos", todas as métricas originais retornam à tabela.
### Edge Cases
- Garantir que se a prop `initialMetrics` for vazia ou indefinida, a tabela renderiza um estado vazio amigável ou as métricas padrão de fallback.

## Arquivos a Criar/Modificar
- `mfe-pages-router/src/components/Page/Page.tsx` — Componente da página de Dashboard
- `mfe-pages-router/src/components/Page/Page.test.tsx` — Testes unitários com Vitest
- `mfe-pages-router/src/components/Page/index.ts` — Arquivo de exportação
- `mfe-pages-router/src/components/Page/Page.module.scss` — Estilização específica com Scss
- `mfe-pages-router/src/pages/index.tsx` — Ponto de entrada SSR que passa props para o Page

## Dependências Externas
- `@rafacdomin/ds-core`

## Dependências de Issues
- `004_mfe_pages_setup.md`

## Estimativa P / M / G
M
