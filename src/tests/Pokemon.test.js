import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pkmName = screen.getByTestId('pokemon-name');
    const pkmType = screen.getByTestId('pokemon-type');
    const pkmWeight = screen.getByTestId('pokemon-weight');

    const pikachu = screen.getByText(/pikachu/i);
    const eletric = screen.getAllByText(/electric/i);
    const weight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pkmName).toBe(pikachu);
    expect(pkmType).toBe(eletric[0]);
    expect(pkmWeight).toBe(weight);

    const image = screen.getByAltText(/pikachu sprite/i);
    expect(image).toBeInTheDocument();
    const urlImage = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(image).toHaveAttribute('src', urlImage);
    // screen.logTestingPlaygroundURL();
  });
  it('Teste se ao clicar no link de navegação do Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    const linkDetais = screen.getByRole('link', { name: 'More details' });

    expect(pikachu).toBeInTheDocument();
    expect(linkDetais).toBeInTheDocument();

    userEvent.click(linkDetais);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    const linkDetais = screen.getByRole('link', { name: 'More details' });

    expect(pikachu).toBeInTheDocument();
    expect(linkDetais).toBeInTheDocument();

    userEvent.click(linkDetais);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favoritar = screen.getByLabelText('Pokémon favoritado?');
    expect(favoritar).toBeInTheDocument();
    userEvent.click(favoritar);

    const starImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(starImg).toBeInTheDocument();
    const starUrl = '/star-icon.svg';
    expect(starImg).toHaveAttribute('src', starUrl);
  });
});
