import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testar a página de Perfil', () => {
  test('Se renderiza título com Profile', () => {
    renderWithRouter(<App />, '/profile');
    const title = screen.getByRole('heading', { level: 1, name: 'Profile' });
    expect(title).toBeInTheDocument();
  });

  test('Se email do usuário aparece na tela,', async () => {
    await waitFor(() => { localStorage.setItem('user', 'teste@email.com'); });
    renderWithRouter(<App />, '/profile');
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail.innerHTML).toBe('teste@email.com');
  });

  test('Se botão "Done Recipes" está na tela', () => {
    renderWithRouter(<App />, '/profile');
    const doneButton = screen.getByRole('button', { name: /done recipes/i });
    expect(doneButton).toBeInTheDocument();
  });

  test('Se o botão "Done Recipes" leva para rota certa', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const doneButton = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Se o botão "favorite recipes" está na tela', () => {
    renderWithRouter(<App />, '/profile');
    const favButton = screen.getByRole('button', { name: /favorite recipes/i });
    expect(favButton).toBeInTheDocument();
  });

  test('Se o botão "favorite recipes" leva para rota certa', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const favButton = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(favButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Se o botão "logout" está na tela', () => {
    renderWithRouter(<App />, '/profile');
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

  test('Se o botão "logout" leva para rota certa', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });
});
