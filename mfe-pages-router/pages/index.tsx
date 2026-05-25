import Head from 'next/head';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page, Metric } from '@/components/Page';

interface HomeProps {
  initialMetrics: Metric[];
}

export default function Home({ initialMetrics }: HomeProps) {
  return (
    <>
      <Head>
        <title>Dashboard Standalone - MFE Pages Router</title>
        <meta name="description" content="Dashboard MFE Pages Router standalone mode" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider>
        <Page initialMetrics={initialMetrics} />
      </ThemeProvider>
    </>
  );
}

export async function getServerSideProps() {
  // Simulando busca de dados do servidor (SSR)
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
