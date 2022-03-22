import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa Favorite', () => {
  it('Teste se é exibido na tela a mensagem Notfound.',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(favoriteLink).toBeInTheDocument();

      userEvent.click(favoriteLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');

      const favorites = screen.getByText('No favorite pokemon found');
      expect(favorites).toBeInTheDocument();
    });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    const favoritar = screen.getByText(/pokémon favoritado\?/i);
    expect(favoritar).toBeInTheDocument();
    userEvent.click(favoritar);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    // screen.logTestingPlaygroundURL();
    const pkmName = screen.getByTestId('pokemon-name');
    expect(pkmName.innerHTML).toBe('Pikachu');
  });
});
