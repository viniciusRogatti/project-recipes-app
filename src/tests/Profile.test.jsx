import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testar a página de Perfil', () => {
  test('testa se renderiza título com Profile', () => {
    renderWithRouter(<App />, '/profile');
    const title = screen.getByRole('heading', { level: 1, name: 'Profile' });
    expect(title).toBeInTheDocument();
  });
});
describe('Testar se o email aparece da local storage', () => {
  test('email do usuario aparece na tela,', async () => {
    await waitFor(() => { localStorage.setItem('user', 'teste@email.com'); });
    renderWithRouter(<App />, '/profile');
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail.innerHTML).toBe('teste@email.com');
  });
});
describe('Testar os Botoes', () => {
  test('testa se done recipes esta na tela', () => {
    renderWithRouter(<App />, '/profile');
    const doneButton = screen.getByRole('button', { name: /done recipes/i });
    expect(doneButton).toBeInTheDocument();
  });
  test('testa se o botao done leva para rota certa', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const doneButton = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('testa se favorite recipes esta na tela', () => {
    renderWithRouter(<App />, '/profile');
    const favButton = screen.getByRole('button', { name: /favorite recipes/i });
    expect(favButton).toBeInTheDocument();
  });
  test('testa se o botao leva para rota certa', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const favButton = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(favButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('testa se o logout esta na tela', () => {
    renderWithRouter(<App />, '/profile');
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
  test('testa se o botao leva para rota certa', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });
});
