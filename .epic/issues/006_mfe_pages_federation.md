# 006 — Module Federation & CORS - MFE Pages Router

## Objetivo
Configurar o Module Federation no `mfe-pages-router` para expor o componente `./Page` e servir os arquivos com cabeçalhos CORS corretos tanto em desenvolvimento quanto na produção.

## Critérios de Aceite
- [ ] Instalar `@module-federation/enhanced` no `mfe-pages-router`.
- [ ] Criar e configurar `next.config.mjs` usando `NextFederationPlugin`.
- [ ] Configurar a exposição do componente `./Page` mapeando para `./src/components/Page/index.ts`.
- [ ] Configurar a propriedade `shared` contendo `react`, `react-dom` e `@rafacdomin/ds-core` (com `import: false`).
- [ ] Tratar a diferenciação do build de servidor (`isServer`) para que o remoteEntry.js seja gerado no caminho correto.
- [ ] Adicionar cabeçalhos de CORS (`Access-Control-Allow-Origin: *`) para o caminho do `remoteEntry.js` em desenvolvimento e produção.
- [ ] Criar `vercel.json` configurando os CORS headers.

## Cenários de Teste
### Happy Path
- O build local gera os arquivos federados na pasta `.next/static`.
- Em desenvolvimento, `http://localhost:3002/_next/static/chunks/remoteEntry.js` (ou o correspondente SSR) responde com cabeçalho `Access-Control-Allow-Origin: *`.

## Arquivos a Criar/Modificar
- `mfe-pages-router/next.config.mjs` — Configurações Next.js de Module Federation
- `mfe-pages-router/vercel.json` — Headers CORS para a Vercel
- `mfe-pages-router/package.json` — Adicionar dependências

## Dependências Externas
- `@module-federation/enhanced`

## Dependências de Issues
- `005_mfe_pages_page.md`

## Estimativa P / M / G
P
