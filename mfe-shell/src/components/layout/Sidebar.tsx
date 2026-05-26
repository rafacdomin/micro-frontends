'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tag } from '@rafacdomin/ds-core';
import styles from './layout.module.scss';

const routes = [
  { path: '/',        label: 'Home (mfe-react)',    badge: 'React MFE',    color: 'danger' },
  { path: '/page1',   label: 'Página 1',            badge: 'Pages Router', color: 'secondary' },
  { path: '/page2',   label: 'Página 2',            badge: 'App Router',   color: 'primary' },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar} aria-label="Navegação principal">
      <div className={styles.navLabel}>Aplicações</div>
      {routes.map(({ path, label, badge, color }) => (
        <Link
          key={path}
          href={path}
          className={styles.link}
          data-active={pathname === path}
          aria-current={pathname === path ? 'page' : undefined}
        >
          <span>{label}</span>
          <Tag size="sm" variant="neutral" color={color}>{badge}</Tag>
        </Link>
      ))}
    </nav>
  );
}
