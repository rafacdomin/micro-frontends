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
  webpack(config) {
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new FixResolveContextStackPlugin());
    return config;
  },
};

export default nextConfig;
