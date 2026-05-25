'use client';

import React from 'react';
import { useTheme, Button } from '@rafacdomin/ds-core';
import styles from './layout.module.scss';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>M</div>
        <h2>Micro-Frontend Shell</h2>
      </div>
      <div className={styles.actionsArea}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
        </Button>
      </div>
    </header>
  );
}
