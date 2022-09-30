import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [filteredBarRecipes, setFilteredBarRecipes] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [recipesMade, setRecipesMade] = useState(0);
  const [updateFavorite, setUpdateFavorite] = useState(false);

  const setTrueFilter = (param) => {
    setFilteredBarRecipes(param);
    setIsSearching(true);
  };

  const handleRecipeFilter = (param) => {
    setFilteredRecipes(param);
  };

  const setTrueUpdate = (param) => {
    setUpdateFavorite(param);
  };

  const contextValue = useMemo(() => ({
    isSearching,
    recipesMade,
    updateFavorite,
    filteredRecipes,
    setTrueFilter,
    setTrueUpdate,
    setRecipesMade,
    handleRecipeFilter,
    filteredBarRecipes,
    setIsSearching,
  }), [filteredRecipes, recipesMade, updateFavorite, isSearching, filteredBarRecipes]);

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
