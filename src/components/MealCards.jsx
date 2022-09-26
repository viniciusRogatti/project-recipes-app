import React from 'react';
import PropTypes from 'prop-types';

function MealCards({ meal, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
      <img
        width="50px"
        src={ meal.strMealThumb }
        alt={ meal }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

MealCards.propTypes = {
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;

export default MealCards;
