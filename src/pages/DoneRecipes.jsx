import React, { useEffect, useState } from 'react';
import CardFavoriteOrDone from '../components/CardFavoriteOrDone';
import FilterBar from '../components/FilterBar';
import Header from '../components/Header';
import useRecipes from '../hooks/useRecipes';
import { getRecipes } from '../services/localStorage';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState(null);
  const { filteredRecipes } = useRecipes();

  useEffect(() => {
    setRecipesDone(getRecipes());
  }, []);

  const recipesToRender = filteredRecipes || recipesDone;

  return (
    <div>
      <Header title="Done Recipes" searchAble={ false } />
      <FilterBar page="done" />
      { recipesToRender?.map((recipe, index) => (
        <CardFavoriteOrDone
          key={ recipe.id }
          tags={ recipe.tags }
          isDone
          recipe={ recipe }
          index={ index }
        />
      ))}
    </div>

  );
}

export default DoneRecipes;
