import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: 'Home' });
      const aboutLink = screen.getByRole('link', { name: 'About' });
      const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(favoriteLink).toBeInTheDocument();
    });
  it('redirecionada para a página inicial, na URL /', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const home = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(home).toBeInTheDocument();
  });
  it('redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const about = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(about).toBeInTheDocument();
  });
  it('redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favorites = screen.getByText('No favorite pokemon found');
    expect(favorites).toBeInTheDocument();
  });
  it('redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');

    const notFoundTitle = screen.getByText('Page requested not found');

    expect(notFoundTitle).toBeInTheDocument();
  });
});
