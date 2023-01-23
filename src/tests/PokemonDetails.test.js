import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente <PokemonDetails.js />', () => {
  const pokemonTest = 'Pikachu';
  it('As informações detalhadas do Pokémon selecionado devem ser mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const details = screen.getByRole('heading', {
      name: `${pokemonTest} Details`,
      level: 2,
    });

    expect(details).toBeInTheDocument();

    expect(detailsLink).not.toBeInTheDocument();

    const pokemonSummary = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });

    expect(pokemonSummary).toBeInTheDocument();

    const pokemonInfo = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );

    expect(pokemonInfo).toBeInTheDocument();
  });

  it('Deve existir na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const locationMap = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png';

    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const pokemonLocations = screen.getByRole('heading', {
      name: `Game Locations of ${pokemonTest}`,
      level: 2,
    });

    expect(pokemonLocations).toBeInTheDocument();

    const habitat = document.querySelector('.pokemon-habitat');
    expect(habitat).toBeInTheDocument();

    const imgs = within(habitat).getAllByRole('img');

    expect(imgs[0].src).toBe(locationMap);

    imgs.forEach((img) => {
      expect(img.alt).toBe(`${pokemonTest} location`);
    });
  });

  it('Deve ser possível favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const favoriteBtn = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);

    const favoriteImg = document.querySelector('.favorite-icon');
    expect(favoriteImg).toBeInTheDocument();

    userEvent.click(favoriteBtn);
    expect(favoriteImg).not.toBeInTheDocument();
  });
});
