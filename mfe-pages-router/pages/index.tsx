import React from 'react';
import dynamic from 'next/dynamic';
import type { Metric } from '@/components/Page';

interface HomeProps {
  initialMetrics: Metric[];
}

// Wrap the entire page in dynamic(ssr:false) to avoid
// NextFederationPlugin's SSR React context conflicts with ThemeProvider
const DashboardPage = dynamic(
  () => import('@/components/DashboardPage'),
  { ssr: false }
);

export default function Home({ initialMetrics }: HomeProps) {
  return <DashboardPage initialMetrics={initialMetrics} />;
}

export async function getStaticProps() {
  const initialMetrics: Metric[] = [
    { label: 'Requests/min', value: '4.850',  status: 'ok'   },
    { label: 'Error rate',   value: '0.01%',  status: 'ok'   },
    { label: 'Latência p99', value: '310ms',  status: 'warn' },
    { label: 'Active Tasks', value: '12',     status: 'ok'   },
  ];

  return {
    props: {
      initialMetrics,
    },
  };
}
