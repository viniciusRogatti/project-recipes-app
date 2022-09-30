import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import {
  ALL_INGRED_MEAS_STEP_TESTID_IN_PROGRESS,
  AQUAMARINE_INGREDIENTS_LENGTH,
  FAVORITE_BTN_TESTID,
  FINISH_RECIPE_BTN_TESTID,
  FIRST_INGRED_MEAS_TESTID_IN_PROGRESS,
  INSTRUCTIONS_TESTID,
  RECIPE_CATEGORY_TESTID,
  RECIPE_PHOTO_TESTID,
  RECIPE_TITLE_TESTID,
  SHARE_BTN_TESTID,
} from '../services/helpers/Consts';
import oneDrink from '../../cypress/mocks/oneDrink';

describe(`Testa a page "Recipe Details", após apertar o botão "Start Recipe",
ao selecionar um drink`, () => {
  test('Se todos os elementos aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />, '/drinks/178319/in-progress');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');

    const favoriteBtn = screen.getByTestId(FAVORITE_BTN_TESTID);
    const shareBtn = screen.getByTestId(SHARE_BTN_TESTID);
    const recipeImage = screen.getByTestId(RECIPE_PHOTO_TESTID);
    const recipeTitle = screen.getByTestId(RECIPE_TITLE_TESTID);
    const recipeCategory = screen.getByTestId(RECIPE_CATEGORY_TESTID);
    const firstIngredient = await screen
      .findByTestId(FIRST_INGRED_MEAS_TESTID_IN_PROGRESS);
    const allIngredients = await screen
      .findAllByTestId(ALL_INGRED_MEAS_STEP_TESTID_IN_PROGRESS);
    const instructions = screen.getByTestId(INSTRUCTIONS_TESTID);
    const finishRecipeBtn = screen.getByTestId(FINISH_RECIPE_BTN_TESTID);

    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(allIngredients).toHaveLength(AQUAMARINE_INGREDIENTS_LENGTH);
    expect(instructions).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeDisabled();

    expect(recipeTitle).toHaveTextContent(/aquamarine/i);
    expect(recipeCategory).toHaveTextContent(/cocktail/i);

    userEvent.click(allIngredients[0]);
    userEvent.click(allIngredients[1]);
    userEvent.click(allIngredients[2]);

    expect(finishRecipeBtn).toBeEnabled();

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);

    // userEvent.click(shareBtn);
    // const copiedMessage = screen.getByText(/link copied/i);
    // expect(copiedMessage).toBeInTheDocument();

    userEvent.click(finishRecipeBtn);
  });
});
