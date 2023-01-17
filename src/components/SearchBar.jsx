import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import { TheRecipesDBAPI } from '../services/fetchApi';
import {
  ALERT_MSG,
  BTN_SEARCH_EXEC_TESTID,
  DRINKS_PATH,
  FIRST_LETTER_SEARCH_TESTID,
  FIRST_LETTER_VALUE,
  INGREDIENT_SEARCH_TESTID,
  INGREDIENT_VALUE,
  MEALS_PATH,
  NAME_SEARCH_TESTID,
  NAME_VALUE,
  SEARCH_TESTID } from '../services/helpers/Consts';
import { FilterBox, SearchBox } from '../styles/header';

function SearchBar() {
  const { setTrueFilter } = useRecipes();

  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');
  const [idScreen, setIdScreen] = useState('');
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    setIdScreen(pathname === MEALS_PATH ? 'idMeal' : 'idDrink');
  }, [pathname]);

  const handleClick = async () => {
    const screen = pathname === MEALS_PATH ? 'meals' : 'drinks';
    const response = await TheRecipesDBAPI(pathname, search, value);
    const result = response[screen];

    if (!result) return global.alert(ALERT_MSG);
    if (result?.length === 1) {
      const id = result[0][idScreen];
      if (pathname === MEALS_PATH) {
        history.push(`${MEALS_PATH}/${id}`);
      } else history.push(`${DRINKS_PATH}/${id}`);
    }
    setTrueFilter(result);
  };

  return (
    <SearchBox>
      <input
        type="text"
        placeholder="Search"
        data-testid={ SEARCH_TESTID }
        onChange={ (e) => setValue(e.target.value) }
      />
      <FilterBox>
        <label htmlFor={ INGREDIENT_SEARCH_TESTID }>
          <input
            type="radio"
            name="search-radio"
            value={ INGREDIENT_VALUE }
            id={ INGREDIENT_SEARCH_TESTID }
            data-testid={ INGREDIENT_SEARCH_TESTID }
            onChange={ (e) => setSearch(e.target.value) }
          />
          Ingredient
        </label>
        <label htmlFor={ NAME_SEARCH_TESTID }>
          <input
            type="radio"
            name="search-radio"
            value={ NAME_VALUE }
            id={ NAME_SEARCH_TESTID }
            data-testid={ NAME_SEARCH_TESTID }
            onChange={ (e) => setSearch(e.target.value) }
          />
          Name
        </label>
        <label htmlFor={ FIRST_LETTER_SEARCH_TESTID }>
          <input
            type="radio"
            name="search-radio"
            value={ FIRST_LETTER_VALUE }
            id={ FIRST_LETTER_SEARCH_TESTID }
            data-testid={ FIRST_LETTER_SEARCH_TESTID }
            onChange={ (e) => setSearch(e.target.value) }
          />
          First letter
        </label>
      </FilterBox>
      <button
        type="button"
        onClick={ handleClick }
        data-testid={ BTN_SEARCH_EXEC_TESTID }
      >
        SEARCH
      </button>
    </SearchBox>
  );
}

export default SearchBar;
