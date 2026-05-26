import React from 'react';
import { Card, Tag } from '@rafacdomin/ds-core';

export function Page() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: 'var(--color-text-main, #1f2937)' }}>
      <Tag variant="neutral" color="primary" size="sm" style={{ marginBottom: '1rem' }}>
        Remote MFE App Router
      </Tag>
      
      <Card variant="bordered">
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
              Next.js 15 App Router Configuration
            </h2>
          </div>
          
          <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-muted, #4b5563)', lineHeight: 1.6 }}>
            Esta aplicação microfrontend está rodando de forma independente e é integrada dinamicamente via Module Federation 2.0. Ela utiliza a arquitetura moderna de <strong>Next.js App Router</strong>.
          </p>

          <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-muted, #4b5563)', lineHeight: 1.6 }}>
            Sua integração ocorre de forma direta sob a rota <code>/page2</code> do Shell, provendo isolamento de código e encapsulamento de estilos do Design System centralizado <code>@rafacdomin/ds-core</code>.
          </p>
        </div>
      </Card>
    </div>
  );
}
