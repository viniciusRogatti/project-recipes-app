import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import { AllRecipesAPI } from '../services/fetchApi';
import { RECIPES_LIMIT } from '../services/helpers/Consts';
import { Main } from '../styles/main';
import MealCards from './MealCards';

function MealRecipes() {
  const { meals, setSearchRecipes, searchRecipes } = useRecipes();
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const CallRecipes = async () => {
      setRecipes(await AllRecipesAPI(pathname));
      setSearchRecipes(false);
    };
    CallRecipes();
  }, [pathname]); // eslint-disable-line
  return (
    <Main>
      {searchRecipes ? (
        meals?.length && meals.map((meal, index) => (index < RECIPES_LIMIT && (
          <MealCards meal={ meal } index={ index } key={ meal.idMeal } />
        )))) : (
        recipes.meals?.length && recipes.meals
          .map((recipe, index) => (index < RECIPES_LIMIT && (
            <MealCards meal={ recipe } index={ index } key={ recipe.idMeal } />
          )))
      )}
    </Main>
  );
}

export default MealRecipes;
