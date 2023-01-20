import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <FavoritePokemon.js />', () => {
  it('Deve exibir na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favoritesLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');

    const noFavoritesMsg = screen.getByText('No favorite Pokémon found');
    expect(noFavoritesMsg).toBeInTheDocument();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const favoriteBtn = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);

    const favoriteIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favoriteIcon).toBeInTheDocument();

    const favoritesLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favoritesLink);

    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByText(/electric/i);
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });
});
