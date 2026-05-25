import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FixResolveContextStackPlugin {
  apply(resolver) {
    const hook = resolver.ensureHook('resolve');
    hook.tapAsync('FixResolveContextStackPlugin', (request, resolveContext, callback) => {
      if (resolveContext && resolveContext.stack) {
        const proto = Object.getPrototypeOf(resolveContext.stack);
        if (proto && typeof proto.delete !== 'function') {
          proto.delete = function(val) {
            let node = this;
            let prev = null;
            while (node) {
              if (node.toString() === val) {
                if (prev) {
                  prev.parent = node.parent;
                } else {
                  // Mutation patch for head of linked list stack
                  if (node.parent) {
                    Object.assign(node, node.parent);
                  } else {
                    node.name = '';
                    node.path = '';
                    node.request = '';
                    node.query = '';
                    node.fragment = '';
                    node.directory = false;
                    node.module = false;
                    node.parent = undefined;
                  }
                }
                return true;
              }
              prev = node;
              node = node.parent;
            }
            return false;
          };
        }
      }
      callback();
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/_next/static/:path*/remoteEntry.js',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, content-type, Authorization' },
        ],
      },
    ];
  },
  webpack(config, { isServer }) {
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new FixResolveContextStackPlugin());

    // Map node:module to a proper CommonJS external to prevent syntax errors
    config.externals = config.externals || [];
    if (Array.isArray(config.externals)) {
      config.externals.push({
        'node:module': isServer ? 'commonjs node:module' : 'commonjs {}',
      });
    }

    config.plugins.push(
      new NextFederationPlugin({
        name: 'mfe_app_router',
        filename: `static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        exposes: {
          './Page': './src/components/Page/index.ts',
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
          '@rafacdomin/ds-core': { singleton: true, requiredVersion: '^0.1.0' },
        },
        extraOptions: {
          automaticAsyncBoundary: true,
        },
      })
    );
    return config;
  },
};

export default nextConfig;
