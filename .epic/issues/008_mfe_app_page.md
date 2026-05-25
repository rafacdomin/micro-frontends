# 008 — Page Component & Client Interactivity - MFE App Router

## Objetivo
Implementar a página `/profile` no `mfe-app-router` utilizando componentes do Design System com estado e comportamento interativo de edição.

## Critérios de Aceite
- [ ] Instalar `@rafacdomin/ds-core` no `mfe-app-router`.
- [ ] Criar o componente `Page` sob `src/components/Page/Page.tsx` com a diretiva `'use client'` declarada na primeira linha.
- [ ] Utilizar os componentes `Avatar`, `Card`, `Button`, `Tag` e `Input` importados de `@rafacdomin/ds-core`.
- [ ] Criar estado local (`useState`) para controlar o modo de edição do nome e salvar as alterações.
- [ ] Exibir uma lista de habilidades (skills) estáticas ou dinâmicas renderizadas como Tags do Design System.
- [ ] Escrever testes unitários com Vitest/React Testing Library cobrindo:
  - Renderização inicial do perfil (Avatar, nome, cargo, Tags).
  - Transição para o modo de edição ao clicar no botão "Editar perfil".
  - Edição do campo de Input e salvamento ao clicar em "Salvar".

## Cenários de Teste
### Happy Path
- Ao carregar `http://localhost:3001`, a página do perfil é exibida.
- Ao clicar no botão "Editar perfil", o nome é substituído por um `Input` preenchido com o nome atual.
- Ao digitar um novo nome e clicar em "Salvar", o input desaparece, o novo nome é renderizado e o botão volta a exibir "Editar perfil".
### Edge Cases
- Garantir que alterações canceladas ou não salvas não alterem o estado permanente caso decida implementar um fluxo de cancelamento (ou simplesmente validar que o input atualiza o estado de forma controlada).

## Arquivos a Criar/Modificar
- `mfe-app-router/src/components/Page/Page.tsx` — Componente interativo da página
- `mfe-app-router/src/components/Page/Page.test.tsx` — Testes unitários com Vitest
- `mfe-app-router/src/components/Page/index.ts` — Arquivo de exportação
- `mfe-app-router/src/components/Page/Page.module.scss` — Estilização específica com Scss
- `mfe-app-router/app/page.tsx` — Renderização do Page para o modo standalone

## Dependências Externas
- `@rafacdomin/ds-core`

## Dependências de Issues
- `007_mfe_app_setup.md`

## Estimativa P / M / G
M
