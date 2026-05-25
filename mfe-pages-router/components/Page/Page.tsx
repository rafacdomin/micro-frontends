import React, { useState } from 'react';
import { Card, Tag, Dropdown } from '@rafacdomin/ds-core';
import styles from './Page.module.scss';

export interface Metric {
  label: string;
  value: string;
  status: 'ok' | 'warn' | 'error';
}

interface PageProps {
  initialMetrics?: Metric[];
}

const defaultMetrics: Metric[] = [
  { label: 'Requests/min', value: '4.200',  status: 'ok'   },
  { label: 'Error rate',   value: '0.02%',  status: 'ok'   },
  { label: 'Latência p99', value: '320ms',  status: 'warn' },
];

const statusVariant = { ok: 'primary', warn: 'secondary', error: 'danger' } as const;

export function Page({ initialMetrics = defaultMetrics }: PageProps) {
  const [filter, setFilter] = useState('all');

  return (
    <div className={styles.root}>
      <Tag variant="neutral" size="sm">Next.js Pages Router</Tag>
      <h1>Dashboard</h1>

      <div className={styles.summary}>
        <Card>
          <div className={styles.cardContent}>
            <strong>1.240</strong>
            <span>Usuários ativos</span>
          </div>
        </Card>
        <Card>
          <div className={styles.cardContent}>
            <strong>98%</strong>
            <span>Uptime</span>
          </div>
        </Card>
      </div>

      <div style={{ marginBottom: '1.5rem', maxWidth: '300px' }}>
        <Dropdown
          label="Filtrar por status"
          value={filter}
          onChange={setFilter}
        >
          <Dropdown.Item value="all">Todos</Dropdown.Item>
          <Dropdown.Item value="ok">OK</Dropdown.Item>
          <Dropdown.Item value="warn">Alerta</Dropdown.Item>
        </Dropdown>
      </div>

      <table className={styles.table} role="table">
        <thead>
          <tr>
            <th>Métrica</th>
            <th>Valor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {initialMetrics
            .filter(m => filter === 'all' || m.status === filter)
            .map(m => (
              <tr key={m.label}>
                <td>{m.label}</td>
                <td>{m.value}</td>
                <td>
                  <Tag variant="neutral" color={statusVariant[m.status]}>{m.status}</Tag>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
