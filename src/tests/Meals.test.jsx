import React from 'react';
import { screen, waitFor } from '@testing-library/react';
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
  RECIPES_LIMIT,
  SEARCH_TESTID,
  SEARCH_TOP_BTN,
} from '../services/helpers/Consts';
import beefMeals from '../../cypress/mocks/beefMeals';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testa a página Meals', () => {
  test(`Se ao carregar a pagina, os cards de receitas referente a comidas são 
  renderizados na tela até o index 12`, async () => {
    renderWithRouter(<App />, MEALS_PATH);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    await waitFor(() => {
      for (let index = 0; index < RECIPES_LIMIT; index += 1) {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      }
    }, { timeout: 3000 });
  });

  test(`Se o título "Meals" é renderizado na tela,
  assim como os botões "profile" e "search"`, () => {
    renderWithRouter(<App />, MEALS_PATH);

    expect(screen.getByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();
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

  test(`Se ao escolher o filtro "ingredient" o fetch é feito com a url
  "https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}"`, () => {
    renderWithRouter(<App />, MEALS_PATH);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    const typedValue = 'beef';
    const urlIngredientBeef = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${typedValue}`;

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH_TESTID);
    const inputIngredient = screen.getByTestId(INGREDIENT_SEARCH_TESTID);
    const btnSearch = screen.getByTestId(BTN_SEARCH_EXEC_TESTID);

    userEvent.type(inputSearch, typedValue);
    userEvent.click(inputIngredient);
    userEvent.click(btnSearch);

    expect(fetch).toBeCalledWith(urlIngredientBeef);
  });

  test(`Se ao fazer uma pesquisa com filtro "name" a api é chamada com a url
  https://www.themealdb.com/api/json/v1/1/search.php?s={nome}`, () => {
    renderWithRouter(<App />, MEALS_PATH);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    const typedValue = 'beef';
    const urlNameBeef = `https://www.themealdb.com/api/json/v1/1/search.php?s=${typedValue}`;

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH_TESTID);
    const inputName = screen.getByTestId(NAME_SEARCH_TESTID);
    const btnSearch = screen.getByTestId(BTN_SEARCH_EXEC_TESTID);

    userEvent.type(inputSearch, typedValue);
    userEvent.click(inputName);
    userEvent.click(btnSearch);

    expect(fetch).toBeCalledWith(urlNameBeef);
  });

  test(`Se ao fazer um pesquisa com filtro "First letter" a api é chamado com a url
  https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}`, () => {
    renderWithRouter(<App />, MEALS_PATH);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    const typedValue = 'b';
    const urlNameBeef = `https://www.themealdb.com/api/json/v1/1/search.php?f=${typedValue}`;

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH_TESTID);
    const inputFirstLetter = screen.getByTestId(FIRST_LETTER_SEARCH_TESTID);
    const btnSearch = screen.getByTestId(BTN_SEARCH_EXEC_TESTID);

    userEvent.type(inputSearch, typedValue);
    userEvent.click(inputFirstLetter);
    userEvent.click(btnSearch);

    expect(fetch).toBeCalledWith(urlNameBeef);
  });

  test(`Se ao digitar "arrabiata" e selecionar o filtro "Name" 
  o usuario é redirecionado para a pagina "/meals/:id"`, async () => {
    const { history } = renderWithRouter(<App />, MEALS_PATH);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    const typedValue = 'arrabiata';
    const pathNameArrabiata = '/meals/52771';
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH_TESTID);
    const inputName = screen.getByTestId(NAME_SEARCH_TESTID);
    const btnSearch = screen.getByTestId(BTN_SEARCH_EXEC_TESTID);

    userEvent.type(inputSearch, typedValue);
    userEvent.click(inputName);
    userEvent.click(btnSearch);

    await waitFor(() => expect(history.location.pathname)
      .toBe(pathNameArrabiata), { timeout: 2000 });
  });
});
