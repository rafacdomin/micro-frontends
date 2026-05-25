# 001 — Setup & Tooling - MFE React

## Objetivo
Configurar e inicializar o projeto `mfe-react` como uma aplicação React 18 independente com suporte a TypeScript, Babel e Webpack 5.

## Critérios de Aceite
- [ ] Inicializar o diretório `mfe-react` com `package.json`.
- [ ] Instalar as dependências de desenvolvimento do Webpack 5, TypeScript, Babel, CSS/SASS-loader e plugins essenciais.
- [ ] Configurar `tsconfig.json` e `babel.config.js` apropriadamente.
- [ ] Criar estrutura básica de arquivos com `src/index.tsx`, `src/bootstrap.tsx` e `public/index.html`.
- [ ] Rodar o comando `npm run build` e gerar os assets compilados sob a pasta `dist`.

## Cenários de Teste
### Happy Path
- O comando `npm run dev` (ou webpack dev server na porta 3003) inicia a aplicação localmente sem erros.
- A página HTML renderiza "Hello from MFE React" ou semelhante ao ser aberta no navegador.

## Arquivos a Criar/Modificar
- `mfe-react/package.json` — Dependências e scripts
- `mfe-react/tsconfig.json` — Configurações TypeScript
- `mfe-react/webpack.config.js` — Configuração do Webpack (sem Module Federation por enquanto)
- `mfe-react/src/index.tsx` — Entrada principal (import assíncrono para o bootstrap)
- `mfe-react/src/bootstrap.tsx` — Inicialização do React renderizando no DOM
- `mfe-react/public/index.html` — Template HTML principal

## Dependências Externas
- Nenhuma

## Dependências de Issues
- Nenhuma

## Estimativa P / M / G
P

---

## Pesquisa
A configuração do Webpack para React + TypeScript + Babel normalmente necessita dos seguintes presets do Babel:
- `@babel/preset-env` para compilar JS moderno.
- `@babel/preset-react` com `{ runtime: "automatic" }` para JSX sem precisar importar React explicitamente.
- `@babel/preset-typescript` para lidar com arquivos `.ts` e `.tsx`.

Para o Webpack, precisamos de:
- `html-webpack-plugin` para injetar automaticamente os bundles no `index.html`.
- `sass-loader` + `css-loader` + `style-loader` para resolver arquivos `.module.scss` e `.css`.

No Module Federation (que será adicionado na Issue 003), um padrão comum e obrigatório é o **Async Bootstrap**: o arquivo `index.tsx` deve ter apenas um `import('./bootstrap')` dinâmico para garantir que os módulos federados sejam carregados antes do código de bootstrap iniciar.

## Implementação Planejada
Estrutura final de arquivos para esta issue:
```
mfe-react/
├── public/
│   └── index.html
├── src/
│   ├── bootstrap.tsx
│   ├── index.tsx
│   └── App.tsx
├── babel.config.json
├── tsconfig.json
└── webpack.config.js
```

### Exemplo de `webpack.config.js` inicial (sem Module Federation)
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 3003,
    historyApiFallback: true,
  },
};
```

## Decisões Técnicas
- **Babel vs ts-loader**: Usaremos o Babel com `@babel/preset-typescript` para transpilação rápida e flexível. O TypeScript em si será usado separadamente para type check (`npx tsc --noEmit`) no workflow de CI, otimizando a velocidade de compilação em desenvolvimento.
- **Sass nativo**: Usaremos SASS puro no Webpack (`sass-loader` com o compilador `sass`), permitindo isolamento de estilos por componente através de CSS Modules (`.module.scss`).

## Checklist de Implementação
- [x] Criar o diretório `mfe-react` caso ele não exista.
- [x] Inicializar o `package.json` em `mfe-react/package.json`.
- [x] Adicionar dependências de produção (`react`, `react-dom`).
- [x] Adicionar dependências de desenvolvimento do Webpack (`webpack`, `webpack-cli`, `webpack-dev-server`, `html-webpack-plugin`).
- [x] Adicionar dependências de desenvolvimento do Babel (`@babel/core`, `babel-loader`, `@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`).
- [x] Adicionar loaders de estilo (`sass`, `sass-loader`, `css-loader`, `style-loader`).
- [x] Criar arquivo `babel.config.json` na pasta do `mfe-react`.
- [x] Adicionar presets no `babel.config.json`.
- [x] Criar `tsconfig.json` configurado para React e TypeScript moderno.
- [x] Criar `webpack.config.js` com suporte a loaders de JS/TS e estilos SASS.
- [x] Criar `public/index.html` com o container `<div id="root"></div>`.
- [x] Criar `src/App.tsx` que exibe uma mensagem simples de confirmação de funcionamento.
- [x] Criar `src/bootstrap.tsx` contendo o código de renderização do React 18 (`createRoot`).
- [x] Criar `src/index.tsx` contendo apenas o `import('./bootstrap')` dinâmico (Async Boundary).
- [x] Executar `npm install` no diretório do MFE.
- [x] Testar se o build local funciona via `npm run build`.
- [x] Testar se o dev server inicializa corretamente na porta 3003 via `npm run dev` e se o conteúdo é exibido no browser.
