import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { DONE_RECIPES_PATH } from '../services/helpers/Consts';

const today = '29/09/2022';
const teste = [
  {
    id: 53060,
    alcoholicOrNot: '',
    category: 'Side',
    doneDate: today,
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    name: 'Burek',
    nationality: 'Croatian',
    type: 'meal',
    tags: ['Streetfood', ' Onthego'],
  },
  {
    id: 15997,
    alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    doneDate: today,
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink',
    tags: [],
  }];

const dataTestId = '1-horizontal-name';

describe('Testa a page "Recipe Details"', () => {
  beforeEach(() => localStorage.setItem('doneRecipes', JSON.stringify(teste)));
  test('Se todos os elementos aparecem na tela', async () => {
    renderWithRouter(<App />, DONE_RECIPES_PATH);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Foods' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Drinks' })).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'profile-icon' })).toBeInTheDocument();
  });
  test('Se as receitas afinalizadas são renderizadas corretamente', () => {
    renderWithRouter(<App />, DONE_RECIPES_PATH);
    const firstImgRecipe = screen.getByRole('img', { name: 'Burek' });
    const firstTitleRecipe = screen.getByTestId('0-horizontal-name');
    const firstTextRecipe = screen.getByTestId('0-horizontal-top-text');
    const firstDoneDateRecipe = screen.getByTestId('0-horizontal-done-date');
    const firstBtnShare = screen.getByTestId('0-horizontal-share-btn');
    const firstTagOfFirstRecipe = screen.getByTestId('0-Streetfood-horizontal-tag');
    const secondTagOfFirstRecipe = screen.getByTestId('0- Onthego-horizontal-tag');

    expect(firstImgRecipe.src).toBe('https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg');
    expect(firstTitleRecipe).toHaveTextContent('Burek');
    expect(firstTextRecipe).toHaveTextContent('Croatian - Side');
    expect(firstDoneDateRecipe).toHaveTextContent(today);
    expect(firstBtnShare).toBeInTheDocument('shareIcon.svg');
    expect(firstTagOfFirstRecipe).toHaveTextContent('Streetfood');
    expect(secondTagOfFirstRecipe).toHaveTextContent('Onthego');

    const secondImgRecipe = screen.getByRole('img', { name: 'GG' });
    const secondTitleRecipe = screen.getByTestId(dataTestId);
    const secondTextRecipe = screen.getByTestId('1-horizontal-top-text');
    const secondDoneDateRecipe = screen.getByTestId('1-horizontal-done-date');
    const secondBtnShare = screen.getByTestId('1-horizontal-share-btn');

    expect(secondImgRecipe.src).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(secondTitleRecipe).toHaveTextContent('GG');
    expect(secondTextRecipe).toHaveTextContent('Optional alcohol - Ordinary Drink');
    expect(secondDoneDateRecipe).toHaveTextContent(today);
    expect(secondBtnShare).toBeInTheDocument('shareIcon.svg');
  });
  test('Se os botões de filtros tem o comportamento esperado', async () => {
    renderWithRouter(<App />, DONE_RECIPES_PATH);
    const btnFilterAll = screen.getByRole('button', { name: 'All' });
    const btnFilterFoods = screen.getByRole('button', { name: 'Foods' });
    const btnFilterDrinks = screen.getByRole('button', { name: 'Drinks' });
    const firstTitleRecipe = screen.getByTestId('0-horizontal-name');
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
});
