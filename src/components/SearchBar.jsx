import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import TheRecipesDBAPI from '../services/fetchApi';
import {
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

function SearchBar() {
  const { setMeals, setDrinks } = useContext(RecipesContext);

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
    if (result?.length === 1) {
      const id = result[0][idScreen];
      if (pathname === MEALS_PATH) {
        history.push(`${MEALS_PATH}/${id}`);
      } else history.push(`${DRINKS_PATH}/${id}`);
    }
    if (pathname === MEALS_PATH) setMeals(result);
    else setDrinks(result);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        data-testid={ SEARCH_TESTID }
        onChange={ (e) => setValue(e.target.value) }
      />
      <label htmlFor={ INGREDIENT_SEARCH_TESTID }>
        Ingredient
        <input
          type="radio"
          name="search-radio"
          value={ INGREDIENT_VALUE }
          id={ INGREDIENT_SEARCH_TESTID }
          data-testid={ INGREDIENT_SEARCH_TESTID }
          onChange={ (e) => setSearch(e.target.value) }
        />
      </label>
      <label htmlFor={ NAME_SEARCH_TESTID }>
        Name
        <input
          type="radio"
          name="search-radio"
          value={ NAME_VALUE }
          id={ NAME_SEARCH_TESTID }
          data-testid={ NAME_SEARCH_TESTID }
          onChange={ (e) => setSearch(e.target.value) }
        />
      </label>
      <label htmlFor={ FIRST_LETTER_SEARCH_TESTID }>
        First letter
        <input
          type="radio"
          name="search-radio"
          value={ FIRST_LETTER_VALUE }
          id={ FIRST_LETTER_SEARCH_TESTID }
          data-testid={ FIRST_LETTER_SEARCH_TESTID }
          onChange={ (e) => setSearch(e.target.value) }
        />
      </label>
      <button
        type="button"
        onClick={ handleClick }
        data-testid={ BTN_SEARCH_EXEC_TESTID }
      >
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
