import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa Favorite', () => {
  it('Teste se é exibido na tela a mensagem Notfound.',
    () => {
      renderWithRouter(<FavoritePokemons />);

      const notFound = screen.getByText('No favorite pokemon found');
      expect(notFound).toBeInTheDocument();
    });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    fail();
  });
});
