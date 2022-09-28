import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';

describe('', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneDrink),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });
    renderWithRouter(<App />, '/drinks/178319');
  });
  test(`verifica se todos os titulos e botoes aparecem na tela
  `, async () => {
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const startBtn = screen.getByTestId('start-recipe-btn');
    const titleRecommended = screen.getByText('Recommended');
    const titleIngredients = screen.getByText('Ingredients');

    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
    expect(titleRecommended).toBeInTheDocument();
    expect(titleIngredients).toBeInTheDocument();
  });
});
