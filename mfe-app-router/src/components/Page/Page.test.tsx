import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@rafacdomin/ds-core';
import { Page } from './Page';

describe('Page Component - Profile', () => {
  it('deve renderizar o perfil com Avatar, nome, cargo e habilidades', () => {
    render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    );

    // Badge
    expect(screen.getByText('Next.js App Router')).toBeInTheDocument();

    // Nome e Cargo
    expect(screen.getByText('Rafael Domingues')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();

    // Skills
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Design Systems')).toBeInTheDocument();
    expect(screen.getByText('Module Federation')).toBeInTheDocument();

    // Botão de Editar
    expect(screen.getByRole('button', { name: /Editar perfil/i })).toBeInTheDocument();
  });

  it('deve alternar para modo de edição, alterar o nome no input e salvar com sucesso', () => {
    render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    );

    const editButton = screen.getByRole('button', { name: /Editar perfil/i });
    fireEvent.click(editButton);

    // O nome agora deve estar dentro de um input
    const input = screen.getByLabelText('Nome do usuário') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Rafael Domingues');

    // Alterar o valor do input
    fireEvent.change(input, { target: { value: 'Rafael Editado' } });
    expect(input.value).toBe('Rafael Editado');

    // Salvar
    const saveButton = screen.getByRole('button', { name: /Salvar/i });
    fireEvent.click(saveButton);

    // O input deve sumir e o novo nome deve aparecer
    expect(screen.queryByLabelText('Nome do usuário')).not.toBeInTheDocument();
    expect(screen.getByText('Rafael Editado')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Editar perfil/i })).toBeInTheDocument();
  });
});
