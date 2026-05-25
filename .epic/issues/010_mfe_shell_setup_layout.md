# 010 — Setup & Layout - MFE Shell

## Objetivo
Inicializar o `mfe-shell` como host Next.js 15 App Router e construir a estrutura do frame global da plataforma (Header, Sidebar com Badges, Footer, Home Page) integrada ao Design System.

## Critérios de Aceite
- [ ] Inicializar o diretório `mfe-shell` usando Next.js 15 com App Router (Turbopack desativado).
- [ ] Instalar as dependências necessárias, incluindo `@rafacdomin/ds-core` e `@rafacdomin/ds-carousel`.
- [ ] Criar componentes de layout sob `components/layout/`:
  - `Header.tsx` (Contém o logo e toggle de tema light/dark).
  - `Sidebar.tsx` (Contém navegação para as páginas com suas respectivas Badges/Tags coloridas por framework).
  - `Footer.tsx` (Assinatura padrão do rodapé).
  - `AppShell.tsx` (Combinação de todos os componentes de layout em uma grid responsiva).
- [ ] Importar globalmente o CSS do Design System no `app/layout.tsx`.
- [ ] Implementar a página inicial (`app/page.tsx`) com uma apresentação detalhada do projeto, links para repositórios e explicação de tecnologias de MFEs.

## Cenários de Teste
### Happy Path
- Rodar `npm run dev` na porta 3000 inicializa o Shell sem erros.
- Ao abrir `http://localhost:3000`, a página exibe a Home estruturada com Header, Sidebar (com Badges "Shell", "App Router", "Pages Router", "React Puro") e Footer.
- Clicar no toggle de tema muda o tema de light para dark (e vice-versa), persistindo em `localStorage` e aplicando o estilo correspondente.

## Arquivos a Criar/Modificar
- `mfe-shell/package.json` — Dependências e scripts
- `mfe-shell/app/layout.tsx` — Layout global com ThemeProvider importado do DS
- `mfe-shell/app/page.tsx` — Home page
- `mfe-shell/components/layout/Header.tsx` — Componente Header com switch de tema
- `mfe-shell/components/layout/Sidebar.tsx` — Navegação lateral com Tags do DS
- `mfe-shell/components/layout/Footer.tsx` — Rodapé padrão
- `mfe-shell/components/layout/AppShell.tsx` — Layout combinador
- `mfe-shell/components/layout/layout.module.scss` — Estilos Scss dos layouts do chrome

## Dependências Externas
- `@rafacdomin/ds-core`

## Dependências de Issues
- Nenhuma

## Estimativa P / M / G
M
