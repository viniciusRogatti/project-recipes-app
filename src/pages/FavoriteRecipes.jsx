import React, { useEffect, useState } from 'react';
import CardFavoriteOrDone from '../components/CardFavoriteOrDone';
import FilterBar from '../components/FilterBar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useRecipes from '../hooks/useRecipes';
import { getFavoriteRecipes } from '../services/localStorage';
import { Container, Main } from '../styles/favorites';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState(null);
  const { updateFavorite, filteredRecipes } = useRecipes();

  useEffect(() => {
    setFavoriteRecipes(getFavoriteRecipes());
  }, [updateFavorite]);

  useEffect(() => {
    if (filteredRecipes) {
      setFavoriteRecipes(filteredRecipes);
    }
  }, [filteredRecipes]);

  useEffect(() => {
    setFavoriteRecipes(getFavoriteRecipes());
  }, []);

  return (
    <Main>
      <Header title="Favorite Recipes" searchAble={ false } />
      <FilterBar page="favorite" />
      <Container>
        { favoriteRecipes?.map((recipe, index) => (
          <CardFavoriteOrDone
            key={ recipe.id }
            tags={ recipe.tags }
            isDone={ false }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </Container>
      <Footer />
    </Main>

  );
}

export default FavoriteRecipes;
