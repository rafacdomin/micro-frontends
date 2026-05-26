'use client';

import React, { Component, Suspense } from 'react';
import { Card } from '@rafacdomin/ds-core';

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
        <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
          <Card variant="bordered">
            <div 
              role="alert" 
              style={{
                padding: '2rem',
                fontFamily: 'var(--font-geist-sans), sans-serif',
                color: 'var(--color-danger, #ef4444)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div style={{ fontSize: '2.5rem' }}>⚠️</div>
              <h3 style={{ margin: '0', fontWeight: 700, fontSize: '1.25rem' }}>
                Micro-Frontend Indisponível
              </h3>
              <p style={{ fontSize: '0.95rem', margin: '0', color: 'var(--color-text-muted, #4b5563)', lineHeight: 1.5 }}>
                O serviço <strong>{this.props.name}</strong> falhou ou não pôde ser carregado.
              </p>
              <div style={{ 
                fontSize: '0.8rem', 
                backgroundColor: 'var(--color-bg-base, #f3f4f6)', 
                padding: '0.75rem', 
                borderRadius: 'var(--radius-sm, 6px)', 
                border: '1px solid var(--color-border, #e5e7eb)', 
                textAlign: 'left',
                overflowX: 'auto',
                fontFamily: 'monospace',
                color: 'var(--color-text-main, #111827)'
              }}>
                {this.state.error?.message || 'Erro desconhecido de carregamento.'}
              </div>
              {typeof window !== 'undefined' && (
                <div style={{ marginTop: '1rem', textAlign: 'left', color: 'var(--color-text-main, #111827)' }}>
                  <strong style={{ fontSize: '0.85rem' }}>Webpack Share Scope Diagnostics:</strong>
                  <pre style={{
                    fontSize: '0.75rem',
                    backgroundColor: 'var(--color-bg-base, #f3f4f6)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm, 6px)',
                    border: '1px solid var(--color-border, #e5e7eb)',
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
          </Card>
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
