import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page } from '@/components/Page';

export default function Home() {
  return (
    <>
      <Head>
        <title>Profile Standalone - MFE App Router</title>
        <meta name="description" content="Profile MFE App Router standalone mode" />
      </Head>
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
