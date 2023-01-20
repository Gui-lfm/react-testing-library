import React from 'react';
import { screen } from '@testing-library/react';
// import { Pokedex } from '../pages';
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
});
