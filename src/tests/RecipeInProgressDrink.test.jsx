import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import {
  ALL_INGRED_MEAS_STEP_TESTID_IN_PROGRESS,
  AQUAMARINE_INGREDIENTS_LENGTH,
  FAVORITE_BTN_TESTID,
  FINISH_RECIPE_BTN_TESTID,
  INSTRUCTIONS_TESTID,
  RECIPE_CATEGORY_TESTID,
  RECIPE_PHOTO_TESTID,
  RECIPE_TITLE_TESTID,
  SHARE_BTN_TESTID,
} from '../services/helpers/Consts';
import oneDrink from '../../cypress/mocks/oneDrink';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(oneDrink),
  });
});

describe(`Testa a page "Recipe Details", após apertar o botão "Start Recipe",
ao selecionar um drink`, () => {
  test('Se todos os elementos aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />, '/drinks/178319/in-progress');

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');

    const favoriteBtn = screen.getByTestId(FAVORITE_BTN_TESTID);
    const shareBtn = screen.getByTestId(SHARE_BTN_TESTID);
    const recipeImage = screen.getByTestId(RECIPE_PHOTO_TESTID);
    const recipeTitle = screen.getByTestId(RECIPE_TITLE_TESTID);
    const recipeCategory = screen.getByTestId(RECIPE_CATEGORY_TESTID);
    const allIngredients = await screen
      .findAllByTestId(ALL_INGRED_MEAS_STEP_TESTID_IN_PROGRESS);
    const instructions = screen.getByTestId(INSTRUCTIONS_TESTID);
    const finishRecipeBtn = screen.getByTestId(FINISH_RECIPE_BTN_TESTID);

    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(allIngredients).toHaveLength(AQUAMARINE_INGREDIENTS_LENGTH);
    expect(instructions).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeDisabled();

    expect(recipeTitle).toHaveTextContent(/aquamarine/i);
    expect(recipeCategory).toHaveTextContent(/cocktail/i);

    act(() => {
      userEvent.click(favoriteBtn);
      userEvent.click(favoriteBtn);
      userEvent.click(allIngredients[0]);
      userEvent.click(allIngredients[1]);
      userEvent.click(allIngredients[2]);
      userEvent.click(allIngredients[3]);
      userEvent.click(allIngredients[4]);
      userEvent.click(allIngredients[5]);
    });

    expect(finishRecipeBtn).toBeEnabled();

    userEvent.click(finishRecipeBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    }, { timeout: 3000 });
  });
  test('Se o botão de copiar o link funciona', async () => {
    const { history } = renderWithRouter(<App />, '/drinks/15997/in-progress');

    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    const shareBtn = screen.getByTestId('share-btn');

    userEvent.click(shareBtn);

    await waitFor(() => {
      const copiedMessage = screen.getByText(/link copied!/i);
      expect(copiedMessage).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
