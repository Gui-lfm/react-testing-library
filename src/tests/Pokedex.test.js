import React from 'react';
import { screen } from '@testing-library/react';
// import { Pokedex } from '../pages';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  it('A página deve conter um h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const pokedexHeading = screen.getByRole('heading', {
      name: 'Encountered Pokémon',
      level: 2,
    });

    expect(pokedexHeading).toBeInTheDocument();
  });

  it('O próximo Pokémon da lista deve ser exibido quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(nextBtn).toBeInTheDocument();

    userEvent.click(nextBtn);

    const pokemonName = screen.getByText(/Charmander/i);
    const pokemonType = screen.getByTestId('pokemon-type', { name: /Fire/i });
    const pokemonWeight = screen.getByText(/average weight: 8\.5 kg/i);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });

  it('Deve ser mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonCard = document.getElementsByClassName('pokemon');

    expect(pokemonCard).toHaveLength(1);
  });

  it('A Pokédex deve ter os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    expect(filterBtn).toHaveLength(7);

    expect(filterBtn[0].textContent).toBe('Electric');
    expect(filterBtn[1].textContent).toBe('Fire');
    expect(filterBtn[2].textContent).toBe('Bug');
    expect(filterBtn[3].textContent).toBe('Poison');
    expect(filterBtn[4].textContent).toBe('Psychic');
    expect(filterBtn[5].textContent).toBe('Normal');
    expect(filterBtn[6].textContent).toBe('Dragon');

    userEvent.click(filterBtn[0]);
    const pokemonType = screen.getByTestId('pokemon-type', {
      name: /Electric/i,
    });
    expect(pokemonType.textContent).toBe(filterBtn[0].textContent);

    const removeFilter = screen.getByRole('button', { name: 'All' });

    expect(removeFilter).toBeInTheDocument();
  });

  it('A Pokédex deve conter um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const removeFilter = screen.getByRole('button', { name: 'All' });

    expect(removeFilter).toBeInTheDocument();

    userEvent.click(removeFilter);
  });
});
