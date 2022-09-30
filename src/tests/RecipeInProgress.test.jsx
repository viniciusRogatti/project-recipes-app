import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import {
  FAVORITE_BTN_TESTID,
  FINISH_RECIPE_BTN_TESTID,
  FIRST_INGRED_MEAS_TESTID_IN_PROGRESS,
  INSTRUCTIONS_TESTID,
  RECIPE_CATEGORY_TESTID,
  RECIPE_PHOTO_TESTID,
  RECIPE_TITLE_TESTID,
  SHARE_BTN_TESTID,
  VIDEO_TESTID,
} from '../services/helpers/Consts';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testa a page "Recipe Details"', () => {
  test('Se todos os elementos aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />, '/meals/52771/in-progress');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    const favoriteBtn = screen.getByTestId(FAVORITE_BTN_TESTID);
    const shareBtn = screen.getByTestId(SHARE_BTN_TESTID);
    const recipeImage = screen.getByTestId(RECIPE_PHOTO_TESTID);
    const recipeTitle = screen.getByTestId(RECIPE_TITLE_TESTID);
    const recipeCategory = screen.getByTestId(RECIPE_CATEGORY_TESTID);
    const firstIngredient = await screen
      .findByTestId(FIRST_INGRED_MEAS_TESTID_IN_PROGRESS);
    const instructions = screen.getByTestId(INSTRUCTIONS_TESTID);
    const video = screen.getByTestId(VIDEO_TESTID);
    const finishRecipeBtn = screen.getByTestId(FINISH_RECIPE_BTN_TESTID);

    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();
  });
});
