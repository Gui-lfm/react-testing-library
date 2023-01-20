// import React from 'react';
// import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
// import { PokemonDetails, FavoritePokemon } from '../pages';

describe('Testes do componente <FavoritePokemon.js />', () => {
  it('Deve exibir na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados.', () => {});
});
