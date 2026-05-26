import React from 'react';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page } from './Page';

export default function DashboardPage() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}
