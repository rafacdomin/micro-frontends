import React from 'react';
import styles from './layout.module.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>&copy; {currentYear} Platform Micro-Frontends. All rights reserved.</p>
    </footer>
  );
}
