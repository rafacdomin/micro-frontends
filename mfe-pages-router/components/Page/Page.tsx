import React from 'react';
import { Card, Tag } from '@rafacdomin/ds-core';

export function Page() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: 'var(--color-text-main, #1f2937)' }}>
      <Tag variant="neutral" color="secondary" size="sm" style={{ marginBottom: '1rem' }}>
        Remote MFE Pages Router
      </Tag>
      
      <Card variant="bordered">
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
              Next.js 15 Pages Router Configuration
            </h2>
          </div>
          
          <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-muted, #4b5563)', lineHeight: 1.6 }}>
            Esta aplicação microfrontend está rodando de forma independente e é integrada dinamicamente via Module Federation 2.0. Ela utiliza a arquitetura clássica do <strong>Next.js Pages Router</strong>.
          </p>

          <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-muted, #4b5563)', lineHeight: 1.6 }}>
            Consome componentes do Design System corporativo <code>@rafacdomin/ds-core</code> compartilhados em tempo de execução pelo Shell para assegurar consistência visual e eficiência de banda.
          </p>
        </div>
      </Card>
    </div>
  );
}
