import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [searchRecipes, setSearchRecipes] = useState(false);

  const setTrueMeals = (param) => {
    setMeals(param);
    setSearchRecipes(true);
  };

  const setTrueDrinks = (param) => {
    setDrinks(param);
    setSearchRecipes(true);
  };

  const contextValue = useMemo(() => ({
    meals,
    setTrueMeals,
    drinks,
    setTrueDrinks,
    setSearchRecipes,
    searchRecipes,
  }), [meals, drinks, searchRecipes]);

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
