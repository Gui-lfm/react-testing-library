import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <Pokemon.js />', () => {
  it('Deve ser renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const name = 'Pikachu';

    const pokemonName = screen.getByText(name);
    const pokemonType = screen.getByTestId('pokemon-type', {
      name: /Electric/i,
    });
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);

    const pokemonImg = document.querySelector('img');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe(
      'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(pokemonImg.alt).toBe(`${name} sprite`);
  });

  it('O card do Pokémon indicado na Pokédex deve conter um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    const URL = '/pokemon/25';

    expect(detailsLink.pathname).toBe(URL);
  });

  it('ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    const URL = '/pokemon/25';
    expect(pathname).toBe(URL);
  });
});
