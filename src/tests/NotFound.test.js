import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente <NotFound.js />', () => {
  it('A página deve conter um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundTxt = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });

    expect(notFoundTxt).toBeInTheDocument();
  });

  it('A página deve mostrar a imagem esperada', () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = document.querySelector('.not-found-image');

    expect(notFoundImg.src).toContain(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
