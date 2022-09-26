import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DRINKS_PATH } from '../services/helpers/Consts';

function DrinkCards({ drink, index }) {
  return (
    <Link to={ `${DRINKS_PATH}/${drink.idDrink}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <h1 data-testid={ `${index}-card-name` }>{drink.strDrink}</h1>
        <img
          width="50px"
          src={ drink.strDrinkThumb }
          alt={ drink }
          data-testid={ `${index}-card-img` }
        />
      </div>
    </Link>
  );
}

DrinkCards.propTypes = {
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
}.isRequired;

export default DrinkCards;
