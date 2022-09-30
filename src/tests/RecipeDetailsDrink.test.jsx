import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import {
  ALL_INGREDIENTS_MEASURES_TESTIDS,
  ALL_RECO_IMGS_TESTIDS,
  AQUAMARINE_INGREDIENTS_LENGTH,
  DRINKS_AQUAMARINE_PATH,
  FAVORITE_BTN_TESTID,
  FIRST_INGREDIENT_MEASURE_TESTID,
  INSTRUCTIONS_TESTID,
  RECIPE_CATEGORY_TESTID,
  RECIPE_PHOTO_TESTID,
  RECIPE_TITLE_TESTID,
  RECO_CARD_TESTID,
  RECO_IMGS_LENGTH,
  RECO_TITLE_TESTID,
  SHARE_BTN_TESTID,
  START_RECIPE_BTN_TESTID,
} from '../services/helpers/Consts';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testa a page "Recipe Details", quando selecionado um drink...', () => {
  test(`Se todos os elementos aparecem na tela,
    se funcionam de acordo quando selecionando um drink`, async () => {
    const { history } = renderWithRouter(<App />, DRINKS_AQUAMARINE_PATH);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    expect(history.location.pathname).toBe(DRINKS_AQUAMARINE_PATH);

    const favoriteBtn = screen.getByTestId(FAVORITE_BTN_TESTID);
    const shareBtn = screen.getByTestId(SHARE_BTN_TESTID);
    const recipeImage = screen.getByTestId(RECIPE_PHOTO_TESTID);
    const recipeTitle = screen.getByTestId(RECIPE_TITLE_TESTID);
    const recipeCategory = screen.getByTestId(RECIPE_CATEGORY_TESTID);
    const firstIngredient = await screen.findByTestId(FIRST_INGREDIENT_MEASURE_TESTID);
    const allIngredients = await screen.findAllByTestId(ALL_INGREDIENTS_MEASURES_TESTIDS);
    const instructions = screen.getByTestId(INSTRUCTIONS_TESTID);
    const recommendationCard = await screen.findByTestId(RECO_CARD_TESTID);
    const recommendationTitle = screen.getByTestId(RECO_TITLE_TESTID);
    const startRecipeBtn = screen.getByTestId(START_RECIPE_BTN_TESTID);

    const allRecommendationCards = await screen.findAllByTestId(ALL_RECO_IMGS_TESTIDS);

    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtn).toBeEnabled();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(allIngredients).toHaveLength(AQUAMARINE_INGREDIENTS_LENGTH);
    expect(instructions).toBeInTheDocument();
    expect(recommendationCard).toBeInTheDocument();
    expect(allRecommendationCards).toHaveLength(RECO_IMGS_LENGTH);
    expect(recommendationTitle).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();

    expect(recipeTitle).toHaveTextContent(/aquamarine/i);
    expect(recipeCategory).toHaveTextContent(/alcoholic/i);

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);

    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });
});
