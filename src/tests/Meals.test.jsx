import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import {
  BTN_SEARCH_EXEC_TESTID,
  FIRST_LETTER_SEARCH_TESTID,
  INGREDIENT_SEARCH_TESTID,
  MEALS_PATH,
  NAME_SEARCH_TESTID,
  PROFILE_TOP_BTN,
  SEARCH_TESTID,
  SEARCH_TOP_BTN,
} from '../services/helpers/Consts';

describe('Testa a página Meals', () => {
  test(`Se o título "Meals" é renderizado na tela,
  assim como os botões "profile" e "search"`, () => {
    renderWithRouter(<App />, MEALS_PATH);

    expect(screen.getByRole('heading', { name: /meals/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(screen.getByTestId(SEARCH_TESTID)).toBeInTheDocument();
    expect(screen.getByTestId(INGREDIENT_SEARCH_TESTID)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_SEARCH_TESTID)).toBeInTheDocument();
    expect(screen.getByTestId(FIRST_LETTER_SEARCH_TESTID)).toBeInTheDocument();
    expect(screen.getByTestId(BTN_SEARCH_EXEC_TESTID)).toBeInTheDocument();
  });
});
