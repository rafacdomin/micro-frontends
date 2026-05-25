import React, { useState } from 'react';
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
      <Tag variant="neutral" size="sm">React.js Puro</Tag>
      <h1>Catálogo de Produtos</h1>

      <div className={styles.grid}>
        {products.map(p => (
          <Card key={p.id}>
            <div className={styles.cardContent}>
              <h2>{p.name}</h2>
              <strong>{p.price}</strong>
              <Button
                variant={cart.includes(p.id) ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => toggle(p.id)}
              >
                {cart.includes(p.id) ? 'Remover' : 'Adicionar'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <Tag variant="neutral" color="primary">{cart.length} item(s) no carrinho</Tag>
        </div>
      )}
    </div>
  );
}
