import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Providers } from '../Providers';
import { AppShell } from './AppShell';

// Mock next/navigation for Sidebar
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('AppShell Layout Framework', () => {
  it('deve renderizar Header, Sidebar com badges, Footer e o conteudo principal', () => {
    render(
      <Providers>
        <AppShell>
          <div data-testid="main-content">Conteúdo de Teste</div>
        </AppShell>
      </Providers>
    );

    // Header logo
    expect(screen.getByText('Micro-Frontend Shell')).toBeInTheDocument();

    // Sidebar items and badges
    expect(screen.getByText('Home (mfe-react)')).toBeInTheDocument();
    expect(screen.getByText('React MFE')).toBeInTheDocument();
    expect(screen.getByText('Página 1')).toBeInTheDocument();
    expect(screen.getByText('Pages Router')).toBeInTheDocument();
    expect(screen.getByText('Página 2')).toBeInTheDocument();
    expect(screen.getByText('App Router')).toBeInTheDocument();

    // Content area
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo de Teste')).toBeInTheDocument();

    // Footer
    expect(screen.getByText(/Platform Micro-Frontends/i)).toBeInTheDocument();
  });
});
