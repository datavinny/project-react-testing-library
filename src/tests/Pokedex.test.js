import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.',
    () => {
      renderWithRouter(<App />);

      const encPoke = screen.getByRole('heading', { level: 2,
        name: 'Encountered pokémons' });
      expect(encPoke).toBeInTheDocument();
    });
  it('Teste se é exibido o próximo Pokémon quando clicado.', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNext).toBeInTheDocument();
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    userEvent.click(buttonNext);
    // screen.logTestingPlaygroundURL();
    const chamander = screen.getByText(/charmander/i);
    expect(chamander).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const allBtn = screen.getAllByTestId('pokemon-type-button');
    expect(allBtn[1]).toBeInTheDocument();
    userEvent.click(allBtn[1]);
    const chamander = screen.getByText(/charmander/i);
    expect(chamander).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    screen.logTestingPlaygroundURL();
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    expect(fireBtn).toBeInTheDocument();
    const electricBtn = screen.getByRole('button', { name: /electric/i });
    expect(electricBtn).toBeInTheDocument();
    const bugBtn = screen.getByRole('button', { name: /bug/i });
    expect(bugBtn).toBeInTheDocument();
    const poisonBtn = screen.getByRole('button', { name: /poison/i });
    expect(poisonBtn).toBeInTheDocument();
    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    expect(psychicBtn).toBeInTheDocument();
    const normalBtn = screen.getByRole('button', { name: /normal/i });
    expect(normalBtn).toBeInTheDocument();
    const dragonBtn = screen.getByRole('button', { name: /dragon/i });
    expect(dragonBtn).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
