import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testes do componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutP1 = screen.getByText(
      'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon',
    );

    const aboutP2 = screen.getByText(
      'One can filter Pokémon by type, and see more details for each one of them',
    );

    expect(aboutP1).toBeInTheDocument();
    expect(aboutP2).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const aboutImg = document.getElementsByClassName('pokedex-image');
    expect(aboutImg[0].src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
