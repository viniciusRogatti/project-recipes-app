import React from 'react';
import { useLocation } from 'react-router-dom';
import { MEALS_PATH } from '../services/helpers/Consts';
import DrinkRecipes from './DrinkRecipes';
import MealRecipes from './MealRecipes';

function Recipes() {
  const { pathname } = useLocation();
  return pathname === MEALS_PATH ? <MealRecipes /> : <DrinkRecipes />;
}

export default Recipes;
