'use client';

import React, { useState, useEffect, ComponentType } from 'react';

interface FederatedModule {
  default?: ComponentType<Record<string, unknown>>;
  [key: string]: ComponentType<Record<string, unknown>> | undefined;
}

/**
 * Dynamically loads a federated component from a remote entry URL using the
 * native Module Federation runtime API (no NextFederationPlugin required on host).
 *
 * @param remoteName - The global name of the remote (e.g., 'mfe_react')
 * @param remoteUrl  - The URL to the remote's remoteEntry.js
 * @param exposedModule - The exposed module path (e.g., './Page')
 */
export function useFederatedComponent(
  remoteName: string,
  remoteUrl: string,
  exposedModule: string = './Page'
) {
  const [Component, setComponent] = useState<ComponentType<Record<string, unknown>> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadComponent() {
      try {
        // Dynamically load the remoteEntry script if not already loaded
        await loadRemoteEntry(remoteName, remoteUrl);

        // Access the container on window
        const container = (window as unknown as Record<string, unknown>)[remoteName] as RemoteContainer | undefined;

        if (!container) {
          throw new Error(`Remote container "${remoteName}" not found after loading ${remoteUrl}`);
        }

        // Initialize the container with the current webpack share scope
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await container.init((window as any).__webpack_share_scopes__?.default ?? {});

        // Get the factory for the exposed module
        const factory = await container.get(exposedModule);
        const module = factory() as FederatedModule;

        const Comp = module.default ?? (module[exposedModule.replace('./', '')] as ComponentType<Record<string, unknown>>);

        if (!cancelled) {
          setComponent(() => Comp);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    }

    loadComponent();
    return () => { cancelled = true; };
  }, [remoteName, remoteUrl, exposedModule]);

  return { Component, error, loading };
}

interface RemoteContainer {
  init: (scope: Record<string, unknown>) => Promise<void>;
  get: (module: string) => Promise<() => FederatedModule>;
}

const loadedScripts = new Set<string>();

function loadRemoteEntry(remoteName: string, remoteUrl: string): Promise<void> {
  // Avoid loading the same script twice
  if (loadedScripts.has(remoteName)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = remoteUrl;
    script.async = true;
    script.onload = () => {
      loadedScripts.add(remoteName);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load remote entry: ${remoteUrl}`));
    document.head.appendChild(script);
  });
}
