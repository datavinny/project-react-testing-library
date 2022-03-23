import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa PokemonDetails', () => {
  it('Teste se as informações detalhadas são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    const linkDetais = screen.getByRole('link', { name: 'More details' });
    expect(pikachu).toBeInTheDocument();
    expect(linkDetais).toBeInTheDocument();

    userEvent.click(linkDetais);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const pikachuDetails = screen.getByText('Pikachu Details');
    const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    const paragraphDetails = screen.getByText(/electricity/i);

    expect(pikachuDetails).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraphDetails).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const linkDetais = screen.getByRole('link', { name: 'More details' });
    expect(linkDetais).toBeInTheDocument();
    userEvent.click(linkDetais);

    const strGameMap = /game locations of pikachu/i;
    const gameMap = screen.getByRole('heading', { level: 2, name: strGameMap });
    expect(gameMap).toBeInTheDocument();
    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
    const imagesMap = screen.getAllByAltText(/pikachu location/i);
    expect(imagesMap[0]).toBeInTheDocument();
    const url1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(imagesMap[0]).toHaveAttribute('src', url1);
    expect(imagesMap[1]).toHaveAttribute('src', url2);
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    const linkDetais = screen.getByRole('link', { name: 'More details' });
    expect(pikachu).toBeInTheDocument();
    expect(linkDetais).toBeInTheDocument();

    userEvent.click(linkDetais);
    const favoritar = screen.getByLabelText('Pokémon favoritado?');
    expect(favoritar).toBeInTheDocument();
    expect(favoritar.checked).toBeFalsy();
    userEvent.click(favoritar);
    expect(favoritar.checked).toBe(true);
    userEvent.click(favoritar);
    expect(favoritar.checked).toBeFalsy();
  });
});
