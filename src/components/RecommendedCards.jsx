import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { DRINKS_PATH, MEALS_PATH } from '../services/helpers/Consts';
import { RecipesCard } from '../styles/main';

function RecommendedCards({ recipe, index }) {
  const { pathname } = useLocation();

  const cardImage = pathname.includes('drinks') ? 'strMealThumb' : 'strDrinkThumb';
  const cardName = pathname.includes('drinks') ? 'strMeal' : 'strDrink';
  const cardId = pathname.includes('drinks') ? 'idMeal' : 'idDrink';
  const path = pathname.includes('drinks') ? MEALS_PATH : DRINKS_PATH;

  return (
    <RecipesCard data-testid={ `${index}-recommendation-card` }>
      <Link to={ `${path}/${recipe[cardId]}` }>
        <img
          src={ recipe[cardImage] }
          alt={ recipe[cardName] }
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-recommendation-title` }>{recipe[cardName]}</h3>
      </Link>
    </RecipesCard>
  );
}

RecommendedCards.propTypes = {
  recipe: PropTypes.string,
}.isRequired;

export default RecommendedCards;
