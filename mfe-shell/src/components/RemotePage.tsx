'use client';

import React, { ComponentType } from 'react';
import { useFederatedComponent } from '@/lib/useFederatedComponent';
import { RemoteWrapper } from '@/components/RemoteWrapper';

interface RemotePageProps {
  remoteName: string;
  remoteUrl: string;
  displayName: string;
  exposedModule?: string;
  componentProps?: Record<string, unknown>;
}

/**
 * Renders a federated micro-frontend page using the native MF runtime API.
 * Wraps the component in RemoteWrapper for error boundaries and loading states.
 */
export function RemotePage({
  remoteName,
  remoteUrl,
  displayName,
  exposedModule = './Page',
  componentProps = {},
}: RemotePageProps) {
  return (
    <RemoteWrapper name={displayName}>
      <RemotePageInner
        remoteName={remoteName}
        remoteUrl={remoteUrl}
        displayName={displayName}
        exposedModule={exposedModule}
        componentProps={componentProps}
      />
    </RemoteWrapper>
  );
}

function RemotePageInner({
  remoteName,
  remoteUrl,
  displayName,
  exposedModule,
  componentProps,
}: RemotePageProps) {
  const { Component, error, loading } = useFederatedComponent(
    remoteName,
    remoteUrl,
    exposedModule
  );

  if (loading) {
    return <RemoteLoadingState name={displayName} />;
  }

  if (error) {
    throw error; // Let RemoteWrapper's ErrorBoundary catch it
  }

  if (!Component) {
    throw new Error(`Component not found in remote "${remoteName}"`);
  }

  const Comp = Component as ComponentType<Record<string, unknown>>;
  return <Comp {...componentProps} />;
}

function RemoteLoadingState({ name }: { name: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '2rem',
      }}
      aria-label={`Carregando ${name}...`}
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            height: '1.25rem',
            borderRadius: '6px',
            background:
              'linear-gradient(90deg, var(--color-surface, #e5e7eb) 25%, var(--color-border, #d1d5db) 50%, var(--color-surface, #e5e7eb) 75%)',
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
