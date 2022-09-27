import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DRINKS_PATH } from '../services/helpers/Consts';
import { RecipesCard } from '../styles/main';

function RecommendedDrinkCards({ drink, index }) {
  return (
    <RecipesCard data-testid={ `${index}-recommendation-card` }>
      <Link to={ `${DRINKS_PATH}/${drink.idDrink}` }>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink }
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-recommendation-title` }>{drink.strDrink}</h3>
      </Link>
    </RecipesCard>
  );
}

RecommendedDrinkCards.propTypes = {
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
}.isRequired;

export default RecommendedDrinkCards;
