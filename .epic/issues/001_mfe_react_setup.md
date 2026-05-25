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
