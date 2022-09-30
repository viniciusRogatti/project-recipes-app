import React, { useEffect, useState } from 'react';
import CardDoneRecipe from '../components/CardDoneRecipe';
import Header from '../components/Header';
import { getRecipes } from '../services/localStorage';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState(null);
  const [recipesFiltered, setRecipesFiltered] = useState(null);

  useEffect(() => {
    setRecipesDone(getRecipes());
  }, []);

  const handleFilter = ({ target: { name } }) => {
    if (name === 'All') return setRecipesFiltered(getRecipes());
    if (name === 'Foods') {
      return setRecipesFiltered(recipesDone.filter((e) => e.type === 'meal'));
    } setRecipesFiltered(recipesDone.filter((e) => e.type === 'drink'));
  };

  const recipesToRender = recipesFiltered || recipesDone;

  return (
    <div>
      <Header title="Done Recipes" searchAble={ false } />
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
      { recipesToRender?.map((recipe, index) => (
        <CardDoneRecipe
          key={ recipe.id }
          imgTestId={ `${index}-horizontal-image` }
          titleTestId={ `${index}-horizontal-top-text` }
          nameTestId={ `${index}-horizontal-name` }
          dateTestId={ `${index}-horizontal-done-date` }
          shareTestId={ `${index}-horizontal-share-btn` }
          tags={ recipe.tags }
          type={ recipe.type }
          recipe={ recipe }
          index={ index }
        />
      ))}
    </div>

  );
}

export default DoneRecipes;
