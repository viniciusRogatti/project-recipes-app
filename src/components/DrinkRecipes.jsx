import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import { AllRecipesAPI } from '../services/fetchApi';
import { RECIPES_LIMIT } from '../services/helpers/Consts';
import DrinkCards from './DrinkCards';
import { Main } from '../styles/main';

function DrinkRecipes() {
  const { drinks, setSearchRecipes, searchRecipes } = useRecipes();
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const CallRecipes = async () => {
      setRecipes(await AllRecipesAPI(pathname));
      setSearchRecipes(false);
    };
    CallRecipes();
  }, []); // eslint-disable-line

  return (
    <Main>
      {searchRecipes ? (
        drinks?.length && drinks.map((drink, index) => (index < RECIPES_LIMIT && (
          <DrinkCards drink={ drink } index={ index } key={ drink.idDrink } />
        )))) : (
        recipes.drinks?.length && recipes.drinks
          .map((recipe, index) => (index < RECIPES_LIMIT && (
            <DrinkCards drink={ recipe } index={ index } key={ recipe.idDrink } />
          )))
      )}
    </Main>
  );
}

export default DrinkRecipes;
