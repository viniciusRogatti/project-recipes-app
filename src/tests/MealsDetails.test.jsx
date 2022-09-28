import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';

describe('', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneMeal),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinks),
    });
    renderWithRouter(<App />, '/meals/52977');
  });
  test(`verifica se todos os titulos e botoes aparecem na tela
  `, async () => {
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const startBtn = screen.getByTestId('start-recipe-btn');
    const titleRecommended = screen.getByText('Recommended');
    const titleVideo = screen.getByText('Video');
    const titleIngredients = screen.getByText('Ingredients');

    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
    expect(titleRecommended).toBeInTheDocument();
    expect(titleVideo).toBeInTheDocument();
    expect(titleIngredients).toBeInTheDocument();
  });
});
