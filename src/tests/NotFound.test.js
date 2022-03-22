import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa NotFound', () => {
  it('Teste se é exibido na tela a mensagem Notfound.',
    () => {
      renderWithRouter(<NotFound />);

      const notFound = screen.getByText('Page requested not found');
      expect(notFound).toBeInTheDocument();
    });
  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText('Pikachu crying because the '
    + 'page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', srcImg);
  });
});
