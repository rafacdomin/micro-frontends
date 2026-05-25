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
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shell')).toBeInTheDocument();
    expect(screen.getByText('Perfil')).toBeInTheDocument();
    expect(screen.getByText('App Router')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Pages Router')).toBeInTheDocument();
    expect(screen.getByText('Catálogo')).toBeInTheDocument();
    expect(screen.getByText('React Puro')).toBeInTheDocument();

    // Content area
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo de Teste')).toBeInTheDocument();

    // Footer
    expect(screen.getByText(/Platform Micro-Frontends/i)).toBeInTheDocument();
  });

  it('deve alternar o tema ao clicar no botao do Header', () => {
    render(
      <Providers>
        <AppShell>
          <div>Conteúdo</div>
        </AppShell>
      </Providers>
    );

    const themeButton = screen.getByRole('button', { name: /Escuro|Claro/i });
    expect(themeButton).toHaveTextContent('Escuro'); // defaultTheme is light, so it offers Escuro

    fireEvent.click(themeButton);
    expect(themeButton).toHaveTextContent('Claro'); // changed to dark, so it offers Claro

    fireEvent.click(themeButton);
    expect(themeButton).toHaveTextContent('Escuro'); // toggled back to light
  });
});
