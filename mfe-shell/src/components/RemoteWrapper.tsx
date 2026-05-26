'use client';

import React, { Component, Suspense } from 'react';

class RemoteBoundary extends Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; name: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[RemoteBoundary:${this.props.name}] error catched:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert" 
          style={{
            padding: '2rem',
            border: '1px solid #fee2e2',
            backgroundColor: '#fef2f2',
            borderRadius: '12px',
            fontFamily: 'sans-serif',
            color: '#991b1b',
            maxWidth: '500px',
            margin: '2rem auto',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(153, 27, 27, 0.05)'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚠️</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 700 }}>
            Micro-Frontend Indisponível
          </h3>
          <p style={{ fontSize: '0.95rem', margin: '0 0 1rem 0', color: '#7f1d1d', lineHeight: 1.5 }}>
            O serviço <strong>{this.props.name}</strong> falhou ou não pôde ser carregado.
          </p>
          <div style={{ 
            fontSize: '0.8rem', 
            backgroundColor: '#fff', 
            padding: '0.75rem', 
            borderRadius: '6px', 
            border: '1px solid #fca5a5', 
            textAlign: 'left',
            overflowX: 'auto',
            fontFamily: 'monospace'
          }}>
            {this.state.error?.message || 'Erro desconhecido de carregamento.'}
          </div>
          {typeof window !== 'undefined' && (
            <div style={{ marginTop: '1rem', textAlign: 'left' }}>
              <strong style={{ fontSize: '0.85rem' }}>Webpack Share Scope Diagnostics:</strong>
              <pre style={{
                fontSize: '0.75rem',
                backgroundColor: '#f3f4f6',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                overflowX: 'auto',
                fontFamily: 'monospace',
                maxHeight: '200px',
                margin: '0.25rem 0 0 0'
              }}>
                {JSON.stringify(
                  (window as any).__webpack_share_scopes__,
                  (key, val) => {
                    if (typeof val === 'function') return '[Function]';
                    return val;
                  },
                  2
                )}
              </pre>
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

function RemoteLoadingFallback() {
  return (
    <div style={{ padding: '2rem' }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            height: '1.25rem',
            borderRadius: '6px',
            marginBottom: '0.75rem',
            background: 'linear-gradient(90deg, var(--color-surface, #e5e7eb) 25%, var(--color-border, #d1d5db) 50%, var(--color-surface, #e5e7eb) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            width: i === 4 ? '60%' : '100%',
          }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

export function RemoteWrapper({
  children,
  name = 'Remote',
}: {
  children: React.ReactNode;
  name?: string;
}) {
  return (
    <RemoteBoundary name={name}>
      <Suspense fallback={<RemoteLoadingFallback />}>
        {children}
      </Suspense>
    </RemoteBoundary>
  );
}
