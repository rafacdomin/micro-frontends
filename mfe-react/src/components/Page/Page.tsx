import React from 'react';
import { Card, Tag } from '@rafacdomin/ds-core';
import styles from './Page.module.scss';

interface AppInfo {
  title: string;
  route: string;
  tech: string;
  badgeColor: 'neutral' | 'primary' | 'secondary' | 'danger';
  description: string;
}

const apps: AppInfo[] = [
  {
    title: 'Host (mfe-shell)',
    route: '/',
    tech: 'Next.js 15 App Router',
    badgeColor: 'neutral',
    description: 'O orquestrador principal da plataforma. Gerencia o layout global (cabeçalho, barra lateral, rodapé), roteamento do navegador, tratamento de falhas em tempo de execução com Error Boundaries e carregamento dinâmico de remotes.',
  },
  {
    title: 'Home (mfe-react)',
    route: '/',
    tech: 'React 18 + Webpack 5',
    badgeColor: 'danger',
    description: 'Esta própria aplicação que você está visualizando na página inicial. Demonstra a flexibilidade de acoplar microssistemas construídos com React puro sem a necessidade de frameworks complexos de servidor.',
  },
  {
    title: 'Página 1 (mfe-pages-router)',
    route: '/page1',
    tech: 'Next.js 15 Pages Router',
    badgeColor: 'secondary',
    description: 'Aplicação microfrontend federada carregada na rota /page1 do shell. Configurada no modelo tradicional Pages Router do Next.js, provendo estabilidade e compatibilidade com SSR.',
  },
  {
    title: 'Página 2 (mfe-app-router)',
    route: '/page2',
    tech: 'Next.js 15 App Router',
    badgeColor: 'primary',
    description: 'Aplicação microfrontend federada carregada na rota /page2 do shell. Desenvolvida sob o moderno App Router do Next.js, demonstrando interoperabilidade total entre diferentes orquestradores de rotas.',
  },
];

export function Page() {
  return (
    <div className={styles.root}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <Tag variant="neutral" color="danger" size="sm" style={{ marginBottom: '1rem' }}>
          Remote MFE React
        </Tag>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          margin: '0.5rem 0 1rem 0',
          background: 'linear-gradient(135deg, var(--color-danger, #ef4444) 0%, var(--color-primary, #3b82f6) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          MFE React com Module Federation 2.0
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted, #4b5563)', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
          Este painel centralizado é provido pelo microfrontend <strong>mfe-react</strong> e demonstra a coexistência harmônica das diferentes stacks compartilhando o mesmo Design System via Module Federation 2.0.
        </p>
      </div>

      <div className={styles.grid}>
        {apps.map((app) => (
          <Card key={app.title} variant="bordered" style={{ height: '100%' }}>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>{app.title}</h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <Tag variant="neutral" color={app.badgeColor} size="sm">{app.tech}</Tag>
                <Tag variant="neutral" color="neutral" size="sm">{app.route}</Tag>
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted, #4b5563)',
                margin: 0,
                lineHeight: 1.6,
                flexGrow: 1
              }}>
                {app.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
