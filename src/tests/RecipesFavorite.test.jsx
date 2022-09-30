import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { FAVORITES_PATH } from '../services/helpers/Consts';

const firstName = '0-horizontal-name';
const teste = [
  {
    id: 53060,
    alcoholicOrNot: '',
    category: 'Side',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    name: 'Burek',
    nationality: 'Croatian',
    type: 'meal',
  },
  {
    id: 15997,
    alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink',
  }];

const dataTestId = '1-horizontal-name';

describe('Testa a page "Recipes Favorite"', () => {
  beforeEach(() => localStorage.setItem('favoriteRecipes', JSON.stringify(teste)));
  test('Se todos os elementos aparecem na tela', () => {
    renderWithRouter(<App />, FAVORITES_PATH);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Foods' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Drinks' })).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'profile-icon' })).toBeInTheDocument();
  });
  test('Se as receitas favoritadas são renderizadas corretamente', async () => {
    renderWithRouter(<App />, FAVORITES_PATH);
    const firstImgRecipe = screen.getByRole('img', { name: 'Burek' });
    const firstTextRecipe = screen.getByTestId('0-horizontal-top-text');
    const firstTitleRecipe = screen.getByTestId(firstName);
    const firstBtnShare = screen.getByTestId('0-horizontal-share-btn');
    const allBtnDeslike = screen.getAllByRole('button', { name: 'Desfavoritar' });

    expect(firstImgRecipe.src).toBe('https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg');
    expect(firstTitleRecipe).toHaveTextContent('Burek');
    expect(firstTextRecipe).toHaveTextContent('Croatian - Side');
    expect(firstBtnShare).toBeInTheDocument('shareIcon.svg');
    expect(allBtnDeslike).toHaveLength(2);

    const secondImgRecipe = screen.getByRole('img', { name: 'GG' });
    const secondTitleRecipe = screen.getByTestId(dataTestId);
    const secondTextRecipe = screen.getByTestId('1-horizontal-top-text');
    const secondBtnShare = screen.getByTestId('1-horizontal-share-btn');

    expect(secondImgRecipe.src).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(secondTitleRecipe).toHaveTextContent('GG');
    expect(secondTextRecipe).toHaveTextContent('Optional alcohol - Ordinary Drink');
    expect(secondBtnShare).toBeInTheDocument('shareIcon.svg');
  });
  test('Se os botões de filtros tem o comportamento esperado', async () => {
    renderWithRouter(<App />, FAVORITES_PATH);
    const btnFilterAll = screen.getByRole('button', { name: 'All' });
    const btnFilterFoods = screen.getByRole('button', { name: 'Foods' });
    const btnFilterDrinks = screen.getByRole('button', { name: 'Drinks' });
    const firstTitleRecipe = screen.getByTestId(firstName);
    const secondTitleRecipe = screen.getByTestId(dataTestId);

    userEvent.click(btnFilterFoods);

    await waitFor(() => {
      expect(secondTitleRecipe).not.toBeInTheDocument();
      userEvent.click(btnFilterAll);
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
      userEvent.click(btnFilterDrinks);
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(firstTitleRecipe).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });
  test('Se os botões de "Desfavoritar" tem o comportamento esperado', async () => {
    renderWithRouter(<App />, FAVORITES_PATH);
    const allBtnDeslike = screen.getAllByRole('button', { name: 'Desfavoritar' });
    const firstTitleRecipe = screen.getByTestId(firstName);
    userEvent.click(allBtnDeslike[0]);
    await waitFor(() => {
      expect(firstTitleRecipe).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('Se os botões de "Share" tem o comportamento esperado', async () => {
    renderWithRouter(<App />, FAVORITES_PATH);
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');
    const firstBtnShare = screen.getByTestId('0-horizontal-share-btn');
    const firstTitleRecipe = screen.getByTestId(firstName);

    userEvent.click(firstBtnShare);
    await waitFor(() => {
      expect(firstTitleRecipe).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
