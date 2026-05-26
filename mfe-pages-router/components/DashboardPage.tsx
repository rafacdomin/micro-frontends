import React from 'react';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page, Metric } from './Page';

interface DashboardPageProps {
  initialMetrics?: Metric[];
}

export default function DashboardPage({ initialMetrics }: DashboardPageProps) {
  return (
    <ThemeProvider>
      <Page initialMetrics={initialMetrics} />
    </ThemeProvider>
  );
}
