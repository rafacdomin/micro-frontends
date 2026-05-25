import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import styles from './layout.module.scss';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.bodyContainer}>
        <Sidebar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
