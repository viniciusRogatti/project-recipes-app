import React, { useEffect, useState } from 'react';
import CardFavoriteOrDone from '../components/CardFavoriteOrDone';
import FilterBar from '../components/FilterBar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useRecipes from '../hooks/useRecipes';
import { getRecipes } from '../services/localStorage';
import { Container, Main } from '../styles/favorites';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState(null);
  const { filteredRecipes } = useRecipes();

  useEffect(() => {
    setRecipesDone(getRecipes());
  }, []);

  const recipesToRender = filteredRecipes || recipesDone;

  return (
    <Main>
      <Header title="Done Recipes" searchAble={ false } />
      <FilterBar page="done" />
      <Container>
        { recipesToRender?.map((recipe, index) => (
          <CardFavoriteOrDone
            key={ recipe.id }
            tags={ recipe.tags }
            isDone
            recipe={ recipe }
            index={ index }
          />
        ))}
      </Container>
      <Footer />
    </Main>
  );
}

export default DoneRecipes;
