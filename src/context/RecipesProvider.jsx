import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recipesMade, setRecipesMade] = useState(0);

  const setTrueFilter = (param) => {
    setFilteredRecipes(param);
    setIsSearching(true);
  };

  const contextValue = useMemo(() => ({
    filteredRecipes,
    setTrueFilter,
    setIsSearching,
    isSearching,
    setRecipesMade,
    recipesMade,
  }), [isSearching, setIsSearching, filteredRecipes, recipesMade]);

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
