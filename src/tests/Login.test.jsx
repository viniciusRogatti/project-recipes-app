import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {
  EMAIL_INPUT_TESTID,
  INVALID_EMAIL,
  INVALID_PASS,
  LOGIN_BUTTON_TESTID,
  PASSWORD_INPUT_TESTID,
  VALID_EMAIL,
  VALID_PASS,
} from './helpers/Consts';

describe('Testa a página de Login', () => {
  test('Se "Login" renderiza os inputs de email, password e o botão "Enter"', () => {
    render(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TESTID);

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Se o botão "Enter" começa disabled e fica enabled conforme validação', () => {
    render(<App />);

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
});
