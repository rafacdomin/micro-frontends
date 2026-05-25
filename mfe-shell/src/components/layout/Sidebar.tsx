'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tag } from '@rafacdomin/ds-core';
import styles from './layout.module.scss';

const routes = [
  { path: '/',           label: 'Home',      badge: 'Shell',        color: 'neutral' },
  { path: '/profile',    label: 'Perfil',    badge: 'App Router',   color: 'primary' },
  { path: '/dashboard',  label: 'Dashboard', badge: 'Pages Router', color: 'secondary' },
  { path: '/catalog',    label: 'Catálogo',  badge: 'React Puro',   color: 'danger' },
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
