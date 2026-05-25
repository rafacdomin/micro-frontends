'use client';

import React from 'react';
import { Card, Tag } from '@rafacdomin/ds-core';

export default function Home() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <Tag variant="neutral" color="primary" size="sm" style={{ marginBottom: '1rem' }}>
          Host da Plataforma
        </Tag>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          margin: '0.5rem 0 1rem 0',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Arquitetura de Microfrontends
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
          Uma demonstração prática e robusta de como orquestrar múltiplos microssistemas React e Next.js compartilhando um Design System centralizado via Module Federation 2.0.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <Card variant="bordered">
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontWeight: 700 }}>Host (Shell)</h3>
              <Tag variant="neutral" color="neutral">Porta 3000</Tag>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', margin: 0, lineHeight: 1.5, flexGrow: 1 }}>
              O orquestrador principal construído em Next.js App Router. É responsável pela estrutura global (chrome), navegação, temas e controle de falhas em tempo de execução via Error Boundaries.
            </p>
          </div>
        </Card>

        <Card variant="bordered">
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontWeight: 700 }}>Profile Remote</h3>
              <Tag variant="neutral" color="primary">Porta 3001</Tag>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', margin: 0, lineHeight: 1.5, flexGrow: 1 }}>
              Remoto construído em Next.js expondo a página de edição de perfil interativa. Utiliza controles de formulários e estados do React, consumidos de forma transparente no Shell.
            </p>
          </div>
        </Card>

        <Card variant="bordered">
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontWeight: 700 }}>Dashboard Remote</h3>
              <Tag variant="neutral" color="secondary">Porta 3002</Tag>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', margin: 0, lineHeight: 1.5, flexGrow: 1 }}>
              Remoto construído em Next.js Pages Router que expõe o painel administrativo. Apresenta suporte a Server-Side Rendering (SSR) e simulação de busca de dados no servidor.
            </p>
          </div>
        </Card>

        <Card variant="bordered">
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontWeight: 700 }}>Catalog Remote</h3>
              <Tag variant="neutral" color="danger">Porta 3003</Tag>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', margin: 0, lineHeight: 1.5, flexGrow: 1 }}>
              Remoto minimalista construído em React Puro e Webpack 5. Exibe o catálogo de produtos e demonstra a flexibilidade de integrar MFEs de tecnologias básicas sem dependência de framework.
            </p>
          </div>
        </Card>
      </div>

      <Card variant="flat" style={{ backgroundColor: '#f3f4f6', padding: '2rem', borderRadius: '12px' }}>
        <h2 style={{ marginTop: 0, fontWeight: 700 }}>Conceitos e Tecnologias Aplicadas</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, color: '#374151' }}>
          <li>
            <strong>Module Federation 2.0:</strong> Compartilhamento dinâmico de código em tempo de execução, permitindo deploys independentes sem retrabalho de build.
          </li>
          <li>
            <strong>Singleton Sharing:</strong> Garantia de que bibliotecas essenciais como <code>react</code>, <code>react-dom</code> e <code>@rafacdomin/ds-core</code> sejam carregadas apenas uma vez na árvore da aplicação.
          </li>
          <li>
            <strong>Resiliência Local (Error Boundaries):</strong> O desligamento de qualquer servidor remoto de MFE não derruba a plataforma principal, exibindo um fallback elegante de indisponibilidade.
          </li>
          <li>
            <strong>Estilização com CSS Tokens:</strong> Coesão estética total ao herdar as cores e variáveis do Design System em todas as aplicações federadas.
          </li>
        </ul>
      </Card>
    </div>
  );
}
