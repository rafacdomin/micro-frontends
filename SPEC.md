# SPEC: Ecossistema de Microfrontends com Module Federation e Design System

## 1. Visão Geral

Este projeto consiste em uma plataforma de gestão corporativa integrada através de uma arquitetura de **Microfrontends (MFEs)** usando **Module Federation 2.0 (`@module-federation/enhanced`)**. A plataforma demonstra a capacidade de integrar diferentes frameworks e roteadores compartilhando uma base comum e um Design System corporativo publicado no npm (`@rafacdomin/ds-core` e `@rafacdomin/ds-carousel`).

O ecossistema é composto por um Host (Shell) que gerencia o layout global (chrome) e 3 Remotes independentes que expõem suas respectivas páginas:
- **Shell**: Next.js 15 App Router (Host que gerencia o Header, Sidebar, Footer e Tema).
- **MFE App Router (`/profile`)**: Next.js 15 App Router (Remote interativo para Perfil do Usuário).
- **MFE Pages Router (`/dashboard`)**: Next.js 15 Pages Router (Remote focado em SSR para Métricas).
- **MFE React (`/catalog`)**: React 18 puro com Webpack 5 manual (Remote de Catálogo de Produtos).

---

## 2. Stack Técnica e Justificativas

| Aplicação | Framework / Tooling | Porta | Motivo |
| :--- | :--- | :--- | :--- |
| **mfe-shell** | Next.js 15 App Router + `@module-federation/enhanced/next` | 3000 | Serve como o frame central. Gerencia roteamento dinâmico e carregamento lazy-loaded de remotes. |
| **mfe-app-router** | Next.js 15 App Router + `@module-federation/enhanced/next` | 3001 | Representa telas dinâmicas do usuário que não precisam de SSR pesado, aproveitando Client Components (`'use client'`). |
| **mfe-pages-router** | Next.js 15 Pages Router + `@module-federation/enhanced/next` | 3002 | Permite demonstrar Server-Side Rendering (SSR) nativo com Module Federation sem as restrições do App Router. |
| **mfe-react** | React 18 + Webpack 5 manual + `@module-federation/enhanced/webpack` | 3003 | Demonstra que o ecossistema é agnóstico de frameworks Next.js e pode carregar módulos React puros. |

### Dependências Compartilhadas (Shared Dependencies)
Para otimizar o tamanho dos pacotes e evitar múltiplos runtimes, as seguintes bibliotecas são compartilhadas via Module Federation como singletons:
- `react`
- `react-dom`
- `@rafacdomin/ds-core` (Design System base)

---

## 3. Estrutura do Monorepo

O repositório é organizado de forma monorepo simples contendo as 4 aplicações em subdiretórios na raiz:

```
micro-frontend/
├── mfe-shell/             # Host (Next.js 15 App Router)
├── mfe-app-router/        # Remote /profile (Next.js 15 App Router)
├── mfe-pages-router/      # Remote /dashboard (Next.js 15 Pages Router)
├── mfe-react/             # Remote /catalog (React 18 + Webpack 5)
├── references/            # Documentação técnica e guias
└── SPEC.md                # Esta especificação
```

Cada pasta de aplicação terá seu próprio `package.json`, arquivos de configuração (`tsconfig.json`, `next.config.mjs` ou `webpack.config.js`) e código-fonte isolado.

---

## 4. Design Tokens e Estilização

O ecossistema consome o Design System `@rafacdomin/ds-core`, que exporta tokens via variáveis CSS nativas (Custom Properties).

### Principais Variáveis de Tema (Design System)
O Shell e os MFEs utilizam as variáveis CSS disponibilizadas pelo `@rafacdomin/ds-core`:
- **Cores Primárias**: `--color-primary`, `--color-primary-hover`
- **Cores Secundárias**: `--color-secondary`, `--color-secondary-hover`
- **Neutras**: `--color-bg-base`, `--color-bg-surface`, `--color-text-main`, `--color-text-muted`, `--color-border`
- **Estados (Status)**: `--color-success`, `--color-warning`, `--color-danger`, `--color-info`
- **Tipografia**: Font-family base (ex: `Inter, sans-serif`), `--font-size-sm`, `--font-size-md`, `--font-size-lg`, `--font-size-xl`
- **Bordas e Sombras**: `--radius-sm`, `--radius-md`, `--radius-lg`, `--shadow-sm`, `--shadow-md`

---

## 5. Componentes do Design System Consumidos

Mapeamento dos componentes fornecidos por `@rafacdomin/ds-core` e `@rafacdomin/ds-carousel` que serão integrados nas aplicações:

### `@rafacdomin/ds-core`
1. **Avatar**: Renders avatar images or initials for user profiles.
   - *Props*: `name: string`, `src?: string`, `size?: 'sm' | 'md' | 'lg'`
2. **Card**: Recipiente básico de layout estruturado.
   - *Props*: `children: ReactNode`, `className?: string`
3. **Button**: Botões interativos.
   - *Props*: `children: ReactNode`, `variant?: 'primary' | 'secondary' | 'outline' | 'danger'`, `size?: 'sm' | 'md' | 'lg'`, `onClick?: () => void`
4. **Tag**: Distintivos para badges ou status de framework.
   - *Props*: `children: ReactNode`, `variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'`, `size?: 'sm' | 'md'`
5. **Input**: Campo de texto para formulários.
   - *Props*: `value: string`, `onChange: (e: ChangeEvent<HTMLInputElement>) => void`, `placeholder?: string`, `aria-label?: string`
6. **Dropdown**: Menu seletor de opções.
   - *Props*: `label?: string`, `value: string`, `onChange: (val: string) => void`, `options: Array<{ value: string; label: string }>`
7. **Skeleton**: Carregamento visual para suspensão de MFEs.
   - *Props*: `rows?: number`

---

## 6. Sistema de Temas (Light / Dark Mode)

O gerenciamento de temas é centralizado no **Shell**:
- O `mfe-shell` possui um toggle de tema no `Header`.
- O tema atual (`light` ou `dark`) é salvo em `localStorage` e refletido aplicando uma classe correspondente (ex: `.theme-dark` ou `data-theme="dark"`) no elemento HTML ou body.
- Como todos os MFEs e o Shell rodam sob o mesmo contexto de DOM no navegador do usuário, as variáveis CSS globais definidas no document root do `@rafacdomin/ds-core` serão atualizadas dinamicamente e herdadas automaticamente por todos os componentes renderizados dentro de qualquer MFE.
- O `@rafacdomin/ds-core/dist/style.css` deve ser importado globalmente no `layout.tsx` do Shell e nas páginas standalone dos remotes para garantir a presença dos estilos e tokens base.

---

## 7. Estratégia de Testes

Garantiremos a qualidade do código com as seguintes abordagens:

### Testes Unitários (Remotes)
- **Ferramenta**: Vitest + React Testing Library.
- **Escopo**: Testar interações e estados internos de cada página exposta (ex: o clique em "Editar" do perfil no `mfe-app-router` alternando o input, ou a seleção do filtro do dropdown no `mfe-pages-router`).
- **Cobertura Esperada**: Mínimo de 80% de cobertura nos componentes lógicos específicos criados em cada MFE.

### Testes E2E / Integração (Shell)
- **Ferramenta**: Playwright ou Vitest (com jsdom para testes de integração).
- **Escopo**: Validar que o Shell carrega dinamicamente cada página MFE e renderiza o fallback apropriado em caso de falha de conexão do Remote.

---

## 8. Critérios de Done (CoD)

Uma tarefa ou issue é considerada **concluída (Done)** quando atende aos seguintes requisitos:
1. **Tipagem Estrita**: 100% tipado com TypeScript (sem o uso de `any` injustificado).
2. **Integração com Design System**: Utiliza tokens CSS e componentes do `@rafacdomin/ds-core` em vez de estilizações inline ou CSS ad-hoc.
3. **CORS Configurado**: Configurações de CORS (`Access-Control-Allow-Origin: *`) validadas em modo local e presentes nos arquivos de configuração do deploy (`vercel.json`/`next.config.mjs`).
4. **Testes Unitários**: Testes escritos cobrindo caminhos felizes e de erro, rodando com sucesso.
5. **Build de Produção**: A aplicação compila com sucesso localmente através do comando `npm run build`.
6. **Git Branching**: Entregue via merge de Pull Request em branch separada (ex: `feature/issue-xxx`).
