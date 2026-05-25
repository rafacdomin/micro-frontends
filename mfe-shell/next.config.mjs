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

const mfeUrls = {
  appRouter:   process.env.NEXT_PUBLIC_MFE_APP_ROUTER_URL?.replace('/_next/static/chunks/remoteEntry.js', '')
    ?? 'http://localhost:3001',
  pagesRouter: process.env.NEXT_PUBLIC_MFE_PAGES_ROUTER_URL?.replace('/_next/static/chunks/remoteEntry.js', '')
    ?? 'http://localhost:3002',
  react:       process.env.NEXT_PUBLIC_MFE_REACT_URL?.replace('/remoteEntry.js', '')
    ?? 'http://localhost:3003',
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * CORS headers for the shell's own chunks (so other MFEs can consume if needed)
   */
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },

  webpack(config) {
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new FixResolveContextStackPlugin());
    return config;
  },
};

export default nextConfig;
