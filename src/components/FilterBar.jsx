import React from 'react';
import PropTypes from 'prop-types';
import useRecipes from '../hooks/useRecipes';
import { getFavoriteRecipes, getRecipes } from '../services/localStorage';
import { AllFilterBarIcon,
  DrinkFilterBarIcon, MealsFilterBarIcon } from '../styles/_icons';
import Container from '../styles/filterBar';

function FilterBar({ page }) {
  const { handleRecipeFilter } = useRecipes();

  const handleFilter = ({ target: { id } }) => {
    let allRecipes;
    if (page === 'favorite') {
      allRecipes = getFavoriteRecipes();
    } else allRecipes = getRecipes();
    if (id === 'All') return handleRecipeFilter(allRecipes, false);
    if (id === 'Foods') {
      return handleRecipeFilter(allRecipes?.filter((e) => e.type === 'meal'), true);
    } if (id === 'Drinks') {
      handleRecipeFilter(allRecipes?.filter((e) => e.type === 'drink'), true);
    }
  };

  return (
    <Container>
      <AllFilterBarIcon
        id="All"
        data-testid="filter-by-all-btn"
        onClick={ handleFilter }
      />
      <MealsFilterBarIcon
        data-testid="filter-by-meal-btn"
        id="Foods"
        onClick={ handleFilter }
      />
      <DrinkFilterBarIcon
        data-testid="filter-by-drink-btn"
        id="Drinks"
        onClick={ handleFilter }
      />
    </Container>
  );
}

FilterBar.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default FilterBar;
