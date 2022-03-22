import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.',
    () => {
      renderWithRouter(<About />);

      const about = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
      expect(about).toBeInTheDocument();
    });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const text1 = 'This application simulates a Pokédex, a digital '
    + 'encyclopedia containing all Pokémons';
    const text2 = 'One can filter Pokémons by type, and see '
    + 'more details for each one of them';

    const p1 = screen.getByText(text1);
    const p2 = screen.getByText(text2);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const imgTest = screen.getByAltText(/Pokédex/i);
    console.log(imgTest.src);
    expect(imgTest).toBeInTheDocument();
    expect(imgTest).toHaveAttribute('src', srcImg);
  });
});
