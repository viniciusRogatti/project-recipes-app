import React from 'react';
import PropTypes from 'prop-types';

function DrinkCards({ drink, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h1 data-testid={ `${index}-card-name` }>{drink.strDrink}</h1>
      <img
        width="50px"
        src={ drink.strDrinkThumb }
        alt={ drink }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

DrinkCards.propTypes = {
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
}.isRequired;

export default DrinkCards;
