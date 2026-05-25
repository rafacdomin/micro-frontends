# 003 — Module Federation & CORS - MFE React

## Objetivo
Configurar o Module Federation 2.0 no Webpack do `mfe-react` para expor o componente `./Page` e servir os arquivos com cabeçalhos CORS corretos.

## Critérios de Aceite
- [ ] Instalar `@module-federation/enhanced` no `mfe-react`.
- [ ] Atualizar `mfe-react/webpack.config.js` para usar o `ModuleFederationPlugin`.
- [ ] Configurar a exposição do componente `./Page` apontando para `./src/components/Page/index.ts`.
- [ ] Definir a propriedade `shared` contendo `react`, `react-dom` e `@rafacdomin/ds-core` (com `import: false` para que o Shell proveja).
- [ ] Adicionar cabeçalho `Access-Control-Allow-Origin: *` no dev server local.
- [ ] Criar `vercel.json` configurando o CORS do remoteEntry.js para produção.

## Cenários de Teste
### Happy Path
- O build de produção gera o arquivo `remoteEntry.js` no diretório de saída (`dist/`).
- Ao rodar o dev server local, o arquivo `http://localhost:3003/remoteEntry.js` é acessível e contém o cabeçalho `Access-Control-Allow-Origin: *`.

## Arquivos a Criar/Modificar
- `mfe-react/webpack.config.js` — Configuração do Module Federation e Headers
- `mfe-react/vercel.json` — Configurações CORS de Deploy
- `mfe-react/package.json` — Adicionar `@module-federation/enhanced`

## Dependências Externas
- `@module-federation/enhanced`

## Dependências de Issues
- `002_mfe_react_page.md`

## Estimativa P / M / G
P
