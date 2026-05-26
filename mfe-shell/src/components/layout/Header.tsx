import React from 'react';
import styles from './layout.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>M</div>
        <h2>MFE Shell</h2>
      </div>
    </header>
  );
}
