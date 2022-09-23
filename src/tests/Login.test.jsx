import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {
  EMAIL_INPUT_TESTID,
  INVALID_EMAIL,
  INVALID_PASS,
  LOGIN_BUTTON_TESTID,
  LOGIN_PATH,
  MEALS_PATH,
  PASSWORD_INPUT_TESTID,
  VALID_EMAIL,
  VALID_PASS,
} from '../services/helpers/Consts';
import renderWithRouter from './renderWithRouter';

describe('Testa a página de Login', () => {
  test('Se "Login" renderiza os inputs de email, password e o botão "Enter"', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Se o botão "Enter" começa disabled e fica enabled conforme validação', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passInput, INVALID_PASS);

    expect(loginButton).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passInput);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passInput, VALID_PASS);

    expect(loginButton).toBeEnabled();
  });

  test(`Se o botão "Enter", quando email e password válidos,
  redireciona para a página principal de receitas de comidas: "/meals"`, () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    expect(history.location.pathname).toBe(LOGIN_PATH);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passInput, VALID_PASS);

    userEvent.click(loginButton);

    const { pathname } = history.location;

    expect(pathname).toBe(MEALS_PATH);
  });
});
