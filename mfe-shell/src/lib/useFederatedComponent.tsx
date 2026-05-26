'use client';

import * as React from 'react';
import { useState, useEffect, ComponentType } from 'react';
import * as ReactDOM from 'react-dom';
import * as DsCore from '@rafacdomin/ds-core';
import { init } from '@module-federation/enhanced/runtime';

interface FederatedModule {
  default?: ComponentType<Record<string, unknown>>;
  [key: string]: ComponentType<Record<string, unknown>> | undefined;
}

let mfInitialized = false;

function initMF() {
  if (mfInitialized) return;
  mfInitialized = true;
  try {
    init({
      name: 'mfe_shell',
      shared: {
        react: {
          name: 'react',
          version: '18.3.1',
          scope: 'default',
          lib: () => React,
          shareConfig: {
            singleton: true,
            requiredVersion: '^18.0.0',
          },
        },
        'react-dom': {
          name: 'react-dom',
          version: '18.3.1',
          scope: 'default',
          lib: () => ReactDOM,
          shareConfig: {
            singleton: true,
            requiredVersion: '^18.0.0',
          },
        },
        '@rafacdomin/ds-core': {
          name: '@rafacdomin/ds-core',
          version: '0.1.0',
          scope: 'default',
          lib: () => DsCore,
          shareConfig: {
            singleton: true,
            requiredVersion: '^0.1.0',
          },
        },
      },
    });
    console.log('[useFederatedComponent] Module Federation Runtime initialized successfully.');
  } catch (err) {
    console.error('[useFederatedComponent] Error initializing Module Federation Runtime:', err);
  }
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
        // Initialize MF 2.0 Runtime
        initMF();

        // Initialize __webpack_share_scopes__ default if it doesn't exist
        if (!(window as any).__webpack_share_scopes__) {
          (window as any).__webpack_share_scopes__ = { default: {} };
        }
        const shareScope = (window as any).__webpack_share_scopes__.default;

        // Force host's React instance into shared scope with ES module compatibility
        const sharedReact = {
          ...React,
          default: React
        };
        shareScope.react = shareScope.react || {};
        const reactVersions = [React.version, '18.3.1', '18.3.0', '18.2.0', '18.0.0'];
        reactVersions.forEach(v => {
          shareScope.react[v] = {
            get: () => Promise.resolve(() => sharedReact),
            loaded: 1,
            from: 'mfe_shell'
          };
        });

        // Force host's ReactDOM instance into shared scope with ES module compatibility
        const sharedReactDOM = {
          ...ReactDOM,
          default: ReactDOM
        };
        shareScope['react-dom'] = shareScope['react-dom'] || {};
        const reactDOMVersions = [ReactDOM.version, '18.3.1', '18.3.0', '18.2.0', '18.0.0'];
        reactDOMVersions.forEach(v => {
          shareScope['react-dom'][v] = {
            get: () => Promise.resolve(() => sharedReactDOM),
            loaded: 1,
            from: 'mfe_shell'
          };
        });

        // Force host's design system instance into shared scope
        shareScope['@rafacdomin/ds-core'] = shareScope['@rafacdomin/ds-core'] || {};
        const dsCoreVersions = ['0.1.0', '1.0.0', '1.0.0-beta.0'];
        dsCoreVersions.forEach(v => {
          shareScope['@rafacdomin/ds-core'][v] = {
            get: () => Promise.resolve(() => DsCore),
            loaded: 1,
            from: 'mfe_shell'
          };
        });

        // Dynamically load the remoteEntry script if not already loaded
        await loadRemoteEntry(remoteName, remoteUrl);

        // Access the container on window
        const container = (window as unknown as Record<string, unknown>)[remoteName] as RemoteContainer | undefined;

        if (!container) {
          throw new Error(`Remote container "${remoteName}" not found after loading ${remoteUrl}`);
        }

        // Initialize the container with the share scope
        await container.init(shareScope);

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
