import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page } from './Page';

describe('Page Component - Dashboard/Pages Router', () => {
  it('deve renderizar o Card de configuração da aplicação com a porta correspondente', () => {
    render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    );

    // Badges/Tags
    expect(screen.getByText('Remote MFE Pages Router')).toBeInTheDocument();

    // Título do Card
    expect(screen.getByText('Next.js 15 Pages Router Configuration')).toBeInTheDocument();

    // Conteúdo explicativo
    expect(screen.getByText(/arquitetura clássica/i)).toBeInTheDocument();
  });
});
