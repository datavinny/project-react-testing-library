import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('Testa Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.',
    () => {
      renderWithRouter(<Pokedex />);

      const encPoke = screen.getByRole('heading', { level: 2,
        name: 'Encountered pokémons' });
      expect(encPoke).toBeInTheDocument();
    });
  it('Teste se é exibido o próximo Pokémon quando clicado.', () => {
    renderWithRouter(<Pokedex />);
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex />);
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex />);
  });
});
