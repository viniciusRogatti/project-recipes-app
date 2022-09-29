import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const setTrueFilter = (param) => {
    setFilteredRecipes(param);
    setIsSearching(true);
  };

  const contextValue = useMemo(() => ({
    filteredRecipes,
    setTrueFilter,
    setIsSearching,
    isSearching,
  }), [isSearching, setIsSearching, filteredRecipes]);

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
