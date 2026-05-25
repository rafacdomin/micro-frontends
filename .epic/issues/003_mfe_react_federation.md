# 003 — Module Federation & CORS - MFE React

## Objetivo
Configurar o Module Federation 2.0 no Webpack do `mfe-react` para expor o componente `./Page` e servir os arquivos com cabeçalhos CORS corretos.

## Critérios de Aceite
- [ ] Instalar `@module-federation/enhanced` no `mfe-react`.
- [ ] Atualizar `mfe-react/webpack.config.js` para usar o `ModuleFederationPlugin` do `@module-federation/enhanced/webpack`.
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

---

## Pesquisa
Module Federation 2.0 é provido por `@module-federation/enhanced`. Para Webpack 5, importamos o plugin de:
```javascript
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
```
Configurações essenciais para o remote:
- `name`: Identificador único (deve coincidir com a chave configurada no Host). Aqui usaremos `mfe_react`.
- `filename`: O arquivo manifesto gerado, por convenção `remoteEntry.js`.
- `exposes`: Mapeia caminhos exportados para arquivos locais. Exemplo: `{ './Page': './src/components/Page/index.ts' }`.
- `shared`: Garante singletons para dependências críticas do React. A configuração `{ singleton: true, requiredVersion: '^18.0.0' }` assegura que apenas uma instância de `react` e `react-dom` será carregada na página global, prevenindo incompatibilidades de estado.
Para `@rafacdomin/ds-core`, adicionamos `import: false` para indicar ao federador que esse remote não deve bundlear sua própria cópia do DS caso ela seja fornecida pelo Shell, economizando kb.

## Implementação Planejada

### Atualização no `webpack.config.js`
```javascript
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ... entrada, saída e loaders ...
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe_react',
      filename: 'remoteEntry.js',
      exposes: {
        './Page': './src/components/Page/index.ts',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        '@rafacdomin/ds-core': { singleton: true, requiredVersion: '^0.1.0', import: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 3003,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
```

## Decisões Técnicas
- **CORS Local**: Definir explicitamente o header `Access-Control-Allow-Origin: *` no dev server para que o Host (`mfe-shell` na porta 3000) possa buscar os scripts na porta 3003 via fetch/XHR.
- **CORS de Produção**: Usar `vercel.json` com regras de rotas para injetar o header em todos os arquivos estáticos compilados que forem servidos pela Vercel.

## Checklist de Implementação
- [x] Instalar `@module-federation/enhanced` na pasta `mfe-react`.
- [x] Modificar `mfe-react/webpack.config.js` para importar `ModuleFederationPlugin` de `@module-federation/enhanced/webpack`.
- [x] Adicionar o plugin no array `plugins` com as opções corretas (`name: 'mfe_react'`, `filename: 'remoteEntry.js'`).
- [x] Expor o ponto de entrada `./Page` mapeando para `./src/components/Page/index.ts`.
- [x] Declarar `react`, `react-dom` e `@rafacdomin/ds-core` no objeto `shared`.
- [x] Adicionar cabeçalho CORS (`Access-Control-Allow-Origin: *`) na propriedade `devServer.headers` de `webpack.config.js`.
- [x] Criar o arquivo `mfe-react/vercel.json` na raiz do MFE.
- [x] Adicionar regras de cabeçalho CORS no `vercel.json` para arquivos da build `/remoteEntry.js` e outros estáticos.
- [x] Executar build de produção local `npm run build` e verificar que `remoteEntry.js` é gerado.
- [x] Testar localmente se a inicialização com `npm run dev` expõe `remoteEntry.js` na rota `http://localhost:3003/remoteEntry.js`.
