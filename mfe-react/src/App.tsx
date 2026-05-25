import React from 'react';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page } from './components/Page';

export default function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}
