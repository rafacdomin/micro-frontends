'use client';

import React from 'react';
import { ThemeProvider } from '@rafacdomin/ds-core';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
