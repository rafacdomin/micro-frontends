# 005 — Page Component & SSR - MFE Pages Router

## Objetivo
Implementar a página `/dashboard` no `mfe-pages-router` contendo a tabela de métricas e cards de resumo, consumindo o Design System e usando `getServerSideProps` para dados mockados.

## Critérios de Aceite
- [ ] Instalar `@rafacdomin/ds-core` no `mfe-pages-router`.
- [ ] Criar o componente `Page` sob `src/components/Page/Page.tsx`. (Ajustado para `components/Page/Page.tsx` sem a pasta `src/` na estrutura local).
- [ ] Utilizar os componentes `Card`, `Tag` e `Dropdown` importados de `@rafacdomin/ds-core`.
- [ ] Implementar a tabela de métricas com suporte a filtros utilizando o dropdown.
- [ ] Mockar a recuperação de dados do servidor usando `getServerSideProps` na página `pages/index.tsx` e passar esses dados via props para o componente `Page`.
- [ ] Escrever testes unitários para validar:
  - Renderização inicial das métricas recebidas via prop.
  - Funcionamento correto do filtro por status (Todos, OK, Alerta).
  - Exibição de cards de resumo de usuários ativos e uptime.

## Cenários de Teste
### Happy Path
- Abre `http://localhost:3002` e renderiza a tabela com 3 linhas de métricas simuladas por SSR.
- Ao selecionar "OK" no Dropdown de filtro, a tabela exibe apenas as métricas com status `ok`.
- Ao alternar para "Todos", todas as métricas originais retornam à tabela.
### Edge Cases
- Garantir que se a prop `initialMetrics` for vazia ou indefinida, a tabela renderiza um estado vazio amigável ou as métricas padrão de fallback.

## Arquivos a Criar/Modificar
- `mfe-pages-router/components/Page/Page.tsx` — Componente da página de Dashboard
- `mfe-pages-router/components/Page/Page.test.tsx` — Testes unitários com Vitest
- `mfe-pages-router/components/Page/index.ts` — Arquivo de exportação
- `mfe-pages-router/components/Page/Page.module.scss` — Estilização específica com Scss
- `mfe-pages-router/pages/index.tsx` — Ponto de entrada SSR que passa props para o Page

## Dependências Externas
- `@rafacdomin/ds-core`

## Dependências de Issues
- `004_mfe_pages_setup.md`

## Estimativa P / M / G
M

---

## Pesquisa
No Next.js Pages Router, os dados buscados via `getServerSideProps` acontecem no lado do servidor a cada request.
Quando a página é federada no Host (Shell):
- A renderização do Host pode acontecer via `next/dynamic` com `ssr: false`.
- Isso significa que o MFE remote rodará no cliente, mas podemos passar os dados buscados pelo Host (via SSR próprio ou fetch da API) para o componente federado via props.
- Para demonstrar SSR nativo quando o MFE é carregado standalone, usaremos `getServerSideProps` local.
- Conforme o `GUIDE.md`, usaremos os componentes `Card`, `Tag` e `Dropdown` do Design System.

Tanto `Dropdown` quanto os outros componentes exigem `ThemeProvider` em testes.

## Implementação Planejada

### Estrutura de `components/Page/Page.tsx`
```tsx
import { Card, Tag, Dropdown } from '@rafacdomin/ds-core';
import { useState } from 'react';
import styles from './Page.module.scss';

export interface Metric {
  label: string;
  value: string;
  status: 'ok' | 'warn' | 'error';
}

interface PageProps {
  initialMetrics?: Metric[];
}

const defaultMetrics: Metric[] = [
  { label: 'Requests/min', value: '4.200',  status: 'ok'   },
  { label: 'Error rate',   value: '0.02%',  status: 'ok'   },
  { label: 'Latência p99', value: '320ms',  status: 'warn' },
];

const statusVariant = { ok: 'success', warn: 'warning', error: 'danger' } as const;

export function Page({ initialMetrics = defaultMetrics }: PageProps) {
  const [filter, setFilter] = useState('all');

  return (
    <div className={styles.root}>
      <Tag variant="neutral" size="sm">Next.js Pages Router</Tag>
      <h1>Dashboard</h1>

      <div className={styles.summary}>
        <Card>
          <div className={styles.cardContent}>
            <strong>1.240</strong>
            <span>Usuários ativos</span>
          </div>
        </Card>
        <Card>
          <div className={styles.cardContent}>
            <strong>98%</strong>
            <span>Uptime</span>
          </div>
        </Card>
      </div>

      <div style={{ marginBottom: '1rem', maxWidth: '300px' }}>
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
      </div>

      <table className={styles.table} role="table">
        <thead>
          <tr>
            <th>Métrica</th>
            <th>Valor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {initialMetrics
            .filter(m => filter === 'all' || m.status === filter)
            .map(m => (
              <tr key={m.label}>
                <td>{m.label}</td>
                <td>{m.value}</td>
                <td>
                  <Tag variant="neutral" color={statusVariant[m.status]}>{m.status}</Tag>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Decisões Técnicas
- **Tabela Acessível**: Adicionar `role="table"` e tags semânticas para tabelas (`thead`, `tbody`, `tr`, `th`, `td`) conforme WAI-ARIA.
- **Vitest + RTL**: Configurar o Vitest local no `mfe-pages-router` para testes unitários de forma semelhante à do MFE React.

## Checklist de Implementação
- [x] Instalar `@rafacdomin/ds-core@0.1.0` em `mfe-pages-router`.
- [x] Instalar as dependências de testes (`vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@vitejs/plugin-react`) no `mfe-pages-router`.
- [x] Criar `vitest.config.ts` no `mfe-pages-router`.
- [x] Criar `setupTests.ts` no `mfe-pages-router` importing `@testing-library/jest-dom`.
- [x] Criar `components/Page/Page.module.scss` com estilizações customizadas para a tabela, grid de cards e container principal.
- [x] Criar `components/Page/Page.test.tsx` definindo os cenários de testes e usando `ThemeProvider` no wrapper.
- [x] Criar `components/Page/Page.tsx` com a implementação do dashboard de métricas.
- [x] Criar `components/Page/index.ts` exportando o componente Page.
- [x] Modificar `pages/index.tsx` para buscar dados mockados via `getServerSideProps` e renderizar o componente `<Page />` envelopado no `<ThemeProvider>`.
- [x] Rodar os testes via `npm run test` e verificar sucesso.
- [x] Testar build local da aplicação.
