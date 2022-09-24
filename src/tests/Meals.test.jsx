import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import {
  BTN_SEARCH_EXEC_TESTID,
  EMAIL_INPUT_TESTID,
  FIRST_LETTER_SEARCH_TESTID,
  INGREDIENT_SEARCH_TESTID,
  LOGIN_BUTTON_TESTID,
  NAME_SEARCH_TESTID,
  PASSWORD_INPUT_TESTID,
  PROFILE_TOP_BTN,
  SEARCH_TESTID,
  SEARCH_TOP_BTN,
  VALID_EMAIL,
  VALID_PASS,
} from '../services/helpers/Consts';

describe('Testa a página Meals', () => {
  test(`Se o título "Meals" é renderizado na tela,
  assim como os botões "profile" e "search"`, () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passInput, VALID_PASS);

    userEvent.click(loginButton);

    const mealsTitle = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(mealsTitle).toBeInTheDocument();

    const profileLink = screen.getByTestId(PROFILE_TOP_BTN);
    expect(profileLink).toBeInTheDocument();

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(SEARCH_TESTID);
    const radioIngredient = screen.getByTestId(INGREDIENT_SEARCH_TESTID);
    const radioName = screen.getByTestId(NAME_SEARCH_TESTID);
    const radioFirstLetter = screen.getByTestId(FIRST_LETTER_SEARCH_TESTID);
    const searchButton2 = screen.getByTestId(BTN_SEARCH_EXEC_TESTID);

    expect(searchInput).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(searchButton2).toBeInTheDocument();
  });
});
