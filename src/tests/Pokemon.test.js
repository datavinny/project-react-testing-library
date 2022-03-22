import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Testa Pokedex', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon />);

    const pkmName = screen.getByTestId('pokemon-name');
    const pkmType = screen.getByTestId('pokemon-type');
    const pkmWeight = screen.getByTestId('pokemon-weight');
    expect(pkmName).toBeInTheDocument();
    expect(pkmType).toBeInTheDocument();
    expect(pkmWeight).toBeInTheDocument();

    // const pkmImg = screen.getByAltText(`${name} sprite`);
    // expect(pkmImg).toBeInTheDocument();
    // expect(pkmImg).toHaveAttribute('src', `${image}`);
  });
  it('Teste se o card contém um link de navegação.', () => {
    renderWithRouter(<Pokemon />);

    const linkDetais = screen.getByRole('link', { name: 'More details' });
    expect(linkDetais).toBeInTheDocument();
  });
  it('Teste se ao clicar no link de navegação do Pokémon.', () => {
    const { history } = renderWithRouter(<Pokemon />);

    const linkDetais = screen.getByRole('link', { name: 'More details' });
    expect(linkDetais).toBeInTheDocument();
    userEvent.click(linkDetais);
    const { pathname } = history.location;
    expect(pathname).toBe(`pokemons/${id}`);
  });
  it('Teste também se a URL exibida no navegador.', () => {
    renderWithRouter(<Pokemon />);
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon />);
  });
});
