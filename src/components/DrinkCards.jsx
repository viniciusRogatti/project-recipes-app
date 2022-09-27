import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DRINKS_PATH } from '../services/helpers/Consts';
import { RecipesCard } from '../styles/main';

function DrinkCards({ drink, index }) {
  return (
    <RecipesCard data-testid={ `${index}-recipe-card` }>
      <Link to={ `${DRINKS_PATH}/${drink.idDrink}` }>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink }
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
      </Link>
    </RecipesCard>
  );
}

DrinkCards.propTypes = {
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
}.isRequired;

export default DrinkCards;
