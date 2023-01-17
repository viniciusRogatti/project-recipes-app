import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import {
  ALL_INGREDIENTS_MEASURES_TESTIDS,
  FAVORITE_BTN_TESTID,
  FIRST_INGREDIENT_MEASURE_TESTID,
  INGREDIENTS_LENGTH8,
  INSTRUCTIONS_TESTID,
  MEALS_ARRABIATA_PATH,
  RECIPE_CATEGORY_TESTID,
  RECIPE_PHOTO_TESTID,
  RECIPE_TITLE_TESTID,
  SHARE_BTN_TESTID,
  START_RECIPE_BTN_TESTID,
  VIDEO_TESTID,
} from '../services/helpers/Consts';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testa a page "Recipe Details"', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
  });
  test('Se todos os elementos aparecem na tela e se funcionam de acordo', async () => {
    const { history } = renderWithRouter(<App />, MEALS_ARRABIATA_PATH);

    expect(history.location.pathname).toBe(MEALS_ARRABIATA_PATH);

    const favoriteBtn = screen.getByTestId(FAVORITE_BTN_TESTID);
    const shareBtn = screen.getByTestId(SHARE_BTN_TESTID);
    const recipeImage = screen.getByTestId(RECIPE_PHOTO_TESTID);
    const recipeTitle = screen.getByTestId(RECIPE_TITLE_TESTID);
    const recipeCategory = screen.getByTestId(RECIPE_CATEGORY_TESTID);
    const firstIngredient = await screen.findByTestId(FIRST_INGREDIENT_MEASURE_TESTID);
    const allIngredients = await screen.findAllByTestId(ALL_INGREDIENTS_MEASURES_TESTIDS);
    const instructions = screen.getByTestId(INSTRUCTIONS_TESTID);
    const video = screen.getByTestId(VIDEO_TESTID);
    const startRecipeBtn = screen.getByTestId(START_RECIPE_BTN_TESTID);

    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtn).toBeEnabled();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(allIngredients).toHaveLength(INGREDIENTS_LENGTH8);
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent(/spicy arrabiata penne/i);
    expect(recipeCategory).toHaveTextContent(/vegetarian/i);

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(video);
    userEvent.click(video);

    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  test('Se o botão de copiar o link funciona', async () => {
    const { history } = renderWithRouter(<App />, MEALS_ARRABIATA_PATH);

    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');

    expect(history.location.pathname).toBe(MEALS_ARRABIATA_PATH);

    const shareBtn = screen.getByTestId('share-btn');

    userEvent.click(shareBtn);

    await waitFor(() => {
      const copiedMessage = screen.getByText(/link copied!/i);
      expect(copiedMessage).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
