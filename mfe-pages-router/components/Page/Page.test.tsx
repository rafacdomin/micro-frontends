import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page, Metric } from './Page';

const mockMetrics: Metric[] = [
  { label: 'Metric A', value: '100', status: 'ok' },
  { label: 'Metric B', value: '200', status: 'warn' },
  { label: 'Metric C', value: '300', status: 'error' },
];

describe('Page Component - Dashboard', () => {
  it('deve renderizar os cards de resumo e a tabela de métricas', () => {
    render(
      <ThemeProvider>
        <Page initialMetrics={mockMetrics} />
      </ThemeProvider>
    );

    // Título
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    // Resumos
    expect(screen.getByText('1.240')).toBeInTheDocument();
    expect(screen.getByText('Usuários ativos')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('Uptime')).toBeInTheDocument();

    // Tabela
    expect(screen.getByText('Metric A')).toBeInTheDocument();
    expect(screen.getByText('Metric B')).toBeInTheDocument();
    expect(screen.getByText('Metric C')).toBeInTheDocument();
  });
});
