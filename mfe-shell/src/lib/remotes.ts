export const remoteUrls = {
  mfe_app_router: process.env.NEXT_PUBLIC_MFE_APP_ROUTER_URL
    ?? 'http://localhost:3001/_next/static/chunks/remoteEntry.js',
  mfe_pages_router: process.env.NEXT_PUBLIC_MFE_PAGES_ROUTER_URL
    ?? 'http://localhost:3002/_next/static/chunks/remoteEntry.js',
  mfe_react: process.env.NEXT_PUBLIC_MFE_REACT_URL
    ?? 'http://localhost:3003/remoteEntry.js',
} as const;
