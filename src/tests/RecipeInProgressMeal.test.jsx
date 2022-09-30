import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import {
  ALL_INGRED_MEAS_STEP_TESTID_IN_PROGRESS,
  FAVORITE_BTN_TESTID,
  FINISH_RECIPE_BTN_TESTID,
  INGREDIENTS_LENGTH,
  INSTRUCTIONS_TESTID,
  RECIPE_CATEGORY_TESTID,
  RECIPE_PHOTO_TESTID,
  RECIPE_TITLE_TESTID,
  SHARE_BTN_TESTID,
  VIDEO_TESTID,
} from '../services/helpers/Consts';
import oneMeal from '../../cypress/mocks/oneMeal';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(oneMeal),
  });
});
describe(`Testa a page "Recipe Details", após apertar o botão "Start Recipe",
ao selecionar uma meal`, () => {
  test('Se todos os elementos aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />, '/meals/52771/in-progress');

    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    const favoriteBtn = screen.getByTestId(FAVORITE_BTN_TESTID);
    const shareBtn = screen.getByTestId(SHARE_BTN_TESTID);
    const recipeImage = screen.getByTestId(RECIPE_PHOTO_TESTID);
    const recipeTitle = screen.getByTestId(RECIPE_TITLE_TESTID);
    const recipeCategory = screen.getByTestId(RECIPE_CATEGORY_TESTID);
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
    userEvent.click(allIngredients[8]);
    userEvent.click(allIngredients[9]);
    userEvent.click(allIngredients[10]);
    userEvent.click(allIngredients[11]);
    userEvent.click(allIngredients[12]);
    userEvent.click(allIngredients[13]);
    userEvent.click(allIngredients[14]);
    userEvent.click(allIngredients[15]);

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(video);
    userEvent.click(video);

    const finishRecipeBtn2 = await screen.findByTestId(FINISH_RECIPE_BTN_TESTID);

    expect(finishRecipeBtn2).toBeEnabled();

    userEvent.click(finishRecipeBtn2);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    }, { timeout: 3000 });
  });
  test('Se o botão de copiar o link funciona', async () => {
    const { history } = renderWithRouter(<App />, '/meals/52977/in-progress');

    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    expect(history.location.pathname).toBe('/meals/52977/in-progress');

    const shareBtn = screen.getByTestId('share-btn');

    userEvent.click(shareBtn);

    await waitFor(() => {
      const copiedMessage = screen.getByText(/link copied!/i);
      expect(copiedMessage).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
