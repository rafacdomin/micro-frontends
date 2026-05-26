import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page } from './Page';

describe('Page Component - Portfólio de Configurações', () => {
  it('deve renderizar o título e os cards das aplicações com suas respectivas configurações', () => {
    render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    );

    // Título principal
    expect(screen.getByText('Portfólio de Configurações')).toBeInTheDocument();

    // Aplicações e tecnologias
    expect(screen.getByText('Host (mfe-shell)')).toBeInTheDocument();
    expect(screen.getByText('Home Remote (mfe-react)')).toBeInTheDocument();
    expect(screen.getByText('Página 1 (mfe-pages-router)')).toBeInTheDocument();
    expect(screen.getByText('Página 2 (mfe-app-router)')).toBeInTheDocument();

    // Tecnologias descritas nos badges
    expect(screen.getByText('React 18 Puro + Webpack 5')).toBeInTheDocument();
    expect(screen.getByText('Next.js 15 Pages Router')).toBeInTheDocument();
    expect(screen.getAllByText('Next.js 15 App Router')).toHaveLength(2);
  });
});
