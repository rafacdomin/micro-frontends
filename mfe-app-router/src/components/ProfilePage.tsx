import React from 'react';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page } from '@/components/Page';

export default function ProfilePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </main>
  );
}
