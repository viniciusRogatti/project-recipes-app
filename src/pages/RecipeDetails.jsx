import React from 'react';
import { useLocation } from 'react-router-dom';
import DrinkDetails from '../components/DrinkDetails';
import MealDetails from '../components/MealDetails';

function RecipeDetails() {
  const { pathname } = useLocation();

  return (
    <section>
      {pathname.includes('meals') ? <MealDetails /> : <DrinkDetails />}
    </section>
  );
}

export default RecipeDetails;
