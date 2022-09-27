import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MEALS_PATH } from '../services/helpers/Consts';
import { RecipesCard } from '../styles/main';

function MealCards({ meal, index }) {
  return (
    <RecipesCard data-testid={ `${index}-recipe-card` }>
      <Link to={ `${MEALS_PATH}/${meal.idMeal}` }>
        <img
          src={ meal.strMealThumb }
          alt={ meal }
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
      </Link>
    </RecipesCard>
  );
}

MealCards.propTypes = {
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;

export default MealCards;
