import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <App.js />', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritesLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a página inicial, ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });

    userEvent.click(homeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('A aplicação é redirecionada para a página de About, ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('A aplicação é redirecionada para a página de Pokémon Favoritados, ao clicar no link Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favoritesLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('A aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    const INVALID_URL = 'asdasdas';

    act(() => {
      history.push(INVALID_URL);
    });

    const notFoundTxt = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });

    const notFoundImg = screen.getByAltText('Pikachu crying because the page requested was not found');

    expect(notFoundTxt).toBeInTheDocument();
    expect(notFoundImg).toBeInTheDocument();
  });
});
