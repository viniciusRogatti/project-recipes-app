import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [filteredBarRecipes, setFilteredBarRecipes] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [recipesMade, setRecipesMade] = useState(0);
  const [updateFavorite, setUpdateFavorite] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const setTrueFilter = (param) => {
    setFilteredBarRecipes(param);
    setIsSearching(true);
  };

  const handleRecipeFilter = (array, bool) => {
    setFilteredRecipes(array);
    setIsFilter(bool);
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
    isFilter,
    setIsSearching,
  }), [filteredRecipes, isFilter,
    recipesMade, updateFavorite, isSearching, filteredBarRecipes]);

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
