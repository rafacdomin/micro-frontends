# Guia: Microfrontends com Module Federation + Design System

> 5 repositórios independentes. Shell provê o chrome (header, footer, sidebar).
> Cada MFE expõe 1 página. Deploy automático na Vercel via GitHub Actions.
> Stack: @module-federation/enhanced (MF 2.0).

---

## Índice

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Narrativa e tema de cada MFE](#2-narrativa-e-tema-de-cada-mfe)
3. [Limitação conhecida: App Router + MF](#3-limitação-conhecida-app-router--mf)
4. [Os 5 repositórios](#4-os-5-repositórios)
5. [Shell — chrome da aplicação](#5-shell--chrome-da-aplicação)
6. [MFE 1 — Next.js App Router](#6-mfe-1--nextjs-app-router-perfil-do-usuário)
7. [MFE 2 — Next.js Pages Router](#7-mfe-2--nextjs-pages-router-dashboard)
8. [MFE 3 — React.js puro](#8-mfe-3--reactjs-puro-catálogo-de-produtos)
9. [CORS em produção](#9-cors-em-produção)
10. [Estratégia de deploy na Vercel](#10-estratégia-de-deploy-na-vercel)
11. [GitHub Actions — workflow por repositório](#11-github-actions--workflow-por-repositório)
12. [AGENTS.md por repositório](#12-agentsmd-por-repositório)
13. [Issues breakdown](#13-issues-breakdown)
14. [Ordem de execução](#14-ordem-de-execução)
15. [Sequência de comandos para começar](#15-sequência-de-comandos-para-começar)

---

## 1. Visão Geral da Arquitetura

```
┌──────────────────────────────────────────────────────────────────┐
│                  SHELL  mfe-shell.vercel.app                     │
│                      Next.js App Router                          │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  <Header />    logo + toggle de tema                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│  ┌──────────────────┐  ┌──────────────────────────────────┐     │
│  │  <Sidebar />     │  │        <main>                    │     │
│  │                  │  │                                  │     │
│  │  → /             │  │   Página do MFE carregada aqui   │     │
│  │  → /profile      │  │                                  │     │
│  │    [App Router]  │  │   <RemoteWrapper>                │     │
│  │  → /dashboard    │  │     <RemotePage />               │     │
│  │    [Pages Router]│  │   </RemoteWrapper>               │     │
│  │  → /catalog      │  │                                  │     │
│  │    [React puro]  │  └──────────────────────────────────┘     │
│  └──────────────────┘                                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  <Footer />                                             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Shared via MF: React · ReactDOM · @rafacdomin/ds-core          │
└──────────────────────────────────────────────────────────────────┘
         ↑                       ↑                     ↑
         │                       │                     │
         ▼                       ▼                     ▼
mfe-app-router.vercel.app  mfe-pages-router.vercel.app  mfe-react.vercel.app
  Next.js App Router          Next.js Pages Router       React + Webpack 5
  /profile → ./Page           /dashboard → ./Page        /catalog → ./Page
  ('use client')              (SSR ok)                   (client)
```

### Portas e URLs

| App | Dev | Produção |
|-----|-----|----------|
| Shell | :3000 | `mfe-shell.vercel.app` |
| MFE App Router | :3001 | `mfe-app-router.vercel.app` |
| MFE Pages Router | :3002 | `mfe-pages-router.vercel.app` |
| MFE React | :3003 | `mfe-react.vercel.app` |

> As URLs da Vercel são previsíveis e baseadas no nome do projeto.
> Isso resolve o problema de dependência circular no deploy (detalhes na seção 10).

---

## 2. Narrativa e tema de cada MFE

A aplicação simula uma **plataforma interna de gestão** — uma história coerente
que justifica 3 equipes (e 3 tecnologias) diferentes.

### Shell — "Frame" da plataforma
Header com logo, toggle de tema (light/dark), sidebar com navegação.
Página home (`/`) com uma apresentação do projeto: o que é, quais tecnologias,
links para o repositório de cada MFE no GitHub. Usa o DS extensivamente.

### MFE 1 — `/profile` — Perfil do Usuário (Next.js App Router)
Página de perfil com avatar, nome, cargo e lista de habilidades.
Demonstra Client Components com estado (`useState` para editar o perfil).
Usa `Avatar`, `Card`, `Button`, `Tag` do DS.
**Por que App Router aqui:** é uma tela interativa, sem necessidade de SSR —
encaixa bem com a limitação de `'use client'` do MF + App Router.

```
┌────────────────────────────────────────┐
│  [Avatar]  Rafael Domingues            │
│            Senior Frontend Engineer    │
│  ┌──────┐ ┌──────┐ ┌──────────────┐  │
│  │React │ │TypeSc│ │Design Systems│  │  ← Tags do DS
│  └──────┘ └──────┘ └──────────────┘  │
│  [Editar perfil]                       │  ← Button do DS
└────────────────────────────────────────┘
```

### MFE 2 — `/dashboard` — Métricas (Next.js Pages Router)
Dashboard com tabela de métricas e cards de resumo.
Dados mockados via `getServerSideProps` para demonstrar SSR real.
Usa `Card`, `Tag`, `Dropdown` (filtro) do DS.
**Por que Pages Router aqui:** SSR nativo sem restrições — ideal para dados
que precisam ser pré-renderizados no servidor.

```
┌──────────────────────────────────────────────┐
│  [Card: 1.240 usuários]  [Card: 98% uptime]  │
│                                              │
│  Filtrar por: [Dropdown ▼]                   │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │ Métrica        │ Valor  │ Status     │   │
│  │ Requests/min   │ 4.200  │ [normal]   │   │
│  │ Error rate     │ 0.02%  │ [ok]       │   │
│  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

### MFE 3 — `/catalog` — Catálogo de Produtos (React.js puro)
Grid de cards de produto com nome, preço e botão de ação.
Demonstra que o DS funciona em React puro, sem Next.js.
Usa `Card`, `Button`, `Tag` do DS.
**Por que React puro aqui:** a tela mais "genérica" do app — ideal para
demonstrar que MF é agnóstico de framework.

```
┌────────────────────────────────────────────────┐
│  [Tag: React Puro]  Catálogo de Produtos        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Produto 1│  │ Produto 2│  │ Produto 3│     │  ← Cards do DS
│  │ R$ 99,00 │  │ R$ 149,00│  │ R$ 79,00 │     │
│  │[Adicionar]│ │[Adicionar]│ │[Adicionar]│    │  ← Buttons do DS
│  └──────────┘  └──────────┘  └──────────┘     │
└────────────────────────────────────────────────┘
```

---

## 3. Limitação conhecida: App Router + MF

RSC não podem ser federados. Tudo exposto via MF precisa de `'use client'`.

```tsx
// ✅ Pode ser federado
'use client'
export function Page() { ... }

// ❌ Não pode ser federado
export default async function Page() { ... }  // RSC puro
```

**Workaround:** Shell faz fetch dos dados (SSR), passa via props para o remote.
Use `--turbopack=false` no create-next-app — Turbopack não suporta MF.

---

## 4. Os 5 repositórios

```
GitHub/
├── ds-portfolio/          # @rafacdomin/ds-core (publicado no npm)
├── mfe-shell/             # Host — chrome + roteamento
├── mfe-app-router/        # Remote /profile — Next.js App Router
├── mfe-pages-router/      # Remote /dashboard — Next.js Pages Router
└── mfe-react/             # Remote /catalog — React.js puro
```

---

## 5. Shell — chrome da aplicação

### Estrutura de pastas

```
mfe-shell/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── app/
│   ├── layout.tsx              # ThemeProvider + AppShell
│   ├── page.tsx                # Home — apresentação do ecossistema
│   ├── profile/
│   │   └── page.tsx            # mfe_app_router/Page
│   ├── dashboard/
│   │   └── page.tsx            # mfe_pages_router/Page
│   └── catalog/
│       └── page.tsx            # mfe_react/Page
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx         # Links + Tag de framework
│   │   ├── Footer.tsx
│   │   └── AppShell.tsx
│   └── RemoteWrapper.tsx
├── lib/
│   └── remotes.ts              # URLs por ambiente
├── global.d.ts                 # Type declarations dos remotes
├── vercel.json                 # CORS headers
└── next.config.mjs
```

### `lib/remotes.ts`

```ts
export const remoteUrls = {
  mfe_app_router: process.env.NEXT_PUBLIC_MFE_APP_ROUTER_URL
    ?? 'http://localhost:3001/_next/static/chunks/remoteEntry.js',
  mfe_pages_router: process.env.NEXT_PUBLIC_MFE_PAGES_ROUTER_URL
    ?? 'http://localhost:3002/_next/static/chunks/remoteEntry.js',
  mfe_react: process.env.NEXT_PUBLIC_MFE_REACT_URL
    ?? 'http://localhost:3003/remoteEntry.js',
}
```

### `global.d.ts` — tipos dos remotes

```ts
// TypeScript não conhece os módulos federados — declarar manualmente
declare module 'mfe_app_router/Page' {
  const Page: React.ComponentType<Record<string, unknown>>
  export default Page
  export { Page }
}

declare module 'mfe_pages_router/Page' {
  const Page: React.ComponentType<Record<string, unknown>>
  export default Page
  export { Page }
}

declare module 'mfe_react/Page' {
  const Page: React.ComponentType<Record<string, unknown>>
  export default Page
  export { Page }
}
```

### `next.config.mjs`

```js
import { NextFederationPlugin } from '@module-federation/enhanced/next'
import { remoteUrls } from './lib/remotes.js'

const nextConfig = {
  // CORS para o remoteEntry.js do Shell (caso outro app consuma)
  async headers() {
    return [{
      source: '/_next/static/chunks/remoteEntry.js',
      headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
    }]
  },
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shell',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          mfe_app_router:   `mfe_app_router@${remoteUrls.mfe_app_router}`,
          mfe_pages_router: `mfe_pages_router@${remoteUrls.mfe_pages_router}`,
          mfe_react:        `mfe_react@${remoteUrls.mfe_react}`,
        },
        shared: {
          react:       { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
          '@rafacdomin/ds-core': { singleton: true, requiredVersion: '^1.0.0' },
        },
      })
    )
    return config
  },
}

export default nextConfig
```

### `components/layout/Sidebar.tsx`

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tag } from '@rafacdomin/ds-core'
import styles from './Sidebar.module.scss'

const routes = [
  { path: '/',           label: 'Home',      badge: 'Shell',        badgeVariant: 'neutral'  },
  { path: '/profile',    label: 'Perfil',    badge: 'App Router',   badgeVariant: 'info'     },
  { path: '/dashboard',  label: 'Dashboard', badge: 'Pages Router', badgeVariant: 'success'  },
  { path: '/catalog',    label: 'Catálogo',  badge: 'React Puro',   badgeVariant: 'warning'  },
] as const

export function Sidebar() {
  const pathname = usePathname()
  return (
    <nav className={styles.root} aria-label="Navegação principal">
      {routes.map(({ path, label, badge, badgeVariant }) => (
        <Link
          key={path}
          href={path}
          className={styles.link}
          data-active={pathname === path}
          aria-current={pathname === path ? 'page' : undefined}
        >
          <span>{label}</span>
          <Tag size="sm" variant={badgeVariant}>{badge}</Tag>
        </Link>
      ))}
    </nav>
  )
}
```

### `components/RemoteWrapper.tsx`

```tsx
'use client'
import { Component, Suspense } from 'react'
import { Skeleton } from '@rafacdomin/ds-core'

class RemoteBoundary extends Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean; error?: Error }
> {
  state = { hasError: false }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <p>MFE <strong>{this.props.name}</strong> indisponível.</p>
          <small>{this.state.error?.message}</small>
        </div>
      )
    }
    return this.props.children
  }
}

export function RemoteWrapper({
  children,
  name = 'Remote',
}: {
  children: React.ReactNode
  name?: string
}) {
  return (
    <RemoteBoundary name={name}>
      <Suspense fallback={<Skeleton rows={4} />}>
        {children}
      </Suspense>
    </RemoteBoundary>
  )
}
```

### Páginas que montam os remotes

```tsx
// app/profile/page.tsx
import dynamic from 'next/dynamic'
import { RemoteWrapper } from '@/components/RemoteWrapper'

const RemotePage = dynamic(() => import('mfe_app_router/Page'), { ssr: false })

export default function ProfilePage() {
  return (
    <RemoteWrapper name="mfe-app-router">
      <RemotePage />
    </RemoteWrapper>
  )
}
```

```tsx
// app/dashboard/page.tsx — Shell pode passar dados SSR via props
import dynamic from 'next/dynamic'
import { RemoteWrapper } from '@/components/RemoteWrapper'

const RemotePage = dynamic(() => import('mfe_pages_router/Page'), { ssr: false })

export default async function DashboardPage() {
  // SSR acontece aqui; o remote recebe os dados já prontos
  const metrics = await fetch(`${process.env.API_URL}/metrics`).then(r => r.json())
  return (
    <RemoteWrapper name="mfe-pages-router">
      <RemotePage initialMetrics={metrics} />
    </RemoteWrapper>
  )
}
```

```tsx
// app/catalog/page.tsx
import dynamic from 'next/dynamic'
import { RemoteWrapper } from '@/components/RemoteWrapper'

const RemotePage = dynamic(() => import('mfe_react/Page'), { ssr: false })

export default function CatalogPage() {
  return (
    <RemoteWrapper name="mfe-react">
      <RemotePage />
    </RemoteWrapper>
  )
}
```

---

## 6. MFE 1 — Next.js App Router: Perfil do Usuário

### `src/components/Page/Page.tsx`

```tsx
'use client'
import { useState } from 'react'
import { Avatar, Card, Button, Tag, Input } from '@rafacdomin/ds-core'
import styles from './Page.module.scss'

const skills = ['React', 'TypeScript', 'Design Systems', 'Module Federation']

export function Page() {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('Rafael Domingues')

  return (
    <Card className={styles.root}>
      <Tag variant="info" size="sm">Next.js App Router</Tag>

      <div className={styles.profile}>
        <Avatar name={name} size="lg" />
        {editing ? (
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            aria-label="Nome do usuário"
          />
        ) : (
          <h1>{name}</h1>
        )}
        <p>Senior Frontend Engineer</p>
      </div>

      <div className={styles.skills}>
        {skills.map(skill => (
          <Tag key={skill} variant="neutral">{skill}</Tag>
        ))}
      </div>

      <Button
        variant={editing ? 'primary' : 'secondary'}
        onClick={() => setEditing(e => !e)}
      >
        {editing ? 'Salvar' : 'Editar perfil'}
      </Button>
    </Card>
  )
}
```

### `next.config.mjs`

```js
import { NextFederationPlugin } from '@module-federation/enhanced/next'

export default {
  async headers() {
    return [{
      source: '/_next/static/chunks/remoteEntry.js',
      headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
    }]
  },
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mfe_app_router',
        filename: 'static/chunks/remoteEntry.js',
        exposes: { './Page': './src/components/Page/index.ts' },
        shared: {
          react:       { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
          '@rafacdomin/ds-core': { singleton: true, requiredVersion: '^1.0.0', import: false },
        },
      })
    )
    return config
  },
}
```

---

## 7. MFE 2 — Next.js Pages Router: Dashboard

### `src/components/Page/Page.tsx`

```tsx
// Sem 'use client' — SSR funciona normalmente
import { Card, Tag, Dropdown } from '@rafacdomin/ds-core'
import { useState } from 'react'
import styles from './Page.module.scss'

interface Metric { label: string; value: string; status: 'ok' | 'warn' | 'error' }

interface PageProps {
  initialMetrics?: Metric[]
}

const defaultMetrics: Metric[] = [
  { label: 'Requests/min', value: '4.200',  status: 'ok'   },
  { label: 'Error rate',   value: '0.02%',  status: 'ok'   },
  { label: 'Latência p99', value: '320ms',  status: 'warn' },
]

const statusVariant = { ok: 'success', warn: 'warning', error: 'danger' } as const

export function Page({ initialMetrics = defaultMetrics }: PageProps) {
  const [filter, setFilter] = useState('all')

  return (
    <div className={styles.root}>
      <Tag variant="success" size="sm">Next.js Pages Router</Tag>
      <h1>Dashboard</h1>

      <div className={styles.summary}>
        <Card><strong>1.240</strong><span>Usuários ativos</span></Card>
        <Card><strong>98%</strong><span>Uptime</span></Card>
      </div>

      <Dropdown
        label="Filtrar por status"
        value={filter}
        onChange={setFilter}
        options={[
          { value: 'all',  label: 'Todos'  },
          { value: 'ok',   label: 'OK'     },
          { value: 'warn', label: 'Alerta' },
        ]}
      />

      <table className={styles.table} role="table">
        <thead>
          <tr>
            <th>Métrica</th><th>Valor</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {initialMetrics
            .filter(m => filter === 'all' || m.status === filter)
            .map(m => (
              <tr key={m.label}>
                <td>{m.label}</td>
                <td>{m.value}</td>
                <td><Tag variant={statusVariant[m.status]}>{m.status}</Tag></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
```

### `next.config.mjs`

```js
import { NextFederationPlugin } from '@module-federation/enhanced/next'

export default {
  async headers() {
    return [{
      source: '/_next/static/:path*/remoteEntry.js',
      headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
    }]
  },
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mfe_pages_router',
        filename: `static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        exposes: { './Page': './src/components/Page/index.ts' },
        shared: {
          react:       { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
          '@rafacdomin/ds-core': { singleton: true, requiredVersion: '^1.0.0', import: false },
        },
      })
    )
    return config
  },
}
```

---

## 8. MFE 3 — React.js puro: Catálogo de Produtos

### `src/components/Page/Page.tsx`

```tsx
import { useState } from 'react'
import { Card, Button, Tag } from '@rafacdomin/ds-core'
import styles from './Page.module.scss'

interface Product { id: number; name: string; price: string }

const products: Product[] = [
  { id: 1, name: 'Design System Kit',      price: 'R$ 99,00'  },
  { id: 2, name: 'Component Library Pro',  price: 'R$ 149,00' },
  { id: 3, name: 'Storybook Templates',    price: 'R$ 79,00'  },
]

export function Page() {
  const [cart, setCart] = useState<number[]>([])

  const toggle = (id: number) =>
    setCart(c => c.includes(id) ? c.filter(i => i !== id) : [...c, id])

  return (
    <div className={styles.root}>
      <Tag variant="warning" size="sm">React.js Puro</Tag>
      <h1>Catálogo de Produtos</h1>

      <div className={styles.grid}>
        {products.map(p => (
          <Card key={p.id}>
            <h2>{p.name}</h2>
            <strong>{p.price}</strong>
            <Button
              variant={cart.includes(p.id) ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => toggle(p.id)}
            >
              {cart.includes(p.id) ? 'Remover' : 'Adicionar'}
            </Button>
          </Card>
        ))}
      </div>

      {cart.length > 0 && (
        <Tag variant="success">{cart.length} item(s) no carrinho</Tag>
      )}
    </div>
  )
}
```

### `webpack.config.js`

```js
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.PUBLIC_URL ?? 'http://localhost:3003/',
    clean: true,
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.module\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe_react',
      filename: 'remoteEntry.js',
      exposes: { './Page': './src/components/Page/index.ts' },
      shared: {
        react:       { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        '@rafacdomin/ds-core': { singleton: true, requiredVersion: '^1.0.0', import: false },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  devServer: {
    port: 3003,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
}
```

### `vercel.json` do mfe-react

O mfe-react gera arquivos estáticos — precisa de configuração especial na Vercel.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, OPTIONS" }
      ]
    }
  ]
}
```

`package.json` do mfe-react — script de build para Vercel:

```json
{
  "scripts": {
    "build": "webpack --mode production",
    "vercel-build": "webpack --mode production"
  }
}
```

---

## 9. CORS em produção

Cada MFE precisa servir o `remoteEntry.js` com header `Access-Control-Allow-Origin: *`
para que o Shell (em outro domínio) consiga carregá-lo.

### Next.js (mfe-app-router e mfe-pages-router)

Via `headers()` no `next.config.mjs` — já incluído nas configs acima.

### React puro (mfe-react)

Via `vercel.json` com `headers` — já incluído acima.

### Verificação em produção

```bash
# Confirmar CORS nos remotes
curl -I https://mfe-app-router.vercel.app/_next/static/chunks/remoteEntry.js
# → Access-Control-Allow-Origin: *

curl -I https://mfe-react.vercel.app/remoteEntry.js
# → Access-Control-Allow-Origin: *
```

---

## 10. Estratégia de deploy na Vercel

### O problema: dependência circular

O Shell precisa das URLs dos MFEs para buildar.
Os MFEs precisam ser deployados primeiro para ter URLs.
Mas as URLs da Vercel são **previsíveis** (`projeto.vercel.app`) — isso resolve tudo.

```
Passo 1: Criar projetos na Vercel com nomes exatos:
  mfe-app-router   → mfe-app-router.vercel.app
  mfe-pages-router → mfe-pages-router.vercel.app
  mfe-react        → mfe-react.vercel.app
  mfe-shell        → mfe-shell.vercel.app

Passo 2: Configurar env vars no Shell ANTES do primeiro deploy:
  NEXT_PUBLIC_MFE_APP_ROUTER_URL   = https://mfe-app-router.vercel.app/_next/static/chunks/remoteEntry.js
  NEXT_PUBLIC_MFE_PAGES_ROUTER_URL = https://mfe-pages-router.vercel.app/_next/static/chunks/remoteEntry.js
  NEXT_PUBLIC_MFE_REACT_URL        = https://mfe-react.vercel.app/remoteEntry.js

Passo 3: Deploy na ordem:
  1. mfe-react (sem deps)
  2. mfe-pages-router (sem deps)
  3. mfe-app-router (sem deps)
  4. mfe-shell (depende das URLs dos 3 acima — já configuradas)
```

### Setup único (manual, uma vez por repositório)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Em cada repositório, linkar ao projeto Vercel
cd mfe-react && vercel link
# → Cria .vercel/project.json com org_id e project_id
# → Adicionar .vercel ao .gitignore

# 3. Anotar os IDs (necessários para os GitHub Secrets)
cat .vercel/project.json
# { "orgId": "xxx", "projectId": "yyy" }
```

### Secrets do GitHub (por repositório)

| Secret | Valor | Onde obter |
|--------|-------|------------|
| `VERCEL_TOKEN` | Token da conta | vercel.com/account/tokens |
| `VERCEL_ORG_ID` | `orgId` | `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `projectId` | `.vercel/project.json` |

> `VERCEL_TOKEN` é o mesmo para todos os repos (é da conta).
> `VERCEL_PROJECT_ID` é único por repositório.

---

## 11. GitHub Actions — workflow por repositório

### Workflow base (Next.js apps — shell, app-router, pages-router)

Salve em `.github/workflows/deploy.yml` em cada repo Next.js:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  quality:
    name: Lint + Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npx tsc --noEmit

      - name: Tests
        run: npm test -- --run  # --run para Vitest (sem watch)

  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm install --global vercel@latest

      # Puxa variáveis de ambiente configuradas no Vercel dashboard
      - name: Pull Vercel env
        run: vercel pull --yes --environment=${{ github.ref == 'refs/heads/main' && 'production' || 'preview' }} --token=${{ secrets.VERCEL_TOKEN }}

      # Build local (código-fonte não vai para a Vercel)
      - name: Build
        run: vercel build ${{ github.ref == 'refs/heads/main' && '--prod' || '' }} --token=${{ secrets.VERCEL_TOKEN }}

      # Deploy do artefato já buildado
      - name: Deploy
        id: deploy
        run: |
          URL=$(vercel deploy --prebuilt ${{ github.ref == 'refs/heads/main' && '--prod' || '' }} --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$URL" >> $GITHUB_OUTPUT

      # Comenta a URL no PR (só para PRs)
      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `✅ Preview: ${{ steps.deploy.outputs.url }}`
            })
```

### Workflow do mfe-react (webpack estático)

Diferença principal: build com webpack, sem `vercel build`.

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  # URL de produção do mfe-react para o publicPath correto
  PUBLIC_URL: https://mfe-react.vercel.app/

jobs:
  quality:
    name: Lint + Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --run

  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm install --global vercel@latest

      # Build manual com webpack
      - name: Build webpack
        run: npm run build
        env:
          PUBLIC_URL: ${{ github.ref == 'refs/heads/main' && 'https://mfe-react.vercel.app/' || '' }}

      # Deploy direto da pasta dist
      - name: Deploy to Vercel
        id: deploy
        run: |
          URL=$(vercel deploy ./dist --prebuilt ${{ github.ref == 'refs/heads/main' && '--prod' || '' }} --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$URL" >> $GITHUB_OUTPUT
```

### `vercel.json` dos apps Next.js (shell, app-router, pages-router)

```json
{
  "headers": [
    {
      "source": "/_next/static/chunks/remoteEntry.js",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    }
  ]
}
```

> `Cache-Control: no-cache` no remoteEntry é importante:
> garante que o Shell sempre carrega a versão mais recente do MFE após um deploy.

---

## 12. AGENTS.md por repositório

### `mfe-shell/AGENTS.md`

```markdown
# MFE Shell — Antigravity CLI

## Papel
Host da arquitetura MF. Chrome da aplicação: Header, Sidebar, Footer.
Cada rota monta a página de um MFE remoto.

## Narrativa
Plataforma interna de gestão. A home explica o projeto e as tecnologias.
Sidebar tem Tag colorida por framework (info=App Router, success=Pages Router, warning=React).

## Stack
Next.js 15 App Router · TS 5 · @module-federation/enhanced · @rafacdomin/ds-core

## Rotas
- /          → home do Shell
- /profile   → mfe_app_router/Page  (:3001 / mfe-app-router.vercel.app)
- /dashboard → mfe_pages_router/Page (:3002 / mfe-pages-router.vercel.app)
- /catalog   → mfe_react/Page       (:3003 / mfe-react.vercel.app)

## Regras absolutas
1. ThemeProvider APENAS no layout.tsx
2. Remotes via next/dynamic com ssr: false
3. Todo remote em <RemoteWrapper name="...">
4. URLs dos remotes via lib/remotes.ts (env vars)
5. global.d.ts com type declaration de cada remote

## CI/CD
GitHub Actions → Vercel. Workflow em .github/workflows/deploy.yml.
Secrets necessários: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID.

## References
- references/MF_CONFIG.md
- references/COMPONENT_SPEC.md (componentes do DS usados)
```

### `mfe-app-router/AGENTS.md`

```markdown
# MFE App Router — Antigravity CLI

## Papel
Remote /profile. Página de Perfil do Usuário.
Demonstra Client Components interativos no App Router.

## Stack
Next.js 15 App Router · TS 5 · @module-federation/enhanced

## Componentes do DS usados
Avatar, Card, Button, Tag, Input

## Regras absolutas
1. Page.tsx DEVE ter 'use client' na linha 1
2. import: false para @rafacdomin/ds-core (Shell provê)
3. Funciona standalone em :3001 E como remote no Shell
4. CORS header no remoteEntry.js (next.config.mjs + vercel.json)

## CI/CD
GitHub Actions → Vercel. Deploy independente do Shell.

## References
- references/MF_CONFIG.md
```

### `mfe-pages-router/AGENTS.md`

```markdown
# MFE Pages Router — Antigravity CLI

## Papel
Remote /dashboard. Dashboard com métricas.
Demonstra SSR nativo do Pages Router (sem restrição de 'use client').

## Stack
Next.js 15 Pages Router · TS 5 · @module-federation/enhanced

## Componentes do DS usados
Card, Tag, Dropdown

## Regras absolutas
1. isServer no next.config.mjs para path correto do remoteEntry.js
2. import: false para @rafacdomin/ds-core
3. getServerSideProps para dados mockados de métricas
4. CORS no remoteEntry.js

## References
- references/MF_CONFIG.md
```

### `mfe-react/AGENTS.md`

```markdown
# MFE React — Antigravity CLI

## Papel
Remote /catalog. Catálogo de Produtos.
Demonstra MF agnóstico de framework — sem Next.js.

## Stack
React 18 · TS 5 · Webpack 5 manual · @module-federation/enhanced

## Componentes do DS usados
Card, Button, Tag

## Regras absolutas
1. src/index.tsx → apenas import('./bootstrap') — async boundary obrigatório
2. PUBLIC_URL via env var (muda entre dev :3003 e produção vercel.app)
3. vercel.json com CORS headers e static build config
4. import: false para @rafacdomin/ds-core

## CI/CD
GitHub Actions → Vercel (static site). vercel.json: @vercel/static-build, distDir: dist.

## References
- references/MF_CONFIG.md
```

---

## 13. Issues breakdown

### `mfe-shell/.epic/issues/`

```
001_project_setup.md       # Next.js 15 --turbopack=false, tsconfig, eslint
002_mf_host_config.md      # next.config.mjs, lib/remotes.ts, global.d.ts
003_layout_components.md   # Header + Sidebar (com Tags) + Footer + AppShell
004_remote_wrapper.md      # ErrorBoundary + Suspense
005_home_page.md           # Apresentação do projeto, links para repos
006_profile_route.md       # /profile → mfe_app_router/Page
007_dashboard_route.md     # /dashboard → mfe_pages_router/Page (passa initialMetrics)
008_catalog_route.md       # /catalog → mfe_react/Page
009_vercel_config.md       # vercel.json, variáveis de ambiente no Vercel dashboard
010_github_actions.md      # .github/workflows/deploy.yml
011_e2e_tests.md           # Playwright: cada rota carrega o remote + testa fallback
```

### `mfe-app-router/.epic/issues/`

```
001_project_setup.md       # Next.js 15 App Router --turbopack=false
002_mf_remote_config.md    # next.config.mjs + vercel.json (CORS)
003_page_component.md      # Page.tsx com 'use client' + Avatar/Card/Button/Tag + TDD
004_standalone_mode.md     # app/page.tsx renderizando Page para dev isolado
005_github_actions.md      # deploy.yml
```

### `mfe-pages-router/.epic/issues/`

```
001_project_setup.md       # Next.js 15 Pages Router --no-app
002_mf_remote_config.md    # next.config.mjs (isServer) + vercel.json
003_page_component.md      # Page.tsx + getServerSideProps mockado + Card/Tag/Dropdown + TDD
004_standalone_mode.md     # pages/index.tsx renderizando Page
005_github_actions.md      # deploy.yml
```

### `mfe-react/.epic/issues/`

```
001_project_setup.md       # Webpack 5 manual, babel, tsconfig
002_mf_remote_config.md    # webpack.config.js + vercel.json
003_bootstrap_pattern.md   # index.tsx → bootstrap.tsx (async boundary)
004_page_component.md      # Page.tsx + Card/Button/Tag + TDD
005_standalone_mode.md     # App.tsx com ThemeProvider para dev isolado
006_github_actions.md      # deploy.yml (webpack build + vercel deploy ./dist)
```

---

## 14. Ordem de execução

```
Pré-requisito
└── @rafacdomin/ds-core publicado no npm ✓

Setup Vercel (manual, uma vez)
├── Criar 4 projetos na Vercel com nomes exatos
├── vercel link em cada repo (gera .vercel/project.json)
├── Adicionar secrets ao GitHub de cada repo
└── Configurar NEXT_PUBLIC_MFE_* no Vercel dashboard do Shell

Desenvolvimento (por repo, em ordem)
├── mfe-react         → mais simples, valida o conceito de MF puro
├── mfe-pages-router  → SSR, sem restrições de client component
├── mfe-app-router    → 'use client' obrigatório
└── mfe-shell         → último, depende dos 3 acima rodando

Para cada repo: /spec → /break → /plan N → /execute N → PR → deploy
```

---

## 15. Sequência de comandos para começar

```bash
# 1. Criar repos
gh repo create mfe-shell --public
gh repo create mfe-app-router --public
gh repo create mfe-pages-router --public
gh repo create mfe-react --public

# 2. Scaffold — atenção ao --turbopack=false
npx create-next-app@latest mfe-shell        --typescript --app    --turbopack=false
npx create-next-app@latest mfe-app-router   --typescript --app    --turbopack=false
npx create-next-app@latest mfe-pages-router --typescript --no-app
mkdir mfe-react && cd mfe-react && npm init -y

# 3. Dependências em todos os repos
npm install @module-federation/enhanced @rafacdomin/ds-core

# 4. Linkar projetos na Vercel (uma vez por repo)
npm i -g vercel
cd mfe-react && vercel link        # anota orgId e projectId
cd mfe-pages-router && vercel link
cd mfe-app-router && vercel link
cd mfe-shell && vercel link

# 5. Criar token na Vercel
# → vercel.com/account/tokens → criar token → copiar

# 6. Adicionar secrets em cada repo no GitHub
# Settings → Secrets → Actions:
# VERCEL_TOKEN (mesmo para todos), VERCEL_ORG_ID, VERCEL_PROJECT_ID (único por repo)

# 7. Configurar env vars do Shell no Vercel dashboard:
# NEXT_PUBLIC_MFE_APP_ROUTER_URL   = https://mfe-app-router.vercel.app/_next/static/chunks/remoteEntry.js
# NEXT_PUBLIC_MFE_PAGES_ROUTER_URL = https://mfe-pages-router.vercel.app/_next/static/chunks/remoteEntry.js
# NEXT_PUBLIC_MFE_REACT_URL        = https://mfe-react.vercel.app/remoteEntry.js

# 8. Copiar workflows do DS para cada repo
for repo in mfe-shell mfe-app-router mfe-pages-router mfe-react; do
  cp -r ds-portfolio/.agents/ $repo/.agents/
done

# 9. Iniciar o Antigravity CLI no primeiro repo
cd mfe-react && agy
# > /spec
```