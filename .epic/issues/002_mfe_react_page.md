# 002 — Page Component - MFE React

## Objetivo
Implementar a página `/catalog` dentro do `mfe-react` utilizando os componentes `@rafacdomin/ds-core` e seguindo o desenvolvimento orientado a testes (TDD).

## Critérios de Aceite
- [ ] Instalar `@rafacdomin/ds-core` na aplicação `mfe-react`.
- [ ] Criar o componente `Page` sob `src/components/Page/Page.tsx` exibindo o Grid de Cards de produtos.
- [ ] Utilizar os componentes `Card`, `Button` e `Tag` importados de `@rafacdomin/ds-core`.
- [ ] Implementar a lógica de carrinho com `useState` que permite adicionar e remover itens ao clicar nos botões dos cards.
- [ ] Adicionar testes unitários detalhados cobrindo:
  - Renderização inicial do catálogo de produtos.
  - Adição de item ao carrinho.
  - Remoção de item do carrinho.
  - Atualização visual da Tag de contagem de itens.

## Cenários de Teste
### Happy Path
- Carrega a página e renderiza 3 produtos com nome, preço e botão "Adicionar".
- Ao clicar em "Adicionar", o botão muda para "Remover" e a Tag de resumo do carrinho atualiza o número de itens.
- Ao clicar em "Remover", o botão retorna para "Adicionar" e a quantidade de itens no carrinho é recalculada.
### Edge Cases
- Tentar adicionar múltiplos itens e garantir que a contagem do carrinho não tenha inconsistências.

## Arquivos a Criar/Modificar
- `mfe-react/src/components/Page/Page.tsx` — Componente da página de catálogo
- `mfe-react/src/components/Page/Page.test.tsx` — Testes unitários com Vitest/RTL
- `mfe-react/src/components/Page/index.ts` — Ponto de exportação do componente
- `mfe-react/src/App.tsx` — Componente raiz para dev standalone
- `mfe-react/src/components/Page/Page.module.scss` — Estilização específica com Scss usando variáveis locais/globais

## Dependências Externas
- `@rafacdomin/ds-core`

## Dependências de Issues
- `001_mfe_react_setup.md`

## Estimativa P / M / G
M
