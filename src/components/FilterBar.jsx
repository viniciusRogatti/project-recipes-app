import React from 'react';
import PropTypes from 'prop-types';
import useRecipes from '../hooks/useRecipes';
import { getFavoriteRecipes, getRecipes } from '../services/localStorage';

function FilterBar({ page }) {
  const { handleRecipeFilter } = useRecipes();

  const handleFilter = ({ target: { name } }) => {
    let allRecipes;
    if (page === 'favorite') {
      allRecipes = getFavoriteRecipes();
    } else allRecipes = getRecipes();
    if (name === 'All') return handleRecipeFilter(allRecipes);
    if (name === 'Foods') {
      return handleRecipeFilter(allRecipes?.filter((e) => e.type === 'meal'));
    } handleRecipeFilter(allRecipes?.filter((e) => e.type === 'drink'));
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="All"
        onClick={ handleFilter }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        name="Foods"
        onClick={ handleFilter }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="Drinks"
        onClick={ handleFilter }
      >
        Drinks
      </button>
    </div>
  );
}

FilterBar.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default FilterBar;
