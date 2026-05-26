import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page } from './Page';

describe('Page Component - Profile/App Router', () => {
  it('deve renderizar o Card de configuração da aplicação com a tag correspondente', () => {
    render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    );

    // Badges/Tags
    expect(screen.getByText('Remote MFE App Router')).toBeInTheDocument();

    // Título do Card
    expect(screen.getByText('Next.js 15 App Router Configuration')).toBeInTheDocument();

    // Conteúdo explicativo
    expect(screen.getByText(/arquitetura moderna/i)).toBeInTheDocument();
  });
});
