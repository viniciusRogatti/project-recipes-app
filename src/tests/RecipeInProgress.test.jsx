import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import {
  ALL_INGRED_MEAS_STEP_TESTID_IN_PROGRESS,
  FAVORITE_BTN_TESTID,
  FINISH_RECIPE_BTN_TESTID,
  FIRST_INGRED_MEAS_TESTID_IN_PROGRESS,
  INGREDIENTS_LENGTH,
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
    const allIngredients = await screen
      .findAllByTestId(ALL_INGRED_MEAS_STEP_TESTID_IN_PROGRESS);
    const instructions = screen.getByTestId(INSTRUCTIONS_TESTID);
    const video = screen.getByTestId(VIDEO_TESTID);
    const finishRecipeBtn = screen.getByTestId(FINISH_RECIPE_BTN_TESTID);

    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(allIngredients).toHaveLength(INGREDIENTS_LENGTH);
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeDisabled();

    expect(recipeTitle).toHaveTextContent(/spicy arrabiata penne/i);
    expect(recipeCategory).toHaveTextContent(/vegetarian/i);

    userEvent.click(allIngredients[0]);
    userEvent.click(allIngredients[1]);
    userEvent.click(allIngredients[2]);
    userEvent.click(allIngredients[3]);
    userEvent.click(allIngredients[4]);
    userEvent.click(allIngredients[5]);
    userEvent.click(allIngredients[6]);
    userEvent.click(allIngredients[7]);

    expect(finishRecipeBtn).toBeEnabled();

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(video);
    userEvent.click(video);

    // userEvent.click(shareBtn);
    // const copiedMessage = screen.getByText(/link copied/i);
    // expect(copiedMessage).toBeInTheDocument();

    userEvent.click(finishRecipeBtn);
  });
});
