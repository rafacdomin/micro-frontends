# 009 — Module Federation & CORS - MFE App Router

## Objetivo
Configurar o Module Federation no `mfe-app-router` para expor o componente `./Page` e servir os arquivos federados com cabeçalhos CORS corretos.

## Critérios de Aceite
- [ ] Instalar `@module-federation/enhanced` no `mfe-app-router`.
- [ ] Criar e configurar `next.config.mjs` usando `NextFederationPlugin`.
- [ ] Configurar a exposição do componente `./Page` mapeando para `./src/components/Page/index.ts`.
- [ ] Configurar a propriedade `shared` contendo `react`, `react-dom` e `@rafacdomin/ds-core` (com `import: false`).
- [ ] Adicionar cabeçalhos de CORS (`Access-Control-Allow-Origin: *`) para o caminho do `remoteEntry.js` em desenvolvimento e produção.
- [ ] Criar `vercel.json` configurando os CORS headers.

## Cenários de Teste
### Happy Path
- O build local gera os arquivos federados na pasta `.next/static`.
- Em desenvolvimento, `http://localhost:3001/_next/static/chunks/remoteEntry.js` responde com cabeçalho `Access-Control-Allow-Origin: *`.

## Arquivos a Criar/Modificar
- `mfe-app-router/next.config.mjs` — Configurações Next.js de Module Federation
- `mfe-app-router/vercel.json` — Headers CORS para a Vercel
- `mfe-app-router/package.json` — Adicionar dependências

## Dependências Externas
- `@module-federation/enhanced`

## Dependências de Issues
- `008_mfe_app_page.md`

## Estimativa P / M / G
P
