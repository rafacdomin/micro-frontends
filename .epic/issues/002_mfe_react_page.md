# 002 — Page Component - MFE React

## Objetivo
Implementar a página `/catalog` dentro do `mfe-react` utilizando os componentes `@rafacdomin/ds-core` e seguindo o desenvolvimento orientado a testes (TDD).

## Critérios de Aceite
- [ ] Instalar `@rafacdomin/ds-core` na aplicação `mfe-react`.
- [ ] Criar o componente `Page` sob `src/components/Page/Page.tsx` exibindo o Grid de Cards de produtos.
- [ ] Utilizar os componentes `Card`, `Button` e `Tag` importados de `@rafacdomin/ds-core`.
- [ ] Implementar a lógica de carrinho com `useState` que permite adicionar e remover itens ao clicar nos botões dos cards.
- [ ] Adicionar testes unitários detalhados cobrindo:
  - Renderização inicial do catálogo de produtos.
  - Adição de item ao carrinho.
  - Remoção de item do carrinho.
  - Atualização visual da Tag de contagem de itens.

## Cenários de Teste
### Happy Path
- Carrega a página e renderiza 3 produtos com nome, preço e botão "Adicionar".
- Ao clicar em "Adicionar", o botão muda para "Remover" e a Tag de resumo do carrinho atualiza o número de itens.
- Ao clicar em "Remover", o botão retorna para "Adicionar" e a quantidade de itens no carrinho é recalculada.
### Edge Cases
- Tentar adicionar múltiplos itens e garantir que a contagem do carrinho não tenha inconsistências.

## Arquivos a Criar/Modificar
- `mfe-react/src/components/Page/Page.tsx` — Componente da página de catálogo
- `mfe-react/src/components/Page/Page.test.tsx` — Testes unitários com Vitest/RTL
- `mfe-react/src/components/Page/index.ts` — Ponto de exportação do componente
- `mfe-react/src/App.tsx` — Componente raiz para dev standalone
- `mfe-react/src/components/Page/Page.module.scss` — Estilização específica com Scss usando variáveis locais/globais

## Dependências Externas
- `@rafacdomin/ds-core`

## Dependências de Issues
- `001_mfe_react_setup.md`

## Estimativa P / M / G
M

---

## Pesquisa
De acordo com `references/GUIDE.md` (seção 8), o catálogo de produtos no `mfe-react` deve usar:
- Os componentes `Card`, `Button` e `Tag` de `@rafacdomin/ds-core`.
- Estilos modulares definidos em `Page.module.scss`.

Para testes unitários com Vitest no React 18:
- Usaremos `jsdom` como ambiente de teste.
- `@testing-library/react` para renderizar os componentes e interagir.
- `@testing-library/jest-dom` para asserções como `.toBeInTheDocument()`.

## Implementação Planejada

### Estrutura do Componente `Page.tsx`
```tsx
import { useState } from 'react';
import { Card, Button, Tag } from '@rafacdomin/ds-core';
import styles from './Page.module.scss';

interface Product {
  id: number;
  name: string;
  price: string;
}

const products: Product[] = [
  { id: 1, name: 'Design System Kit',      price: 'R$ 99,00'  },
  { id: 2, name: 'Component Library Pro',  price: 'R$ 149,00' },
  { id: 3, name: 'Storybook Templates',    price: 'R$ 79,00'  },
];

export function Page() {
  const [cart, setCart] = useState<number[]>([]);

  const toggle = (id: number) =>
    setCart(c => c.includes(id) ? c.filter(i => i !== id) : [...c, id]);

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
  );
}
```

## Decisões Técnicas
- **TDD (Test-Driven Development)**: Criar o arquivo de teste `Page.test.tsx` especificando a renderização e interações de carrinho antes de consolidar o componente.
- **Mock de dependências externas**: O Design System `@rafacdomin/ds-core` fornece componentes de UI limpos. Certificaremos de que a importação do CSS de estilo do Design System seja incluída para que os testes não quebrem por falta de estilos estruturais de tema.

## Checklist de Implementação
- [x] Instalar `@testing-library/react`, `@testing-library/jest-dom`, `vitest` e `jsdom` em `mfe-react`.
- [x] Criar o arquivo `vitest.config.ts` no `mfe-react/` para configurar os testes.
- [x] Criar `src/components/Page/Page.test.tsx` com os testes para renderização e mutação do estado de carrinho.
- [x] Instalar o pacote `@rafacdomin/ds-core@0.1.0`.
- [x] Criar o arquivo de estilos `src/components/Page/Page.module.scss`.
- [x] Escrever o componente `src/components/Page/Page.tsx`.
- [x] Criar `src/components/Page/index.ts` exportando `Page`.
- [x] Atualizar `src/App.tsx` para renderizar o componente `<Page />` envelopado com o ThemeProvider se necessário.
- [x] Rodar os testes via `npm run test` e verificar o sucesso.
