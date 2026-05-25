import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page } from './Page';

describe('Page Component - Catálogo de Produtos', () => {
  it('deve renderizar o título e a lista de produtos', () => {
    render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    );
    expect(screen.getByText('Catálogo de Produtos')).toBeInTheDocument();
    expect(screen.getByText('Design System Kit')).toBeInTheDocument();
    expect(screen.getByText('Component Library Pro')).toBeInTheDocument();
    expect(screen.getByText('Storybook Templates')).toBeInTheDocument();
  });

  it('deve alternar itens no carrinho de compras', () => {
    render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    );
    
    // Inicialmente o carrinho não deve mostrar contagem
    expect(screen.queryByText(/item\(s\) no carrinho/)).not.toBeInTheDocument();

    // Adiciona o primeiro item
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('Adicionar');
    fireEvent.click(buttons[0]);

    // O botão deve mudar para "Remover" e a tag do carrinho deve aparecer
    expect(buttons[0]).toHaveTextContent('Remover');
    expect(screen.getByText('1 item(s) no carrinho')).toBeInTheDocument();

    // Adiciona o segundo item
    fireEvent.click(buttons[1]);
    expect(screen.getByText('2 item(s) no carrinho')).toBeInTheDocument();

    // Remove o primeiro item
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent('Adicionar');
    expect(screen.getByText('1 item(s) no carrinho')).toBeInTheDocument();

    // Remove o segundo item
    fireEvent.click(buttons[1]);
    expect(screen.queryByText(/item\(s\) no carrinho/)).not.toBeInTheDocument();
  });
});
