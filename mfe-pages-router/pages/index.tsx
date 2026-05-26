import React from 'react';
import dynamic from 'next/dynamic';

// Wrap the entire page in dynamic(ssr:false) to avoid
// NextFederationPlugin's SSR React context conflicts with ThemeProvider
const DashboardPage = dynamic(
  () => import('@/components/DashboardPage'),
  { ssr: false }
);

export default function Home() {
  return <DashboardPage />;
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
