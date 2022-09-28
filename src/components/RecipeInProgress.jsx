import React from 'react';
import { useLocation } from 'react-router-dom';
import DrinkInProgress from './DrinkInProgress';
import MealInProgress from './MealInProgress';

function RecipeInProgress() {
  const { pathname } = useLocation();

  return (
    <section>
      {pathname.includes('meals') ? <MealInProgress /> : <DrinkInProgress />}
    </section>
  );
}

export default RecipeInProgress;
