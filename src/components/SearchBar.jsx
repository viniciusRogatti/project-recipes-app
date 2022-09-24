import React, { useState } from 'react';
import TheMealDBAPI from '../services/fetchApi';
import {
  BTN_SEARCH_EXEC_TESTID,
  FIRST_LETTER_SEARCH_TESTID,
  FIRST_LETTER_VALUE,
  INGREDIENT_SEARCH_TESTID,
  INGREDIENT_VALUE,
  NAME_SEARCH_TESTID,
  NAME_VALUE,
  SEARCH_TESTID } from '../services/helpers/Consts';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');

  const handleClick = () => {
    if (search === FIRST_LETTER_VALUE && value.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    TheMealDBAPI(search, value);
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
