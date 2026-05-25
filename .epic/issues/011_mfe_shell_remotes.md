# 011 — Remote Integration & Routing - MFE Shell

## Objetivo
Configurar o Module Federation Host no `mfe-shell` consumindo os 3 remotes, definindo roteamento dinâmico e tratamento de erros com `RemoteWrapper` (ErrorBoundary + Suspense).

## Critérios de Aceite
- [ ] Instalar `@module-federation/enhanced` no `mfe-shell`.
- [ ] Configurar `next.config.mjs` com `NextFederationPlugin` apontando para as URLs locais ou de produção dos 3 remotes.
- [ ] Criar `lib/remotes.ts` para carregar as URLs dos remotes dinamicamente a partir de variáveis de ambiente com fallbacks locais.
- [ ] Criar `global.d.ts` na raiz do Shell declarando tipos TypeScript para os módulos remotos (`mfe_app_router/Page`, `mfe_pages_router/Page`, `mfe_react/Page`).
- [ ] Criar o componente `RemoteWrapper.tsx` sob `components/RemoteWrapper.tsx` que combina um `ErrorBoundary` customizado com React `Suspense`.
- [ ] Implementar rotas dinâmicas:
  - `/profile` carregando de `mfe_app_router/Page`.
  - `/dashboard` carregando de `mfe_pages_router/Page`.
  - `/catalog` carregando de `mfe_react/Page`.
- [ ] Garantir que se um remoto estiver fora do ar, o `RemoteWrapper` renderiza uma mensagem de erro estilizada informando qual MFE falhou sem derrubar a aplicação inteira.

## Cenários de Teste
### Happy Path
- Com todos os 3 remotes rodando localmente (portas 3001, 3002, 3003), ao clicar nos links do Sidebar do Shell, as páginas renderizam corretamente dentro do frame global.
- Alternar entre as páginas mantém o layout do Shell estático e apenas atualiza o conteúdo principal.
### Edge Cases
- Desligar o remote do `mfe-react` (porta 3003) e navegar para `/catalog`. O Shell deve renderizar a mensagem "MFE mfe-react indisponível" na área de conteúdo sem afetar a navegação ou o restante do layout.

## Arquivos a Criar/Modificar
- `mfe-shell/next.config.mjs` — Configuração do Host com os Remotes definidos
- `mfe-shell/lib/remotes.ts` — Tratamento dinâmico das URLs
- `mfe-shell/global.d.ts` — Declarações de tipos dos remotes
- `mfe-shell/components/RemoteWrapper.tsx` — Error Boundary e Suspense loader
- `mfe-shell/app/profile/page.tsx` — Rota de Perfil montando remote
- `mfe-shell/app/dashboard/page.tsx` — Rota de Dashboard montando remote
- `mfe-shell/app/catalog/page.tsx` — Rota de Catálogo montando remote

## Dependências Externas
- `@module-federation/enhanced`

## Dependências de Issues
- `010_mfe_shell_setup_layout.md`, `003_mfe_react_federation.md`, `006_mfe_pages_federation.md`, `009_mfe_app_federation.md`

## Estimativa P / M / G
M
