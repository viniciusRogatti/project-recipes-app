import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MEALS_PATH } from '../services/helpers/Consts';

function MealCards({ meal, index }) {
  return (
    <Link to={ `${MEALS_PATH}/${meal.idMeal}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
        <img
          width="50px"
          src={ meal.strMealThumb }
          alt={ meal }
          data-testid={ `${index}-card-img` }
        />
      </div>
    </Link>
  );
}

MealCards.propTypes = {
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;

export default MealCards;
